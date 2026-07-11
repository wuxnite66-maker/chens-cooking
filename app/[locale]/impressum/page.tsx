import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, locales, type Locale } from "@/content/site";
import { getLegal } from "@/content/legal";
import { LegalPage } from "@/components/LegalPage";
import { HtmlLang } from "@/components/HtmlLang";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isHu = params.locale === "hu";
  return { title: isHu ? "Impresszum · Chen's Cooking" : "Impressum · Chen's Cooking" };
}

export default function ImpressumPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const site = getContent(params.locale);
  const legal = getLegal(params.locale, site);

  return (
    <>
      <HtmlLang lang={params.locale === "hu" ? "hu" : "de"} />
      <LegalPage site={site} legal={legal} doc={legal.impressum} />
    </>
  );
}
