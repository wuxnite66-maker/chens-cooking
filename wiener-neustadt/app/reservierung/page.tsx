import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { ReservationForm } from "@/components/ReservationForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Reservierung",
  description:
    "Tisch reservieren bei Chen's Cooking Wiener Neustadt — online in unter einer Minute oder telefonisch.",
};

export default function ReservierungPage() {
  const { reservation, hours } = site;
  return (
    <>
      <PageHero
        script="Ihr Platz bei uns"
        title={reservation.title}
        sub={reservation.sub}
        image="/images/gallery-6.svg"
        imageAlt="Restaurant-Innenraum am Abend"
      />

      <section aria-label={reservation.eyebrow} className="py-section">
        <div className="mx-auto grid max-w-content gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_20rem]">
          <Reveal className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
            <ReservationForm />
          </Reveal>

          {/* Sidebar: Öffnungszeiten + Kontakt */}
          <Reveal className="space-y-8">
            <div className="rounded-2xl border border-line bg-ink/60 p-8">
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

            <div className="rounded-2xl border border-line bg-ink/60 p-8">
              <p className="kicker">Direkt erreichen</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Für Gruppen ab 12 Personen oder kurzfristige Reservierungen rufen Sie uns bitte direkt an.
              </p>
              <a
                href={site.contact.phoneHref}
                className="mt-5 block rounded-full border border-gold px-5 py-3 text-center font-semibold text-gold-soft transition-colors duration-300 hover:bg-gold hover:text-onAccent"
              >
                {site.contact.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
