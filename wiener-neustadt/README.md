# Chen's Cooking — Wiener Neustadt

Eigenständige Website für den Standort Wiener Neustadt (eigene Domain folgt).
Komplett getrennt vom bestehenden Auftritt — eigenes Design, eigener Code.

## Immer online auf diesem PC (empfohlen)

Einmalig **`IMMER-ONLINE-EINRICHTEN.bat`** doppelklicken — danach läuft die
Website dauerhaft unsichtbar im Hintergrund und startet bei jedem
Windows-Start automatisch mit. Erreichbar unter **http://localhost:3000**.
Entfernen: `IMMER-ONLINE-ENTFERNEN.bat`.

## Lokal starten — der einfache Weg

1. **Node.js installieren** (einmalig): https://nodejs.org → LTS-Version herunterladen & installieren
2. **Projekt herunterladen**: entweder `git pull` — oder als ZIP:
   https://github.com/wuxnite66-maker/chens-cooking/archive/refs/heads/claude/confident-goodall-92alse.zip
   (entpacken, dann in den Ordner `wiener-neustadt` wechseln)
3. **Starten**:
   - **Windows**: Doppelklick auf `START-WINDOWS.bat`
   - **Mac/Linux**: `./start-mac-linux.sh` im Terminal

Der erste Start installiert automatisch alle Pakete (dauert ein paar Minuten).
Danach öffnet sich die Website von selbst unter **http://localhost:3000**.

## Lokal starten — der klassische Weg

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
