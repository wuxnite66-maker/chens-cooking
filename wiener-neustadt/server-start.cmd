@echo off
REM Interner Helfer: startet den Website-Server (wird von server-leise.vbs
REM unsichtbar im Hintergrund aufgerufen). Nicht direkt noetig.
cd /d "%~dp0"

REM Node.js vorhanden?
where node >nul 2>nul || exit /b 1

REM Laeuft der Server schon auf Port 3000? Dann nichts tun.
netstat -ano | findstr ":3000 " | findstr "LISTENING" >nul && exit /b 0

REM Erste Einrichtung falls noetig
if not exist node_modules call npm install
if not exist .next\BUILD_ID call npm run build

call npm start
