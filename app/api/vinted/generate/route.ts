// Erzeugt Titel, Beschreibung, Tags und Preis für ein Inserat.
//
// Austauschbares KI-Backend:
//  • Ist ANTHROPIC_API_KEY gesetzt, wird die echte Claude-API genutzt und –
//    falls ein Foto mitgeschickt wird – auch das Bild ausgewertet.
//  • Ohne Key greift der regelbasierte Fallback (lib/vinted/generate) –
//    die App funktioniert also sofort, ganz ohne Konfiguration.

import { NextResponse } from "next/server";
import { generateFallback } from "@/lib/vinted/generate";
import {
  categoryById,
  colorById,
  conditionById,
} from "@/lib/vinted/taxonomy";
import type { GeneratedListing, ListingAttributes } from "@/lib/vinted/types";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = process.env.VINTED_AI_MODEL || "claude-haiku-4-5-20251001";

interface Body {
  attributes: ListingAttributes;
  image?: string; // Data-URL (optional)
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  const { attributes, image } = body;
  if (!attributes || !attributes.categoryId) {
    return NextResponse.json(
      { error: "attributes.categoryId fehlt" },
      { status: 400 },
    );
  }

  const fallback = generateFallback(attributes);
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Kein Key → sofort Vorlage zurückgeben.
  if (!apiKey) {
    return NextResponse.json(fallback satisfies GeneratedListing);
  }

  try {
    const ai = await generateWithClaude(apiKey, attributes, fallback, image);
    return NextResponse.json(ai);
  } catch (err) {
    // Bei jedem Fehler (Rate-Limit, Timeout, Parsing) auf die Vorlage zurückfallen.
    console.error("[vinted/generate] Claude-Fehler:", err);
    return NextResponse.json(fallback satisfies GeneratedListing);
  }
}

async function generateWithClaude(
  apiKey: string,
  attrs: ListingAttributes,
  fallback: GeneratedListing,
  image?: string,
): Promise<GeneratedListing> {
  const cat = categoryById(attrs.categoryId);
  const color = colorById(attrs.colorId);
  const cond = conditionById(attrs.conditionId);

  const facts = [
    `Kategorie: ${cat ? `${cat.label} (${cat.group})` : attrs.categoryId}`,
    `Marke: ${attrs.brand || "Ohne Marke"}`,
    `Farbe: ${color?.label ?? "-"}`,
    `Größe: ${attrs.size || "-"}`,
    `Zustand: ${cond?.label ?? "-"}`,
    attrs.material ? `Material: ${attrs.material}` : "",
    attrs.flaws ? `Mängel/Hinweise: ${attrs.flaws}` : "",
    `Preis-Richtwert (Heuristik): ${fallback.price} € (Spanne ${fallback.priceMin}–${fallback.priceMax} €)`,
  ]
    .filter(Boolean)
    .join("\n");

  const system =
    "Du bist Experte für Kleider-Verkauf auf Vinted und schreibst auf Deutsch. " +
    "Erstelle aus den Angaben ein verkaufsstarkes, ehrliches Inserat. " +
    "Antworte AUSSCHLIESSLICH mit gültigem JSON (kein Markdown, keine Erklärung) " +
    'im Schema: {"title": string (max 70 Zeichen), "description": string ' +
    '(mehrzeilig, mit Aufzählungspunkten und ehrlichem Zustands-Hinweis), ' +
    '"tags": string[] (5-10 Suchbegriffe, kleingeschrieben), "price": number (in Euro)}. ' +
    "Erfinde keine Marke, Größe oder Mängel dazu.";

  const userText =
    "Erstelle das Inserat für folgenden Artikel:\n\n" +
    facts +
    (image
      ? "\n\nNutze zusätzlich das beigefügte Produktfoto, um Details, Schnitt und Zustand realistisch zu beschreiben."
      : "");

  // Nachrichten-Content zusammenbauen (optional mit Bild).
  const content: unknown[] = [];
  if (image && image.startsWith("data:")) {
    const match = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.*)$/);
    if (match) {
      content.push({
        type: "image",
        source: { type: "base64", media_type: match[1], data: match[2] },
      });
    }
  }
  content.push({ type: "text", text: userText });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  let res: Response;
  try {
    res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system,
        messages: [{ role: "user", content }],
      }),
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    throw new Error(`Anthropic HTTP ${res.status}: ${await res.text()}`);
  }

  const json = (await res.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const text =
    json.content?.filter((c) => c.type === "text").map((c) => c.text).join("") ??
    "";

  const parsed = extractJson(text);
  if (!parsed) throw new Error("Konnte kein JSON aus der Antwort lesen");

  const title =
    typeof parsed.title === "string" && parsed.title.trim()
      ? parsed.title.trim().slice(0, 70)
      : fallback.title;
  const description =
    typeof parsed.description === "string" && parsed.description.trim()
      ? parsed.description.trim()
      : fallback.description;
  const tags = Array.isArray(parsed.tags)
    ? parsed.tags.map(String).map((t) => t.toLowerCase().trim()).filter(Boolean).slice(0, 12)
    : fallback.tags;
  const price =
    typeof parsed.price === "number" && parsed.price > 0
      ? Number(parsed.price.toFixed(2))
      : fallback.price;

  return {
    ...fallback,
    title,
    description,
    tags,
    price,
    aiPowered: true,
  };
}

function extractJson(text: string): Record<string, unknown> | null {
  // Direktes Parsen, sonst ersten {...}-Block herausschneiden.
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}
