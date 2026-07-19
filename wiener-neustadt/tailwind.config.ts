import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — mapped to CSS variables in globals.css.
        // ink/surface/gold use RGB channels so opacity modifiers work
        // (bg-ink/70 etc.); the rest are plain values (no alpha needed).
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2-rgb) / <alpha-value>)",
        line: "var(--line)",         // hairline borders (alpha baked in)
        cream: "var(--cream)",       // primary text on dark
        muted: "var(--muted)",       // secondary text
        gold: {
          DEFAULT: "rgb(var(--gold-rgb) / <alpha-value>)",
          soft: "var(--gold-soft)",
          deep: "var(--gold-deep)",
        },
        crimson: "var(--crimson)",   // restrained dark-red accent
        onAccent: "var(--on-accent)",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      fontSize: {
        display: ["clamp(3rem, 6.5vw + 1rem, 6.5rem)", { lineHeight: "1.02", letterSpacing: "0.01em" }],
        "display-sm": ["clamp(2.1rem, 4vw + 1rem, 3.75rem)", { lineHeight: "1.08" }],
      },
      maxWidth: {
        content: "78rem",
      },
      spacing: {
        section: "clamp(5rem, 10vw, 9rem)",
      },
      letterSpacing: {
        label: "0.24em",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
