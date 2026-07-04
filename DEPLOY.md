# Deployment (Vercel)

The site is a standard **Next.js 14** app — Vercel deploys it automatically.

## First-time setup
1. Go to <https://vercel.com> → sign in with **GitHub**.
2. **Add New… → Project** → import `chens-cooking` → **Deploy**.
   (Framework auto-detects as Next.js; no settings needed.)

## Environment variables
Set these in **Vercel → Project → Settings → Environment Variables**
(they are intentionally **not** in the repo — see `.env.example`):

| Name | Example value | Purpose |
|------|---------------|---------|
| `RESEND_API_KEY` | `re_xxx…` | Sends the reservation e-mails (Resend) |
| `RESERVATION_TO` | `your-inbox@example.com` | Where reservations are delivered |
| `RESERVATION_FROM` | `Chen's Cooking <onboarding@resend.dev>` | Sender address |

Without these, the reservation form still works but logs instead of e-mailing.
Redeploy after adding/changing env vars.

## Google Calendar auto-entry (optional)
Every reservation is also written into your Google Calendar when this is set:

| Name | Value |
|------|-------|
| `GOOGLE_CALENDAR_WEBHOOK` | the deployed Apps-Script Web-App URL (ends with `/exec`) |

No Google Cloud / API keys needed — it uses a small **Google Apps Script**
that runs under your own Google account. Step-by-step (German):
**`GOOGLE_CALENDAR_ANLEITUNG.md`**, script code: **`scripts/google-calendar-webhook.gs`**.

Short version:
1. <https://script.google.com> → **New project** → paste `scripts/google-calendar-webhook.gs`.
2. **Deploy → New deployment → Web app** → Execute as **Me**, Access **Anyone** → **Deploy** → authorize.
3. Copy the **Web-App URL** (`…/exec`).
4. Vercel → add `GOOGLE_CALENDAR_WEBHOOK` = that URL → redeploy.

If this var is absent, reservations simply skip the calendar step (email still works).

## Continuous deployment
Every push to the `main` branch triggers an automatic production deploy.
So: change something → commit + push → Vercel rebuilds and publishes.

## Local development
```bash
npm install
npm run dev      # http://localhost:3000
```
