import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";

/**
 * Splash / language gate — elegant black-gold marble.
 * The marble backdrop comes from the global body::before layer (4K asset),
 * so this page only adds a subtle vignette for focus.
 */
export default function SplashPage() {
  const { contact, hours } = site;

  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden text-cream">
      {/* soft vignette so the center content sits calmly on the marble */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 42%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Real Chen's Cooking logo — top right */}
      <div className="absolute right-6 top-7 z-20 w-40 sm:right-12 sm:top-10 sm:w-56">
        <Image
          src="/images/chens-logo.png"
          alt="Chen's Cooking — Wok & Grill Restaurant"
          width={695}
          height={313}
          priority
          className="h-auto w-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-content flex-1 flex-col px-6 sm:px-10">
        {/* Wordmark */}
        <div className="pt-28 sm:pt-40">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-gold">
            Herzlich willkommen · Üdvözöljük
          </p>
          <h1 className="font-serif text-5xl font-semibold tracking-tight text-cream sm:text-7xl">
            CHEN&rsquo;S COOKING
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.38em] text-muted sm:text-base">
            Wok &amp; Grill Restaurant
          </p>
          <div className="mt-6 h-px w-72 bg-gradient-to-r from-gold via-gold/60 to-transparent sm:w-[28rem]" />
        </div>

        {/* Country / language choice */}
        <div className="mt-16 pb-28 sm:mt-auto sm:self-end sm:pb-44 sm:text-right">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">
            Bitte wählen · Kérjük válasszon
          </p>
          <div className="flex flex-col gap-4 sm:items-end">
            <Link
              href="/at"
              className="group inline-flex items-center gap-4 rounded-full border border-gold/35 bg-ink/60 px-8 py-4 font-serif text-3xl text-cream shadow-lg shadow-black/40 backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:text-onAccent sm:text-4xl"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold transition-colors group-hover:text-onAccent">
                DE
              </span>
              Austria
            </Link>
            <Link
              href="/hu"
              className="group inline-flex items-center gap-4 rounded-full border border-gold/35 bg-ink/60 px-8 py-4 font-serif text-3xl text-cream shadow-lg shadow-black/40 backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:text-onAccent sm:text-4xl"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold transition-colors group-hover:text-onAccent">
                HU
              </span>
              Hungary
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom info bar */}
      <footer className="absolute inset-x-0 bottom-0 z-10 border-t border-line bg-ink/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-content flex-col gap-2 px-6 py-3.5 text-sm text-muted sm:flex-row sm:items-center sm:gap-8 sm:px-10">
          <span className="flex items-center gap-2.5">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
            {hours.label} · {hours.range}
          </span>
          <a
            href={contact.phoneHref}
            className="flex items-center gap-2.5 transition-colors hover:text-cream"
          >
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
            {contact.phone}
          </a>
          <span className="flex items-center gap-2.5 sm:ml-auto">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
            {contact.address.street}, {contact.address.zip} {contact.address.city}
          </span>
        </div>
      </footer>
    </main>
  );
}
