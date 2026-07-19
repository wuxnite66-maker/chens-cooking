"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Count-up stat: "100+" animates 0 → 100 and keeps the suffix.
 * Non-numeric values render as-is.
 */
export function Counter({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!inView || target === null || !ref.current) return;
    if (reduce) {
      ref.current.textContent = `${target}${suffix}`;
      return;
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, target, suffix, reduce]);

  if (target === null) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className} aria-label={value}>
      0{suffix}
    </span>
  );
}
