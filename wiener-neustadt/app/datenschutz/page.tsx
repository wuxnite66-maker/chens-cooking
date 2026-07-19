import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false },
};

/** DSGVO-Gerüst — vor Livegang rechtlich prüfen lassen. */
export default function DatenschutzPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-section pt-44 sm:px-8">
      <h1 className="font-serif text-display-sm font-semibold text-cream">Datenschutzerklärung</h1>
      <div className="hairline my-8 w-16" />

      <div className="space-y-8 text-sm leading-relaxed text-muted [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-cream">
        <div>
          <h2>Verantwortlicher</h2>
          <p className="mt-3">
            {site.name} {site.city}, {site.contact.address.street},{" "}
            {site.contact.address.zip} {site.contact.address.city} —{" "}
            E-Mail: {site.contact.email}
          </p>
        </div>
        <div>
          <h2>Reservierungsanfragen</h2>
          <p className="mt-3">
            Wenn Sie unser Reservierungsformular nutzen, verarbeiten wir die angegebenen Daten
            (Name, Telefonnummer, ggf. E-Mail, Datum/Uhrzeit, Personenanzahl, Anmerkung)
            ausschließlich zur Bearbeitung Ihrer Reservierung (Art. 6 Abs. 1 lit. b DSGVO).
            Die Daten werden nach Abwicklung der Reservierung gelöscht, sofern keine gesetzlichen
            Aufbewahrungspflichten bestehen.
          </p>
        </div>
        <div>
          <h2>Cookies & Speicherung</h2>
          <p className="mt-3">
            Diese Website verwendet ausschließlich technisch notwendige Speicherung
            (z. B. das Merken, dass Sie den Cookie-Hinweis geschlossen haben).
            Es werden keine Tracking- oder Marketing-Cookies gesetzt.
          </p>
        </div>
        <div>
          <h2>Ihre Rechte</h2>
          <p className="mt-3">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
            Verarbeitung, Datenübertragbarkeit und Widerspruch. Beschwerden richten Sie an die
            österreichische Datenschutzbehörde (dsb.gv.at).
          </p>
        </div>
        <div>
          <h2>Noch zu ergänzen</h2>
          <p className="mt-3">
            Hosting-Anbieter, E-Mail-Versanddienst (Resend) als Auftragsverarbeiter, ggf.
            Kartendienst-Einbettung. Vor Livegang bitte rechtlich prüfen lassen.
          </p>
        </div>
      </div>
    </section>
  );
}
