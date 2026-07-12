import type { Content } from "@/content/site";
import { Reveal, RevealItem } from "./Reveal";

/**
 * "Why Choose Us" feature row — three pillars with hairline SVG icons,
 * echoing the trio band from premium restaurant references. Sits directly
 * under the hero as the first proof block. Icons are inline strokes so they
 * scale crisply and inherit the gold accent; no raster, no emoji.
 */

function LeafIcon() {
  return (
    <svg aria-hidden viewBox="0 0 48 48" className="h-11 w-11" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 36c0-13 10-23 24-24 1 14-9 25-24 24Z" />
      <path strokeLinecap="round" d="M14 34c6-8 12-13 20-16" />
    </svg>
  );
}

function ChefIcon() {
  return (
    <svg aria-hidden viewBox="0 0 48 48" className="h-11 w-11" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 26a7 7 0 0 1-2-13.7A8 8 0 0 1 28.8 9 7 7 0 1 1 33 26" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 26h16v9a3 3 0 0 1-3 3H19a3 3 0 0 1-3-3v-9Z" />
      <path strokeLinecap="round" d="M20 30v4M24 30v4M28 30v4" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg aria-hidden viewBox="0 0 48 48" className="h-11 w-11" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M24 6c2 6 9 8 9 17a9 9 0 1 1-18 0c0-4 2-6 3.5-8 .8 2 2 3 3.5 3.5C24 33 20 26 24 6Z" />
    </svg>
  );
}

const ICONS: Record<string, () => JSX.Element> = {
  leaf: LeafIcon,
  chef: ChefIcon,
  flame: FlameIcon,
};

export function Features({ site }: { site: Content }) {
  const { features } = site;
  return (
    <section aria-label={features.eyebrow} className="border-b border-line py-16 sm:py-20">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal stagger className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {features.items.map((item) => {
            const Icon = ICONS[item.icon] ?? LeafIcon;
            return (
              <RevealItem key={item.title}>
                <div className="group flex h-full flex-col items-center bg-ink px-8 py-10 text-center transition-colors duration-300 hover:bg-surface">
                  <span className="mb-5 text-gold transition-transform duration-500 ease-out-soft group-hover:-translate-y-1">
                    <Icon />
                  </span>
                  <h3 className="font-serif text-xl font-semibold tracking-wide text-cream">
                    {item.title}
                  </h3>
                  <div className="hairline my-4 w-10" />
                  <p className="max-w-xs text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
