"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { Reveal, RevealItem } from "./Reveal";

/**
 * Trio band under the hero. The hairline SVG icons draw themselves
 * (pathLength 0 → 1) when the row scrolls into view.
 */

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.3, ease: "easeInOut", delay: 0.25 + i * 0.12 },
      opacity: { duration: 0.25, delay: 0.25 + i * 0.12 },
    },
  }),
};

function DrawnIcon({ paths, reduce }: { paths: string[]; reduce: boolean }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 48 48"
      className="h-11 w-11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.7 }}
    >
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          custom={i}
          variants={reduce ? undefined : draw}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </motion.svg>
  );
}

const ICON_PATHS: Record<string, string[]> = {
  leaf: [
    "M12 36c0-13 10-23 24-24 1 14-9 25-24 24Z",
    "M14 34c6-8 12-13 20-16",
  ],
  chef: [
    "M15 26a7 7 0 0 1-2-13.7A8 8 0 0 1 28.8 9 7 7 0 1 1 33 26",
    "M16 26h16v9a3 3 0 0 1-3 3H19a3 3 0 0 1-3-3v-9Z",
    "M20 30v4M24 30v4M28 30v4",
  ],
  flame: [
    "M24 6c2 6 9 8 9 17a9 9 0 1 1-18 0c0-4 2-6 3.5-8 .8 2 2 3 3.5 3.5C24 33 20 26 24 6Z",
  ],
};

export function Features() {
  const { features } = site;
  const reduce = useReducedMotion() ?? false;
  return (
    <section aria-label={features.eyebrow} className="border-b border-line py-16 sm:py-20">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal stagger className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {features.items.map((item) => (
            <RevealItem key={item.title}>
              <div className="group flex h-full flex-col items-center bg-ink px-8 py-10 text-center transition-colors duration-300 hover:bg-surface">
                <span className="mb-5 text-gold transition-transform duration-500 ease-out-soft group-hover:-translate-y-1 group-hover:scale-110">
                  <DrawnIcon paths={ICON_PATHS[item.icon] ?? ICON_PATHS.leaf} reduce={reduce} />
                </span>
                <h3 className="font-serif text-xl font-semibold tracking-wide text-cream">
                  {item.title}
                </h3>
                <div className="hairline my-4 w-10 transition-all duration-500 group-hover:w-16" />
                <p className="max-w-xs text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
