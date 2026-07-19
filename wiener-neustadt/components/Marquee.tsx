/**
 * Infinite gold ribbon between sections. Content is duplicated so the
 * CSS keyframe (translateX -50%) loops seamlessly; pauses on hover and
 * collapses under prefers-reduced-motion (global safety net).
 */
const ITEMS = [
  "Sushi",
  "Teppanyaki",
  "Wok",
  "All-you-can-eat",
  "Frisch vor Ihren Augen",
  "Wiener Neustadt",
];

export function Marquee() {
  const row = (
    <>
      {ITEMS.map((item) => (
        <span key={item} className="mx-6 inline-flex items-center gap-6 sm:mx-8 sm:gap-8">
          <span className="font-serif text-2xl italic text-gold-soft/90 sm:text-3xl">{item}</span>
          <span aria-hidden className="text-sm text-gold/60">✦</span>
        </span>
      ))}
    </>
  );

  return (
    <div
      aria-hidden
      className="marquee overflow-hidden border-y border-line bg-surface/60 py-5"
    >
      <div className="marquee-track flex w-max items-center whitespace-nowrap">
        {row}
        {row}
      </div>
    </div>
  );
}
