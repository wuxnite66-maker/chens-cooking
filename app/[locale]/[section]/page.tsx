import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, locales, type Locale } from "@/content/site";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Stations } from "@/components/Stations";
import { Experience } from "@/components/Experience";
import { Pricing } from "@/components/Pricing";
import { Takeaway } from "@/components/Takeaway";
import { HoursSection } from "@/components/HoursSection";
import { Reservation } from "@/components/Reservation";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { HtmlLang } from "@/components/HtmlLang";

/**
 * One page per menu category (both locales share the slugs):
 * /at/idee · /at/stationen · /at/buffet · /at/preise · /at/speisekarte · /at/reservieren
 */
const SECTIONS = {
  idee: About,
  stationen: Stations,
  buffet: Experience,
  preise: Pricing,
  speisekarte: Takeaway,
  oeffnungszeiten: HoursSection,
  reservieren: Reservation,
} as const;

type SectionSlug = keyof typeof SECTIONS;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    Object.keys(SECTIONS).map((section) => ({ locale, section })),
  );
}

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

function isSection(value: string): value is SectionSlug {
  return value in SECTIONS;
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; section: string };
}): Metadata {
  if (!isLocale(params.locale) || !isSection(params.section)) return {};
  const site = getContent(params.locale);
  const item = site.nav.find((n) => n.href.endsWith(`/${params.section}`));
  return { title: item?.label ?? site.name };
}

export default function SectionPage({
  params,
}: {
  params: { locale: string; section: string };
}) {
  if (!isLocale(params.locale) || !isSection(params.section)) notFound();
  const site = getContent(params.locale);
  const Section = SECTIONS[params.section];

  return (
    <>
      <HtmlLang lang={params.locale === "hu" ? "hu" : "de"} />
      <AnnouncementBar site={site} />
      <Navbar site={site} />
      <main id="main" className="pt-[calc(var(--promo-h)+var(--header-h))]">
        <Section site={site} />
      </main>
      <Footer site={site} />
      <StickyMobileCTA site={site} />
    </>
  );
}
