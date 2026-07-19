import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, locales, type Locale } from "@/content/site";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { HtmlLang } from "@/components/HtmlLang";
import { NewsletterPopup } from "@/components/NewsletterPopup";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isHu = params.locale === "hu";
  return {
    title: isHu
      ? "Chen's Cooking Sopron · Sushi, Teppanyaki & Wok"
      : "Chen's Cooking Sopron · Sushi, Teppanyaki & Wok",
    description: isHu
      ? "Chen's Cooking Sopronban — sushi-bár, teppanyaki-grill és wok-állomás. Happy Night: italok all inclusive. Foglaljon most asztalt."
      : "Chen's Cooking in Sopron — Sushi-Bar, Teppanyaki-Grill und Wok. Happy Night: Getränke all-inclusive. Jetzt Tisch reservieren.",
    alternates: {
      languages: { "de-AT": "/at", hu: "/hu" },
    },
  };
}

export default function LocalePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const site = getContent(params.locale);

  return (
    <>
      <HtmlLang lang={params.locale === "hu" ? "hu" : "de"} />
      <AnnouncementBar site={site} />
      <Navbar site={site} />
      <main id="main">
        <Hero site={site} />
      </main>
      <Footer site={site} />
      <StickyMobileCTA site={site} />
      <NewsletterPopup site={site} />
    </>
  );
}
