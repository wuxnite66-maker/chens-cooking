"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useVinted } from "@/lib/vinted/store";
import { RequireAuth } from "@/components/vinted/RequireAuth";
import { Uploader } from "@/components/vinted/Uploader";
import {
  Badge,
  Button,
  Card,
  Chip,
  Field,
  inputClass,
  LinkButton,
} from "@/components/vinted/ui";
import {
  addWatermark,
  downloadDataUrl,
  enhance,
  getDimensions,
  removeBackground,
  upscale,
  virtualModel,
} from "@/lib/vinted/imaging";
import {
  BRANDS,
  CATEGORIES,
  COLORS,
  CONDITIONS,
  SIZES,
  categoryById,
} from "@/lib/vinted/taxonomy";
import { CREDIT_COSTS } from "@/lib/vinted/types";
import type {
  CreditAction,
  GeneratedListing,
  Listing,
  ListingAttributes,
  ProjectImage,
} from "@/lib/vinted/types";

function uid() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

const GENDERS = ["Damen", "Herren", "Unisex", "Kinder"] as const;

const STEPS = ["Fotos", "Bearbeiten", "Merkmale", "Inserat", "Export"];

function WizardInner() {
  const { credits, spend, settings, saveListing } = useVinted();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [gender, setGender] = useState<(typeof GENDERS)[number]>(
    settings.defaultGender,
  );
  const [attrs, setAttrs] = useState<ListingAttributes>({
    categoryId: "",
    brand: "",
    colorId: "",
    size: "",
    conditionId: "sehr-gut",
    material: "",
    flaws: "",
  });

  const [generated, setGenerated] = useState<GeneratedListing | null>(null);
  const [genBusy, setGenBusy] = useState(false);

  const cat = categoryById(attrs.categoryId);
  const sizeOptions = cat ? SIZES[cat.sizeType] : [];
  const catsForGender = useMemo(
    () => CATEGORIES.filter((c) => c.group === gender),
    [gender],
  );

  function flash(msg: string) {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  }

  // ── Bilder hinzufügen ────────────────────────────────────────────────
  async function addImages(urls: string[]) {
    const next: ProjectImage[] = [];
    for (const url of urls) {
      const { width, height } = await getDimensions(url);
      next.push({ id: uid(), original: url, current: url, edits: [], width, height });
    }
    setImages((prev) => [...prev, ...next]);
  }

  function removeImage(id: string) {
    setImages((prev) => prev.filter((i) => i.id !== id));
    setActive(0);
  }

  // ── Bildbearbeitung mit Credit-Abzug ─────────────────────────────────
  async function runEdit(
    action: CreditAction,
    label: string,
    fn: (src: string) => Promise<{ dataUrl: string; width: number; height: number }>,
  ) {
    const img = images[active];
    if (!img) return;
    if (credits < CREDIT_COSTS[action]) {
      flash(`Nicht genug Credits (${CREDIT_COSTS[action]} nötig). Bitte aufladen.`);
      return;
    }
    setBusy(label);
    try {
      const res = await fn(img.current);
      if (!spend(action)) {
        flash("Nicht genug Credits.");
        return;
      }
      setImages((prev) =>
        prev.map((i, idx) =>
          idx === active
            ? { ...i, current: res.dataUrl, width: res.width, height: res.height, edits: [...i.edits, label] }
            : i,
        ),
      );
    } catch {
      flash("Bearbeitung fehlgeschlagen – bitte anderes Bild versuchen.");
    } finally {
      setBusy(null);
    }
  }

  function resetImage() {
    setImages((prev) =>
      prev.map((i, idx) =>
        idx === active ? { ...i, current: i.original, edits: [] } : i,
      ),
    );
  }

  // ── Inserat generieren ───────────────────────────────────────────────
  async function generate() {
    if (!attrs.categoryId) {
      flash("Bitte zuerst eine Kategorie wählen.");
      setStep(2);
      return;
    }
    if (credits < CREDIT_COSTS.listing) {
      flash("Nicht genug Credits für die Textgenerierung.");
      return;
    }
    setGenBusy(true);
    try {
      const res = await fetch("/api/vinted/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          attributes: { ...attrs, gender },
          image: images[active]?.current,
        }),
      });
      const data = (await res.json()) as GeneratedListing;
      spend("listing");
      setGenerated(data);
    } catch {
      flash("Generierung fehlgeschlagen.");
    } finally {
      setGenBusy(false);
    }
  }

  // ── Speichern & Export ───────────────────────────────────────────────
  function save(status: Listing["status"]) {
    const listing: Listing = {
      id: uid(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      images,
      attributes: { ...attrs, gender },
      generated: generated ?? undefined,
      status,
    };
    saveListing(listing);
    router.push(`/vinted/inserate?id=${listing.id}`);
  }

  async function downloadAll() {
    setBusy("Bilder werden vorbereitet …");
    try {
      for (let i = 0; i < images.length; i++) {
        let url = images[i].current;
        if (settings.watermark) url = (await addWatermark(url, "VintFlow")).dataUrl;
        downloadDataUrl(url, `vintflow-${i + 1}.jpg`);
      }
    } finally {
      setBusy(null);
    }
  }

  async function copyText() {
    if (!generated) return;
    await navigator.clipboard.writeText(
      `${generated.title}\n\n${generated.description}\n\nTags: ${generated.tags.join(", ")}\nPreis: ${generated.price.toFixed(2)} €`,
    );
    flash("Inserat-Text in die Zwischenablage kopiert.");
  }

  const canNext =
    (step === 0 && images.length > 0) ||
    (step === 1) ||
    (step === 2 && !!attrs.categoryId && !!attrs.colorId && !!attrs.size) ||
    (step === 3 && !!generated) ||
    step === 4;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Fortschritt */}
      <ol className="mb-8 flex flex-wrap items-center gap-2 text-sm">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 font-semibold ${
                i === step
                  ? "bg-teal-600 text-white"
                  : i < step
                    ? "bg-teal-50 text-teal-700"
                    : "bg-slate-100 text-slate-400"
              }`}
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-white/25 text-xs">
                {i + 1}
              </span>
              {s}
            </button>
            {i < STEPS.length - 1 ? <span className="text-slate-300">→</span> : null}
          </li>
        ))}
        <li className="ml-auto">
          <Badge tone="amber">⚡ {credits} Credits</Badge>
        </li>
      </ol>

      {notice ? (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          {notice}
        </div>
      ) : null}

      {/* Schritt 1: Upload */}
      {step === 0 ? (
        <div>
          <h1 className="mb-1 text-2xl font-bold text-slate-900">Fotos hochladen</h1>
          <p className="mb-5 text-slate-600">
            Mehrere Perspektiven sind besser: Vorderseite, Rückseite, Etiketten und Details.
          </p>
          <Uploader onFiles={addImages} />
          {images.length > 0 ? (
            <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {images.map((img) => (
                <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.current} alt="" className="h-full w-full object-cover" />
                  <button
                    onClick={() => removeImage(img.id)}
                    className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Entfernen"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Schritt 2: Bearbeiten */}
      {step === 1 ? (
        <div>
          <h1 className="mb-1 text-2xl font-bold text-slate-900">Bilder bearbeiten</h1>
          <p className="mb-5 text-slate-600">
            Jede KI-Aktion kostet Credits. Du kannst jederzeit auf das Original zurücksetzen.
          </p>
          <div className="grid gap-6 md:grid-cols-[1fr_260px]">
            <Card className="overflow-hidden">
              <div className="grid aspect-[4/3] place-items-center bg-slate-100">
                {images[active] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={images[active].current} alt="" className="max-h-full max-w-full object-contain" />
                ) : null}
              </div>
              {images.length > 1 ? (
                <div className="flex gap-2 overflow-x-auto border-t border-slate-200 p-3">
                  {images.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setActive(idx)}
                      className={`h-14 w-14 flex-none overflow-hidden rounded-lg border-2 ${
                        idx === active ? "border-teal-500" : "border-transparent"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.current} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              ) : null}
            </Card>

            <div className="space-y-2">
              <EditButton
                label="Hintergrund entfernen"
                cost={CREDIT_COSTS.background}
                busy={busy}
                onClick={() =>
                  runEdit("background", "Hintergrund entfernt", (src) =>
                    removeBackground(src, { background: settings.bgColor }),
                  )
                }
              />
              <EditButton
                label="Automatisch verbessern"
                cost={CREDIT_COSTS.enhance}
                busy={busy}
                onClick={() =>
                  runEdit("enhance", "Verbessert", (src) =>
                    enhance(src, { auto: true, sharpen: 40 }),
                  )
                }
              />
              <EditButton
                label="Hochskalieren (2×)"
                cost={CREDIT_COSTS.upscale}
                busy={busy}
                onClick={() => runEdit("upscale", "Hochskaliert", (src) => upscale(src, 2))}
              />
              <EditButton
                label="Virtuelles Model"
                cost={CREDIT_COSTS.model}
                busy={busy}
                onClick={() => runEdit("model", "Virtuelles Model", (src) => virtualModel(src))}
              />
              <button
                onClick={resetImage}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                ↺ Auf Original zurücksetzen
              </button>
              {images[active]?.edits.length ? (
                <div className="pt-2 text-xs text-slate-500">
                  Angewendet: {images[active].edits.join(", ")}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {/* Schritt 3: Merkmale */}
      {step === 2 ? (
        <div>
          <h1 className="mb-1 text-2xl font-bold text-slate-900">Merkmale festlegen</h1>
          <p className="mb-5 text-slate-600">Je genauer, desto besser das Inserat.</p>

          <div className="space-y-6">
            <div>
              <div className="mb-2 text-sm font-semibold text-slate-700">Zielgruppe</div>
              <div className="flex flex-wrap gap-2">
                {GENDERS.map((g) => (
                  <Chip key={g} active={gender === g} onClick={() => setGender(g)}>
                    {g}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold text-slate-700">Kategorie</div>
              <div className="flex flex-wrap gap-2">
                {catsForGender.map((c) => (
                  <Chip
                    key={c.id}
                    active={attrs.categoryId === c.id}
                    onClick={() =>
                      setAttrs((a) => ({ ...a, categoryId: c.id, size: "" }))
                    }
                  >
                    {c.label}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Marke">
                <input
                  className={inputClass}
                  list="brands"
                  value={attrs.brand}
                  onChange={(e) => setAttrs((a) => ({ ...a, brand: e.target.value }))}
                  placeholder="z. B. Nike (oder leer lassen)"
                />
                <datalist id="brands">
                  {BRANDS.map((b) => (
                    <option key={b.name} value={b.name} />
                  ))}
                </datalist>
              </Field>
              <Field label="Material (optional)">
                <input
                  className={inputClass}
                  value={attrs.material}
                  onChange={(e) => setAttrs((a) => ({ ...a, material: e.target.value }))}
                  placeholder="z. B. 100% Baumwolle"
                />
              </Field>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold text-slate-700">Farbe</div>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setAttrs((a) => ({ ...a, colorId: c.id }))}
                    title={c.label}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${
                      attrs.colorId === c.id
                        ? "border-teal-600 bg-teal-50 text-teal-800"
                        : "border-slate-300 bg-white text-slate-700"
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-slate-300"
                      style={{
                        background:
                          c.hex === "conic"
                            ? "conic-gradient(red,orange,yellow,green,blue,violet,red)"
                            : c.hex,
                      }}
                    />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold text-slate-700">
                Größe {cat ? "" : "(erst Kategorie wählen)"}
              </div>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((s) => (
                  <Chip key={s} active={attrs.size === s} onClick={() => setAttrs((a) => ({ ...a, size: s }))}>
                    {s}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold text-slate-700">Zustand</div>
              <div className="flex flex-wrap gap-2">
                {CONDITIONS.map((c) => (
                  <Chip
                    key={c.id}
                    active={attrs.conditionId === c.id}
                    onClick={() => setAttrs((a) => ({ ...a, conditionId: c.id }))}
                    title={c.hint}
                  >
                    {c.label}
                  </Chip>
                ))}
              </div>
            </div>

            <Field label="Mängel / Hinweise (optional)" hint="Ehrlichkeit schafft Vertrauen und vermeidet Reklamationen.">
              <textarea
                className={inputClass}
                rows={2}
                value={attrs.flaws}
                onChange={(e) => setAttrs((a) => ({ ...a, flaws: e.target.value }))}
                placeholder="z. B. kleiner Fleck am Ärmel, leichtes Pilling"
              />
            </Field>
          </div>
        </div>
      ) : null}

      {/* Schritt 4: Inserat */}
      {step === 3 ? (
        <div>
          <h1 className="mb-1 text-2xl font-bold text-slate-900">Inserat generieren</h1>
          <p className="mb-5 text-slate-600">
            Die KI erstellt Titel, Beschreibung, Tags und einen Preisvorschlag.
          </p>

          {!generated ? (
            <Card className="p-8 text-center">
              <div className="text-4xl">🪄</div>
              <p className="mt-3 font-semibold text-slate-700">
                Bereit? Das kostet {CREDIT_COSTS.listing} Credits.
              </p>
              <div className="mt-5 flex justify-center">
                <Button onClick={generate} disabled={genBusy}>
                  {genBusy ? "Generiere …" : "✨ Inserat erstellen"}
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Badge tone={generated.aiPowered ? "teal" : "slate"}>
                  {generated.aiPowered ? "🤖 KI-generiert (Claude)" : "📋 Aus Vorlage"}
                </Badge>
                <button onClick={generate} className="text-sm font-semibold text-teal-600 hover:underline">
                  ↻ Neu generieren
                </button>
              </div>

              <Field label="Titel">
                <input
                  className={inputClass}
                  value={generated.title}
                  onChange={(e) => setGenerated({ ...generated, title: e.target.value })}
                />
              </Field>
              <Field label="Beschreibung">
                <textarea
                  className={inputClass}
                  rows={9}
                  value={generated.description}
                  onChange={(e) => setGenerated({ ...generated, description: e.target.value })}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Preis (€)">
                  <input
                    type="number"
                    step="0.5"
                    className={inputClass}
                    value={generated.price}
                    onChange={(e) =>
                      setGenerated({ ...generated, price: Number(e.target.value) })
                    }
                  />
                  <span className="mt-1 block text-xs text-slate-500">
                    Empfohlene Spanne: {generated.priceMin}–{generated.priceMax} €
                  </span>
                </Field>
                <Field label="Tags (mit Komma getrennt)">
                  <input
                    className={inputClass}
                    value={generated.tags.join(", ")}
                    onChange={(e) =>
                      setGenerated({
                        ...generated,
                        tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                      })
                    }
                  />
                </Field>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                <strong>Kategorie:</strong> {generated.category} · <strong>Marke:</strong>{" "}
                {generated.brand} · <strong>Farbe:</strong> {generated.color} ·{" "}
                <strong>Größe:</strong> {generated.size} · <strong>Zustand:</strong>{" "}
                {generated.condition}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Schritt 5: Export */}
      {step === 4 ? (
        <div>
          <h1 className="mb-1 text-2xl font-bold text-slate-900">Exportieren & speichern</h1>
          <p className="mb-5 text-slate-600">
            Text kopieren, Bilder herunterladen und auf Vinted einstellen.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="font-bold text-slate-900">Bilder</h3>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {images.map((img) => (
                  <div key={img.id} className="aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.current} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4 w-full" onClick={downloadAll} disabled={!!busy}>
                {busy ? busy : "⬇ Alle Bilder herunterladen"}
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-slate-900">Inserat-Text</h3>
              {generated ? (
                <>
                  <div className="mt-3 max-h-48 overflow-y-auto rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                    <div className="font-semibold">{generated.title}</div>
                    <div className="mt-1 whitespace-pre-wrap text-slate-600">
                      {generated.description}
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-bold text-teal-700">
                    Preis: {generated.price.toFixed(2)} €
                  </div>
                  <Button variant="outline" className="mt-4 w-full" onClick={copyText}>
                    📋 Text kopieren
                  </Button>
                </>
              ) : (
                <p className="mt-3 text-sm text-slate-500">
                  Noch kein Text generiert. Gehe zurück zu Schritt 4.
                </p>
              )}
            </Card>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => save("fertig")}>✅ Als fertig speichern</Button>
            <Button variant="outline" onClick={() => save("entwurf")}>
              Als Entwurf speichern
            </Button>
            <a
              href="https://www.vinted.de/items/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Auf Vinted einstellen ↗
            </a>
          </div>
        </div>
      ) : null}

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40"
        >
          ← Zurück
        </button>
        {step < STEPS.length - 1 ? (
          <Button
            onClick={() => {
              if (step === 3 && !generated) {
                generate();
                return;
              }
              setStep((s) => Math.min(STEPS.length - 1, s + 1));
            }}
            disabled={!canNext && !(step === 3 && !generated)}
          >
            Weiter →
          </Button>
        ) : (
          <LinkButton href="/vinted/inserate" variant="outline">
            Zu meinen Inseraten
          </LinkButton>
        )}
      </div>
    </div>
  );
}

function EditButton({
  label,
  cost,
  busy,
  onClick,
}: {
  label: string;
  cost: number;
  busy: string | null;
  onClick: () => void;
}) {
  const isBusy = busy === label;
  return (
    <button
      onClick={onClick}
      disabled={!!busy}
      className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-teal-400 hover:bg-teal-50 disabled:opacity-50"
    >
      <span>{isBusy ? "Verarbeite …" : label}</span>
      <span className="text-xs font-bold text-amber-600">⚡{cost}</span>
    </button>
  );
}

export default function NeuPage() {
  return (
    <RequireAuth>
      <WizardInner />
    </RequireAuth>
  );
}
