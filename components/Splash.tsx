"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { site } from "@/content/site";
import { EASE_OUT } from "@/lib/motion";

/**
 * Cinematic splash / language gate.
 * Sequence: gold line draws on black → curtain splits open → Ken-Burns photo,
 * letter-cascade wordmark, shimmer sweep, floating gold embers, mouse
 * parallax, glowing country buttons, rising info bar. Honours reduced motion.
 */

// Words wrap as units (no mid-word line breaks); letters keep a global index
// so the cascade flows across both words.
const WORDMARK_WORDS = ["CHEN'S", "COOKING"].map((word, wi, arr) => ({
  word,
  offset: arr.slice(0, wi).reduce((n, w) => n + w.length + 1, 0),
}));

// Deterministic pseudo-random ember field (same on server & client — no
// hydration mismatch, no Math.random).
function useEmbers(count = 26) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 37 + 11) % 100, // vw %
        size: 2 + ((i * 13) % 4), // px
        delay: ((i * 53) % 60) / 10, // 0..6s
        dur: 8 + ((i * 7) % 9), // 8..16s
        drift: (((i * 17) % 48) - 24) * 1.6, // px sideways
        peak: 0.35 + ((i * 29) % 40) / 100, // max opacity
      })),
    [count],
  );
}

export function Splash() {
  const reduce = useReducedMotion();
  const { contact, hours } = site;
  const embers = useEmbers();

  // Intro curtain lifecycle
  const [introDone, setIntroDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), reduce ? 0 : 1600);
    return () => clearTimeout(t);
  }, [reduce]);

  // Mouse parallax (photo drifts against the cursor, content with it)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 42, damping: 18, mass: 0.6 };
  const bgX = useSpring(useTransform(mx, [-1, 1], [12, -12]), spring);
  const bgY = useSpring(useTransform(my, [-1, 1], [9, -9]), spring);
  const fgX = useSpring(useTransform(mx, [-1, 1], [-7, 7]), spring);
  const fgY = useSpring(useTransform(my, [-1, 1], [-5, 5]), spring);

  // Timeline anchors (s) — content enters while the curtain opens
  const D = reduce
    ? { kicker: 0, letters: 0, line: 0.1, sub: 0.1, choose: 0.2, btns: 0.2, bar: 0.3, logo: 0, corners: 0.3 }
    : { kicker: 1.0, letters: 1.05, line: 1.75, sub: 1.85, choose: 1.95, btns: 2.05, bar: 2.35, logo: 0.9, corners: 2.5 };

  const letterAnim = (i: number) =>
    reduce
      ? { opacity: 1 }
      : {
          y: "0%",
          opacity: 1,
          rotate: 0,
          filter: "blur(0px)",
          transition: { delay: D.letters + i * 0.045, duration: 0.75, ease: EASE_OUT },
        };

  return (
    <main
      className="relative flex min-h-dvh flex-col overflow-hidden text-cream"
      onMouseMove={(e) => {
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      {/* ---- Backdrop: real photo, Ken-Burns zoom + parallax ---- */}
      <motion.div aria-hidden className="absolute inset-0" style={reduce ? undefined : { x: bgX, y: bgY, scale: 1.04 }}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.18 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 2.4, ease: EASE_OUT }}
        >
          <motion.div
            className="absolute inset-0"
            animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
          >
            <Image
              src="/images/splash-aussen.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              quality={80}
              className="object-cover"
            />
          </motion.div>
        </motion.div>
        {/* dark scrim so the cream/gold text stays readable on the bright sky */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/85" />
        {/* breathing gold ember-glow, bottom left */}
        <motion.div
          className="absolute bottom-0 left-0 h-[60vh] w-[60vw]"
          style={{ background: "radial-gradient(60% 60% at 18% 85%, rgba(201,162,75,0.26), transparent 70%)" }}
          animate={reduce ? undefined : { opacity: [0.4, 0.85, 0.4], scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* soft vignette so the center content sits calmly on the photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(90% 70% at 50% 42%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* ---- Floating gold embers ---- */}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {embers.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${p.left}%`,
                bottom: -10,
                width: p.size,
                height: p.size,
                background: "radial-gradient(circle, rgba(240,205,130,0.95), rgba(201,162,75,0.35) 60%, transparent)",
                filter: "blur(0.6px)",
              }}
              animate={{
                y: [0, -860],
                x: [0, p.drift],
                opacity: [0, p.peak, p.peak * 0.7, 0],
              }}
              transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear", times: [0, 0.15, 0.7, 1] }}
            />
          ))}
        </div>
      )}

      {/* ---- Gold corner frames drawing themselves ---- */}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
          {/* top-left */}
          <motion.span className="absolute left-6 top-6 h-px w-24 origin-left bg-gradient-to-r from-[rgba(201,162,75,0.8)] to-transparent" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: D.corners, duration: 0.8, ease: EASE_OUT }} />
          <motion.span className="absolute left-6 top-6 h-24 w-px origin-top bg-gradient-to-b from-[rgba(201,162,75,0.8)] to-transparent" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: D.corners + 0.1, duration: 0.8, ease: EASE_OUT }} />
          {/* bottom-right */}
          <motion.span className="absolute bottom-16 right-6 h-px w-24 origin-right bg-gradient-to-l from-[rgba(201,162,75,0.8)] to-transparent" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: D.corners + 0.2, duration: 0.8, ease: EASE_OUT }} />
          <motion.span className="absolute bottom-16 right-6 h-24 w-px origin-bottom bg-gradient-to-t from-[rgba(201,162,75,0.8)] to-transparent" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: D.corners + 0.3, duration: 0.8, ease: EASE_OUT }} />
        </div>
      )}

      {/* ---- Logo top right: pop in, then gentle float ---- */}
      <motion.div
        className="absolute right-6 top-7 z-20 w-40 sm:right-12 sm:top-10 sm:w-56"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -22, scale: 0.9, rotate: -2 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        transition={{ delay: D.logo, duration: 0.9, ease: EASE_OUT }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2.6 }}
        >
          <Image
            src="/images/chens-logo.png"
            alt="Chen's Cooking — Wok & Grill Restaurant"
            width={695}
            height={313}
            priority
            className="h-auto w-full drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]"
          />
        </motion.div>
      </motion.div>

      {/* ---- Content ---- */}
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-content flex-1 flex-col px-6 sm:px-10"
        style={reduce ? undefined : { x: fgX, y: fgY }}
      >
        {/* Wordmark */}
        <div className="pt-28 sm:pt-40">
          <motion.p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-gold"
            initial={{ opacity: 0, y: reduce ? 0 : 14, letterSpacing: reduce ? "0.32em" : "0.55em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.32em" }}
            transition={{ delay: D.kicker, duration: 0.9, ease: EASE_OUT }}
          >
            Herzlich willkommen · Üdvözöljük
          </motion.p>

          {/* Letter cascade + shimmer sweep */}
          <h1 className="relative font-serif text-5xl font-semibold tracking-tight text-cream sm:text-7xl">
            <span className="sr-only">CHEN&rsquo;S COOKING</span>
            <span aria-hidden className="relative inline-block overflow-hidden pb-1 align-bottom">
              {WORDMARK_WORDS.map(({ word, offset }, wi) => (
                <span key={wi}>
                  {wi > 0 && ' '}
                  <span className="inline-block whitespace-nowrap">
                    {word.split('').map((ch, j) => (
                      <motion.span
                        key={j}
                        className="inline-block will-change-transform"
                        initial={reduce ? { opacity: 0 } : { y: '115%', opacity: 0, rotate: 8, filter: 'blur(7px)' }}
                        animate={letterAnim(offset + j)}
                      >
                        {ch}
                      </motion.span>
                    ))}
                  </span>
                </span>
              ))}
              {/* shimmer */}
              {!reduce && (
                <motion.span
                  className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent, rgba(255,236,190,0.38), transparent)",
                  }}
                  initial={{ x: "-160%" }}
                  animate={{ x: "420%" }}
                  transition={{ delay: 2.2, duration: 1.5, repeat: Infinity, repeatDelay: 3.6, ease: "easeInOut" }}
                />
              )}
            </span>
          </h1>

          <motion.p
            className="mt-3 text-sm uppercase text-muted sm:text-base"
            initial={{ opacity: 0, letterSpacing: reduce ? "0.38em" : "0.7em" }}
            animate={{ opacity: 1, letterSpacing: "0.38em" }}
            transition={{ delay: D.sub, duration: 1.1, ease: EASE_OUT }}
          >
            Wok &amp; Grill Restaurant
          </motion.p>

          <motion.div
            className="mt-6 h-px w-72 origin-left bg-gradient-to-r from-gold via-[rgba(201,162,75,0.6)] to-transparent sm:w-[28rem]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: D.line, duration: 1.0, ease: EASE_OUT }}
          />
        </div>

        {/* Country / language choice */}
        <div className="mt-16 pb-28 sm:mt-auto sm:self-end sm:pb-44 sm:text-right">
          <motion.p
            className="mb-6 text-xs uppercase tracking-[0.3em] text-muted"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D.choose, duration: 0.7, ease: EASE_OUT }}
          >
            Bitte wählen · Kérjük válasszon
          </motion.p>
          <div className="flex flex-col gap-4 sm:items-end">
            {[
              { href: "/at", tag: "DE", label: "Austria" },
              { href: "/hu", tag: "HU", label: "Hungary" },
            ].map((c, i) => (
              <motion.div
                key={c.href}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 90, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ delay: D.btns + i * 0.16, duration: 0.85, ease: EASE_OUT }}
                whileHover={reduce ? undefined : { scale: 1.045, x: -6 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Link
                  href={c.href}
                  className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-[rgba(201,162,75,0.45)] bg-[rgba(12,11,9,0.62)] px-8 py-4 font-serif text-3xl text-cream shadow-lg shadow-black/40 backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-onAccent sm:text-4xl"
                >
                  {/* soft gold pulse */}
                  {!reduce && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full"
                      animate={{ boxShadow: [
                        "0 0 0px 0px rgba(201,162,75,0)",
                        "0 0 34px 6px rgba(201,162,75,0.32)",
                        "0 0 0px 0px rgba(201,162,75,0)",
                      ] }}
                      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 3 + i * 1.2 }}
                    />
                  )}
                  {/* shine sweep on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[220%] -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[420%]"
                  />
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold transition-colors group-hover:text-onAccent">
                    {c.tag}
                  </span>
                  {c.label}
                  <span aria-hidden className="-ml-1 translate-x-0 text-2xl text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-onAccent group-hover:opacity-100 sm:text-3xl">
                    →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ---- Bottom info bar rises in ---- */}
      <motion.footer
        className="absolute inset-x-0 bottom-0 z-10 border-t border-line bg-[rgba(12,11,9,0.78)] backdrop-blur-md"
        initial={reduce ? { opacity: 0 } : { y: "110%" }}
        animate={reduce ? { opacity: 1 } : { y: 0 }}
        transition={{ delay: D.bar, duration: 0.9, ease: EASE_OUT }}
      >
        <div className="mx-auto flex max-w-content flex-col gap-2 px-6 py-3.5 text-sm text-muted sm:flex-row sm:items-center sm:gap-8 sm:px-10">
          {[
            <span key="h" className="flex items-center gap-2.5">
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
              {hours.label} · {hours.range}
            </span>,
            <a key="p" href={contact.phoneHref} className="flex items-center gap-2.5 transition-colors hover:text-cream">
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
              {contact.phone}
            </a>,
            <span key="a" className="flex items-center gap-2.5 sm:ml-auto">
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
              {contact.address.street}, {contact.address.zip} {contact.address.city}
            </span>,
          ].map((node, i) => (
            <motion.span
              key={i}
              className={i === 2 ? "sm:ml-auto" : undefined}
              initial={{ opacity: 0, x: reduce ? 0 : -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: D.bar + 0.25 + i * 0.15, duration: 0.6, ease: EASE_OUT }}
            >
              {node}
            </motion.span>
          ))}
        </div>
      </motion.footer>

      {/* ---- Intro curtain: gold line draws, then the black splits open ---- */}
      {!reduce && !introDone && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0b0a09]"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          animate={{ clipPath: "inset(50% 0 50% 0)" }}
          transition={{ delay: 0.8, duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
        >
          <motion.span
            className="h-px w-64 bg-gradient-to-r from-transparent via-gold to-transparent sm:w-[30rem]"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.4, times: [0, 0.35, 0.8, 1], ease: EASE_OUT }}
          />
        </motion.div>
      )}
    </main>
  );
}
