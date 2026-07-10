import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";

/**
 * Reservation endpoint.
 *
 * Validates the payload, then emails the reservation to the restaurant via
 * Resend (https://resend.com). Configure with env vars (see .env.example):
 *   RESEND_API_KEY    – your Resend API key (required to actually send)
 *   RESERVATION_TO    – inbox that receives bookings (defaults to site email)
 *   RESERVATION_FROM  – verified sender (defaults to Resend's test sender)
 *
 * If RESEND_API_KEY is absent (e.g. local dev), it falls back to logging the
 * request so the form still works end-to-end without credentials.
 */

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  date?: string;
  time?: string;
  guests?: string;
  message?: string;
  locale?: string;
  company?: string; // honeypot — must stay empty
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Locale-aware validation messages
const MESSAGES = {
  at: {
    name: "Bitte geben Sie Ihren Namen an.",
    contact: "Telefon oder E-Mail ist erforderlich.",
    email: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
    date: "Bitte wählen Sie ein Datum.",
    time: "Bitte wählen Sie eine Uhrzeit.",
    guests: "Bitte geben Sie die Personenanzahl an.",
  },
  hu: {
    name: "Kérjük, adja meg a nevét.",
    contact: "Telefonszám vagy e-mail megadása kötelező.",
    email: "Kérjük, adjon meg egy érvényes e-mail-címet.",
    date: "Kérjük, válasszon dátumot.",
    time: "Kérjük, válasszon időpontot.",
    guests: "Kérjük, adja meg a személyek számát.",
  },
} as const;

function formatDate(iso?: string, locale = "de-AT") {
  if (!iso) return "—";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale, {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function buildEmail(data: Payload) {
  const rows: [string, string][] = [
    ["Name", data.name ?? "—"],
    ["Telefon", data.phone || "—"],
    ["E-Mail", data.email || "—"],
    ["Datum", formatDate(data.date)],
    ["Uhrzeit", data.time ?? "—"],
    ["Personen", data.guests ?? "—"],
    ["Anmerkung", data.message?.trim() || "—"],
  ];

  const html = `
  <div style="font-family:Georgia,serif;background:#0b0a09;color:#f6f1e9;padding:32px;border-radius:12px;max-width:560px;margin:auto">
    <p style="letter-spacing:.22em;text-transform:uppercase;font-size:12px;color:#c9a24b;margin:0 0 8px">Neue Reservierung</p>
    <h1 style="font-size:24px;margin:0 0 20px;color:#f6f1e9">${site.name}</h1>
    <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr>
               <td style="padding:10px 0;color:#a59b8d;border-bottom:1px solid rgba(201,162,75,.18);width:120px;vertical-align:top">${k}</td>
               <td style="padding:10px 0;color:#f6f1e9;border-bottom:1px solid rgba(201,162,75,.18)">${escapeHtml(v)}</td>
             </tr>`,
        )
        .join("")}
    </table>
    <p style="margin:20px 0 0;font-size:12px;color:#a59b8d;font-family:Arial,sans-serif">
      Bitte bestätigen Sie die Reservierung telefonisch oder per E-Mail beim Gast.
    </p>
  </div>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { html, text };
}

// Customer-facing confirmation (bilingual). Requires a verified Resend domain
// to actually deliver to arbitrary guest addresses.
const CUSTOMER = {
  at: {
    subject: `Ihre Reservierungsanfrage – ${site.name}`,
    eyebrow: "Reservierung erhalten",
    greeting: (n: string) => `Hallo ${n},`,
    intro: "vielen Dank für Ihre Reservierungsanfrage. Wir haben folgende Angaben erhalten:",
    labels: { date: "Datum", time: "Uhrzeit", guests: "Personen" },
    note: "Diese E-Mail ist die Eingangsbestätigung Ihrer Anfrage. Wir bestätigen Ihre Reservierung in Kürze telefonisch oder per E-Mail.",
    questions: "Fragen? Rufen Sie uns gerne an:",
    signoff: "Wir freuen uns auf Ihren Besuch!",
  },
  hu: {
    subject: `Asztalfoglalási kérése – ${site.name}`,
    eyebrow: "Foglalás beérkezett",
    greeting: (n: string) => `Kedves ${n},`,
    intro: "köszönjük asztalfoglalási kérését. A következő adatokat kaptuk:",
    labels: { date: "Dátum", time: "Időpont", guests: "Fő" },
    note: "Ez az e-mail a kérése beérkezésének visszaigazolása. Foglalását hamarosan telefonon vagy e-mailben véglegesítjük.",
    questions: "Kérdése van? Hívjon minket:",
    signoff: "Várjuk szeretettel!",
  },
} as const;

