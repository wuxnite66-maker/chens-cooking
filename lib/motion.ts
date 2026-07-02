import type { Variants } from "framer-motion";

/**
 * Shared, reduced-motion-aware animation tokens.
 * Components read `prefers-reduced-motion` via Framer Motion's `useReducedMotion`
 * and fall back to the static `reduced` variants where needed.
 */

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Container that staggers its children on entrance.
export const staggerParent = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

// Child element: fade + rise.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

// Subtle fade only (for reduced motion or large media).
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

// Scale-in for media/cards.
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

// Standard viewport trigger config for scroll reveals.
export const viewportOnce = { once: true, amount: 0.25 } as const;
