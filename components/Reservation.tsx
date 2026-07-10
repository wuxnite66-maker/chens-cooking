import type { Content } from "@/content/site";
import { Reveal } from "./Reveal";
import { ReservationForm } from "./ReservationForm";
import { OpeningHours } from "./OpeningHours";

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
function WhatsAppIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.06 1.6 5.83L2 22l4.4-1.15a9.9 9.9 0 0 0 5.64 1.72h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.16c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.01-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.61-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

export function Reservation({ site }: { site: Content }) {
  const { reservation, contact, social, ui } = site;
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

              <OpeningHours site={site} />

              <a
                href={social.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 transition-colors hover:text-gold"
              >
                <WhatsAppIcon />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted">WhatsApp</span>
                  <span className="font-serif text-lg text-cream">{social.whatsapp.label}</span>
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
