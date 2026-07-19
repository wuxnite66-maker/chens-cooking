"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_OUT } from "@/lib/motion";

const KEY = "cc-wn-intro-seen";

/**
 * One-time loading intro (per browser session): script logo fades in over
 * the dark curtain, then the curtain lifts. Skipped entirely for repeat
 * views and under prefers-reduced-motion.
 */
export function IntroOverlay() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (reduce || sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
      setShow(true);
      const t = setTimeout(() => setShow(false), 1900);
      return () => clearTimeout(t);
    } catch {
      /* storage unavailable → no intro */
    }
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.7, ease: EASE_OUT } }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink"
        >
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
              className="font-script text-5xl text-gold-soft sm:text-6xl"
            >
              Chen&apos;s Cooking
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.5 }}
              className="hairline mx-auto mt-5 w-40 origin-center"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="mt-4 text-[0.65rem] uppercase tracking-label text-muted"
            >
              Wiener Neustadt
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
