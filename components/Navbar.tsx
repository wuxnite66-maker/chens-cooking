"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Content } from "@/content/site";
import { Logo } from "./Logo";

export function Navbar({ site }: { site: Content }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const isHu = site.locale === "hu";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while the mobile sheet is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-[var(--promo-h)] z-50 border-b backdrop-blur-md transition-colors duration-500 ${
        scrolled || open
          ? "border-line bg-ink/90 shadow-sm shadow-black/5"
          : "border-transparent bg-ink/70"
      }`}
      style={{ height: "var(--header-h)" }}
    >
      <nav
        className="mx-auto flex h-full max-w-content items-center justify-between gap-6 px-5 sm:px-8"
        aria-label={site.ui.mainNav}
      >
        <a href="#main" aria-label={`${site.name} — Startseite`} className="shrink-0">
          <Logo className="h-9 w-auto sm:h-10" />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative text-sm font-medium text-muted transition-colors hover:text-cream"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 ease-out-soft group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Language switch */}
          <div className="flex items-center gap-1.5 text-xs font-semibold" aria-label={site.ui.langLabel}>
            <a
              href="/at"
              aria-current={!isHu ? "page" : undefined}
              className={`transition-colors ${!isHu ? "text-gold" : "text-muted hover:text-cream"}`}
            >
              DE
            </a>
            <span className="text-line">/</span>
            <a
              href="/hu"
              aria-current={isHu ? "page" : undefined}
              className={`transition-colors ${isHu ? "text-gold" : "text-muted hover:text-cream"}`}
            >
              HU
            </a>
          </div>

          <a
            href="#kontakt"
            className="hidden rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-onAccent lg:inline-block"
          >
            {site.hero.primaryCta}
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? site.ui.menuClose : site.ui.menuOpen}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line text-cream lg:hidden"
          >
            <span className="sr-only">{site.ui.menu}</span>
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-cream transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-cream transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-cream transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full border-b border-line bg-ink/95 backdrop-blur-lg lg:hidden"
          >
            <ul className="mx-auto flex max-w-content flex-col gap-1 px-5 py-6 sm:px-8">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 font-serif text-2xl text-cream transition-colors hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-3">
                <a
                  href="#kontakt"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-gold px-5 py-3.5 text-center font-semibold text-onAccent"
                >
                  {site.hero.primaryCta}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
