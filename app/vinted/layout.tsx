import type { Metadata } from "next";
import { VintedProvider } from "@/lib/vinted/store";
import { TopNav } from "@/components/vinted/TopNav";

export const metadata: Metadata = {
  title: {
    default: "VintFlow · KI-Assistent für Vinted-Inserate",
    template: "%s · VintFlow",
  },
  description:
    "VintFlow erstellt aus deinen Handyfotos in Sekunden verkaufsfertige Vinted-Inserate: Hintergrund entfernen, Bilder verbessern, Titel, Beschreibung, Tags und Preisvorschlag – alles KI-gestützt.",
  robots: { index: false, follow: false },
};

export default function VintedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VintedProvider>
      {/* eigenes helles Theme, unabhängig vom dunklen Restaurant-Layout */}
      <div className="min-h-screen bg-[#fafafb] text-slate-900 antialiased">
        <TopNav />
        <main>{children}</main>
        <footer className="mt-20 border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row">
            <span>© {new Date().getFullYear()} VintFlow · Demo-Projekt</span>
            <span className="text-slate-400">
              Nicht mit Vinted verbunden. Alle Daten bleiben in deinem Browser.
            </span>
          </div>
        </footer>
      </div>
    </VintedProvider>
  );
}
