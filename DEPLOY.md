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
Every reservation is also written into a Google Calendar when these are set:

| Name | Value |
|------|-------|
| `GOOGLE_CLIENT_EMAIL` | service-account e-mail (`…@…iam.gserviceaccount.com`) |
| `GOOGLE_PRIVATE_KEY` | the service-account private key (keep the `\n`) |
| `GOOGLE_CALENDAR_ID` | calendar id (your gmail, or `…@group.calendar.google.com`) |
| `GOOGLE_CALENDAR_TZ` | optional, default `Europe/Budapest` |
| `RESERVATION_DURATION_MIN` | optional, default `120` |

**One-time setup:**
1. <https://console.cloud.google.com> → create/select a project → **APIs & Services → Enable APIs → "Google Calendar API" → Enable**.
2. **APIs & Services → Credentials → Create credentials → Service account.** Give it a name; no roles needed. Open it → **Keys → Add key → JSON** → download.
3. From the JSON, copy `client_email` → `GOOGLE_CLIENT_EMAIL`, and `private_key` → `GOOGLE_PRIVATE_KEY`.
4. In **Google Calendar** (calendar.google.com) → your calendar → **Settings and sharing → Share with specific people → Add** the service-account e-mail → permission **"Make changes to events"**.
5. Same settings page → **Integrate calendar → Calendar ID** → `GOOGLE_CALENDAR_ID`.
6. Add all vars in Vercel → redeploy. Done — reservations now appear automatically in the calendar (date + time from the form, guest details in the description).

If these vars are absent, reservations simply skip the calendar step (email still works).

## Continuous deployment
Every push to the `main` branch triggers an automatic production deploy.
So: change something → commit + push → Vercel rebuilds and publishes.

## Local development
```bash
npm install
npm run dev      # http://localhost:3000
```
