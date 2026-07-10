"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Content } from "@/content/site";

const STORAGE_KEY = "chens_newsletter_seen";
type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterPopup({ site }: { site: Content }) {
  const nl = site.newsletter;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Show once, a few seconds after first visit.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setOpen(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

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
        try {
          localStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
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
