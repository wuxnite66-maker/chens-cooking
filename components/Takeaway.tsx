import type { Content } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { MenuFlipbook } from "./MenuFlipbook";

function PhoneIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 5.5c0 8.5 7.5 16 16 16l2.5-3.5-4-2-2 2c-3-1.2-6.3-4.5-7.5-7.5l2-2-2-4L4 4.5 2.5 5.5z" />
    </svg>
  );
}
function PdfIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  );
}
function GlassIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12l-1.5 8a4.5 4.5 0 01-9 0L6 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.5V21M8.5 21h7" />
    </svg>
  );
}
function SauceIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6v3l1.5 1.5a3 3 0 011 2.2V19a2 2 0 01-2 2H8.5a2 2 0 01-2-2V9.7a3 3 0 011-2.2L9 6V3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" />
    </svg>
  );
}

export function Takeaway({ site }: { site: Content }) {
  const { takeaway, contact } = site;

  return (
    <section id="mitnehmen" className="scroll-mt-24 py-section">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={takeaway.eyebrow} title={takeaway.title} />
          <Reveal className="max-w-md lg:text-right">
            <p className="text-muted">{takeaway.sub}</p>
            <div className="mt-5 flex flex-wrap gap-3 lg:justify-end">
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 font-semibold text-onAccent transition-all duration-300 hover:bg-gold-soft active:scale-[0.98]"
              >
                <PhoneIcon />
                {takeaway.orderCtaLabel}
              </a>
              <a
                href={takeaway.pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3.5 font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-onAccent"
              >
                <PdfIcon />
                {takeaway.pdfLabel}
              </a>
              <a
                href={takeaway.drinksHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3.5 font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-onAccent"
              >
                <GlassIcon />
                {takeaway.drinksLabel}
              </a>
              <a
                href={takeaway.saucesHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3.5 font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-onAccent"
              >
                <SauceIcon />
                {takeaway.saucesLabel}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Menu — flip through the real menu pages (food spreads + drinks) */}
        <div className="mt-14">
          <MenuFlipbook site={site} />
        </div>

        <Reveal className="mt-8 flex flex-col gap-1 rounded-2xl border border-line bg-ink p-5 text-sm text-muted sm:p-6">
          <p>{takeaway.pickupNote}</p>
          <p>{takeaway.allergenNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
