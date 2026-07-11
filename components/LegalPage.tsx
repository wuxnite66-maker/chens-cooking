import Link from "next/link";
import type { Content } from "@/content/site";
import type { LegalContent, LegalDoc } from "@/content/legal";
import { Logo } from "./Logo";
import { Footer } from "./Footer";

function ArrowLeft() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export function LegalPage({
  site,
  legal,
  doc,
}: {
  site: Content;
  legal: LegalContent;
  doc: LegalDoc;
}) {
  const home = `/${site.locale}`;

  return (
    <>
      {/* Simple header — logo links back to the homepage */}
      <header className="border-b border-line bg-ink">
        <div className="mx-auto flex max-w-content items-center justify-between px-5 py-5 sm:px-8">
          <Link href={home} aria-label={legal.homeLabel} className="transition-opacity hover:opacity-80">
            <Logo />
          </Link>
          <Link
            href={home}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-gold"
          >
            <ArrowLeft />
            {legal.backLabel}
          </Link>
        </div>
      </header>

      <main id="main" className="bg-surface">
        <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="kicker mb-3">{doc.updated}</p>
          <h1 className="font-serif text-display-sm font-semibold text-cream">{doc.title}</h1>
          {doc.intro && <p className="mt-4 text-lg leading-relaxed text-muted">{doc.intro}</p>}

          {/* Impressum — key/value rows */}
          {doc.rows && (
            <dl className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-ink">
              {doc.rows.map((row) => (
                <div key={row.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6 sm:py-5">
                  <dt className="text-sm font-medium text-muted">{row.label}</dt>
                  <dd className={row.isPlaceholder ? "font-medium text-gold/80" : "text-cream"}>{row.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {/* Datenschutz — sections */}
          {doc.sections && (
            <div className="mt-10 space-y-8">
              {doc.sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="font-serif text-xl font-semibold text-cream">{s.heading}</h2>
                  {s.body && <p className="mt-3 leading-relaxed text-muted">{s.body}</p>}
                  {s.items && (
                    <ul className="mt-3 space-y-2">
                      {s.items.map((it, i) => (
                        <li key={i} className="flex gap-3 leading-relaxed text-muted">
                          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          )}

          {doc.disclaimer && (
            <p className="mt-12 rounded-2xl border border-line bg-ink p-5 text-sm leading-relaxed text-muted/80">
              {doc.disclaimer}
            </p>
          )}
        </article>
      </main>

      <Footer site={site} />
    </>
  );
}
