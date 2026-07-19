import Link from "next/link";
import { site } from "@/content/site";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Intro } from "@/components/Intro";
import { Marquee } from "@/components/Marquee";
import { Reveal, RevealItem } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { TiltCard } from "@/components/TiltCard";
import { CtaBand } from "@/components/CtaBand";

/** Startseite: Hero → Features → Konzept → Stationen-Teaser → Galerie-Strip → CTA */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Marquee />
      <Intro />

      {/* Stationen-Teaser → /buffet */}
      <section aria-label={site.stations.eyebrow} className="border-t border-line bg-surface py-section">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="kicker">{site.stations.eyebrow}</p>
            <h2 className="mt-4 font-serif text-display-sm font-semibold text-cream">
              {site.stations.title}
            </h2>
          </Reveal>

          <Reveal stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {site.stations.items.map((station) => (
              <RevealItem key={station.name}>
                <TiltCard className="h-full">
                  <Link
                    href="/buffet"
                    className="group block h-full overflow-hidden rounded-2xl border border-line bg-ink/60 transition-[border-color,box-shadow] duration-500 hover:border-gold/40 hover:shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
                  >
                    <SmartImage
                      src={station.image}
                      alt={station.alt}
                      width={640}
                      height={480}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      rounded="rounded-none"
                      className="w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.06]"
                      wrapperClassName="aspect-[4/3]"
                    />
                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-semibold text-cream">{station.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{station.desc}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-soft">
                        Mehr erfahren
                        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Galerie-Strip → /galerie */}
      <section aria-label={site.gallery.eyebrow} className="py-section">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="kicker">{site.gallery.eyebrow}</p>
              <h2 className="mt-4 font-serif text-display-sm font-semibold text-cream">
                {site.gallery.title}
              </h2>
            </div>
            <Link
              href="/galerie"
              className="group inline-flex items-center gap-2 font-semibold text-gold-soft transition-colors hover:text-gold"
            >
              Alle Bilder ansehen
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>

          <Reveal stagger className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {site.gallery.images.slice(0, 4).map((img) => (
              <RevealItem key={img.src}>
                <Link href="/galerie" aria-label={`Galerie öffnen — ${img.alt}`} className="group block">
                  <SmartImage
                    src={img.src}
                    alt={img.alt}
                    width={480}
                    height={480}
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
                    wrapperClassName="aspect-square"
                  />
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
