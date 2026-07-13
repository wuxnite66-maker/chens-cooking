# snaploc — Standort im Android-Emulator setzen

Kleines Kommandozeilen-Tool, um die **GPS-Position eines laufenden Android-Emulators**
auf beliebige Koordinaten oder einen Ortsnamen zu setzen. Damit kann eine App, die
**im Emulator** läuft (z. B. Snapchat), einen anderen Standort auf der Erde anzeigen.

> **Wichtig / ehrlich:**
> - Snapchat lässt sich nicht „von außen" oder per Account umstellen. Snapchat liest
>   die GPS-Position des **Geräts**. Dieses Tool ändert genau diese Geräte-Position —
>   und zwar nur im **Emulator**.
> - Das Vortäuschen eines Standorts verstößt in der Regel gegen Snapchats
>   Nutzungsbedingungen. Snapchat (und andere Apps) können Emulatoren und Spoofing
>   erkennen — die Snap Map bleibt eventuell leer oder der Account riskiert eine Sperre.
> - Nutze das nur für eigene, zulässige Zwecke (App-Tests, Privatsphäre). Es werden
>   **keine** Schutzmechanismen von Apps umgangen — nur die dokumentierte
>   Emulator-Konsole (`geo fix`) verwendet.

## Voraussetzungen

1. **Android Studio** installiert (enthält Emulator + `adb`).
2. Ein laufender **Emulator (AVD)**. Tipp: Ein AVD *ohne* Google Play (nur „Google APIs"
   oder AOSP-Image) erlaubt einfacheres Setzen von Mock-Standorten.
3. **Python 3.8+** (nur Standardbibliothek, keine Zusatzpakete nötig).

## Einrichtung (einmalig)

```bash
# 1. Emulator-Liste anzeigen
emulator -list-avds

# 2. Emulator starten (Name aus Schritt 1 einsetzen)
emulator -avd Pixel_7_API_34

# 3. In einem zweiten Terminal prüfen, dass er läuft
adb devices
# Ausgabe z. B.:  emulator-5554   device   -> Konsolenport = 5554
```

Snapchat im Emulator installieren: Play Store öffnen und installieren, oder eine
Snapchat-APK per `adb install snapchat.apk` aufspielen. Danach normal in Snapchat
anmelden.

## Benutzung

```bash
# Per Ortsname (wird via OpenStreetMap in Koordinaten umgewandelt)
python3 snaploc.py --place "Eiffelturm, Paris"

# Per Koordinaten
python3 snaploc.py --lat 48.8584 --lon 2.2945

# Mit Höhe und anderem Emulator-Port
python3 snaploc.py --lat 40.6892 --lon -74.0445 --alt 10 --port 5556
```

Nach dem Ausführen meldet der Emulator die neue Position. In Snapchat die Karte /
den Standort einmal neu laden, damit die Position übernommen wird.

## Optionen

| Option    | Beschreibung                                             |
|-----------|----------------------------------------------------------|
| `--place` | Ortsname, z. B. `"Times Square, New York"`               |
| `--lat`   | Breitengrad (−90 bis 90), zusammen mit `--lon`           |
| `--lon`   | Längengrad (−180 bis 180)                                |
| `--alt`   | Höhe in Metern (optional, Standard 0)                    |
| `--host`  | Host der Emulator-Konsole (Standard `127.0.0.1`)         |
| `--port`  | Port der Emulator-Konsole (Standard `5554`)              |

## Wie finde ich Koordinaten?

In Google Maps / OpenStreetMap auf einen Punkt rechtsklicken → die zwei Zahlen sind
`Breitengrad, Längengrad`. Beim `--place`-Modus übernimmt das Tool das Nachschlagen.

## Fehlerbehebung

- **„Keine Verbindung zur Emulator-Konsole"** → Läuft ein Emulator? Port aus
  `adb devices` (`emulator-5554` → Port `5554`) prüfen und ggf. `--port` setzen.
- **„Emulator hat den Befehl abgelehnt"** → Meist ein Auth-Problem. Das Token liegt
  in `~/.emulator_console_auth_token`; das Tool liest es automatisch.
- **Position ändert sich in der App nicht** → Karte/Standort in der App neu laden;
  bei manchen Apps hilft ein Neustart der App im Emulator.

## Echtes Gerät statt Emulator?

Auf einem physischen Android-Handy geht Mock-Location über die
**Entwickleroptionen** (`Mock-Location-App auswählen`) plus eine Mock-Location-App.
Dieses Skript deckt bewusst nur den sauberen Emulator-Weg ab.
