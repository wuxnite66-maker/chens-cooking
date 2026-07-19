"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { site } from "@/content/site";
import { EASE_OUT } from "@/lib/motion";
import { SplitText } from "./SplitText";
import { MagneticWrap } from "./MagneticWrap";

/* Deterministic ember configs (SSR-safe — no Math.random at render) */
const EMBERS = [
  { left: "6%", size: 4, delay: 0, dur: 9 },
  { left: "14%", size: 3, delay: 2.2, dur: 11 },
  { left: "23%", size: 5, delay: 4.8, dur: 8.5 },
  { left: "31%", size: 3, delay: 1.4, dur: 10 },
  { left: "42%", size: 4, delay: 3.6, dur: 12 },
  { left: "51%", size: 3, delay: 0.8, dur: 9.5 },
  { left: "60%", size: 5, delay: 5.4, dur: 10.5 },
  { left: "68%", size: 3, delay: 2.8, dur: 8 },
  { left: "77%", size: 4, delay: 4.2, dur: 11.5 },
  { left: "85%", size: 3, delay: 1.9, dur: 9 },
  { left: "92%", size: 4, delay: 6.2, dur: 10 },
  { left: "37%", size: 2, delay: 7.1, dur: 9.8 },
];

/**
 * Cinematic full-screen hero: Ken-Burns zoom + scroll parallax on the
 * background, rising gold embers, letter-by-letter identity reveal,
 * magnetic dual CTAs and a shimmering ornament.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { hero } = site;

  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9]);
  // Content drifts up slightly faster than the page → depth
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0.15]);

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.13, delayChildren: 0.15 } },
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      aria-label={`${site.name} ${site.city} — ${site.tagline}`}
    >
      {/* Background — Ken-Burns zoom on load + parallax on scroll */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <motion.div
          initial={{ scale: reduce ? 1 : 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: EASE_OUT }}
          className="absolute inset-0"
        >
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
      </motion.div>

      {/* Cinematic scrim */}
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
        style={{ background: "radial-gradient(55% 55% at 50% 90%, rgba(198,161,91,0.22), transparent 70%)" }}
      />

      {/* Rising embers */}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5]">
          {EMBERS.map((e, i) => (
            <span
              key={i}
              className="ember"
              style={{
                left: e.left,
                width: e.size,
                height: e.size,
                animationDelay: `${e.delay}s`,
                animationDuration: `${e.dur}s`,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-4xl px-5 pb-20 pt-32 text-center sm:px-8"
      >
        {/* Script welcome line — floats gently */}
        <motion.p variants={item} className="font-script text-3xl text-gold-soft sm:text-4xl">
          <span className="float-slow inline-block">{hero.script}</span>
        </motion.p>

        {/* Identity: letter-by-letter rise */}
        <h1 className="mt-3 font-serif text-display font-semibold uppercase leading-[0.98] text-white">
          {hero.headline.map((line, i) => (
            <span key={line} className="block">
              <SplitText text={line} trigger="mount" delay={0.35 + i * 0.3} stagger={0.055} />
            </span>
          ))}
        </h1>

        <motion.p variants={item} className="mt-5 text-sm font-semibold uppercase tracking-label text-gold">
          {hero.subline}
        </motion.p>

        {/* Ornament — hairlines grow out from the centre star */}
        <motion.div variants={item} className="mx-auto mt-8 flex items-center justify-center gap-3" aria-hidden>
          <motion.span
            initial={{ scaleX: reduce ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASE_OUT, delay: 1.15 }}
            className="h-px w-12 origin-right bg-gradient-to-r from-transparent to-gold"
          />
          <motion.span
            initial={{ rotate: reduce ? 0 : -120, scale: reduce ? 1 : 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.05 }}
            className="inline-block text-gold"
          >
            ✦
          </motion.span>
          <motion.span
            initial={{ scaleX: reduce ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASE_OUT, delay: 1.15 }}
            className="h-px w-12 origin-left bg-gradient-to-l from-transparent to-gold"
          />
        </motion.div>

        {/* Supporting line */}
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          {hero.sub}
        </motion.p>

        {/* Dual CTAs — magnetic + light sweep */}
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticWrap>
            <Link
              href="/buffet"
              className="group inline-flex items-center gap-2 rounded-full border border-white/35 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-gold-soft hover:text-gold-soft"
            >
              {hero.secondaryCta}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </Link>
          </MagneticWrap>
          <MagneticWrap>
            <Link
              href="/reservierung"
              className="btn-sheen group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 font-semibold text-onAccent shadow-lg shadow-black/40 transition-all duration-300 hover:bg-gold-soft hover:shadow-[0_0_36px_rgba(198,161,91,0.45)] active:scale-[0.98]"
            >
              {hero.primaryCta}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </MagneticWrap>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
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
