"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import type { Content } from "@/content/site";
import { EASE_OUT } from "@/lib/motion";

export function Hero({ site }: { site: Content }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { hero } = site;

  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT } },
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      aria-label={`${site.name} — ${site.tagline}`}
    >
      {/* Background image — priority loaded, parallax via transform only */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
      </motion.div>

      {/* Cinematic scrim — darker top & bottom, so centered text stays crisp */}
      <motion.div
        aria-hidden
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/55 to-black/85"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/25" />
      {/* Warm gold glow anchored low-center */}
      <div
        aria-hidden
        className="absolute -z-10 bottom-0 left-1/2 h-[70vh] w-[90vw] -translate-x-1/2 opacity-70"
        style={{ background: "radial-gradient(55% 55% at 50% 90%, rgba(201,162,75,0.20), transparent 70%)" }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-4xl px-5 pb-16 pt-28 text-center sm:px-8"
      >
        {/* Script-style welcome eyebrow */}
        <motion.p
          variants={item}
          className="font-serif text-xl italic tracking-wide text-gold-soft sm:text-2xl"
        >
          {hero.eyebrow}
        </motion.p>

        {/* Restaurant identity headline */}
        <h1 className="mt-4 font-serif text-display font-semibold uppercase leading-[0.98] tracking-tight text-white">
          {hero.headline.map((line, i) => (
            <motion.span key={i} variants={item} className="block">
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Gold divider */}
        <motion.div variants={item} className="mx-auto mt-8 flex items-center justify-center gap-3" aria-hidden>
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-gold">✦</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        {/* Supporting line */}
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          {hero.sub}
        </motion.p>

        {/* Dual CTAs — Discover Menu / Book a Table */}
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#mitnehmen"
            className="group inline-flex items-center gap-2 rounded-full border border-white/35 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-gold-soft hover:text-gold-soft"
          >
            {hero.secondaryCta}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
          </a>
          <a
            href="#kontakt"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 font-semibold text-onAccent shadow-lg shadow-black/40 transition-all duration-300 hover:bg-gold-soft hover:shadow-xl active:scale-[0.98]"
          >
            {hero.primaryCta}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block h-10 w-px bg-gradient-to-b from-gold to-transparent"
          />
        </motion.div>
      )}
    </section>
  );
}
