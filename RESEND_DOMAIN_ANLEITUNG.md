# Kunden-Bestätigungsmails aktivieren — Schritt für Schritt

Damit **Reservierungs-Bestätigungen** und **Newsletter-Willkommensmails** auch bei
den **Kunden** ankommen (nicht nur beim Restaurant), musst du in Resend **eine
eigene Domain verifizieren**. Der Test-Absender `onboarding@resend.dev` darf
nämlich nur an *deine eigene* Adresse senden — nicht an fremde Gäste.

Dauer: ca. 10 Minuten + Wartezeit auf DNS (meist < 1 Stunde).

**Du brauchst:**
- Zugang zu Resend (hast du schon).
- Zugang zu den **DNS-Einträgen** deiner Domain `chenscooking.com`
  (aktuell beim Anbieter **Silihost** — dort im Kundenpanel der „DNS-/Zonen-Editor").

---

## Schritt 1: Domain in Resend hinzufügen
1. Gehe zu <https://resend.com> → einloggen.
2. Links im Menü: **Domains** → Button **Add Domain**.
3. Domain eingeben: **`chenscooking.com`** → Region wählen (z. B. **EU (Ireland)**) → **Add**.

---

## Schritt 2: Die DNS-Einträge kopieren
Resend zeigt dir jetzt eine Liste mit **DNS-Einträgen** (meist 3–4 Stück), z. B.:

| Typ | Name/Host | Wert |
|-----|-----------|------|
| **MX** | `send` | `feedback-smtp.eu-west-1.amazonses.com` (Priorität 10) |
| **TXT** | `send` | `v=spf1 include:amazonses.com ~all` |
| **TXT** | `resend._domainkey` | `p=MIGf... (langer Schlüssel)` |
| **TXT** | `_dmarc` *(optional)* | `v=DMARC1; p=none;` |

> ⚠️ **Nimm die Werte, die Resend DIR anzeigt** — sie sind pro Konto/Domain
> unterschiedlich (vor allem der lange DKIM-Schlüssel). Die Tabelle oben ist nur
> ein Beispiel.

---

## Schritt 3: DNS-Einträge bei Silihost eintragen
1. Ins **Silihost-Kundenpanel** einloggen → **DNS-/Zonen-Editor** von `chenscooking.com`.
2. Für **jeden** Eintrag aus Resend einen neuen DNS-Eintrag anlegen:
   - **Typ** (MX oder TXT) exakt übernehmen.
   - **Name/Host**: das, was Resend zeigt (z. B. `send` oder `resend._domainkey`).
     - Falls Silihost die volle Adresse will, hänge deine Domain an:
       `send.chenscooking.com`, `resend._domainkey.chenscooking.com`.
   - **Wert/Ziel**: exakt kopieren (der DKIM-Schlüssel ist sehr lang — komplett).
   - Beim **MX**-Eintrag zusätzlich die **Priorität** (z. B. 10) setzen.
3. Speichern.

> 💡 Deine bestehenden E-Mail-Einträge (falls du @chenscooking.com-Postfächer hast)
> NICHT löschen — nur die neuen Resend-Einträge zusätzlich anlegen.

---

## Schritt 4: In Resend verifizieren
1. Zurück in Resend → bei der Domain auf **Verify** klicken.
2. Status wird **grün / „Verified"**, sobald die DNS-Einträge sichtbar sind
   (meist wenige Minuten, manchmal bis zu 1 Stunde). Einfach später nochmal auf
   **Verify** drücken.

---

## Schritt 5: Absender-Adresse in Vercel setzen
1. <https://vercel.com> → Projekt **chens-cooking** → **Settings → Environment Variables**.
2. Variable **`RESERVATION_FROM`** anlegen/ändern auf eine Adresse **deiner
   verifizierten Domain**, z. B.:
   ```
   Chen's Cooking <info@chenscooking.com>
   ```
   (Der Teil vor dem @ ist frei wählbar — `info`, `hallo`, `reservierung` …;
   das Postfach muss dafür nicht existieren, die Domain muss nur verifiziert sein.)
3. **Save** → oben **Deployments → Redeploy**.

---

## Schritt 6: Testen
1. Auf der Website eine **Reservierung** mit **deiner eigenen** E-Mail absenden.
2. Du solltest **zwei** Mails bekommen:
   - die **Benachrichtigung ans Restaurant** (an `RESERVATION_EMAIL`),
   - die **Bestätigung an den Gast** (an die eingegebene Adresse).
3. Ebenso beim **Newsletter**: nach der Anmeldung kommt die Willkommens-Mail.

Fertig! Ab jetzt bekommt jeder Gast automatisch seine Bestätigung. 🎉

---

## Häufige Fehler
- **„Domain not verified" bleibt:** DNS-Eintrag falsch/unvollständig kopiert
  (v. a. der lange DKIM-TXT) oder Name/Host falsch. Werte 1:1 aus Resend prüfen.
- **Kunde bekommt nichts, Restaurant schon:** `RESERVATION_FROM` zeigt noch auf
  `onboarding@resend.dev` → auf die verifizierte Domain umstellen (Schritt 5) +
  Redeploy.
- **Nach DNS-Umzug** (falls du `chenscooking.com` später ganz auf die neue Seite
  umstellst): Die Resend-Einträge müssen dort liegen, wo die DNS **aktiv**
  verwaltet wird. Änderst du die Nameserver, die Resend-Records dort neu anlegen.
