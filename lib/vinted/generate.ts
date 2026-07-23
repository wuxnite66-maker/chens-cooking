// Regelbasierte Text- und Preis-Generierung (läuft ohne API-Key).
// Wird als Fallback verwendet, wenn keine echte KI (Claude) verfügbar ist –
// und dient dem Claude-Prompt als Vorlage/Struktur.

import {
  BRAND_TIER_MAP,
  brandTierId,
  categoryById,
  colorById,
  conditionById,
} from "./taxonomy";
import type { GeneratedListing, ListingAttributes } from "./types";

function titleCase(s: string): string {
  return s
    .split(" ")
    .map((w) => (w.length > 2 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/** Preisheuristik: Basispreis × Marke × Zustand, auf „schöne" Zahl gerundet. */
export function estimatePrice(attrs: ListingAttributes): {
  price: number;
  min: number;
  max: number;
} {
  const cat = categoryById(attrs.categoryId);
  const base = cat?.basePrice ?? 12;
  const tier = brandTierId(attrs.brand || "Ohne Marke");
  const brandMult = BRAND_TIER_MAP[tier] ?? 0.6;
  const cond = conditionById(attrs.conditionId);
  const condMult = cond?.multiplier ?? 0.55;

  // sanfte Untergrenze, damit Versandaufwand sich lohnt
  const raw = Math.max(3, base * brandMult * condMult);

  // Schön runden: kleine Preise auf ",99", größere auf ganze Euro.
  const price =
    raw < 15 ? Math.max(3, Math.round(raw)) - 0.01 : Math.round(raw);

  const min = Math.max(2, Math.floor(raw * 0.8));
  const max = Math.ceil(raw * 1.35);
  return {
    price: Number(price.toFixed(2)),
    min,
    max,
  };
}

/** Baut einen kompakten, suchfreundlichen Titel. */
export function buildTitle(attrs: ListingAttributes): string {
  const cat = categoryById(attrs.categoryId);
  const color = colorById(attrs.colorId);
  const parts: string[] = [];
  if (attrs.brand && attrs.brand !== "Ohne Marke") parts.push(attrs.brand);
  if (cat) parts.push(cat.noun);
  if (color && color.id !== "mehrfarbig") parts.push(color.label);
  if (attrs.size && attrs.size !== "Einheitsgröße")
    parts.push(`Gr. ${attrs.size}`);
  let title = parts.join(" ").trim();
  if (!title) title = "Kleidungsstück";
  // Vinted-Titel dürfen recht lang sein; wir kürzen auf ~70 Zeichen
  return title.length > 70 ? title.slice(0, 67).trimEnd() + "…" : title;
}

/** Sammelt sinnvolle Tags/Stichwörter. */
export function buildTags(attrs: ListingAttributes): string[] {
  const cat = categoryById(attrs.categoryId);
  const color = colorById(attrs.colorId);
  const tags = new Set<string>();
  if (attrs.brand && attrs.brand !== "Ohne Marke")
    tags.add(attrs.brand.toLowerCase());
  if (cat) {
    tags.add(cat.noun.toLowerCase());
    tags.add(cat.group.toLowerCase());
    cat.keywords.forEach((k) => tags.add(k));
  }
  if (color && color.id !== "mehrfarbig") tags.add(color.label.toLowerCase());
  if (attrs.material) tags.add(attrs.material.toLowerCase());
  tags.add("second hand");
  tags.add("vinted");
  return Array.from(tags).slice(0, 12);
}

/** Baut eine strukturierte, ehrliche Beschreibung. */
export function buildDescription(attrs: ListingAttributes): string {
  const cat = categoryById(attrs.categoryId);
  const color = colorById(attrs.colorId);
  const cond = conditionById(attrs.conditionId);
  const brand =
    attrs.brand && attrs.brand !== "Ohne Marke" ? attrs.brand : "Markenlos";

  const lines: string[] = [];

  // Einleitung
  const noun = cat?.noun ?? "Artikel";
  const colorTxt =
    color && color.id !== "mehrfarbig" ? ` in ${color.label}` : "";
  lines.push(`${brand} ${noun}${colorTxt} zu verkaufen.`);
  lines.push("");

  // Eckdaten
  lines.push("• Marke: " + brand);
  if (cat) lines.push("• Kategorie: " + cat.label + " (" + cat.group + ")");
  if (color) lines.push("• Farbe: " + color.label);
  if (attrs.size) lines.push("• Größe: " + attrs.size);
  if (attrs.material) lines.push("• Material: " + attrs.material);
  if (cond) lines.push("• Zustand: " + cond.label);
  lines.push("");

  // Zustand ausformuliert
  if (cond) lines.push(cond.hint);
  if (attrs.flaws && attrs.flaws.trim()) {
    lines.push("Hinweis zu Gebrauchsspuren: " + attrs.flaws.trim());
  }
  lines.push("");

  // Standard-Abschluss
  lines.push(
    "Privatverkauf, daher keine Rücknahme, Garantie oder Gewährleistung.",
  );
  lines.push("Versand oder Abholung möglich. Bei Fragen einfach melden! 🙂");

  return lines.join("\n");
}

/** Erzeugt das komplette Inserat regelbasiert (ohne KI). */
export function generateFallback(
  attrs: ListingAttributes,
): GeneratedListing {
  const cat = categoryById(attrs.categoryId);
  const color = colorById(attrs.colorId);
  const cond = conditionById(attrs.conditionId);
  const { price, min, max } = estimatePrice(attrs);
  return {
    title: buildTitle(attrs),
    description: buildDescription(attrs),
    tags: buildTags(attrs),
    category: cat ? `${cat.label} (${cat.group})` : "",
    brand: attrs.brand || "Ohne Marke",
    color: color?.label ?? "",
    size: attrs.size,
    condition: cond?.label ?? "",
    price,
    priceMin: min,
    priceMax: max,
    aiPowered: false,
  };
}

export { titleCase };
