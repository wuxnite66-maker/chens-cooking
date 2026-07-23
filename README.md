# Chen's Cooking — Premium All-you-can-eat (Sopron)

A production-grade marketing website for **Chen's Cooking**: Sushi · Teppanyaki · Wok.
Dark, cinematic, *premium-casual* — built for table reservations and walk-in conversion.

> **Language:** German (de-AT). All copy lives in one file: [`content/site.ts`](content/site.ts).

---

## Stack

| Layer | Choice |
|-------|--------|
| Framework | **Next.js 14** (App Router) |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS** (semantic tokens via CSS variables) |
| Animation | **Framer Motion** (reduced-motion aware) |
| Fonts | `next/font` — **Playfair Display** + **Inter** (self-hosted, no layout shift) |
| Images | `next/image` — AVIF/WebP, lazy, CLS-safe |

## Getting started

> Requires **Node.js 18.18+** (or 20+). If `node`/`npm` aren't installed, get them
> from <https://nodejs.org> first.

```bash
npm install
npm run dev      # http://localhost:3000
```

Build & run production:

```bash
npm run build
npm start
```

## Project structure

```
chens-cooking/
├─ app/
│  ├─ layout.tsx           # fonts, metadata, SEO, JSON-LD, skip-link
│  ├─ page.tsx             # section composition
│  ├─ globals.css          # design tokens + base styles
│  ├─ icon.svg             # favicon (wordmark seal)
│  └─ api/reservation/route.ts   # form endpoint (validation + integration point)
├─ components/             # one component per UI concern (reusable)
│  ├─ Navbar · Hero · About · Stations · Experience
│  ├─ Gallery (lightbox) · Pricing · Reservation (form + map)
│  ├─ Footer · StickyMobileCTA
│  └─ Reveal · SmartImage · Logo · SectionHeading   (primitives)
├─ content/site.ts         # ← ALL content (German). Single source of truth.
├─ lib/motion.ts           # shared animation variants
├─ public/images/          # placeholder SVGs (see README there to swap real photos)
├─ tailwind.config.ts      # design system: colors, type scale, spacing, easing
└─ next.config.mjs
```

**Separation of concerns:** content (`content/`), presentation (`components/`),
motion (`lib/`), and the design system (`tailwind.config.ts` + `globals.css`) are
independent layers. Editing copy/prices never touches component code.

## Editing content

Everything — name, address, hours, prices, menu, copy, nav, image paths — is in
**`content/site.ts`**. No component edits required.

## Reservations

The built-in form (`components/ReservationForm.tsx`) POSTs to
`app/api/reservation/route.ts`, which **validates** the payload and **emails the
reservation to the restaurant via [Resend](https://resend.com)**. Includes a
honeypot spam trap, inline validation, focus management, and `aria-live` error
announcements.

### Enable email delivery (3 steps)

1. Create a free account at <https://resend.com> and generate an **API key**.
2. Copy `.env.example` to `.env.local` and fill it in:
   ```bash
   cp .env.example .env.local
   ```
   ```env
   RESEND_API_KEY=re_your_key_here
   RESERVATION_TO=reservierung@chens-cooking.at
   RESERVATION_FROM=Chen's Cooking <onboarding@resend.dev>
   ```
3. Restart the dev server. Submissions now land in `RESERVATION_TO`'s inbox,
   with the guest's email set as **reply-to** so the restaurant can reply directly.

> **Sender note:** `onboarding@resend.dev` (Resend's shared sender) only delivers
> to the email you signed up with — perfect for testing. For production, verify
> your domain in Resend and set `RESERVATION_FROM` to e.g.
> `Chen's Cooking <reservierung@chens-cooking.at>`.

**Without `RESEND_API_KEY`**, the API still validates and returns success, but
logs the reservation to the server console instead of emailing
(`{ ok: true, delivered: false }`) — so local dev works with zero config.

## Design system

- **Palette:** warm near-black canvas (`--ink`), refined **gold** accent (`--gold`),
  a single restrained **lacquer red** (`--lacquer`) as the Asian flourish.
- **Type:** Playfair Display (editorial headlines) + Inter (body).
- Tokens are defined once in `globals.css` and mapped to Tailwind in `tailwind.config.ts`.

## Accessibility & performance

- ✅ Skip-link, semantic landmarks, sequential headings
- ✅ Visible gold focus rings (never removed), full keyboard nav (incl. lightbox & menu)
- ✅ ARIA labels on icon-only controls; `aria-live` form errors; honeypot
- ✅ `prefers-reduced-motion` respected globally **and** per-component
- ✅ `next/image` (AVIF/WebP, lazy, explicit dimensions → CLS ~0)
- ✅ Self-hosted fonts with `display: swap` (no blocking render)
- ✅ Transform/opacity-only animations; performance-safe parallax
- ✅ Tabular figures for prices (no layout shift); `min-h-svh` on mobile
- ✅ Safe-area-aware sticky mobile CTA

## Deploy to Vercel (recommended)

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. Import the repo at <https://vercel.com/new>.
3. Framework preset auto-detects **Next.js** — no config needed. Deploy.

Or via CLI:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

After deploy, set your real domain and update `metadataBase` in
`app/layout.tsx` plus the structured-data `url`.

---

© Chen's Cooking · Sopron

---

## VintFlow — KI-Assistent für Vinted-Inserate (`/vinted`)

Ein eigenständiger Bereich der App unter **`/vinted`**: Aus Handyfotos entstehen
in wenigen Schritten verkaufsfertige Vinted-Inserate. Läuft **sofort und ohne
API-Key** (Demo-Modus), mit klar austauschbaren KI-Bausteinen.

### Funktionen
- **Foto-Upload** (Drag & Drop, mehrere Bilder) — bleibt komplett im Browser
- **Hintergrund entfernen** (Canvas-Flood-Fill, wählbarer Hintergrund)
- **Bild verbessern** (Auto-Helligkeit/Kontrast/Sättigung + Schärfen)
- **Upscaling** (2× hochwertige Neuskalierung)
- **Virtuelles Model** (Studio-Platzhalter, als Demo gekennzeichnet)
- **Titel, Beschreibung, Tags, Kategorie & Preisvorschlag**
- **Credits-System**, **Login/Registrierung**, **Einstellungen**, **Tipps**
- **Export**: Text kopieren + bearbeitete Bilder herunterladen

### Architektur
| Teil | Ort |
|------|-----|
| Seiten & Wizard | `app/vinted/**` |
| KI-Textgenerierung (API) | `app/api/vinted/generate/route.ts` |
| Bildverarbeitung (Browser) | `lib/vinted/imaging.ts` |
| Taxonomie / Regel-Generator | `lib/vinted/taxonomy.ts`, `lib/vinted/generate.ts` |
| Store (Auth/Credits/Inserate) | `lib/vinted/store.tsx` |
| UI-Bausteine | `components/vinted/**` |

### KI austauschbar machen
- **Texte:** Ohne `ANTHROPIC_API_KEY` wird ein regelbasierter Generator genutzt.
  Mit Key schreibt Claude die Texte und wertet optional das Foto aus
  (`VINTED_AI_MODEL` überschreibt das Modell).
- **Bilder:** `lib/vinted/imaging.ts` kapselt jede Operation als Funktion —
  hier lassen sich echte Dienste (z. B. remove.bg, Replicate, U²-Net im Browser)
  einstecken, ohne die UI zu ändern.

> **Hinweis:** Demo-Projekt, nicht mit Vinted verbunden. Konten, Credits und
> Inserate liegen ausschließlich lokal im Browser (`localStorage`).