function buildCustomerEmail(data: Payload, isHu: boolean) {
  const c = isHu ? CUSTOMER.hu : CUSTOMER.at;
  const rows: [string, string][] = [
    [c.labels.date, formatDate(data.date, isHu ? "hu-HU" : "de-AT")],
    [c.labels.time, data.time ?? "—"],
    [c.labels.guests, data.guests ?? "—"],
  ];
  const addr = `${site.contact.address.street}, ${site.contact.address.zip} ${site.contact.address.city}`;
  const html = `
  <div style="font-family:Georgia,serif;background:#0b0a09;color:#f6f1e9;padding:32px;border-radius:12px;max-width:560px;margin:auto">
    <p style="letter-spacing:.22em;text-transform:uppercase;font-size:12px;color:#c9a24b;margin:0 0 8px">${c.eyebrow}</p>
    <h1 style="font-size:24px;margin:0 0 16px;color:#f6f1e9">${site.name}</h1>
    <p style="font-family:Arial,sans-serif;font-size:14px;margin:0 0 4px">${escapeHtml(c.greeting(data.name ?? ""))}</p>
    <p style="font-family:Arial,sans-serif;font-size:14px;color:#d8cfbd;margin:0 0 16px">${c.intro}</p>
    <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:9px 0;color:#a59b8d;border-bottom:1px solid rgba(201,162,75,.18);width:120px">${k}</td><td style="padding:9px 0;color:#f6f1e9;border-bottom:1px solid rgba(201,162,75,.18)">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:13px;color:#d8cfbd;margin:18px 0 0">${c.note}</p>
    <p style="font-family:Arial,sans-serif;font-size:13px;color:#a59b8d;margin:16px 0 0">${c.questions} <a href="${site.contact.phoneHref}" style="color:#c9a24b;text-decoration:none">${site.contact.phone}</a><br>${addr}</p>
    <p style="font-family:Arial,sans-serif;font-size:14px;color:#f6f1e9;margin:18px 0 0">${c.signoff}</p>
  </div>`;
  const text = `${c.greeting(data.name ?? "")}\n${c.intro}\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${c.note}\n\n${c.questions} ${site.contact.phone}\n${addr}\n\n${c.signoff}`;
  return { subject: c.subject, html, text };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Spam trap
  if (data.company) return NextResponse.json({ ok: true });

  const m = data.locale === "hu" ? MESSAGES.hu : MESSAGES.at;
  const errors: Record<string, string> = {};
  if (!data.name?.trim()) errors.name = m.name;
  if (!data.phone?.trim() && !data.email?.trim()) errors.phone = m.contact;
  if (data.email && !EMAIL_RE.test(data.email)) errors.email = m.email;
  if (!data.date) errors.date = m.date;
  if (!data.time) errors.time = m.time;
  if (!data.guests) errors.guests = m.guests;

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Google Calendar auto-entry via an Apps-Script webhook (runs under the
  // owner's Google account — no API keys / Google Cloud needed).
  // Best-effort: never blocks the reservation.
  let calendarAdded = false;
  const webhook = process.env.GOOGLE_CALENDAR_WEBHOOK;
  if (webhook && /^\d{4}-\d{2}-\d{2}$/.test(data.date ?? "")) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name?.trim(),
          phone: data.phone,
          email: data.email,
          date: data.date,
          time: data.time,
          guests: data.guests,
          message: data.message ?? "",
          durationHours: 2,
        }),
      });
      // Apps Script answers HTTP 200 even on internal errors → check the body.
      if (res.ok) {
        const text = await res.text();
        try {
          calendarAdded = JSON.parse(text)?.ok === true;
        } catch {
          calendarAdded = false;
        }
      }
    } catch (e) {
      console.error("[reservation] calendar webhook error:", e);
    }
  }

  // Treat empty / leftover-placeholder values as "not configured" so demos
  // keep working instead of failing on an invalid key.
  const rawKey = process.env.RESEND_API_KEY?.trim();
  const apiKey =
    rawKey && rawKey.startsWith("re_") && !rawKey.includes("PASTE") ? rawKey : undefined;
  const to =
    process.env.RESERVATION_TO || process.env.RESERVATION_EMAIL || site.contact.email;
  const from = process.env.RESERVATION_FROM || `${site.name} <onboarding@resend.dev>`;
  const { html, text } = buildEmail(data);
  const subject = `Neue Reservierung – ${data.name}, ${formatDate(data.date)} um ${data.time} (${data.guests} P.)`;

  // Dev fallback: no key configured → log and succeed so the flow still works.
  if (!apiKey) {
    console.warn(
      "[reservation] RESEND_API_KEY not set — email NOT sent. Logging instead:",
    );
    console.info(text);
    return NextResponse.json({ ok: true, delivered: false, calendar: calendarAdded });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email || undefined,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("[reservation] Resend error:", error);
      // If the booking already landed in the calendar, don't fail the guest.
      if (calendarAdded) {
        return NextResponse.json({ ok: true, delivered: false, calendar: true });
      }
      return NextResponse.json(
        { ok: false, error: "Versand fehlgeschlagen." },
        { status: 502 },
      );
    }

    // Guest confirmation e-mail (best-effort). Needs a verified sender domain
    // in Resend to actually reach arbitrary guest inboxes.
    if (data.email && EMAIL_RE.test(data.email)) {
      const cust = buildCustomerEmail(data, data.locale === "hu");
      try {
        await resend.emails.send({
          from,
          to: data.email,
          subject: cust.subject,
          html: cust.html,
          text: cust.text,
        });
      } catch (e) {
        console.error("[reservation] guest confirmation failed:", e);
      }
    }

    return NextResponse.json({ ok: true, delivered: true, calendar: calendarAdded });
  } catch (err) {
    console.error("[reservation] send failed:", err);
    if (calendarAdded) {
      return NextResponse.json({ ok: true, delivered: false, calendar: true });
    }
    return NextResponse.json(
      { ok: false, error: "Versand fehlgeschlagen." },
      { status: 502 },
    );
  }
}
