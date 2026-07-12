"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

/**
 * Sticky multi-page navigation. Transparent over the hero, gains a solid
 * blurred backdrop after scrolling. Current route is marked with a gold
 * underline + aria-current.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-line bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
      style={{ height: "var(--header-h)" }}
    >
      <div className="mx-auto flex h-full max-w-content items-center justify-between gap-6 px-5 sm:px-8">
        {/* Brand */}
        <Link href="/" className="group flex flex-col leading-none" aria-label={`${site.name} — Startseite`}>
          <span className="font-serif text-2xl font-semibold tracking-wide text-cream">
            Chen&apos;s <span className="text-gold">Cooking</span>
          </span>
          <span className="mt-1 text-[0.6rem] uppercase tracking-label text-muted">
            {site.city}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                isActive(item.href) ? "text-gold-soft" : "text-cream/80 hover:text-cream"
              }`}
            >
              {item.label}
              <span
                aria-hidden
                className={`absolute inset-x-0 -bottom-0.5 h-px bg-gold transition-opacity duration-300 ${
                  isActive(item.href) ? "opacity-100" : "opacity-0"
                }`}
              />
            </Link>
          ))}
          <Link
            href="/reservierung"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-onAccent transition-colors duration-300 hover:bg-gold-soft"
          >
            {site.reserveCta}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-cream lg:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-px w-full bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-px w-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`lg:hidden ${open ? "block" : "hidden"} border-t border-line bg-ink/95 backdrop-blur-md`}
      >
        <nav aria-label="Mobile Navigation" className="flex flex-col px-5 py-6">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`border-b border-line py-4 font-serif text-xl ${
                isActive(item.href) ? "text-gold-soft" : "text-cream"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/reservierung"
            className="mt-6 rounded-full bg-gold px-6 py-3.5 text-center font-semibold text-onAccent"
          >
            {site.reserveCta}
          </Link>
        </nav>
      </div>
    </header>
  );
}
