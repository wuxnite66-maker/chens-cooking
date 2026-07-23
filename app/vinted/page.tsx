import Link from "next/link";
import { LinkButton } from "@/components/vinted/ui";

const FEATURES = [
  {
    icon: "✂️",
    title: "Hintergrund entfernen",
    text: "Freistellen direkt im Browser – wähle einen sauberen weißen oder farbigen Hintergrund. Kein Ausschneiden von Hand.",
  },
  {
    icon: "✨",
    title: "Bild verbessern",
    text: "Automatischer Ausgleich von Helligkeit, Kontrast, Farbe und Schärfe. Aus dem Handyfoto wird ein Studio-Look.",
  },
  {
    icon: "🔍",
    title: "Upscaling",
    text: "Kleine, unscharfe Bilder werden hochskaliert und geglättet – für gestochen scharfe Vorschaubilder.",
  },
  {
    icon: "🧍",
    title: "Virtuelles Model",
    text: "Zeige dein Teil im Studio-Setting auf einer angedeuteten Model-Silhouette, ohne selbst zu posieren.",
  },
  {
    icon: "📝",
    title: "Titel & Beschreibung",
    text: "Die KI schreibt aus deinen Angaben (und optional dem Foto) einen suchstarken Titel und eine ehrliche Beschreibung.",
  },
  {
    icon: "💶",
    title: "Preis, Tags & Kategorie",
    text: "Realistischer Preisvorschlag samt Spanne, passende Tags und die richtige Kategorie – automatisch.",
  },
];

const STEPS = [
  { n: "1", t: "Fotos hochladen", d: "Ein oder mehrere Bilder deines Kleidungsstücks per Drag & Drop." },
  { n: "2", t: "KI-Bearbeitung", d: "Freistellen, verbessern, hochskalieren – mit einem Klick." },
  { n: "3", t: "Merkmale wählen", d: "Kategorie, Marke, Farbe, Größe, Zustand – Chips statt Tippen." },
  { n: "4", t: "Inserat generieren", d: "Titel, Beschreibung, Tags und Preis entstehen automatisch." },
  { n: "5", t: "Prüfen & exportieren", d: "Kurz kontrollieren, Text kopieren, Bilder laden – fertig für Vinted." },
];

export default function VintedLanding() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-teal-50 via-white to-white" />
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-3 py-1 text-xs font-semibold text-teal-700">
              🚀 KI-Assistent für den Second-Hand-Verkauf
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl">
              Vom Handyfoto zum fertigen{" "}
              <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                Vinted-Inserat
              </span>{" "}
              in Sekunden
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
              VintFlow entfernt den Hintergrund, verbessert deine Bilder und
              schreibt Titel, Beschreibung, Tags und Preisvorschlag – damit du
              schneller mehr verkaufst.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <LinkButton href="/vinted/register" className="px-6 py-3 text-base">
                Kostenlos starten
              </LinkButton>
              <Link
                href="/vinted/neu"
                className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                Direkt ausprobieren →
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              20 Gratis-Credits · keine Kreditkarte · läuft sofort im Browser
            </p>
          </div>

          {/* Vorher/Nachher-Mock */}
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                Vorher
              </div>
              <div className="grid h-56 place-items-center rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 text-slate-500">
                <span className="text-sm">📷 dunkles Handyfoto, Zimmer-Hintergrund</span>
              </div>
            </div>
            <div className="rounded-2xl border border-teal-200 bg-white p-3 shadow-md ring-1 ring-teal-100">
              <div className="mb-2 text-xs font-bold uppercase tracking-wide text-teal-500">
                Nachher
              </div>
              <div className="grid h-56 place-items-center rounded-xl bg-gradient-to-br from-teal-50 to-white text-teal-700">
                <span className="text-sm">✨ freigestellt, hell, verkaufsfertig</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Alles, was ein gutes Inserat braucht
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">
            Sieben KI-Werkzeuge in einem durchgängigen Ablauf.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{f.title}</h3>
              <p className="mt-1.5 text-sm text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ablauf */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              In 5 Schritten zum Inserat
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-teal-600 font-bold text-white">
                  {s.n}
                </div>
                <h3 className="mt-3 font-bold text-slate-900">{s.t}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="rounded-3xl bg-gradient-to-br from-teal-600 to-emerald-500 px-8 py-14 text-white shadow-lg">
          <h2 className="text-3xl font-bold tracking-tight">
            Bereit, schneller zu verkaufen?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-teal-50">
            Leg direkt los – dein erstes Inserat ist in ein paar Minuten fertig.
          </p>
          <div className="mt-7 flex justify-center">
            <Link
              href="/vinted/register"
              className="inline-flex items-center rounded-xl bg-white px-7 py-3 text-base font-bold text-teal-700 hover:bg-teal-50"
            >
              Jetzt kostenlos starten
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
