import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Chen's Cooking in Sopron — All-you-can-eat mit Sushi-Bar, Teppanyaki-Grill und Wok-Station. Frisch vor Ihren Augen zubereitet. Jetzt Tisch reservieren.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.chenscooking.com"),
  title: {
    default: "Chen's Cooking · Sushi, Teppanyaki & Wok in Sopron",
    template: "%s · Chen's Cooking",
  },
  description,
  keywords: [
    "All you can eat Sopron",
    "Sushi Sopron",
    "Teppanyaki",
    "Wok Buffet",
    "Chinesisches Restaurant Sopron",
    "étterem Sopron",
  ],
  openGraph: {
    type: "website",
    locale: "de_AT",
    siteName: "Chen's Cooking",
    title: "Chen's Cooking · Sushi, Teppanyaki & Wok",
    description,
    images: [{ url: "/images/hero-innen.jpg", width: 1200, height: 675 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  width: "device-width",
  initialScale: 1,
};

// Structured data for local SEO (rich results)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  servesCuisine: ["Japanese", "Chinese", "Sushi", "Asian"],
  priceRange: "$$",
  telephone: site.contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.street,
    postalCode: site.contact.address.zip,
    addressLocality: site.contact.address.city,
    addressCountry: "HU",
  },
  openingHours: "Mo-We,Fr-Su 11:30-22:00",
  url: "https://www.chenscooking.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-onAccent focus:font-semibold"
        >
          Zum Inhalt springen
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
