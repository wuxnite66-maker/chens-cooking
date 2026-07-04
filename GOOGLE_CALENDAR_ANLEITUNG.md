# Google Calendar Auto-Eintrag — Schritt für Schritt

Wenn jemand auf deiner Website **Tisch reservieren** anklickt und das Formular absend, wird die Reservierung **automatisch in dein Google Kalender** eingetragen. Plus E-Mail vom Restaurant (Resend).

Diese Anleitung führt dich durch die Einrichtung.

---

## 🎯 Ziel
Jede Reservierung (Name, Datum, Uhrzeit, Gästezahl, Nachricht) landet automatisch und zeitgesteuert im **Google Kalender**.

---

## Schritt 1: Google Cloud Projekt

1. Gehe zu <https://console.cloud.google.com>
2. Oben links: **Projekt auswählen** → **Neues Projekt**
3. Gib einen Namen ein, z. B. `chens-cooking` oder `reservierungen`
4. Klicke **Erstellen**
5. Warte 30 Sekunden, bis das Projekt aktiv ist
6. Du wirst oben rechts benachrichtigt „Projekt erstellt"

---

## Schritt 2: Google Calendar API aktivieren

1. Du bist noch in der Google Cloud Console
2. Oben links: Menü (☰) → **APIs und Dienste** → **Bibliothek**
3. Suchfeld: `Google Calendar` eintippen
4. Klick auf **Google Calendar API** (sollte die erste sein)
5. Großer blauer Button: **AKTIVIEREN** klicken
6. Warte 10 Sekunden. Seite aktualisiert sich

**Status überprüfen:**
- Oben steht dann: „Google Calendar API ist aktiviert"
- Wenn nicht, drücke **F5** und warte nochmal

---

## Schritt 3: Service Account erstellen

Ein „Service Account" ist wie ein automatischer Assistent, der Einträge in deinen Kalender schreiben darf — ohne dass du jedes Mal ein Passwort eingeben musst.

1. Menü (☰) → **APIs und Dienste** → **Credentials** (Anmeldedaten)
2. Oben: **+ CREATE CREDENTIALS** → **Service Account**
3. **Service account name:** z. B. `chens-reservierungen`
4. **Service account ID:** wird automatisch gefüllt (z. B. `chens-reservierungen@...iam.gserviceaccount.com`)
5. Klick **CREATE AND CONTINUE**
6. Nächste Seite (Grant this service account access):
   - **Leave empty** (keine speziellen Rollen nötig)
   - Klick **CONTINUE**
7. Nächste Seite (Grant users access):
   - **Skip this step** (oben rechts)
8. Fertig — Seite zeigt die Service Account

---

## Schritt 4: Private Key herunterladen (JSON)

1. Du bist jetzt in der Liste **Service Accounts**
2. Klick auf die Email, die du gerade erstellt hast (z. B. `chens-reservierungen@…iam.gserviceaccount.com`)
3. Tab oben: **Keys** (Schlüssel)
4. Button **Add Key** → **Create new key**
5. Fenster öffnet: **Key type** = `JSON`
6. Klick **CREATE**
7. **JSON-Datei wird heruntergeladen** (z. B. `chens-reservierungen-1234567890.json`)

**Speichern:** Lade diese Datei **nicht in GitHub** — sie ist ein Geheimnis!

---

## Schritt 5: Werte aus der JSON auslesen

Öffne die heruntergeladene JSON-Datei mit einem Text-Editor (z. B. Notepad):

```json
{
  "type": "service_account",
  "project_id": "chens-cooking-123",
  "private_key_id": "abc...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgI...\n-----END PRIVATE KEY-----\n",
  "client_email": "chens-reservierungen@chens-cooking-123.iam.gserviceaccount.com",
  "client_id": "123456789...",
  ...
}
```

**Brauchst du:**
- **`client_email`** (z. B. `chens-reservierungen@chens-cooking-123.iam.gserviceaccount.com`)
- **`private_key`** (der lange Text zwischen `-----BEGIN PRIVATE KEY-----` und `-----END PRIVATE KEY-----`, mit den `\n` darin)

Kopiere beide Werte. Du brauchst sie gleich.

---

## Schritt 6: Google Kalender mit Service Account teilen

1. Gehe zu <https://calendar.google.com> (dein privater Google Kalender)
2. Oben rechts: **Einstellungen** (⚙️)
3. Linke Spalte → **Einstellungen** klick
4. Tab: **Freigabe und Zugriff**
5. Abschnitt: **Bestimmten Personen Zugriff geben**
6. **+ Personen hinzufügen**
   - Feld: Deine **`client_email`** aus Schritt 5 einfügen (z. B. `chens-reservierungen@chens-cooking-123.iam.gserviceaccount.com`)
   - Dropdown: **Änderungen an Ereignissen vornehmen**
   - Klick **Teilen**
7. Popup bestätigt: ✓

---

## Schritt 7: Kalender-ID abrufen

Du brauchst noch deine **Kalender-ID** (das ist meist deine Gmail-Adresse, kann aber auch anders aussehen).

