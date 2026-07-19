import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Bilder aus dem Restaurant: Sushi-Theke, Teppanyaki-Grill, Wok-Station und Atmosphäre bei Chen's Cooking Wiener Neustadt.",
};

export default function GaleriePage() {
  const { gallery } = site;
  return (
    <>
      <PageHero
        script="Ein Blick hinter die Theke"
        title={gallery.title}
        sub={gallery.sub}
        image="/images/gallery-2.svg"
        imageAlt="Teppanyaki-Grill mit Flammen"
      />

      <section aria-label={gallery.eyebrow} className="py-section">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <GalleryGrid />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
