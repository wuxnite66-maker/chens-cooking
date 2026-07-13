import Link from "next/link";
import type { Content } from "@/content/site";
import { Logo } from "./Logo";
import { CurtainLink } from "./PageTransition";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.06 1.6 5.83L2 22l4.4-1.15a9.9 9.9 0 0 0 5.64 1.72h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.16c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.01-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.61-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

export function Footer({ site }: { site: Content }) {
  const { contact, hours, nav, legal, social, ui } = site;
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {ui.footerBlurb}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              {ui.footerVisit}
            </h3>
            <address className="mt-4 not-italic text-muted">
              {contact.address.street}
              <br />
              {contact.address.zip} {contact.address.city}
              <br />
              {contact.address.country}
            </address>
            <a
              href={contact.phoneHref}
              className="mt-3 inline-block text-cream transition-colors hover:text-gold"
            >
              {contact.phone}
            </a>
            <p className="mt-3 text-sm text-muted">
              {hours.label} · {hours.range}
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href={social.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-gold"
                aria-label={`Chen's Cooking – ${social.whatsapp.label}`}
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span className="text-sm">{social.whatsapp.label}</span>
              </a>
            </div>
          </div>

          <nav aria-label={ui.footerDiscover}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              {ui.footerDiscover}
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <CurtainLink
                    href={item.href}
                    className="text-muted transition-colors hover:text-cream"
                  >
                    {item.label}
                  </CurtainLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row">
          <p>{legal.copyright}</p>
          <nav className="flex items-center gap-5" aria-label="Rechtliches">
            <Link href={`/${site.locale}/impressum`} className="transition-colors hover:text-gold">
              {legal.impressum}
            </Link>
            <Link href={`/${site.locale}/datenschutz`} className="transition-colors hover:text-gold">
              {legal.privacy}
            </Link>
          </nav>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
