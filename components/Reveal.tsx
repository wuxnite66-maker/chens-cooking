"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp, fadeIn, staggerParent, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger children that are themselves <Reveal.Item> */
  stagger?: boolean;
  staggerDelay?: number;
};

/**
 * Scroll-triggered reveal wrapper. Honors prefers-reduced-motion by
 * collapsing motion to a simple opacity fade.
 */
export function Reveal({
  children,
  className,
  stagger = false,
  staggerDelay = 0.08,
}: RevealProps) {
  const reduce = useReducedMotion();
  const variants: Variants = stagger
    ? staggerParent(reduce ? 0 : staggerDelay)
    : reduce
      ? fadeIn
      : fadeUp;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

/** A single staggered child. Use inside <Reveal stagger>. */
export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? fadeIn : fadeUp}>
      {children}
    </motion.div>
  );
}
