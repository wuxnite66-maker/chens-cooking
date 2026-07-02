import type { Content } from "@/content/site";
import { Reveal, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience({ site }: { site: Content }) {
  const { experience } = site;
  return (
    <section id="erlebnis" className="scroll-mt-24 py-section">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading eyebrow={experience.eyebrow} title={experience.title} />

        <Reveal stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {experience.points.map((p) => (
            <RevealItem key={p.title}>
              <div className="group h-full bg-ink p-8 transition-colors duration-300 hover:bg-surface sm:p-10">
                <h3 className="font-serif text-2xl font-semibold text-cream">
                  {p.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{p.desc}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
