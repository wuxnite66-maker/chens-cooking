/**
 * Round "CHEN'S COOKING — WOK & GRILL RESTAURANT" emblem, recreated as SVG.
 * Uses currentColor (white on the dark splash). Swap for the official asset
 * by replacing this component or dropping a file in /public.
 */
export function LogoEmblem({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Chen's Cooking — Wok & Grill Restaurant"
      fill="none"
    >
      <defs>
        {/* Top arc: left → right over the top (text sits upright above it) */}
        <path id="emblem-top" d="M 38 100 A 62 62 0 0 1 162 100" />
        {/* Bottom arc: right → left through the bottom (text reads upright) */}
        <path id="emblem-bottom" d="M 165 100 A 65 65 0 0 1 35 100" />
      </defs>

      {/* Rings */}
      <circle cx="100" cy="100" r="94" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="84" stroke="currentColor" strokeWidth="1" opacity="0.8" />

      {/* Arched lettering */}
      <text
        fill="currentColor"
        fontFamily="'Arial Narrow', Arial, sans-serif"
        fontWeight="700"
        fontSize="20"
        letterSpacing="2.5"
      >
        <textPath href="#emblem-top" startOffset="50%" textAnchor="middle">
          CHEN&#8217;S COOKING
        </textPath>
      </text>
      <text
        fill="currentColor"
        fontFamily="'Arial Narrow', Arial, sans-serif"
        fontWeight="600"
        fontSize="11"
        letterSpacing="3"
      >
        <textPath href="#emblem-bottom" startOffset="50%" textAnchor="middle">
          WOK &amp; GRILL RESTAURANT
        </textPath>
      </text>

      {/* Center: wok with chopsticks + rising steam */}
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none">
        {/* wok rim + bowl */}
        <path d="M 66 96 L 134 96" />
        <path d="M 70 96 A 30 24 0 0 0 130 96" fill="currentColor" stroke="none" />
        {/* small stand */}
        <path d="M 88 122 L 96 130 M 112 122 L 104 130" strokeWidth="2.5" />
        {/* chopsticks */}
        <path d="M 104 92 L 150 60 M 110 95 L 156 66" strokeWidth="2.5" />
      </g>
      {/* steam */}
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.95">
        <path d="M 86 84 q -6 -10 0 -20 q 6 -10 0 -20" />
        <path d="M 100 82 q -6 -11 0 -22 q 6 -11 0 -22" />
        <path d="M 114 84 q -6 -10 0 -20 q 6 -10 0 -20" />
      </g>
    </svg>
  );
}
