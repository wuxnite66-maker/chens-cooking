@echo off
title Chen's Cooking - Immer-online-Einrichtung
cd /d "%~dp0"

echo.
echo  ==========================================================
echo   Chen's Cooking - Website dauerhaft auf diesem PC einrichten
echo  ==========================================================
echo.

REM 1) Node.js pruefen
where node >nul 2>nul
if errorlevel 1 (
  echo  Node.js ist noch nicht installiert.
  echo  Bitte von https://nodejs.org die LTS-Version installieren
  echo  und diese Datei danach erneut doppelklicken.
  echo.
  pause
  exit /b 1
)

REM 2) Pakete installieren (nur beim ersten Mal)
if not exist node_modules (
  echo  Schritt 1/3: Pakete werden installiert - bitte warten ...
  echo.
  call npm install
)

REM 3) Website bauen (nur beim ersten Mal)
if not exist .next\BUILD_ID (
  echo.
  echo  Schritt 2/3: Website wird gebaut - bitte warten ...
  echo.
  call npm run build
)

REM 4) Autostart einrichten: startet den Server bei jedem Windows-Start unsichtbar
echo.
echo  Schritt 3/3: Autostart wird eingerichtet ...
set "STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
(
  echo Set shell = CreateObject^("WScript.Shell"^)
  echo shell.Run "wscript.exe ""%~dp0server-leise.vbs""", 0, False
) > "%STARTUP%\ChensCooking-Server.vbs"

REM 5) Server jetzt sofort im Hintergrund starten und Browser oeffnen
wscript.exe "%~dp0server-leise.vbs"
echo.
echo  ==========================================================
echo   FERTIG! Die Website laeuft jetzt dauerhaft im Hintergrund.
echo.
echo   Adresse (im Browser als Lesezeichen speichern):
echo   http://localhost:3000
echo.
echo   Sie startet ab jetzt bei jedem PC-Start automatisch mit -
echo   ganz ohne schwarzes Fenster.
echo.
echo   Zum Entfernen: IMMER-ONLINE-ENTFERNEN.bat doppelklicken.
echo  ==========================================================
echo.
timeout /t 8 >nul
start http://localhost:3000
pause
