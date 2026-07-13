"use client";

import { useEffect, useState } from "react";
import type { Content } from "@/content/site";
import { Logo } from "./Logo";
import { useCurtainNav } from "./PageTransition";

/**
 * Fixed navbar. Mobile (<md): two rows — logo + language switch on top,
 * all categories wrapping underneath (everything visible, no swiping).
 * md+: single row with the categories centered in the middle.
 * Heights come from --header-h (responsive, see globals.css).
 */
export function Navbar({ site }: { site: Content }) {
  const [scrolled, setScrolled] = useState(false);
  const isHu = site.locale === "hu";
  const leave = useCurtainNav();
  const home = `/${site.locale}`;
  const reserveHref = `${home}/reservieren`;
  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    leave(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-[var(--promo-h)] z-50 border-b backdrop-blur-md transition-colors duration-500 ${
        scrolled
          ? "border-line bg-[rgba(12,13,10,0.92)] shadow-sm shadow-black/5"
          : "border-transparent bg-[rgba(12,13,10,0.72)]"
      }`}
      style={{ height: "var(--header-h)" }}
    >
      <nav
        className="mx-auto flex h-full max-w-content flex-col justify-center gap-1.5 px-4 md:flex-row md:items-center md:gap-4 md:px-6"
        aria-label={site.ui.mainNav}
      >
        {/* Row 1 on mobile; dissolves into the single md row */}
        <div className="flex items-center justify-between md:contents">
          <a
            href={home}
            onClick={go(home)}
            aria-label={`${site.name} — Startseite`}
            className="shrink-0 md:order-1"
          >
            <Logo className="h-7 w-auto md:h-9" />
          </a>

          <div className="flex shrink-0 items-center gap-3 md:order-3">
            {/* Language switch */}
            <div className="flex items-center gap-1.5 text-xs font-semibold" aria-label={site.ui.langLabel}>
              <a
                href="/at"
                onClick={go("/at")}
                aria-current={!isHu ? "page" : undefined}
                className={`transition-colors ${!isHu ? "text-gold" : "text-muted hover:text-cream"}`}
              >
                DE
              </a>
              <span className="text-line">/</span>
              <a
                href="/hu"
                onClick={go("/hu")}
                aria-current={isHu ? "page" : undefined}
                className={`transition-colors ${isHu ? "text-gold" : "text-muted hover:text-cream"}`}
              >
                HU
              </a>
            </div>

            <a
              href={reserveHref}
              onClick={go(reserveHref)}
              className="hidden rounded-full border border-gold/40 px-5 py-2 text-sm font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-onAccent xl:inline-block"
            >
              {site.hero.primaryCta}
            </a>
          </div>
        </div>

        {/* Categories — wrap on mobile (all visible), centered strip on md+ */}
        <ul className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 md:order-2 md:min-w-0 md:flex-1 md:flex-nowrap md:gap-5 lg:gap-6">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={go(item.href)}
                className="group relative whitespace-nowrap text-[12px] font-medium text-muted transition-colors hover:text-cream md:text-[13px]"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 ease-out-soft group-hover:w-full md:-bottom-1.5" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
