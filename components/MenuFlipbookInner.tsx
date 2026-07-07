"use client";

import { useEffect, useState } from "react";
import type { Content } from "@/content/site";

// Rendered menu pages (food spreads 01–06, drinks 07). See public/menu/pages.
const PAGE_COUNT = 7;
const PAGES = Array.from(
  { length: PAGE_COUNT },
  (_, i) => `/menu/pages/${String(i + 1).padStart(2, "0")}.jpg`,
);
const RATIO = 1.4003; // landscape leaf (matches the rendered pages)

type Anim = { dir: "next" | "prev"; from: number; to: number };

const btn =
  "inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-onAccent disabled:pointer-events-none disabled:opacity-30";

export default function MenuFlipbookInner({ site }: { site: Content }) {
  const ui = site.ui;
  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState<Anim | null>(null);

  const go = (dir: "next" | "prev") => {
    if (anim) return;
    const to = dir === "next" ? index + 1 : index - 1;
    if (to < 0 || to >= PAGE_COUNT) return;
    setAnim({ dir, from: index, to });
  };

  const commit = () => {
    setAnim((a) => {
      if (a) setIndex(a.to);
      return null;
    });
  };

  // Backup in case the animationend event is missed (or reduced-motion).
  useEffect(() => {
    if (!anim) return;
    const t = setTimeout(commit, 900);
    return () => clearTimeout(t);
  }, [anim]);

  // Base = page that stays; overlay = page that turns.
  const baseSrc = anim
    ? anim.dir === "next"
      ? PAGES[anim.to]
      : PAGES[anim.from]
    : PAGES[index];
  const overlaySrc = anim ? (anim.dir === "next" ? PAGES[anim.from] : PAGES[anim.to]) : null;
  const display = anim ? anim.to : index;

  return (
    <div className="mx-auto w-full max-w-[980px]">
      <div className="w-full" style={{ perspective: "2400px" }}>
        <div
          className="relative w-full select-none overflow-hidden rounded-lg border border-line bg-ink shadow-2xl shadow-black/40"
          style={{ aspectRatio: `${RATIO}` }}
        >
          {/* base page */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={baseSrc}
            alt={`${site.name} — ${ui.flipPage} ${display + 1}`}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          {/* turning page */}
          {overlaySrc && anim && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${anim.dir}-${anim.from}-${anim.to}`}
              src={overlaySrc}
              alt=""
              aria-hidden
              onAnimationEnd={(e) => {
                if (e.animationName === "menuFlipNext" || e.animationName === "menuFlipPrev") commit();
              }}
              className={`absolute inset-0 h-full w-full object-cover shadow-[24px_0_40px_rgba(0,0,0,0.45)] ${
                anim.dir === "next" ? "menu-flip-next" : "menu-flip-prev"
              }`}
              style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
              draggable={false}
            />
          )}

          {/* subtle centre spine */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/25"
          />

          {/* click zones: left = back, right = forward */}
          <button
            type="button"
            aria-label={ui.flipPrev}
            onClick={() => go("prev")}
            disabled={!!anim || display <= 0}
            className="group absolute inset-y-0 left-0 w-[28%] cursor-pointer disabled:cursor-default"
          >
            <span className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-ink/70 px-3 py-2 text-lg text-gold opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-disabled:opacity-0">
              ‹
            </span>
          </button>
          <button
            type="button"
            aria-label={ui.flipNext}
            onClick={() => go("next")}
            disabled={!!anim || display >= PAGE_COUNT - 1}
            className="group absolute inset-y-0 right-0 w-[28%] cursor-pointer disabled:cursor-default"
          >
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-ink/70 px-3 py-2 text-lg text-gold opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-disabled:opacity-0">
              ›
            </span>
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button type="button" onClick={() => go("prev")} disabled={!!anim || display <= 0} className={btn}>
          <span aria-hidden>‹</span> {ui.flipPrev}
        </button>
        <span className="tabular min-w-[6.5rem] text-center text-sm text-muted">
          {ui.flipPage} {display + 1} / {PAGE_COUNT}
        </span>
        <button
          type="button"
          onClick={() => go("next")}
          disabled={!!anim || display >= PAGE_COUNT - 1}
          className={btn}
        >
          {ui.flipNext} <span aria-hidden>›</span>
        </button>
      </div>
      <p className="mt-2.5 text-center text-xs text-muted/70">{ui.flipHint}</p>
    </div>
  );
}
