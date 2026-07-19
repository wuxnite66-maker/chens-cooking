import type { Content } from "@/content/site";
import { CurtainLink } from "./PageTransition";

/**
 * Slim, luxurious promo bar pinned above the navbar. Gold gradient with a
 * subtle sweeping sheen. The whole bar links to the reservation section.
 */
export function AnnouncementBar({ site }: { site: Content }) {
  const p = site.promo;
  return (
    <CurtainLink
      href={p.href}
      aria-label={`${p.label}: ${p.text} — ${p.price}`}
      className="group fixed inset-x-0 top-0 z-[60] flex h-[var(--promo-h)] items-center justify-center overflow-hidden bg-gradient-to-r from-gold-deep via-gold to-gold-deep text-onAccent"
    >
      {/* sweeping sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-[130%] animate-[sheen_4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/45 to-transparent"
      />
      <div className="relative flex items-center gap-2 px-4 text-[0.78rem] font-semibold sm:gap-2.5 sm:text-sm">
        <span aria-hidden className="animate-pulse text-sm leading-none">✦</span>
        <span className="font-serif text-[0.95rem] font-bold tracking-wide sm:text-base">
          {p.label}
        </span>
        <span className="hidden font-semibold sm:inline">· {p.when}</span>
        <span className="hidden md:inline">— {p.text}</span>
        <span className="rounded-full bg-onAccent/12 px-2.5 py-0.5 font-bold tabular-nums ring-1 ring-onAccent/25">
          {p.price}
        </span>
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </CurtainLink>
  );
}
