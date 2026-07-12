"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { Reveal, RevealItem } from "./Reveal";
import { SmartImage } from "./SmartImage";

/**
 * Masonry-ish gallery (CSS columns) with an accessible lightbox:
 * Escape closes, arrow keys navigate, backdrop click closes,
 * focus moves to the dialog while open.
 */
export function GalleryGrid() {
  const { gallery } = site;
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + gallery.images.length) % gallery.images.length
      ),
    [gallery.images.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <>
      <Reveal stagger className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {gallery.images.map((img, i) => (
          <RevealItem key={img.src}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Bild vergrößern: ${img.alt}`}
              className="group block w-full overflow-hidden rounded-2xl border border-line text-left"
            >
              <SmartImage
                src={img.src}
                alt={img.alt}
                width={800}
                height={img.tall ? 1000 : 600}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                rounded="rounded-none"
                className="w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
                wrapperClassName={img.tall ? "aspect-[4/5]" : "aspect-[4/3]"}
              />
            </button>
          </RevealItem>
        ))}
      </Reveal>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={gallery.images[active].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <motion.div
              initial={reduce ? {} : { scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={reduce ? {} : { scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gallery.images[active].src}
                alt={gallery.images[active].alt}
                width={1400}
                height={1000}
                sizes="90vw"
                className="mx-auto max-h-[80vh] w-auto rounded-xl object-contain"
              />
              <p className="mt-3 text-center text-sm text-white/70">
                {gallery.images[active].alt}
              </p>

              <button
                type="button"
                onClick={close}
                autoFocus
                aria-label="Schließen"
                className="absolute -top-2 right-0 flex h-11 w-11 -translate-y-full items-center justify-center rounded-full border border-white/30 text-xl text-white transition-colors hover:border-gold hover:text-gold"
              >
                ×
              </button>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Vorheriges Bild"
                className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white transition-colors hover:border-gold hover:text-gold sm:-left-4"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Nächstes Bild"
                className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white transition-colors hover:border-gold hover:text-gold sm:-right-4"
              >
                →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
