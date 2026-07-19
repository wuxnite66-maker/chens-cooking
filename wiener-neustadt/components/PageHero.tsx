import Image from "next/image";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

/**
 * Compact hero for subpages: Ken-Burns background zoom, script accent
 * and a word-by-word serif title reveal.
 */
export function PageHero({
  script,
  title,
  sub,
  image,
  imageAlt = "",
}: {
  script: string;
  title: string;
  sub?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative flex min-h-[52svh] items-end overflow-hidden pb-14 pt-40">
      {image && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            quality={75}
            className="kenburns object-cover"
          />
        </div>
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/55 to-ink" />
      <div
        aria-hidden
        className="absolute -z-10 bottom-0 left-1/2 h-[40vh] w-[80vw] -translate-x-1/2 opacity-60"
        style={{ background: "radial-gradient(60% 60% at 50% 100%, rgba(198,161,91,0.16), transparent 70%)" }}
      />

      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="font-script text-2xl text-gold-soft sm:text-3xl">
            <span className="float-slow inline-block">{script}</span>
          </p>
        </Reveal>
        <h1 className="mt-2 font-serif text-display-sm font-semibold uppercase text-white">
          <SplitText text={title} mode="words" trigger="mount" delay={0.25} stagger={0.09} />
        </h1>
        {sub && (
          <Reveal>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {sub}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
