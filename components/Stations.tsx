import type { Content } from "@/content/site";
import { Reveal, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SmartImage } from "./SmartImage";

/** The three live-cooking stations — the brand's core identity. */
export function Stations({ site }: { site: Content }) {
  const { stations } = site;
  return (
    <section id="stationen" className="scroll-mt-24 bg-surface py-section">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading eyebrow={stations.eyebrow} title={stations.title} align="center" />

        <Reveal stagger staggerDelay={0.1} className="mt-14 grid gap-6 md:grid-cols-3">
          {stations.items.map((s, i) => (
            <RevealItem key={s.name}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface-2">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <SmartImage
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                    rounded="rounded-none"
                    wrapperClassName="!rounded-none h-full"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-surface-2 via-surface-2/30 to-transparent"
                  />
                  <span className="absolute left-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-ink/40 font-serif text-sm text-gold backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative -mt-16 p-6">
                  <h3 className="font-serif text-2xl font-semibold text-cream">{s.name}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{s.desc}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
