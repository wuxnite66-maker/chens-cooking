"use client";

import dynamic from "next/dynamic";
import type { Content } from "@/content/site";

// The flip library is browser-only — load it without SSR.
const Inner = dynamic(() => import("./MenuFlipbookInner"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto w-full max-w-[980px]">
      <div className="aspect-[1.4/1] w-full animate-pulse rounded-xl border border-line bg-surface" />
    </div>
  ),
});

export function MenuFlipbook({ site }: { site: Content }) {
  return <Inner site={site} />;
}
