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

function PhoneIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 5.5c0 8.5 7.5 16 16 16l2.5-3.5-4-2-2 2c-3-1.2-6.3-4.5-7.5-7.5l2-2-2-4L4 4.5 2.5 5.5z" />
    </svg>
  );
}

export function Hero({ site }: { site: Content }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { hero, promo, contact, ui } = site;

  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.62, 0.9]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.11, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden"
      aria-label={`${promo.label} – ${promo.headline}`}
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

      {/* Cinematic scrim + warm gold glow behind the offer */}
      <motion.div
        aria-hidden
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/95 via-black/75 to-black/40"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 to-transparent" />
      <div
        aria-hidden
        className="absolute -z-10 left-0 bottom-0 h-[70vh] w-[70vw] opacity-70"
        style={{ background: "radial-gradient(60% 60% at 20% 80%, rgba(201,162,75,0.22), transparent 70%)" }}
      />

      <div className="mx-auto w-full max-w-content px-5 pb-20 pt-32 sm:px-8 sm:pb-28">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          {/* Promo badge */}
          <motion.p
            variants={item}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-gold/50 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft backdrop-blur-sm"
          >
            <span aria-hidden className="animate-pulse text-sm">✦</span>
            {promo.label}
            <span aria-hidden className="h-3 w-px bg-gold/50" />
            <span className="text-cream/80">{promo.when}</span>
          </motion.p>

          {/* Headline = the offer */}
          <h1 className="font-serif text-display font-semibold leading-[1.02] text-white">
            <motion.span variants={item} className="block">
              {promo.headline}
            </motion.span>
          </h1>

          {/* Price — the eye-catcher */}
          <motion.div variants={item} className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span
              className="font-serif text-6xl font-bold text-gold-soft sm:text-7xl"
              style={{ textShadow: "0 0 34px rgba(201,162,75,0.55)" }}
            >
              {promo.price}
            </span>
            <span className="text-lg font-medium text-white/85">{promo.text}</span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={promo.href}
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 font-semibold text-onAccent shadow-lg shadow-black/40 transition-all duration-300 hover:bg-gold-soft hover:shadow-xl active:scale-[0.98]"
            >
              {hero.primaryCta}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/35 px-7 py-4 font-semibold text-white transition-colors duration-300 hover:border-gold-soft hover:text-gold-soft"
            >
              <PhoneIcon />
              <span>{ui.callAria}</span>
              <span className="hidden text-white/60 sm:inline">·</span>
              <span className="hidden tabular-nums text-white/80 sm:inline">{contact.phone}</span>
            </a>
          </motion.div>

          {/* Tertiary */}
          <motion.a
            variants={item}
            href="#mitnehmen"
            className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/75 transition-colors duration-300 hover:text-gold-soft"
          >
            {hero.takeawayLink}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.a>
        </motion.div>
      </div>

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
