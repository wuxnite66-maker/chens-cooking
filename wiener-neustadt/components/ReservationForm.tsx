"use client";

import { useState } from "react";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "w-full rounded-xl border border-line bg-ink/70 px-4 py-3.5 text-cream placeholder:text-muted/60 transition-colors focus:border-gold";

/** Reservation request form → POST /api/reservierung (Resend-backed). */
export function ReservationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const today = new Date().toISOString().split("T")[0];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch("/api/reservierung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-gold/50 bg-surface-2 p-10 text-center">
        <span aria-hidden className="font-script text-4xl text-gold-soft">Danke!</span>
        <p className="mt-4 leading-relaxed text-cream">{site.reservation.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-cream">
          Name <span aria-hidden className="text-gold">*</span>
        </label>
        <input id="name" name="name" required autoComplete="name" placeholder="Ihr Name" className={inputCls} />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-cream">
          Telefon <span aria-hidden className="text-gold">*</span>
        </label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+43 …" className={inputCls} />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-cream">
          E-Mail
        </label>
        <input id="email" name="email" type="email" autoComplete="email" placeholder="ihre@mail.at" className={inputCls} />
      </div>

      <div>
        <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-cream">
          Datum <span aria-hidden className="text-gold">*</span>
        </label>
        <input id="date" name="date" type="date" required min={today} className={inputCls} />
      </div>

      <div>
        <label htmlFor="time" className="mb-1.5 block text-sm font-medium text-cream">
          Uhrzeit <span aria-hidden className="text-gold">*</span>
        </label>
        <input id="time" name="time" type="time" required min="11:30" max="21:30" className={inputCls} />
      </div>

      <div>
        <label htmlFor="guests" className="mb-1.5 block text-sm font-medium text-cream">
          Personen <span aria-hidden className="text-gold">*</span>
        </label>
        <select id="guests" name="guests" required defaultValue="2" className={inputCls}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "Person" : "Personen"}
            </option>
          ))}
          <option value="13+">Mehr als 12 (Gruppe/Feier)</option>
        </select>
      </div>

      <div>
        <label htmlFor="note" className="mb-1.5 block text-sm font-medium text-cream">
          Anmerkung
        </label>
        <input id="note" name="note" placeholder="z. B. Geburtstag, Kinderstuhl …" className={inputCls} />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-full bg-gold px-8 py-4 font-semibold text-onAccent transition-all duration-300 hover:bg-gold-soft active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Wird gesendet …" : "Reservierungsanfrage senden"}
        </button>
        {status === "error" && (
          <p role="alert" className="mt-3 text-center text-sm text-crimson">
            {site.reservation.error}
          </p>
        )}
        <p className="mt-4 text-center text-sm text-muted">
          {site.reservation.phoneNote}{" "}
          <a href={site.contact.phoneHref} className="font-semibold text-gold-soft hover:text-gold">
            {site.contact.phone}
          </a>
        </p>
      </div>
    </form>
  );
}
