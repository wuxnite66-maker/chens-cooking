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
        // Semantic tokens — mapped to CSS variables in globals.css
        ink: "var(--ink)",          // page background (warm near-black)
        surface: "var(--surface)",  // raised card surface
        "surface-2": "var(--surface-2)",
        line: "var(--line)",        // hairline borders
        cream: "var(--cream)",      // primary text on dark
        muted: "var(--muted)",      // secondary text
        gold: {
          DEFAULT: "var(--gold)",
          soft: "var(--gold-soft)",
          deep: "var(--gold-deep)",
        },
        lacquer: "var(--lacquer)",  // restrained red accent
        onAccent: "var(--on-accent)", // text on gold buttons
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid editorial display sizes
        display: ["clamp(2.75rem, 6vw + 1rem, 6rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(2rem, 4vw + 1rem, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
      },
      maxWidth: {
        content: "78rem",
      },
      spacing: {
        section: "clamp(5rem, 10vw, 9rem)",
      },
      letterSpacing: {
        label: "0.22em",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
