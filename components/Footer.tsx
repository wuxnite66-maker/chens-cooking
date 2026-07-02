import type { Content } from "@/content/site";
import { Logo } from "./Logo";

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
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
            <a
              href={social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2 text-muted transition-colors hover:text-gold"
              aria-label={`Chen's Cooking auf Instagram (${social.instagram.handle})`}
            >
              <InstagramIcon className="h-5 w-5" />
              <span className="text-sm">{social.instagram.handle}</span>
            </a>
          </div>

          <nav aria-label={ui.footerDiscover}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              {ui.footerDiscover}
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-muted transition-colors hover:text-cream"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row">
          <p>{legal.copyright}</p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
