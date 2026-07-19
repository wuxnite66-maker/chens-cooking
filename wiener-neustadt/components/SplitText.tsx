"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/**
 * Staggered text reveal: each character (or word) rises out of an
 * overflow-hidden mask. Screen readers get the plain string via aria-label.
 */
export function SplitText({
  text,
  className = "",
  mode = "chars",
  trigger = "view",
  delay = 0,
  stagger = 0.032,
}: {
  text: string;
  className?: string;
  /** chars = letter-by-letter (short display lines), words = long titles */
  mode?: "chars" | "words";
  /** mount = animate immediately (hero), view = when scrolled into view */
  trigger?: "mount" | "view";
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const units =
    mode === "chars" ? Array.from(text) : text.split(/(\s+)/).filter(Boolean);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } },
  };
  const unit = {
    hidden: { y: reduce ? 0 : "115%", opacity: reduce ? 0 : 1 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: reduce ? 0.4 : 0.72, ease: EASE_OUT },
    },
  };

  const viewProps =
    trigger === "mount"
      ? { animate: "show" as const }
      : { whileInView: "show" as const, viewport: { once: true, amount: 0.6 } };

  return (
    <motion.span
      aria-label={text}
      role="text"
      variants={container}
      initial="hidden"
      {...viewProps}
      className={`inline-block ${className}`}
    >
      {units.map((u, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom">
          <motion.span variants={unit} className="inline-block">
            {u === " " ? " " : u}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
