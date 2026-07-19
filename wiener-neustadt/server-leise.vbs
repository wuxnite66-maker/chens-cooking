' Startet den Website-Server unsichtbar im Hintergrund (kein schwarzes Fenster).
' Wird von IMMER-ONLINE-EINRICHTEN.bat und vom Windows-Autostart aufgerufen.
Set fso = CreateObject("Scripting.FileSystemObject")
projektOrdner = fso.GetParentFolderName(WScript.ScriptFullName)
Set shell = CreateObject("WScript.Shell")
shell.Run "cmd /c """ & projektOrdner & "\server-start.cmd""", 0, False
