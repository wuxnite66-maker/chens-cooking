# Chen's Cooking — Wiener Neustadt

Eigenständige Website für den Standort Wiener Neustadt (eigene Domain folgt).
Komplett getrennt vom bestehenden Auftritt — eigenes Design, eigener Code.

## Lokal starten

```bash
cd wiener-neustadt
npm install
npm run dev
```

→ http://localhost:3000

## Struktur

- `content/site.ts` — **alle** Texte, Preise, Kontaktdaten (Platzhalter, zentral pflegbar)
- `public/images/` — Platzhalter-Grafiken; echte Fotos einfach unter gleichem Namen ersetzen
- `app/` — Seiten: Start, Buffet, Speisekarte, Galerie, Über uns, Reservierung, Kontakt, Impressum, Datenschutz
- `app/api/reservierung/` — Formular-Endpoint (Resend; ohne API-Key im Demo-Modus)

## E-Mail (Reservierungen)

`.env.local` anlegen (siehe `.env.example`) und Resend-API-Key eintragen.
Ohne Key werden Anfragen nur serverseitig geloggt (Demo-Modus).

## Noch offen (echte Daten)

- [ ] Adresse, Telefonnummer, E-Mail (aktuell Platzhalter)
- [ ] Öffnungszeiten
- [ ] Buffet-Preise & Speisekarte in EUR
- [ ] Echte Fotos (Hero, Stationen, Galerie)
- [ ] Impressum & Datenschutz (Rechtstexte)
- [ ] Domain & Deployment
