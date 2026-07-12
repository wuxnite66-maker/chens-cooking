import Link from "next/link";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/** Closing call-to-action band, used on most pages above the footer. */
export function CtaBand() {
  const { cta } = site;
  return (
    <section aria-label={cta.title} className="relative overflow-hidden border-t border-line py-section">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-80"
        style={{ background: "radial-gradient(60% 80% at 50% 100%, rgba(198,161,91,0.12), transparent 70%)" }}
      />
      <Reveal className="mx-auto max-w-2xl px-5 text-center sm:px-8">
        <p className="font-script text-3xl text-gold-soft">{cta.script}</p>
        <h2 className="mt-3 font-serif text-display-sm font-semibold text-cream">{cta.title}</h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">{cta.sub}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/reservierung"
            className="rounded-full bg-gold px-8 py-4 font-semibold text-onAccent shadow-lg shadow-black/30 transition-all duration-300 hover:bg-gold-soft active:scale-[0.98]"
          >
            {cta.button}
          </Link>
          <a
            href={site.contact.phoneHref}
            className="rounded-full border border-line px-8 py-4 font-semibold text-cream transition-colors duration-300 hover:border-gold-soft hover:text-gold-soft"
          >
            {site.contact.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
