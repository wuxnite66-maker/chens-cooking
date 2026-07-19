import { site } from "@/content/site";
import { Reveal, RevealItem } from "./Reveal";

/** Buffet price cards (EUR) + kids tiers. Featured plan gets the gold frame. */
export function Pricing() {
  const { pricing } = site;

  return (
    <section aria-label={pricing.eyebrow} className="border-t border-line bg-surface py-section">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker">{pricing.eyebrow}</p>
          <h2 className="mt-4 font-serif text-display-sm font-semibold text-cream">
            {pricing.title}
          </h2>
          <p className="mt-4 text-sm text-muted">{pricing.note}</p>
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricing.plans.map((plan) => (
            <RevealItem key={plan.name} className="h-full">
              <article
                className={`relative flex h-full flex-col rounded-2xl border p-8 transition-transform duration-500 ease-out-soft hover:-translate-y-2 ${
                  plan.featured
                    ? "glow-pulse border-gold bg-surface-2 shadow-xl shadow-black/40"
                    : "border-line bg-ink/60 hover:border-gold/40"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[0.65rem] font-bold uppercase tracking-label text-onAccent">
                    Beliebt
                  </span>
                )}
                <h3 className="font-serif text-2xl font-semibold text-cream">{plan.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-label text-muted">{plan.when}</p>
                <p className="mt-6 flex items-baseline gap-1">
                  <span className="text-lg text-gold">{pricing.currency}</span>
                  <span className="tabular font-serif text-5xl font-semibold text-gold">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-sm text-muted">/ Person</span>
                </p>
                <div className="hairline my-6" />
                <ul className="space-y-3 text-sm text-muted">
                  {plan.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-3">
                      <span aria-hidden className="mt-0.5 text-gold">✦</span>
                      {inc}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}
        </Reveal>

        {/* Kids pricing */}
        <Reveal className="mx-auto mt-12 max-w-2xl rounded-2xl border border-line bg-ink/60 p-8 text-center">
          <h3 className="font-serif text-xl font-semibold text-cream">{pricing.kids.title}</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {pricing.kids.tiers.map((tier) => (
              <div key={tier.age}>
                <p className="text-xs uppercase tracking-label text-muted">{tier.age}</p>
                <p className="tabular mt-1 font-serif text-2xl text-gold">{tier.price}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
