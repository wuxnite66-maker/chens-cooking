"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const KEY = "cc-wn-cookie-ok";

/** Minimal DSGVO notice — only technically necessary cookies, so a single
 * dismiss button is sufficient (no consent management needed). */
export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* storage unavailable → stay hidden */
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie-Hinweis"
      className="fixed inset-x-4 bottom-4 z-[70] mx-auto flex max-w-xl flex-col items-center gap-4 rounded-2xl border border-line bg-surface-2/95 p-5 text-center shadow-2xl shadow-black/50 backdrop-blur-md sm:flex-row sm:text-left"
    >
      <p className="text-sm leading-relaxed text-muted">
        {site.cookie.text}{" "}
        <Link href="/datenschutz" className="text-gold-soft underline underline-offset-2 hover:text-gold">
          {site.cookie.linkLabel}
        </Link>
        .
      </p>
      <button
        type="button"
        onClick={() => {
          try {
            localStorage.setItem(KEY, "1");
          } catch {
            /* ignore */
          }
          setVisible(false);
        }}
        className="shrink-0 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-onAccent transition-colors hover:bg-gold-soft"
      >
        {site.cookie.accept}
      </button>
    </div>
  );
}
