import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <p className="kicker mb-4">{eyebrow}</p>
      <h2 className="font-serif text-display-sm font-semibold text-cream">{title}</h2>
      <div
        className={`hairline mt-6 ${align === "center" ? "mx-auto w-24" : "w-20"}`}
      />
    </Reveal>
  );
}
