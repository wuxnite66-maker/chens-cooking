import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Kontakt & Anfahrt",
  description:
    "So erreichen Sie Chen's Cooking in Wiener Neustadt: Adresse, Telefon, E-Mail und Öffnungszeiten.",
};

export default function KontaktPage() {
  const { contact, hours } = site;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapsQuery)}`;

  return (
    <>
      <PageHero
        script="Wir sind für Sie da"
        title="Kontakt & Anfahrt"
        sub="Mitten in Wiener Neustadt — gut erreichbar, mit Parkmöglichkeiten in der Nähe."
        image="/images/gallery-5.svg"
        imageAlt="Frische Zutaten an der Salatbar"
      />

      <section aria-label="Kontaktinformationen" className="py-section">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal stagger className="grid gap-6 md:grid-cols-3">
            <RevealItem>
              <div className="h-full rounded-2xl border border-line bg-surface p-8">
                <p className="kicker">Adresse</p>
                <address className="mt-5 not-italic leading-relaxed text-cream">
                  {site.name} {site.city}
                  <br />
                  {contact.address.street}
                  <br />
                  {contact.address.zip} {contact.address.city}
                  <br />
                  {contact.address.country}
                </address>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-soft transition-colors hover:text-gold"
                >
                  Route in Google Maps
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </RevealItem>

            <RevealItem>
              <div className="h-full rounded-2xl border border-line bg-surface p-8">
                <p className="kicker">Erreichbarkeit</p>
                <ul className="mt-5 space-y-4 text-sm">
                  <li>
                    <p className="text-muted">Telefon</p>
                    <a href={contact.phoneHref} className="text-lg font-semibold text-gold-soft hover:text-gold">
                      {contact.phone}
                    </a>
                  </li>
                  <li>
                    <p className="text-muted">E-Mail</p>
                    <a href={`mailto:${contact.email}`} className="font-semibold text-gold-soft hover:text-gold">
                      {contact.email}
                    </a>
                  </li>
                </ul>
                <Link
                  href="/reservierung"
                  className="mt-6 inline-block rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-onAccent transition-colors hover:bg-gold-soft"
                >
                  {site.reserveCta}
                </Link>
              </div>
            </RevealItem>

            <RevealItem>
              <div className="h-full rounded-2xl border border-line bg-surface p-8">
                <p className="kicker">{hours.label}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {hours.days.map((d) => (
                    <li key={d.day} className="flex justify-between gap-4 border-b border-line pb-2">
                      <span className="text-muted">{d.day}</span>
                      <span className="tabular text-cream">{d.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted">{hours.note}</p>
              </div>
            </RevealItem>
          </Reveal>

          {/* Map placeholder — echte Einbettung (Google Maps / OSM) folgt mit der finalen Adresse */}
          <Reveal className="mt-10">
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Karte öffnen — Route in Google Maps planen"
              className="group flex aspect-[21/9] items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface-2"
            >
              <span className="text-center">
                <span aria-hidden className="block font-script text-4xl text-gold-soft">Karte</span>
                <span className="mt-2 block text-sm text-muted transition-colors group-hover:text-cream">
                  Interaktive Karte folgt mit der finalen Adresse — hier klicken für Google Maps ↗
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
