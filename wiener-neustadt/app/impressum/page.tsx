import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

/** Rechtstext-Gerüst — Inhalte bitte durch geprüfte Angaben ersetzen. */
export default function ImpressumPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-section pt-44 sm:px-8">
      <h1 className="font-serif text-display-sm font-semibold text-cream">Impressum</h1>
      <div className="hairline my-8 w-16" />

      <div className="space-y-8 text-sm leading-relaxed text-muted [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-cream">
        <div>
          <h2>Medieninhaber & Betreiber</h2>
          <p className="mt-3">
            {site.name} {site.city} <em>(Platzhalter — Firmenwortlaut lt. Firmenbuch einsetzen)</em>
            <br />
            {site.contact.address.street}, {site.contact.address.zip} {site.contact.address.city}
            <br />
            Telefon: {site.contact.phone} · E-Mail: {site.contact.email}
          </p>
        </div>
        <div>
          <h2>Unternehmensgegenstand</h2>
          <p className="mt-3">Gastgewerbe (Restaurant)</p>
        </div>
        <div>
          <h2>Noch zu ergänzen</h2>
          <p className="mt-3">
            UID-Nummer, Firmenbuchnummer & -gericht, Mitgliedschaft (WKO), Gewerbebehörde,
            Verleihung gem. § 5 ECG / § 25 MedienG. Diese Angaben bitte von der Steuerberatung /
            Rechtsberatung prüfen lassen.
          </p>
        </div>
      </div>
    </section>
  );
}
