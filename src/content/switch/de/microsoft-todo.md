---
app: Microsoft To Do
lang: de
title: Von Microsoft To Do wechseln
summary: Microsoft To Do hat keine Export-Schaltfläche, aber ein kurzes PowerShell-Skript liest deine Listen über Microsoft Graph in eine Datei, die OpenTodo importiert, mit einer Vorschau, bevor etwas geschrieben wird. Listen, Schritte, Fälligkeitsdaten, Erinnerungen und die meisten Wiederholungen kommen mit.
checkedOn: 2026-11-24
sources: [/docs/switch/microsoft-todo/, /docs/import/, /docs/import-export/, /docs/sharing/, /docs/recurring-and-reminders/, /docs/quick-add/]
importFormat: microsoft-todo-json
order: 10
keeps:
  - Jede Liste, als Projekt; deine Standardliste „Aufgaben“ kommt in den Eingang
  - Titel, Notizen als reiner Text, und Schritte als Unteraufgaben
  - Wichtige Aufgaben als Priorität 1, und Kategorien als Labels
  - Fälligkeits- und Startdaten so, wie To Do sie anzeigt, und Erinnerungen zu ihrem Zeitpunkt
  - Wiederholungen alle paar Tage, an Wochentagen, an einem Tag des Monats oder einmal im Jahr
  - Verknüpfte Ressourcen, etwa die E-Mail, aus der eine Aufgabe entstand, als Link-Anhänge
  - Erledigte Aufgaben, mit dem Zeitpunkt, an dem sie erledigt wurden
drops:
  - Wiederholungen wie „der zweite Donnerstag im Monat“ und Enddaten von Wiederholungen (mit einer Warnung ausgelassen)
  - Dateianhänge, die nicht in der exportierten Datei stehen (mit einer Warnung ausgelassen)
  - Teilen (geteilte Listen kommen als deine eigenen Projekte an; teile sie erneut)
terms:
  - them: "Liste"
    us: "Projekt"
  - them: "Aufgaben (die Standardliste)"
    us: "Eingang"
  - them: "Schritt"
    us: "Unteraufgabe"
  - them: "Wichtig"
    us: "Priorität 1"
  - them: "Kategorie"
    us: "Label"
  - them: "Freigegebene Liste"
    us: "Geteiltes Projekt"
    note: "Mit einer Rolle pro Person."
---
## Bevor du anfängst

<!-- no-claim -->
Zum Zeitpunkt der Prüfung hat Microsoft To Do keine Export-Schaltfläche. Microsoft Graph, der Dienst dahinter, lässt dich deine eigenen Listen lesen, und ein kurzes Skript speichert sie in einer Datei. Die Anmeldung erlaubt nur das Lesen: In To Do ändert sich nichts. Verlass dich eher auf deinen eigenen Bildschirm als auf diese Seite.

OpenTodo erkennt diese Datei so, wie sie ist. [Microsoft To Do](/docs/import/#microsoft-to-do-microsoft-todo-json)

## Aus Microsoft To Do exportieren

1. Installiere PowerShell 7 (Windows, macOS oder Linux) und führe das Skript aus. Es öffnet eine Microsoft-Anmeldeseite, bittet darum, deine Aufgaben lesen zu dürfen, und schreibt `todo.json`. Das aktuelle Skript, das auch mit privaten Microsoft-Konten funktioniert, steht in [diesem Beitrag](/blog/leaving-microsoft-to-do/) (auf Englisch). <!-- checked 2026-11-24 --> Die Wechselanleitung in der Dokumentation hat eine ältere Fassung. [Von Microsoft To Do wechseln](/docs/switch/microsoft-todo/#export-from-microsoft-to-do)
2. Kein PowerShell? Dieselbe Anleitung zeigt, wie du deine Listen im Graph Explorer liest und in eine Datei einfügst. [Von Microsoft To Do wechseln](/docs/switch/microsoft-todo/#export-from-microsoft-to-do)

## In OpenTodo importieren

1. Öffne **Einstellungen → Daten → Daten importieren…** und wähle `todo.json`. Die Vorschau zeigt **Microsoft To Do (JSON aus dem PowerShell-Skript)** und listet jedes Projekt und jede Aufgabe. [Von Microsoft To Do wechseln](/docs/switch/microsoft-todo/#import-into-opentodo)
2. Lies die Warnungen und die Zeilenliste. Noch wird nichts geschrieben. [Aus einer anderen App importieren](/docs/import-export/#import-from-another-app)
3. Wähle **Importieren**. Die Aufgaben erreichen alle deine Geräte bei ihrer nächsten Synchronisierung. [Aus einer anderen App importieren](/docs/import-export/#import-from-another-app)
4. Nicht zufrieden? **Rückgängig** unter **Frühere Importe** entfernt alles, was dieser Import angelegt hat. [Einen Import rückgängig machen](/docs/import-export/#undo-an-import)

## Deine erste Woche

- Teile die Listen, die du vorher geteilt hast, mit einer Rolle pro Person. [Ein Projekt teilen](/how-to/share-a-project/) [Ein Projekt teilen](/docs/sharing/#share-a-project)
- Schalte auf jedem Gerät die Benachrichtigungen ein, damit die importierten Erinnerungen ankommen, während die App geschlossen ist. [Eine Erinnerung setzen](/how-to/set-a-reminder/) [Eine Erinnerung hinzufügen](/docs/recurring-and-reminders/#add-a-reminder)
- Füge Aufgaben so hinzu, wie du sie sagst: `Water the plants every monday #Home` setzt die Wiederholungsregel und das Projekt in einer Zeile. [Syntax der Schnelleingabe](/docs/quick-add/) [Wiederholen und erinnern](/docs/quick-add/#repeat-and-remind)
- Behalte `todo.json`, bis du dir sicher bist. Ein Import lässt sich jederzeit rückgängig machen. [Einen Import rückgängig machen](/docs/import-export/#undo-an-import)
