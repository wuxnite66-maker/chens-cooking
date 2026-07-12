import { NextResponse } from "next/server";

/**
 * Reservierungsanfragen: sendet per Resend eine E-Mail an das Restaurant.
 * Ohne RESEND_API_KEY läuft der Endpoint im Demo-Modus (Payload wird nur
 * geloggt) — so funktioniert das Formular auch lokal ohne Konfiguration.
 */

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  date?: string;
  time?: string;
  guests?: string;
  note?: string;
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const name = (data.name ?? "").trim().slice(0, 120);
  const phone = (data.phone ?? "").trim().slice(0, 40);
  const email = (data.email ?? "").trim().slice(0, 160);
  const date = (data.date ?? "").trim().slice(0, 20);
  const time = (data.time ?? "").trim().slice(0, 10);
  const guests = (data.guests ?? "").trim().slice(0, 10);
  const note = (data.note ?? "").trim().slice(0, 500);

  if (!name || !phone || !date || !time || !guests) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESERVATION_TO_EMAIL;
  const from = process.env.RESERVATION_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Demo-Modus: kein Versand konfiguriert
    console.log("[reservierung] Demo-Modus — Anfrage:", {
      name,
      phone,
      email,
      date,
      time,
      guests,
      note,
    });
    return NextResponse.json({ ok: true, demo: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email || undefined,
      subject: `Reservierung: ${name} — ${date} ${time} (${guests} Pers.)`,
      html: `
        <h2>Neue Reservierungsanfrage</h2>
        <table cellpadding="6">
          <tr><td><b>Name</b></td><td>${esc(name)}</td></tr>
          <tr><td><b>Telefon</b></td><td>${esc(phone)}</td></tr>
          <tr><td><b>E-Mail</b></td><td>${esc(email || "—")}</td></tr>
          <tr><td><b>Datum</b></td><td>${esc(date)}</td></tr>
          <tr><td><b>Uhrzeit</b></td><td>${esc(time)}</td></tr>
          <tr><td><b>Personen</b></td><td>${esc(guests)}</td></tr>
          <tr><td><b>Anmerkung</b></td><td>${esc(note || "—")}</td></tr>
        </table>
      `,
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[reservierung] Versand fehlgeschlagen:", err);
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }
}
