#!/usr/bin/env bash
# Chen's Cooking Wiener Neustadt — lokalen Server starten (Mac/Linux)
# Erster Start installiert die Pakete automatisch; danach öffnet sich
# die Website unter http://localhost:3000 im Browser.
cd "$(dirname "$0")" || exit 1

if ! command -v node >/dev/null 2>&1; then
  echo ""
  echo "  Node.js ist noch nicht installiert."
  echo "  Bitte zuerst von https://nodejs.org installieren (LTS-Version)"
  echo "  und dieses Skript danach erneut ausführen."
  echo ""
  exit 1
fi

if [ ! -d node_modules ]; then
  echo ""
  echo "  Erste Einrichtung — Pakete werden installiert, bitte warten ..."
  echo ""
  npm install
fi

echo ""
echo "  ============================================"
echo "   Server startet ..."
echo "   Die Website öffnet sich gleich im Browser:"
echo "   http://localhost:3000"
echo ""
echo "   Zum Beenden: Strg+C drücken."
echo "  ============================================"
echo ""

# Browser nach kurzer Wartezeit öffnen (Server braucht ein paar Sekunden)
( sleep 8 && { open http://localhost:3000 2>/dev/null || xdg-open http://localhost:3000 2>/dev/null; } ) &

npm run dev
