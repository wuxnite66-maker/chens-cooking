# UE06 – Anleitung für Visual Studio Code (Schritt für Schritt)

## Was du brauchst
- **Visual Studio Code** (VS Code)
- **Node.js** (Test im Terminal: `node -v` zeigt eine Versionsnummer)
- **Git** (Test: `git --version`)

Terminal in VS Code öffnen: oben im Menü **Terminal → Neues Terminal**
(oder `Strg` + `Ö`).

---

## Schritt 1: Dein Schul-Repo öffnen
1. VS Code öffnen → **Datei → Ordner öffnen…**
2. Den Ordner von deinem Repo **2026_WMC3_<DeinNachname>** auswählen.

## Schritt 2: Ordner UE06 anlegen
Im Terminal:
```bash
mkdir UE06
cd UE06
```

## Schritt 3: Dateien hineinkopieren
Kopiere diese Dateien in den Ordner `UE06`:
- `main.ts` (das ist der Code)
- `package.json`
- `tsconfig.json`
- `.gitignore` (damit `node_modules` und `dist` NICHT hochgeladen werden)

> Wenn der Lehrer im GitLab-Repo `wmc3_ue-angaben` schon ein Grundgerüst
> für UE06 hat: nimm **seine** `package.json` und `tsconfig.json` und
> kopier nur meine `main.ts` hinein.

## Schritt 4: Programm starten
Im Terminal (du musst im Ordner `UE06` sein!):
```bash
npm install
```
```bash
npx tsc
```
```bash
node dist/main.js
```

Das sollte rauskommen (die Zahlen hängen vom aktuellen Jahr ab):
```
===== Autos mit Interface =====
Marke: VW, Baujahr: 2015, Alter: 11 Jahre
Marke: Opel, Baujahr: 2008, Alter: 18 Jahre

===== Autos mit Klasse =====
Marke: BMW, Baujahr: 2019, Alter: 7 Jahre
Marke: Audi, Baujahr: 2011, Alter: 15 Jahre
```

## Schritt 5: Mit Git speichern (in KLEINEN Schritten!)
Der Lehrer will mehrere kleine Commits sehen, nicht einen großen.
Mach es z. B. so:

**Commit 1 – Projekt-Dateien:**
```bash
git add package.json tsconfig.json .gitignore
```
```bash
git commit -m "UE06: Projekt angelegt"
```

**Commit 2 – Interface:** schreib zuerst nur das Interface + die Interface-Autos in `main.ts`, dann:
```bash
git add main.ts
```
```bash
git commit -m "UE06: Interface IAuto und 2 Autos"
```

**Commit 3 – Klasse:** dann die Klasse + die Klassen-Autos dazu:
```bash
git add main.ts
```
```bash
git commit -m "UE06: Klasse Auto und 2 Autos"
```

**Commit 4 – Kommentare:** zum Schluss die Begründung (Aufgabe 1 und 4):
```bash
git add main.ts
```
```bash
git commit -m "UE06: Begruendung als Kommentar"
```

**Hochladen:**
```bash
git push
```

## Schritt 6: Tag machen (SEHR WICHTIG – sonst 0 Punkte!)
```bash
git tag -a UE06_v1.0 -m "UE06_v1.0"
```
```bash
git push origin UE06_v1.0
```

### Du hast nach dem Taggen noch was geändert?
Dann alten Tag löschen und neu machen:
```bash
git tag -d UE06_v1.0
```
```bash
git push origin --delete UE06_v1.0
```
Danach wieder die zwei Befehle von Schritt 6 ausführen.

---

## Kurz erklärt (falls der Lehrer fragt)

| | Interface | Klasse |
|---|---|---|
| Was ist das? | Nur ein **Bauplan** (sagt, was da sein muss) | Bauplan **mit Code** |
| Darf Code enthalten? | Nein | Ja |
| Alter berechnen | Muss bei **jedem** Objekt neu geschrieben werden | Einmal in der Klasse, gilt für alle |
| Objekt erstellen | `{ marke: "VW", ... }` | `new Auto("VW", 2015)` |

**Warum Alter berechnen statt fix eintragen?**
Ein fixes Alter (z. B. `alter: 10`) ist nächstes Jahr falsch.
Wenn man `aktuelles Jahr - Baujahr` rechnet, stimmt es immer.

**Zusatzaufgabe:** `class Auto implements IAuto` heißt: Die Klasse hält sich
an den Bauplan vom Interface. Vergisst man etwas, zeigt TypeScript einen Fehler.
