# Reservierungs-Mails an 2 Adressen — Schritt für Schritt

**Ziel:** Jede Reservierung landet bei **jinmarco17@gmail.com** *und* **chenssopron@gmail.com**.

**Warum es aktuell nicht geht:** Die Seite verschickt über Resends Test-Absender
`onboarding@resend.dev`. Der darf **nur an die Konto-Adresse** (`wuxnite66@gmail.com`)
zustellen — jede andere Adresse wird abgewiesen. Genau das war der Fehler
„Etwas ist schiefgelaufen" im Formular.

**Lösung:** Einmalig die Domain `chenscooking.com` in Resend freischalten.
Danach darf an beliebige Adressen gesendet werden.

- **Dauer:** ca. 10 Minuten + Wartezeit auf DNS (meist wenige Minuten, max. 1 Std.)
- **Du brauchst:** Zugang zu **Resend** und zum **Silihost-Kundenpanel**
  (dort liegt die DNS deiner Domain: Nameserver `ns1/ns2.silihost.hu`)

> Solange du das nicht gemacht hast, gehen **keine Buchungen verloren** — sie
> landen über das eingebaute Sicherheitsnetz bei `wuxnite66@gmail.com`.

---

## Schritt 1 — Die DNS-Einträge bei Silihost anlegen

Die Domain ist in Resend **bereits angelegt** (Status: *not_started*, d. h. es
fehlen nur noch die DNS-Einträge).

1. Bei **Silihost** einloggen → zu deiner Domain `chenscooking.com`
   → **DNS-Zone / Zonen-Editor** öffnen.
2. Dort **drei neue Einträge** anlegen — genau diese:

### Eintrag 1 — DKIM (Signatur)
| Feld | Wert |
|---|---|
| **Typ** | `TXT` |
| **Name / Host** | `resend._domainkey` |
| **Wert** | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD05sxSPa5n2y8/XlrBccadhSxZxKq+UR+9dqy7Q1NYT0WFJgthgfKN/f/NsJUztT59XXhR1a1lXGpjY4v98zZx6gfIN4v8K697RcXW9htqGULgAB+JGgQrnvkix+VUgPb7T/ny8U0fFYqlstq9qnsAiKoK/8SRR/l4XVPvrx/tlQIDAQAB` |

### Eintrag 2 — MX (Rückmeldungen)
| Feld | Wert |
|---|---|
| **Typ** | `MX` |
| **Name / Host** | `send` |
| **Wert / Ziel** | `feedback-smtp.eu-west-1.amazonses.com` |
| **Priorität** | `10` |

### Eintrag 3 — SPF (Absender-Erlaubnis)
| Feld | Wert |
|---|---|
| **Typ** | `TXT` |
| **Name / Host** | `send` |
| **Wert** | `v=spf1 include:amazonses.com ~all` |

> **Wichtig zum Feld „Name":**
> Manche Panels wollen den Namen **relativ** (`resend._domainkey`), andere
> **komplett** (`resend._domainkey.chenscooking.com`). Wenn Silihost die Domain
> automatisch anhängt, nimm die **kurze** Variante — sonst steht am Ende
> doppelt `...chenscooking.com.chenscooking.com`.
>
> Den DKIM-Wert bitte **in einem Stück** kopieren, ohne Zeilenumbruch.
> Falls das Panel Anführungszeichen verlangt: `"p=MIGf..."`.
>
> Der MX-Eintrag auf `send` stört deine normalen E-Mails **nicht** — er gilt nur
> für die Unter-Adresse `send.chenscooking.com`.

3. Speichern.

---

## Schritt 2 — In Resend verifizieren

1. <https://resend.com/domains> öffnen → auf **chenscooking.com** klicken.
2. Button **Verify DNS Records** drücken.
3. Nach ein paar Minuten sollten alle drei Einträge auf **grün / „Verified"** stehen.
   - Steht noch etwas auf „Pending": kurz warten und nochmal auf *Verify* klicken.

👉 **Sag mir an dieser Stelle kurz Bescheid** — ich kann den Status direkt über die
Resend-API prüfen und dir sagen, ob wirklich alles sauber verifiziert ist.

---

## Schritt 3 — Die Empfänger bei Vercel eintragen

Die Live-Seite liest ihre Einstellungen **nicht** aus dem Projektordner, sondern aus
den Vercel-Umgebungsvariablen.

1. <https://vercel.com> → Projekt **chens-cooking** → **Settings** →
   **Environment Variables**.
2. Diese drei Variablen setzen (vorhandene bearbeiten, fehlende neu anlegen) —
   Environment jeweils **Production** (gern zusätzlich Preview):

| Name | Wert |
|---|---|
| `RESERVATION_TO` | `jinmarco17@gmail.com,chenssopron@gmail.com` |
| `RESERVATION_FROM` | `Chen's Cooking <reservierung@chenscooking.com>` |
| `RESERVATION_FALLBACK_TO` | `wuxnite66@gmail.com` |

> - Bei `RESERVATION_TO` die beiden Adressen **mit Komma** trennen.
> - `RESERVATION_FROM` darf erst **nach** erfolgreicher Verifizierung auf
>   `@chenscooking.com` umgestellt werden. Vorher bleibt dort
>   `Chen's Cooking <onboarding@resend.dev>` stehen.
> - `RESERVATION_FALLBACK_TO` ist das Sicherheitsnetz: Falls der Versand an die
>   beiden Adressen scheitert, geht die Buchung dorthin, statt verloren zu gehen.

3. **Wichtig:** Änderungen an Variablen wirken **erst nach einem neuen Deployment**.
   → Tab **Deployments** → beim neuesten Eintrag auf **…** → **Redeploy**.

---

## Schritt 4 — Testen

1. Auf <https://chenscooking.com/at/reservieren> eine Test-Reservierung absenden.
2. Erwartung:
   - Im Formular erscheint die **grüne Bestätigung** (kein roter Fehler mehr).
   - Die Mail liegt in **beiden** Postfächern.
   - Gibst du beim Test eine eigene E-Mail an, bekommst du zusätzlich die
     **Gast-Bestätigungsmail** — die funktioniert ebenfalls erst mit verifizierter Domain.

---

## Wenn du an die Silihost-DNS nicht rankommst

Dann geht es auch **ohne DNS**: Anbieter wie **Brevo** oder **SendGrid** erlauben
die Freischaltung **einer einzelnen Absender-Adresse** per Bestätigungs-Link
(z. B. `chenssopron@gmail.com`). Danach darf an beliebige Empfänger gesendet werden.

Sag einfach Bescheid — dann baue ich den Versand auf diesen Weg um.

---

## Spickzettel

| | |
|---|---|
| Domain | `chenscooking.com` (in Resend angelegt, Region EU) |
| DNS-Anbieter | Silihost (`ns1.silihost.hu`, `ns2.silihost.hu`) |
| Fehlende Einträge | TXT `resend._domainkey` · MX `send` · TXT `send` |
| Empfänger neu | `jinmarco17@gmail.com`, `chenssopron@gmail.com` |
| Aktueller Notfall-Empfänger | `wuxnite66@gmail.com` |
