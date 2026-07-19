import { site } from "@/content/site";
import { Counter } from "./Counter";
import { Reveal } from "./Reveal";
import { SmartImage } from "./SmartImage";

/** Concept intro on the home page: editorial split with image + stats row. */
export function Intro() {
  const { intro } = site;
  return (
    <section aria-label={intro.eyebrow} className="py-section">
      <div className="mx-auto grid max-w-content items-center gap-12 px-5 sm:px-8 md:grid-cols-2 md:gap-16">
        <Reveal className="group">
          <SmartImage
            src={intro.image}
            alt={intro.imageAlt}
            width={960}
            height={1100}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.05]"
            wrapperClassName="aspect-[6/7]"
          />
        </Reveal>

        <Reveal>
          <p className="kicker">{intro.eyebrow}</p>
          <h2 className="mt-4 font-serif text-display-sm font-semibold text-cream">
            {intro.title}
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            {intro.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {intro.stats.map((stat) => (
              <div key={stat.label}>
                <p className="tabular font-serif text-3xl font-semibold text-gold sm:text-4xl">
                  <Counter value={stat.value} />
                </p>
                <p className="mt-1 text-xs uppercase tracking-label text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
