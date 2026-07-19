"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/** Thin gold reading-progress bar pinned above the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-soft"
    />
  );
}
