# Google Kalender Auto-Eintrag — Schritt für Schritt

Wenn jemand auf deiner Website reserviert, wird die Reservierung **automatisch in dein Google Kalender** eingetragen. Ohne Google Cloud, ohne API-Keys — nur ein kleines Skript, das unter **deinem eigenen Google-Konto** läuft.

Dauer: **ca. 3 Minuten.**

---

## Schritt 1: Apps Script öffnen

1. Melde dich bei dem Google-Konto an, dessen Kalender die Reservierungen bekommen soll (z. B. `wuxnite66@gmail.com`).
2. Gehe zu **<https://script.google.com>**
3. Klick oben links auf **„Neues Projekt"**

---

## Schritt 2: Code einfügen

1. Im Editor siehst du eine leere Datei `Code.gs` mit ein paar Zeilen.
2. **Markiere alles (Strg + A) und lösche es.**
3. Öffne die Datei **`scripts/google-calendar-webhook.gs`** aus diesem Projekt.
4. **Kopiere den gesamten Inhalt** und füge ihn im Apps-Script-Editor ein.
5. Oben auf das **💾 Speichern-Symbol** klicken (oder Strg + S).
6. Gib dem Projekt oben einen Namen, z. B. `Chens Kalender`.

---

## Schritt 3: Als Web-App bereitstellen

1. Oben rechts: **„Bereitstellen"** → **„Neue Bereitstellung"**
2. Klick auf das **Zahnrad ⚙️** neben „Typ auswählen" → **„Web-App"**
3. Einstellungen:
   - **Beschreibung:** egal, z. B. `Reservierungen`
   - **Ausführen als:** **Ich** (deine E-Mail)
   - **Wer hat Zugriff:** **Jeder**
4. Klick **„Bereitstellen"**

---

## Schritt 4: Berechtigung bestätigen

Beim ersten Mal fragt Google nach Zugriff auf deinen Kalender:

1. Fenster öffnet: **„Zugriff autorisieren"** → dein Google-Konto wählen
2. Warnung **„Google hat diese App nicht überprüft"** → das ist normal (es ist ja **deine** App)
   - Klick **„Erweitert"** (unten links)
   - Klick **„Zu Chens Kalender wechseln (unsicher)"**
3. Klick **„Zulassen"**

---

## Schritt 5: Web-App-URL kopieren

1. Nach dem Bereitstellen zeigt Google eine **Web-App-URL**:
   ```
   https://script.google.com/macros/s/AKfy...sehr-lang.../exec
   ```
2. **Kopiere diese komplette URL** (endet auf `/exec`)

Diese URL brauchst du gleich für Vercel.

---

## Schritt 6: URL in Vercel eintragen

1. Gehe zu **<https://vercel.com>** → dein Projekt **`chens-cooking`**
2. **Settings** → **Environment Variables**
3. Neue Variable **+ Add**:
   - **Name:** `GOOGLE_CALENDAR_WEBHOOK`
   - **Value:** die kopierte URL (`https://script.google.com/macros/s/…/exec`)
   - **Environments:** alle anhaken (Production, Preview, Development)
4. **Save**

---

## Schritt 7: Redeploy

Damit Vercel die neue Variable lädt:

1. In Vercel oben: **Deployments**
2. Bei der obersten Deployment auf die **3 Punkte …** → **Redeploy** → **Confirm**
3. Warte 1–2 Minuten auf den grünen Haken.

---

## Schritt 8: Test 🎉

1. Gehe auf **<https://chens-cooking.vercel.app/at>**
2. Scroll zu **Reservierung**, fülle das Formular aus und sende ab.
3. Öffne dein **Google Kalender** → der Termin ist da:
   - Titel: **🥢 Reservierung: [Name] ([X] Pers.)**
   - Datum & Uhrzeit wie eingegeben, 2 Stunden geblockt
   - Alle Details (Telefon, E-Mail, Personen, Anmerkung) in der Beschreibung

**Fertig!** Ab jetzt landet jede Reservierung automatisch im Kalender — plus die E-Mail über Resend.

---

## ❓ Häufige Fragen

**Der Termin erscheint nicht?**
- Steht `GOOGLE_CALENDAR_WEBHOOK` korrekt in Vercel und wurde danach neu deployed?
- Endet die URL wirklich auf `/exec` (nicht `/dev`)?

**Wie ändere ich die Dauer (statt 2 Stunden)?**
- Im Apps-Script `var hours = data.durationHours || 2;` — die `2` anpassen und **neu bereitstellen** (Bereitstellen → Bereitstellungen verwalten → Bearbeiten → Neue Version).

**Anderer Kalender statt Hauptkalender?**
- Im Script `CalendarApp.getDefaultCalendar()` ersetzen durch
  `CalendarApp.getCalendarById("KALENDER-ID@group.calendar.google.com")`.

**Muss ich lokal testen?**
- Nicht nötig. Wenn du willst: dieselbe URL in `.env.local` als `GOOGLE_CALENDAR_WEBHOOK=…` eintragen.
