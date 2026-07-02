import { site } from "@/content/site";

/**
 * Typographic wordmark for "Chen's Cooking".
 * Editorial serif + spaced gold sub-label — no raster asset required,
 * scales crisply and themes via CSS variables.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="flex items-baseline gap-[0.15em] font-serif text-cream">
        {/* Lacquer-red seal accent dot — the single "Asian" flourish */}
        <span
          aria-hidden
          className="mr-[0.15em] inline-block h-[0.42em] w-[0.42em] -translate-y-[0.05em] rounded-full bg-lacquer"
        />
        <span className="text-[1.35rem] font-semibold tracking-tight sm:text-[1.5rem]">
          Chen&rsquo;s
        </span>
        <span className="text-[1.35rem] font-normal italic text-gold-soft sm:text-[1.5rem]">
          Cooking
        </span>
      </span>
      <span className="mt-[0.35em] pl-[0.6em] text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-muted">
        {site.tagline}
      </span>
    </span>
  );
}
