import type { Content } from "@/content/site";
import { Reveal } from "./Reveal";
import { OpeningHours } from "./OpeningHours";
import { CurtainLink } from "./PageTransition";

function PhoneIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 5.5c0 8.5 7.5 16 16 16l2.5-3.5-4-2-2 2c-3-1.2-6.3-4.5-7.5-7.5l2-2-2-4L4 4.5 2.5 5.5z" />
    </svg>
  );
}

/** Standalone opening-hours page section with the live open/closed status. */
export function HoursSection({ site }: { site: Content }) {
  const { hoursPage, hours, contact, hero, ui } = site;

  return (
    <section id="oeffnungszeiten" className="scroll-mt-24 py-section">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker mb-4">{hoursPage.eyebrow}</p>
          <h2 className="font-serif text-display-sm font-semibold text-cream">{hoursPage.title}</h2>
          <p className="mt-4 text-lg text-muted">{hoursPage.sub}</p>
        </Reveal>

        <Reveal className="mx-auto mt-14 max-w-xl">
          <div className="rounded-2xl border border-line bg-ink p-6 sm:p-8">
            <OpeningHours site={site} />
            <p className="mt-6 border-t border-line pt-4 text-sm text-muted">
              {hours.note} · {contact.address.street}, {contact.address.zip} {contact.address.city}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CurtainLink
              href={`/${site.locale}/reservieren`}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-semibold text-onAccent transition-all duration-300 hover:bg-gold-soft active:scale-[0.98]"
            >
              {hero.primaryCta}
            </CurtainLink>
            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 px-7 py-3.5 font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-onAccent"
            >
              <PhoneIcon />
              <span>{ui.callAria}</span>
              <span className="tabular-nums">{contact.phone}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
