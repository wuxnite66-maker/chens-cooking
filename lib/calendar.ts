import crypto from "crypto";

/**
 * Google Calendar insert via a service account — no interactive OAuth.
 *
 * Setup (see DEPLOY.md):
 *   1. Google Cloud → enable "Google Calendar API".
 *   2. Create a service account + JSON key.
 *   3. Share your Google Calendar with the service-account e-mail
 *      ("Make changes to events").
 *   4. Set env vars:
 *        GOOGLE_CLIENT_EMAIL    – service account e-mail
 *        GOOGLE_PRIVATE_KEY     – service account private key (with \n)
 *        GOOGLE_CALENDAR_ID     – calendar to write to (e.g. your gmail or …@group.calendar.google.com)
 *        GOOGLE_CALENDAR_TZ     – optional, default "Europe/Budapest"
 *        RESERVATION_DURATION_MIN – optional, default 120
 */

export type CalendarInput = {
  name: string;
  phone?: string;
  email?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guests?: string;
  message?: string;
};

export function calendarConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GOOGLE_CALENDAR_ID,
  );
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({
      iss: clientEmail,
      scope: "https://www.googleapis.com/auth/calendar.events",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsigned = `${header}.${claim}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const signature = b64url(signer.sign(privateKey));
  const assertion = `${unsigned}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) throw new Error(`Google token error ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error("No access_token from Google");
  return json.access_token;
}

/** Compute a wall-clock end time (handles crossing midnight). */
function computeEnd(date: string, time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  let total = h * 60 + m + minutes;
  const dayOffset = Math.floor(total / (24 * 60));
  total = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  const eh = Math.floor(total / 60);
  const em = total % 60;
  let d = date;
  if (dayOffset !== 0) {
    const dt = new Date(`${date}T00:00:00Z`);
    dt.setUTCDate(dt.getUTCDate() + dayOffset);
    d = dt.toISOString().slice(0, 10);
  }
  return `${d}T${String(eh).padStart(2, "0")}:${String(em).padStart(2, "0")}:00`;
}

export async function createCalendarEvent(data: CalendarInput): Promise<void> {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL as string;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  const calendarId = process.env.GOOGLE_CALENDAR_ID as string;
  const tz = process.env.GOOGLE_CALENDAR_TZ || "Europe/Budapest";
  const durationMin = Number(process.env.RESERVATION_DURATION_MIN || 120);

  const time = /^\d{1,2}:\d{2}$/.test(data.time) ? data.time : "19:00";
  const start = `${data.date}T${time.padStart(5, "0")}:00`;
  const end = computeEnd(data.date, time, durationMin);

  const summary = `Reservierung: ${data.name}${data.guests ? ` (${data.guests} P.)` : ""}`;
  const description = [
    `Name: ${data.name}`,
    `Telefon: ${data.phone || "—"}`,
    `E-Mail: ${data.email || "—"}`,
    `Personen: ${data.guests || "—"}`,
    data.message?.trim() ? `Anmerkung: ${data.message.trim()}` : "",
    "",
    "Automatisch über die Website eingetragen.",
  ]
    .filter(Boolean)
    .join("\n");

  const token = await getAccessToken(clientEmail, privateKey);

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary,
        description,
        start: { dateTime: start, timeZone: tz },
        end: { dateTime: end, timeZone: tz },
        reminders: { useDefault: true },
      }),
    },
  );
  if (!res.ok) throw new Error(`Calendar insert error ${res.status}: ${await res.text()}`);
}
