"use client";

import { useId, useRef, useState } from "react";
import type { Content } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<string, string>>;

const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

export function ReservationForm({ site }: { site: Content }) {
  const uid = useId();
  const f = site.ui.form;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const firstErrorRef = useRef<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = { ...Object.fromEntries(fd.entries()), locale: site.locale };

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      const body = await res.json().catch(() => ({}));
      if (body.errors) {
        setErrors(body.errors);
        firstErrorRef.current = Object.keys(body.errors)[0] ?? null;
        // Move focus to the first invalid field for screen readers
        const el = document.getElementById(`${uid}-${firstErrorRef.current}`);
        el?.focus();
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex h-full flex-col items-center justify-center rounded-2xl border border-gold/40 bg-surface p-10 text-center"
      >
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-2xl text-gold">
          ✓
        </span>
        <h3 className="font-serif text-2xl font-semibold text-cream">{f.successTitle}</h3>
        <p className="mt-3 max-w-sm text-muted">{site.reservation.success}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 rounded-full border border-gold/40 px-6 py-3 font-semibold text-gold transition-colors hover:bg-gold hover:text-onAccent"
        >
          {f.another}
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-line bg-ink px-4 py-3 text-cream placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none";
  const labelCls = "mb-1.5 block text-sm font-medium text-cream";

  const Err = ({ name }: { name: string }) =>
    errors[name] ? (
      <p id={`${uid}-${name}-err`} role="alert" className="mt-1 text-sm text-lacquer">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-describedby={status === "error" ? `${uid}-formerror` : undefined}
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-name`} className={labelCls}>
            {f.name} <span className="text-lacquer">*</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            className={field}
            placeholder={f.phName}
          />
          <Err name="name" />
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className={labelCls}>
            {f.phone} <span className="text-lacquer">*</span>
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
            className={field}
            placeholder={f.phPhone}
          />
          <Err name="phone" />
        </div>

        <div>
          <label htmlFor={`${uid}-email`} className={labelCls}>
            {f.email}
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
            className={field}
            placeholder={f.phEmail}
          />
          <Err name="email" />
        </div>

        <div>
          <label htmlFor={`${uid}-date`} className={labelCls}>
            {f.date} <span className="text-lacquer">*</span>
          </label>
          <input
            id={`${uid}-date`}
            name="date"
            type="date"
            required
            min={today}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? `${uid}-date-err` : undefined}
            className={`${field} [color-scheme:dark]`}
          />
          <Err name="date" />
        </div>

        <div>
          <label htmlFor={`${uid}-time`} className={labelCls}>
            {f.time} <span className="text-lacquer">*</span>
          </label>
          <input
            id={`${uid}-time`}
            name="time"
            type="time"
            required
            min="11:30"
            max="22:00"
            step={900}
            aria-invalid={!!errors.time}
            aria-describedby={errors.time ? `${uid}-time-err` : undefined}
            className={`${field} [color-scheme:dark]`}
          />
          <Err name="time" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-guests`} className={labelCls}>
            {f.guests} <span className="text-lacquer">*</span>
          </label>
          <select
            id={`${uid}-guests`}
            name="guests"
            required
            defaultValue=""
            aria-invalid={!!errors.guests}
            aria-describedby={errors.guests ? `${uid}-guests-err` : undefined}
            className={`${field} [color-scheme:dark]`}
          >
            <option value="" disabled>
              {f.phGuests}
            </option>
            {guestOptions.map((g) => (
              <option key={g} value={g}>
                {g} {g === "1" ? f.person : f.persons}
              </option>
            ))}
          </select>
          <Err name="guests" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-message`} className={labelCls}>
            {f.message}
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={3}
            className={`${field} resize-none`}
            placeholder={f.phMessage}
          />
          <p className="mt-1.5 text-xs text-muted">{f.helper}</p>
        </div>
      </div>

      {status === "error" && !Object.keys(errors).length && (
        <p id={`${uid}-formerror`} role="alert" className="mt-4 text-sm text-lacquer">
          {site.reservation.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-semibold text-onAccent transition-all duration-300 hover:bg-gold-soft active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <span
              aria-hidden
              className="h-4 w-4 animate-spin rounded-full border-2 border-ink/40 border-t-ink"
            />
            {f.submitting}
          </>
        ) : (
          f.submit
        )}
      </button>
    </form>
  );
}
