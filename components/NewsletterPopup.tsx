"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Content } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.06 1.6 5.83L2 22l4.4-1.15a9.9 9.9 0 0 0 5.64 1.72h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.16c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.01-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.61-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

export function NewsletterPopup({ site }: { site: Content }) {
  const nl = site.newsletter;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Show a few seconds after every visit (not just once).
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => setOpen(false);

  // Lock scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      email: String(fd.get("email") || ""),
      birthday: String(fd.get("birthday") || ""),
      company: String(fd.get("company") || ""),
      locale: site.locale,
    };
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        setTimeout(() => setOpen(false), 2600);
        return;
      }
      const body = await res.json().catch(() => ({}));
      setErrorMsg(body?.error === "invalid_email" ? nl.invalidEmail : nl.error);
      setStatus("error");
    } catch {
      setErrorMsg(nl.error);
      setStatus("error");
    }
  }

  if (!open || typeof document === "undefined") return null;

  const input =
    "w-full rounded-lg border border-gold/40 bg-black/30 px-4 py-3 text-cream placeholder:text-muted/80 outline-none transition-colors focus:border-gold";

  const waBtn = (
    <a
      href={site.social.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 rounded-lg border border-[#25D366]/60 py-3 font-semibold text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
    >
      <WhatsAppIcon className="h-5 w-5" />
      {nl.whatsappCta}
    </a>
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[140] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={nl.h1}
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className="relative flex w-full max-w-[900px] overflow-hidden rounded-xl border border-line bg-ink shadow-2xl shadow-black/60">
        {/* left image */}
        <div className="hidden w-[42%] shrink-0 self-stretch sm:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={nl.image} alt={nl.imageAlt} className="h-full w-full object-cover" draggable={false} />
        </div>

        {/* right panel */}
        <div className="relative flex-1 p-7 sm:p-9">
          <button
            type="button"
            onClick={dismiss}
            aria-label={nl.close}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-lg text-muted transition-colors hover:bg-white/5 hover:text-cream"
          >
            ✕
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/chens-logo.png" alt={site.name} className="mx-auto h-14 w-auto" draggable={false} />

          {status === "success" ? (
            <div className="mt-8 flex flex-col items-center py-6 text-center">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-2xl text-gold">
                ✓
              </span>
              <h3 className="font-serif text-2xl font-semibold text-cream">{nl.success}</h3>
              <p className="mt-2 text-muted">{nl.successSub}</p>
              <div className="mt-5 w-full max-w-[260px]">{waBtn}</div>
            </div>
          ) : (
            <>
              <h2 className="mt-6 text-center text-2xl font-bold leading-tight tracking-tight text-cream">
                {nl.h1}
                <br />
                {nl.h2}
              </h2>
              <p className="mx-auto mt-2 max-w-xs text-center text-sm text-muted">{nl.sub}</p>

              <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-3">
                {/* honeypot */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder={nl.email}
                  className={input}
                />
                <input name="birthday" type="text" autoComplete="bday" placeholder={nl.birthday} className={input} />
                {status === "error" && (
                  <p role="alert" className="text-sm text-lacquer">
                    {errorMsg}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-1 rounded-lg bg-gold py-3 font-semibold tracking-wide text-onAccent transition-all duration-300 hover:bg-gold-soft active:scale-[0.99] disabled:opacity-60"
                >
                  {status === "submitting" ? nl.submitting : nl.submit}
                </button>
              </form>

              <div className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted/50">
                <span className="h-px flex-1 bg-line" />
                {nl.whatsappOr}
                <span className="h-px flex-1 bg-line" />
              </div>
              <div className="mt-3">{waBtn}</div>

              <button
                type="button"
                onClick={dismiss}
                className="mx-auto mt-4 block text-sm font-semibold text-muted transition-colors hover:text-cream"
              >
                {nl.noThanks}
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
