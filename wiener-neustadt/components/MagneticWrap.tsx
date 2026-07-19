"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Magnetic hover: the wrapped element leans a few pixels toward the
 * cursor and springs back. Mouse-only; inert with reduced motion.
 */
export function MagneticWrap({
  children,
  strength = 10,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 16 });
  const y = useSpring(my, { stiffness: 220, damping: 16 });

  if (reduce) return <div className={`inline-block ${className}`}>{children}</div>;

  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * strength);
        my.set(((e.clientY - r.top) / r.height - 0.5) * strength);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
