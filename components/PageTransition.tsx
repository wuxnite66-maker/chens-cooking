"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ComponentProps,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/**
 * Gold-line curtain page transitions.
 *
 * CurtainProvider (mounted in the locale layout) shows:
 *  - a CLOSING curtain when `leave(href)` is called (black halves close over
 *    the page with a gold line at the seam), then navigates;
 *  - an OPENING curtain whenever the pathname changes (the new page is
 *    revealed from behind the closed curtain) — so section-to-section
 *    navigation reads: close → swap → open.
 *
 * Honours prefers-reduced-motion (instant navigation, no overlays).
 */

const CurtainCtx = createContext<(href: string) => void>(() => {});

// useLayoutEffect warns during SSR — fall back to useEffect on the server.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Navigate through the closing curtain. */
export const useCurtainNav = () => useContext(CurtainCtx);

const CLOSE_S = 1.0; // closing curtain duration
const OPEN_S = 0.9; // opening curtain duration
const EASE_CURTAIN: [number, number, number, number] = [0.83, 0, 0.17, 1];

export function CurtainProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [leaving, setLeaving] = useState<string | null>(null);
  const [entering, setEntering] = useState(true);

  // Swap closing → opening BEFORE the new page paints (no flash of content).
  useIsoLayoutEffect(() => {
    setLeaving(null);
    setEntering(true);
  }, [pathname]);

  useEffect(() => {
    const t = setTimeout(() => setEntering(false), reduce ? 0 : (OPEN_S + 0.35) * 1000);
    return () => clearTimeout(t);
  }, [pathname, reduce]);

  const leave = (href: string) => {
    if (!href || href === pathname) return;
    if (reduce) {
      router.push(href);
      return;
    }
    setLeaving((cur) => cur ?? href);
  };

  return (
    <CurtainCtx.Provider value={leave}>
      {children}

      {/* closing curtain */}
      {leaving && !reduce && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0b0a09]"
          initial={{ clipPath: "inset(50% 0 50% 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          transition={{ duration: CLOSE_S, ease: EASE_CURTAIN }}
          onAnimationComplete={() => router.push(leaving)}
        >
          <motion.span
            className="h-px w-64 bg-gradient-to-r from-transparent via-gold to-transparent sm:w-[30rem]"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: CLOSE_S * 0.8, delay: 0.12, ease: EASE_OUT }}
          />
        </motion.div>
      )}

      {/* opening curtain (arrival) */}
      {entering && !leaving && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-[#0b0a09]"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          animate={{ clipPath: "inset(50% 0 50% 0)" }}
          transition={{ delay: 0.15, duration: OPEN_S, ease: EASE_CURTAIN }}
        >
          <motion.span
            className="h-px w-64 bg-gradient-to-r from-transparent via-gold to-transparent sm:w-[30rem]"
            initial={{ scaleX: 1, opacity: 1 }}
            animate={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: OPEN_S, delay: 0.1, ease: EASE_OUT }}
          />
        </motion.div>
      )}
    </CurtainCtx.Provider>
  );
}

/** A Link that exits through the curtain. Safe to use inside server components. */
export function CurtainLink({
  href,
  onClick,
  children,
  ...rest
}: ComponentProps<typeof Link>) {
  const leave = useCurtainNav();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        e.preventDefault();
        leave(typeof href === "string" ? href : String(href));
      }}
    >
      {children}
    </Link>
  );
}
