import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Speisekarte",
  description:
    "Die À-la-carte-Speisekarte von Chen's Cooking Wiener Neustadt: Suppen, Vorspeisen, Wok-Gerichte, Ramen, Sushi und Desserts — frisch zubereitet.",
};

export default function SpeisekartePage() {
  const { menu } = site;
  return (
    <>
      <PageHero
        script="Frisch vom Blatt"
        title={menu.title}
        sub={menu.sub}
        image="/images/station-sushi.svg"
        imageAlt="Frische Sushi-Auswahl an der Theke"
      />

      <section aria-label={menu.eyebrow} className="py-section">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="rounded-full border border-gold/40 bg-surface px-5 py-2.5 text-sm text-gold-soft">
              {menu.note}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {menu.categories.map((cat) => (
              <Reveal key={cat.name} amount={0.1}>
                <section
                  aria-label={cat.name}
                  className="h-full rounded-2xl border border-line bg-surface p-8"
                >
                  <h2 className="text-center font-serif text-3xl font-semibold text-cream">
                    {cat.name}
                  </h2>
                  <div className="hairline mx-auto my-6 w-16" />
                  <ul className="space-y-5">
                    {cat.items.map((item) => (
                      <li key={`${cat.name}-${item.code}-${item.name}`}>
                        <div className="flex items-baseline gap-3">
                          <p className="font-medium text-cream">
                            {item.code && (
                              <span className="mr-2 text-xs font-semibold text-gold/70">{item.code}</span>
                            )}
                            {item.name}
                          </p>
                          <span
                            aria-hidden
                            className="mx-1 grow border-b border-dotted border-line"
                          />
                          <p className="tabular shrink-0 font-semibold text-gold">
                            € {item.price}
                          </p>
                        </div>
                        {item.desc && (
                          <p className="mt-0.5 text-sm text-muted">{item.desc}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center text-sm text-muted">
            <p>{menu.allergenNote}</p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
