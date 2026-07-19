import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Reveal, RevealItem } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Die Geschichte hinter Chen's Cooking Wiener Neustadt: offene Küchen, frische Zutaten und Gastfreundschaft, die man schmeckt.",
};

export default function UeberUnsPage() {
  const { about } = site;
  return (
    <>
      <PageHero
        script="Wer wir sind"
        title={about.title}
        image="/images/about-sushi-counter.svg"
        imageAlt="Sushi-Theke bei Chen's Cooking"
      />

      <section aria-label={about.eyebrow} className="py-section">
        <div className="mx-auto grid max-w-content items-center gap-12 px-5 sm:px-8 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="kicker">{about.eyebrow}</p>
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              {about.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <blockquote className="mt-10 border-l-2 border-gold pl-6">
              <p className="font-serif text-2xl italic leading-snug text-cream">
                „{about.quote}“
              </p>
              <cite className="mt-3 block text-sm not-italic text-gold-soft">— {about.quoteBy}</cite>
            </blockquote>
          </Reveal>

          <Reveal>
            <SmartImage
              src="/images/gallery-6.svg"
              alt="Frische Zubereitung an der offenen Küche"
              width={960}
              height={1100}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-full w-full object-cover"
              wrapperClassName="aspect-[6/7]"
            />
          </Reveal>
        </div>
      </section>

      {/* Werte */}
      <section aria-label="Unsere Werte" className="border-t border-line bg-surface py-section">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal stagger className="grid gap-6 md:grid-cols-3">
            {about.values.map((value, i) => (
              <RevealItem key={value.title}>
                <div className="h-full rounded-2xl border border-line bg-ink/60 p-8 text-center">
                  <span aria-hidden className="font-serif text-4xl text-gold/40">
                    {["I", "II", "III"][i]}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl font-semibold text-cream">{value.title}</h3>
                  <div className="hairline mx-auto my-4 w-10" />
                  <p className="text-sm leading-relaxed text-muted">{value.desc}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
