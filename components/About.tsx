import type { Content } from "@/content/site";
import { Reveal, RevealItem } from "./Reveal";
import { SmartImage } from "./SmartImage";

export function About({ site }: { site: Content }) {
  const { about } = site;
  return (
    <section id="idee" className="scroll-mt-24 py-section">
      <div className="mx-auto grid max-w-content items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <Reveal className="order-1 lg:order-none">
          <SmartImage
            src={about.image}
            alt={about.imageAlt}
            width={720}
            height={860}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-full w-full object-cover"
            wrapperClassName="aspect-[5/6]"
          />
        </Reveal>

        {/* Copy */}
        <div>
          <p className="kicker mb-4">{about.eyebrow}</p>
          <Reveal>
            <h2 className="max-w-md font-serif text-display-sm font-semibold text-cream">
              {about.title}
            </h2>
          </Reveal>

          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
            {about.body.map((p, i) => (
              <Reveal key={i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal stagger className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
            {about.stats.map((s) => (
              <RevealItem key={s.label}>
                <p className="font-serif text-3xl font-semibold text-gold sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
