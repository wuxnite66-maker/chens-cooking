@echo off
title Chen's Cooking - Immer-online entfernen
echo.
echo  Autostart-Eintrag wird entfernt ...
del "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\ChensCooking-Server.vbs" 2>nul

echo  Laufender Server wird gestoppt ...
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":3000 " ^| findstr "LISTENING"') do taskkill /f /pid %%p >nul 2>nul

echo.
echo  Erledigt. Die Website startet nicht mehr automatisch.
echo  (Mit IMMER-ONLINE-EINRICHTEN.bat jederzeit wieder aktivierbar.)
echo.
pause
