import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Great_Vibes } from "next/font/google";
import { site } from "@/content/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CookieNotice } from "@/components/CookieNotice";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const description =
  "Chen's Cooking in Wiener Neustadt — All-you-can-eat mit Sushi-Bar, Teppanyaki-Grill und Wok-Station. Frisch vor Ihren Augen zubereitet. Jetzt Tisch reservieren.";

export const metadata: Metadata = {
  // TODO: echte Domain eintragen, sobald registriert
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Chen's Cooking · Sushi, Teppanyaki & Wok in Wiener Neustadt",
    template: "%s · Chen's Cooking Wiener Neustadt",
  },
  description,
  keywords: [
    "All you can eat Wiener Neustadt",
    "Sushi Wiener Neustadt",
    "Teppanyaki",
    "Wok Buffet",
    "Asiatisches Restaurant Wiener Neustadt",
  ],
  openGraph: {
    type: "website",
    locale: "de_AT",
    siteName: "Chen's Cooking Wiener Neustadt",
    title: "Chen's Cooking · Sushi, Teppanyaki & Wok in Wiener Neustadt",
    description,
    images: [{ url: "/images/hero-teppanyaki.svg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0806",
  width: "device-width",
  initialScale: 1,
};

// Structured data for local SEO (rich results)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: `${site.name} ${site.city}`,
  servesCuisine: ["Japanese", "Chinese", "Sushi", "Asian"],
  priceRange: "€€",
  telephone: site.contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.street,
    postalCode: site.contact.address.zip,
    addressLocality: site.contact.address.city,
    addressCountry: "AT",
  },
  openingHours: "Mo-Su 11:30-22:00",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable} ${script.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:font-semibold focus:text-onAccent"
        >
          Zum Inhalt springen
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <CookieNotice />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
