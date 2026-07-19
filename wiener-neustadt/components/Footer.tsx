import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-content gap-12 px-5 py-16 sm:px-8 md:grid-cols-3">
        {/* Brand */}
        <div>
          <p className="font-serif text-2xl font-semibold text-cream">
            Chen&apos;s <span className="text-gold">Cooking</span>
          </p>
          <p className="mt-1 text-[0.65rem] uppercase tracking-label text-muted">{site.city}</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{site.footer.blurb}</p>
        </div>

        {/* Hours */}
        <div>
          <p className="kicker">{site.hours.label}</p>
          <ul className="mt-5 space-y-2 text-sm">
            {site.hours.days.map((d) => (
              <li key={d.day} className="flex justify-between gap-6 border-b border-line pb-2">
                <span className="text-muted">{d.day}</span>
                <span className="tabular text-cream">{d.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">{site.hours.note}</p>
        </div>

        {/* Contact */}
        <div>
          <p className="kicker">Kontakt</p>
          <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed">
            <p className="text-cream">
              {site.contact.address.street}
              <br />
              {site.contact.address.zip} {site.contact.address.city}
            </p>
            <p>
              <a href={site.contact.phoneHref} className="text-gold-soft transition-colors hover:text-gold">
                {site.contact.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.contact.email}`} className="text-gold-soft transition-colors hover:text-gold">
                {site.contact.email}
              </a>
            </p>
          </address>
          <Link
            href="/reservierung"
            className="mt-6 inline-block rounded-full border border-gold px-5 py-2.5 text-sm font-semibold text-gold-soft transition-colors duration-300 hover:bg-gold hover:text-onAccent"
          >
            {site.reserveCta}
          </Link>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted sm:flex-row sm:px-8">
          <p>{site.footer.note.replace("{year}", String(year))}</p>
          <nav aria-label="Rechtliches" className="flex gap-6">
            {site.footer.legal.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-cream">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
