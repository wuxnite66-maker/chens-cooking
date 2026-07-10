import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";

/**
 * Newsletter sign-up endpoint.
 * Collects email + birthday and forwards it to the restaurant via Resend
 * (same setup as reservations). Falls back to logging without a key.
 *   NEWSLETTER_TO (or RESERVATION_TO / RESERVATION_EMAIL) – recipient inbox
 *   RESEND_API_KEY / RESERVATION_FROM – as for reservations
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = { email?: string; birthday?: string; locale?: string; company?: string };

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Spam trap
  if (data.company) return NextResponse.json({ ok: true });

  const email = data.email?.trim() ?? "";
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }
  const birthday = (data.birthday ?? "").trim();

  const rawKey = process.env.RESEND_API_KEY?.trim();
  const apiKey =
    rawKey && rawKey.startsWith("re_") && !rawKey.includes("PASTE") ? rawKey : undefined;
  const to =
    process.env.NEWSLETTER_TO ||
    process.env.RESERVATION_TO ||
    process.env.RESERVATION_EMAIL ||
    site.contact.email;
  const from = process.env.RESERVATION_FROM || `${site.name} <onboarding@resend.dev>`;
  const subject = `Newsletter-Anmeldung – ${email}`;
  const text = `Neue Newsletter-Anmeldung\n\nE-Mail: ${email}\nGeburtstag: ${birthday || "—"}\nSprache: ${data.locale || "—"}`;
  const html = `
  <div style="font-family:Arial,sans-serif;background:#0b0a09;color:#f6f1e9;padding:28px;border-radius:12px;max-width:520px;margin:auto">
    <p style="letter-spacing:.22em;text-transform:uppercase;font-size:12px;color:#c9a24b;margin:0 0 6px">Newsletter</p>
    <h1 style="font-size:22px;margin:0 0 18px">${site.name} – neue Anmeldung</h1>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:9px 0;color:#a59b8d;width:120px;border-bottom:1px solid rgba(201,162,75,.18)">E-Mail</td><td style="padding:9px 0;border-bottom:1px solid rgba(201,162,75,.18)">${escapeHtml(email)}</td></tr>
      <tr><td style="padding:9px 0;color:#a59b8d;border-bottom:1px solid rgba(201,162,75,.18)">Geburtstag</td><td style="padding:9px 0;border-bottom:1px solid rgba(201,162,75,.18)">${escapeHtml(birthday || "—")}</td></tr>
      <tr><td style="padding:9px 0;color:#a59b8d">Sprache</td><td style="padding:9px 0">${escapeHtml(data.locale || "—")}</td></tr>
    </table>
  </div>`;

  if (!apiKey) {
    console.warn("[newsletter] RESEND_API_KEY not set — logging instead:");
    console.info(text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from, to, replyTo: email, subject, html, text });
    if (error) {
      console.error("[newsletter] Resend error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[newsletter] send failed:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
