import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { Stations } from "@/components/Stations";
import { Pricing } from "@/components/Pricing";
import { CtaBand } from "@/components/CtaBand";
import { Reveal, RevealItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Buffet & Preise",
  description:
    "Das All-you-can-eat-Buffet bei Chen's Cooking Wiener Neustadt: Sushi-Bar, Teppanyaki-Grill, Wok-Station, Salatbar und Dessert — ein Preis, grenzenloser Genuss.",
};

export default function BuffetPage() {
  return (
    <>
      <PageHero
        script="Alles, so oft Sie möchten"
        title="Das Buffet"
        sub="Drei Live-Stationen, über 100 Gerichte täglich — frisch zubereitet, nicht aufgewärmt."
        image="/images/station-teppanyaki.svg"
        imageAlt="Teppanyaki-Grill mit Flammen und frischem Gemüse"
      />

      <Stations />

      {/* Buffet-Umfang */}
      <section aria-label={site.buffet.eyebrow} className="border-t border-line py-section">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="kicker">{site.buffet.eyebrow}</p>
            <h2 className="mt-4 font-serif text-display-sm font-semibold text-cream">
              {site.buffet.title}
            </h2>
          </Reveal>
          <Reveal stagger className="mt-14 grid gap-6 sm:grid-cols-2">
            {site.buffet.points.map((point) => (
              <RevealItem key={point.title}>
                <div className="h-full rounded-2xl border border-line bg-surface p-8 transition-colors duration-300 hover:bg-surface-2">
                  <h3 className="font-serif text-2xl font-semibold text-cream">{point.title}</h3>
                  <div className="hairline my-4 w-12" />
                  <p className="text-sm leading-relaxed text-muted">{point.desc}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <Pricing />
      <CtaBand />
    </>
  );
}
