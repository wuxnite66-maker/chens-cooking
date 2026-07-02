"use client";

import { useEffect } from "react";

/** Sets <html lang> to match the active locale (root layout defaults to "de"). */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
