import type { Content } from "@/content/site";
import { Reveal, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { CurtainLink } from "./PageTransition";

function Check() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 shrink-0 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pricing({ site }: { site: Content }) {
  const { pricing } = site;
  return (
    <section id="preise" className="scroll-mt-24 py-section">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} align="center" />

        <Reveal stagger staggerDelay={0.1} className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricing.plans.map((plan) => (
            <RevealItem key={plan.name}>
              <article
                className={`relative flex h-full flex-col rounded-2xl border p-7 transition-colors duration-300 sm:p-8 ${
                  plan.featured
                    ? "border-gold/50 bg-gradient-to-b from-surface to-surface-2 shadow-xl shadow-black/20"
                    : "border-line bg-surface"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wider text-onAccent">
                    {site.ui.popular}
                  </span>
                )}
                <h3 className="font-serif text-2xl font-semibold text-cream">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.when}</p>

                <p className="mt-6 flex items-baseline gap-1">
                  <span className="tabular font-serif text-5xl font-semibold text-cream">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-lg text-gold">Ft</span>
                  <span className="ml-1 text-sm text-muted">{site.ui.perPerson}</span>
                </p>

                <ul className="mt-7 flex-1 space-y-3 border-t border-line pt-6">
                  {plan.includes.map((inc) => (
                    <li key={inc} className="flex gap-3 text-[0.95rem] text-cream/90">
                      <Check />
                      {inc}
                    </li>
                  ))}
                </ul>

                <CurtainLink
                  href={`/${site.locale}/reservieren`}
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 font-semibold transition-all duration-300 active:scale-[0.98] ${
                    plan.featured
                      ? "bg-gold text-onAccent hover:bg-gold-soft"
                      : "border border-gold/40 text-gold hover:bg-gold hover:text-onAccent"
                  }`}
                >
                  {site.hero.primaryCta}
                </CurtainLink>
              </article>
            </RevealItem>
          ))}
        </Reveal>

        {/* Kids + note */}
        <Reveal className="mt-8 flex flex-col gap-6 rounded-2xl border border-line bg-surface p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="font-serif text-xl font-semibold text-cream">{pricing.kids.title}</h3>
            <p className="mt-1 text-sm text-muted">{pricing.note}</p>
          </div>
          <ul className="flex flex-wrap gap-3">
            {pricing.kids.tiers.map((t) => (
              <li
                key={t.age}
                className="rounded-xl border border-line bg-ink px-4 py-3 text-center"
              >
                <p className="text-xs text-muted">{t.age}</p>
                <p className="tabular mt-1 font-serif text-lg font-semibold text-gold">
                  {t.price}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