1. Noch in Google Kalender → **Einstellungen** (⚙️)
2. **Kalender integrieren** (auf der Seite unten)
3. Feld **Kalender-ID**:
   - Das ist meistens: `deine-email@gmail.com`
   - Oder: `…@group.calendar.google.com`
   - **Kopiere diese ID**

---

## Schritt 8: Env-Variablen in Vercel eintragen

Jetzt loggen wir dich in **Vercel** ein und speichern die Geheimnisse.

1. Gehe zu <https://vercel.com>
2. Oben rechts: Dein Account → **Einstellungen**
3. Oder direkt zum Projekt:
   - **Projects** → `chens-cooking` anklicken
   - **Settings** (Einstellungen, oben)
4. Linke Spalte: **Environment Variables**
5. Trage folgende 4 Variablen ein (eine nach der anderen mit **+ ADD**):

| Name | Wert |
|------|------|
| `GOOGLE_CLIENT_EMAIL` | Deine `client_email` aus Schritt 5 |
| `GOOGLE_PRIVATE_KEY` | Deine `private_key` aus Schritt 5 (mit den `\n`) |
| `GOOGLE_CALENDAR_ID` | Deine Kalender-ID aus Schritt 7 |
| `GOOGLE_CALENDAR_TZ` | `Europe/Budapest` (oder deine Zeitzone) |

**Beispiel:**
```
Name: GOOGLE_CLIENT_EMAIL
Value: chens-reservierungen@chens-cooking-123.iam.gserviceaccount.com
```

```
Name: GOOGLE_PRIVATE_KEY
Value: -----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7...
(komplette private_key)
-----END PRIVATE KEY-----
```

**Wichtig:** Private Key muss die **`\n`** darin behalten! Nicht entfernen.

---

## Schritt 9: Vercel redeploy

1. Noch in Vercel-Einstellungen
2. Oben: **Deployments** anklicken
3. Siehst du die letzte Deployment (blau, mit Haken)
4. Klick auf die 3 Punkte **…** neben der letzten Deployment
5. **Redeploy**
6. Fenster fragt: **Redeploy?** → **Confirm**
7. Warte 2–3 Minuten, bis der neue Build fertig ist (grüner Haken)

**Oder:** Einfach einen neuen Commit pushen:
```bash
git add -A && git commit -m "Google Calendar vars configured" && git push
```
Vercel deployt automatisch.

---

## Schritt 10: Test!

Jetzt ist die ganze Kette live:

1. Gehe zu <https://chens-cooking.vercel.app/at> (deine Live-Site)
2. Scroll zu **Reservierung**
3. Fülle das Formular aus:
   - Name: `Max Mustermann`
   - Telefon: `+36 20 123 4567`
   - E-Mail: `test@example.com`
   - Datum: Morgen
   - Uhrzeit: `19:30`
   - Gäste: `4`
   - Nachricht: `Fensterplatz bitte!`
4. Klick **Reservieren**
5. Seite zeigt ✓ grünes **Erfolgreich!**

**Dann öffne dein Google Kalender:**
- <https://calendar.google.com>
- Du sieht einen neuen **Event:**
  - Titel: `Reservierung: Max Mustermann (4 P.)`
  - Datum & Uhrzeit: genau wie eingegeben
  - Beschreibung: Alle Details (Telefon, E-Mail, Nachricht, etc.)

---

## ✅ Fertig!

Jetzt:
- ✓ Jede Reservierung landet im Kalender
- ✓ E-Mail geht auch raus (Resend)
- ✓ Du weißt immer, wer reserviert hat

---

## ❓ Häufige Fehler

### Fehler: „Calendar insert error 404"
→ Kalender-ID falsch oder nicht mit Service Account geteilt
→ Lösung: **Schritt 6 & 7 nochmal überprüfen**

### Fehler: „Google token error 401"
→ Private Key falsch kopiert oder Umlaute/Leerzeichen drin
→ Lösung: Private Key nochmal aus der JSON kopieren, langsam eingeben

### Fehler: „No access_token from Google"
→ Service Account ID falsch in Vercel gespeichert
→ Lösung: Nochmal **Schritt 4 & 8 überprüfen**

### Event erscheint nicht im Kalender
→ Service Account nicht mit Kalender geteilt (Schritt 6)
→ Lösung: In Google Kalender-Einstellungen prüfen: Ist die Service-Account-E-Mail dort sichtbar?

---

## 🚀 Mehr Anpassungen (optional)

In `DEPLOY.md` und `.env.example` sind auch noch 2 optionale Variablen:

| Name | Wert | Standard |
|------|------|----------|
| `GOOGLE_CALENDAR_TZ` | deine Zeitzone | `Europe/Budapest` |
| `RESERVATION_DURATION_MIN` | wie lange dauert die Reservierung (Minuten) | `120` |

Beispiel:
- Du möchtest, dass Events 3 Stunden lang sind → `RESERVATION_DURATION_MIN=180`
- Du bist in einer anderen Zeitzone → `GOOGLE_CALENDAR_TZ=Europe/Vienna`

Speichern in Vercel → Redeploy.

---

## 📞 Support

Wenn was nicht klappt:
1. Schau in **Vercel → Logs** nach Fehlern
2. Oder öffne **Browser-Konsole** (F12) und schau in der **Network**-Tab nach API-Fehlern

Viel Erfolg! 🎉
