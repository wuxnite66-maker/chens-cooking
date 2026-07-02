"use client";

import { useEffect, useState } from "react";
import type { Content } from "@/content/site";

/**
 * Mobile-only sticky conversion bar. Appears after the hero, hides itself
 * when the reservation section is in view to avoid covering the form.
 */
export function StickyMobileCTA({ site }: { site: Content }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.9;
      const contact = document.getElementById("kontakt");
      const inContact = contact
        ? contact.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;
      setShow(past && !inContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 p-3 backdrop-blur-md transition-transform duration-300 ease-out-soft lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-3">
        <a
          href={site.contact.phoneHref}
          aria-label={site.ui.callAria}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 5.5c0 8.5 7.5 16 16 16l2.5-3.5-4-2-2 2c-3-1.2-6.3-4.5-7.5-7.5l2-2-2-4L4 4.5 2.5 5.5z" />
          </svg>
        </a>
        <a
          href="#kontakt"
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-gold font-semibold text-onAccent"
        >
          {site.hero.primaryCta}
        </a>
      </div>
    </div>
  );
}
