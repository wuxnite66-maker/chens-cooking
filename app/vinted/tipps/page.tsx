import { LinkButton } from "@/components/vinted/ui";

const SECTIONS = [
  {
    icon: "📸",
    title: "Bessere Fotos = bessere KI",
    tips: [
      "Bei Tageslicht fotografieren, direkte Sonne und dunkle Zimmer vermeiden.",
      "Neutraler, ruhiger Hintergrund (weiße Wand, heller Boden).",
      "Kleidungsstück glattstreichen oder bügeln, Reißverschlüsse schließen.",
      "Scharf stellen und ruhig halten – unscharfe Bilder lassen sich nur begrenzt retten.",
    ],
  },
  {
    icon: "🧾",
    title: "Immer mehrere Perspektiven",
    tips: [
      "Vorderseite, Rückseite und Gesamtansicht.",
      "Marken-, Größen- und Materialetikett einzeln fotografieren.",
      "Besondere Details zeigen: Stickerei, Druck, Knöpfe.",
      "Mängel offen zeigen (Fleck, Loch, Abrieb) – das schafft Vertrauen.",
    ],
  },
  {
    icon: "✂️",
    title: "Freistellen & Verbessern",
    tips: [
      "Je gleichmäßiger der Hintergrund, desto sauberer das Freistellen.",
      "Bei ähnlicher Farbe von Teil und Hintergrund die Toleranz niedriger halten.",
      "Nach dem Freistellen kurz auf Ränder und Logos prüfen.",
      "Nicht jedes Bild muss bearbeitet werden – gute Originale ruhig behalten.",
    ],
  },
  {
    icon: "📝",
    title: "Titel, Beschreibung & Preis",
    tips: [
      "KI-Vorschläge immer gegenlesen: Marke, Größe und Farbe kontrollieren.",
      "Titel mit Marke + Teil + Farbe + Größe finden Käufer über die Suche.",
      "Ehrlich bei Zustand und Mängeln bleiben.",
      "Preis realistisch wählen – die empfohlene Spanne ist nur eine Orientierung.",
    ],
  },
  {
    icon: "⚡",
    title: "Viele Artikel effizient",
    tips: [
      "Kleidung vorab nach Kategorie, Marke und Größe sortieren.",
      "Immer dieselbe Fotostation nutzen (einheitlicher Look, weniger Aufwand).",
      "In Blöcken arbeiten: erst alles fotografieren, dann alles bearbeiten.",
      "Credits im Blick behalten und rechtzeitig aufladen.",
    ],
  },
];

export default function TippsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Tipps für die besten Ergebnisse
      </h1>
      <p className="mt-2 text-slate-600">
        Kleine Handgriffe mit großer Wirkung – von der Aufnahme bis zum fertigen Inserat.
      </p>

      <div className="mt-8 space-y-6">
        {SECTIONS.map((s) => (
          <div key={s.title} className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="text-2xl">{s.icon}</span> {s.title}
            </h2>
            <ul className="mt-3 space-y-2">
              {s.tips.map((t) => (
                <li key={t} className="flex gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 text-teal-500">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-500 p-8 text-center text-white">
        <h2 className="text-xl font-bold">Bereit für dein nächstes Inserat?</h2>
        <div className="mt-4 flex justify-center">
          <LinkButton href="/vinted/neu" variant="outline" className="bg-white text-teal-700">
            Neues Inserat erstellen
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
