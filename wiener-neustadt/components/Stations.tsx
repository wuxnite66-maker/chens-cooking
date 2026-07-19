import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { SmartImage } from "./SmartImage";

/**
 * The three live stations as alternating editorial rows —
 * large image, roman numeral, serif title, hairline, copy.
 */
export function Stations() {
  const { stations } = site;
  const numerals = ["I", "II", "III"];

  return (
    <section aria-label={stations.eyebrow} className="py-section">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker">{stations.eyebrow}</p>
          <h2 className="mt-4 font-serif text-display-sm font-semibold text-cream">
            {stations.title}
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
          {stations.items.map((station, i) => (
            <Reveal
              key={station.name}
              className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="group overflow-hidden rounded-2xl">
                <SmartImage
                  src={station.image}
                  alt={station.alt}
                  width={960}
                  height={720}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.06]"
                  wrapperClassName="aspect-[4/3]"
                />
              </div>
              <div>
                <span aria-hidden className="font-serif text-5xl text-gold/40">
                  {numerals[i] ?? ""}
                </span>
                <h3 className="mt-3 font-serif text-3xl font-semibold text-cream sm:text-4xl">
                  {station.name}
                </h3>
                <div className="hairline my-6 w-16" />
                <p className="max-w-xl leading-relaxed text-muted">{station.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
