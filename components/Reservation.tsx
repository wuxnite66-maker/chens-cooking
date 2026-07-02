import type { Content } from "@/content/site";
import { Reveal } from "./Reveal";
import { ReservationForm } from "./ReservationForm";

function PhoneIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 5.5c0 8.5 7.5 16 16 16l2.5-3.5-4-2-2 2c-3-1.2-6.3-4.5-7.5-7.5l2-2-2-4L4 4.5 2.5 5.5z" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7.5V12l3 2" />
    </svg>
  );
}
function InstaIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Reservation({ site }: { site: Content }) {
  const { reservation, contact, hours, social, ui } = site;
  const mapsSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    contact.mapsQuery,
  )}&z=15&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    contact.mapsQuery,
  )}`;

  return (
    <section id="kontakt" className="scroll-mt-24 bg-surface py-section">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker mb-4">{reservation.eyebrow}</p>
          <h2 className="font-serif text-display-sm font-semibold text-cream">
            {reservation.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{reservation.sub}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Form */}
          <Reveal>
            <ReservationForm site={site} />
          </Reveal>

          {/* Contact + Hours + Map */}
          <Reveal className="flex flex-col gap-6">
            <div className="grid gap-4 rounded-2xl border border-line bg-ink p-6 sm:p-7">
              <a
                href={contact.phoneHref}
                className="flex items-start gap-4 transition-colors hover:text-gold"
              >
                <PhoneIcon />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted">{ui.contactPhone}</span>
                  <span className="font-serif text-lg text-cream">{contact.phone}</span>
                </span>
              </a>

              <div className="flex items-start gap-4">
                <PinIcon />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted">{ui.contactAddress}</span>
                  <span className="text-cream">
                    {contact.address.street}, {contact.address.zip} {contact.address.city}
                  </span>
                  <a
                    href={directionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-sm font-medium text-gold underline-offset-2 hover:underline"
                  >
                    {ui.route}
                  </a>
                </span>
              </div>

              <div className="flex items-start gap-4">
                <ClockIcon />
                <div className="min-w-0 flex-1">
                  <span className="block text-xs uppercase tracking-wider text-muted">
                    {hours.label}
                  </span>
                  <ul className="mt-1.5 space-y-1">
                    {hours.days.map((d) => {
                      const closed = d.time === "Geschlossen" || d.time === "Zárva";
                      return (
                        <li key={d.day} className="flex items-baseline justify-between gap-4 text-sm">
                          <span className="text-cream">{d.day}</span>
                          <span
                            aria-hidden
                            className="mx-2 h-px flex-1 translate-y-[-2px] border-b border-dotted border-line"
                          />
                          <span className={closed ? "font-medium text-lacquer" : "tabular text-cream"}>
                            {d.time}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <a
                href={social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 transition-colors hover:text-gold"
              >
                <InstaIcon />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted">Instagram</span>
                  <span className="font-serif text-lg text-cream">{social.instagram.handle}</span>
                </span>
              </a>
            </div>

            {/* Lightweight lazy map embed */}
            <div className="relative overflow-hidden rounded-2xl border border-line" style={{ aspectRatio: "16 / 11" }}>
              <iframe
                title={`${site.name} — ${contact.address.city}`}
                src={mapsSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[0.3] contrast-[1.05]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
