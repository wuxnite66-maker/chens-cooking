@echo off
title Chen's Cooking Wiener Neustadt - Lokaler Server
cd /d "%~dp0"

REM Prueft, ob Node.js installiert ist
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Node.js ist noch nicht installiert.
  echo  Bitte zuerst von https://nodejs.org herunterladen ^(LTS-Version^),
  echo  installieren und diese Datei danach erneut doppelklicken.
  echo.
  pause
  exit /b 1
)

REM Erste Einrichtung: Pakete installieren (dauert nur beim ersten Mal ein paar Minuten)
if not exist node_modules (
  echo.
  echo  Erste Einrichtung - Pakete werden installiert, bitte warten ...
  echo.
  call npm install
)

echo.
echo  ============================================
echo   Server startet ...
echo   Die Website oeffnet sich gleich im Browser:
echo   http://localhost:3000
echo.
echo   Zum Beenden: dieses Fenster schliessen.
echo  ============================================
echo.

REM Browser nach kurzer Wartezeit oeffnen (Server braucht ein paar Sekunden)
start /b cmd /c "timeout /t 8 >nul & start http://localhost:3000"

call npm run dev
pause
