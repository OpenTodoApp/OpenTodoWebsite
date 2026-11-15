---
app: Things
lang: de
title: Von Things wechseln
summary: Things hat keine Export-Schaltfläche, aber OpenTodo liest eine Kopie seiner Datenbank, mit einer Vorschau, bevor etwas geschrieben wird. Bereiche, Projekte, Überschriften, To-Dos, Checklisten, Tags, Notizen, Deadlines, Irgendwann und Heute Abend kommen mit.
checkedOn: 2026-10-15
sources: [/docs/import/, /docs/import-export/, /docs/project-flows/, /docs/deadlines-and-start-dates/, /docs/day-parts/, /docs/views/]
importFormat: things-db
order: 2
keeps:
  - To-Dos, mit ihren Notizen
  - Bereiche als übergeordnete Projekte, mit ihren Projekten darin
  - Überschriften, als Abschnitte
  - Checklisten-Einträge, als Unteraufgaben (abgehakte als erledigt)
  - Tags, als Labels (verschachtelte Tags als übergeordnet und untergeordnet)
  - Das Wann-Datum, als Fälligkeitsdatum, und seine Erinnerungszeit
  - Deadlines, als Fristen
  - Irgendwann, als geparkte Aufgaben
  - Heute Abend
  - Wiederholende To-Dos, wenn die Wiederholungsregeln von OpenTodo dasselbe sagen können
  - Das Logbuch, als erledigte Aufgaben (abgebrochene bekommen das Label canceled)
drops:
  - Objekte im Papierkorb
  - Wiederholungsregeln, die OpenTodo nicht ausdrücken kann; stell diese von Hand neu ein
  - Teilen über Things Cloud (teile das Projekt in OpenTodo erneut)
terms:
  - them: "To-Do"
    us: "Aufgabe"
  - them: "Projekt"
    us: "Projekt"
  - them: "Bereich"
    us: "Übergeordnetes Projekt, mit dem Ablauf Bereich"
    note: "Ein Bereich wird als das Projekt über seinen Projekten importiert; markiere ihn als Bereich, damit er nie Fortschritt zeigt oder nach einem nächsten Schritt fragt."
  - them: "Überschrift"
    us: "Abschnitt"
    note: "Auch die Spalten des Boards."
  - them: "Tag"
    us: "Label"
  - them: "Deadline"
    us: "Frist"
  - them: "Wann (ein Datum)"
    us: "Fälligkeitsdatum"
  - them: "Heute Abend"
    us: "Heute Abend"
    note: "Vormittag und Nachmittag gibt es auch, sobald die Tageszeiten eingeschaltet sind."
  - them: "Irgendwann"
    us: "Irgendwann"
  - them: "Checkliste"
    us: "Unteraufgaben"
  - them: "Logbuch"
    us: "Erledigt"
  - them: "Wiederholendes To-Do"
    us: "Wiederholungsregel"
---
## Bevor du anfängst

<!-- no-claim -->
Zum Zeitpunkt der Prüfung bietet Things keinen Export als CSV oder Text: Seine Daten liegen in einer Datenbankdatei, die für die App selbst gedacht ist. Der Support-Artikel „Accessing the Things database“ von Cultured Code erklärt, wie du eine Kopie anlegst, und diese Kopie importiert OpenTodo.

Die Datei wird auf deinem Server aus einer privaten Kopie gelesen, nur lesend, und direkt nach der Vorschau oder dem Import gelöscht. [Things-Datenbank](/docs/import/#things-database-things-db)

## Die Datenbank kopieren

1. Beende Things: Die Kopie muss entstehen, während die App geschlossen ist. [Things-Datenbank](/docs/import/#things-database-things-db)
2. Öffne auf einem Mac `~/Library/Group Containers/JLMPQHK86H.com.culturedcode.ThingsMac/`, dann den Ordner `ThingsData-…`, und kopiere (nicht verschieben) `Things Database.thingsdatabase`. [Things-Datenbank](/docs/import/#things-database-things-db)
3. Lade seine `main.sqlite` hoch (Rechtsklick auf die Kopie, dann **Paketinhalt zeigen**) oder eine ZIP-Datei des ganzen Ordners. Auf iPhone oder iPad beschreibt derselbe Artikel einen Diagnosecode, der `Things Database.aar` sendet; tipp darauf, um ihn in denselben Ordner zu entpacken. [Things-Datenbank](/docs/import/#things-database-things-db)

## In OpenTodo importieren

1. Öffne **Einstellungen → Daten → Daten importieren…** und wähle die Datei. [Aus einer anderen App importieren](/docs/import-export/#import-from-another-app)
2. Prüfe in der Vorschau das erkannte Format und die Zeilenliste. Probleme stehen zuerst, mit der Zeilennummer und dem Grund. Noch wird nichts geschrieben. [Aus einer anderen App importieren](/docs/import-export/#import-from-another-app)
3. Wähle **Importieren**. Dieselbe Datei zweimal zu importieren legt nichts Neues an, und ein Import lässt sich rückgängig machen. [Einen Import rückgängig machen](/docs/import-export/#undo-an-import)

## Deine erste Woche

- Markiere jeden importierten Bereich als Bereich: **Ablauf…** in seinem Menü, dann **Bereich**. Er zeigt keinen Fortschritt und wird im Wochenrückblick nie als ohne nächsten Schritt aufgeführt. [Bereiche](/docs/project-flows/#areas)
- Ein Things-Projekt, dessen Schritte in einer Reihenfolge laufen, kann **Nacheinander** sein: Nur der erste offene Schritt ist verfügbar, und der nächste kommt, wenn du ihn erledigst. [Projekte nacheinander](/docs/project-flows/#sequential-projects)
- Um Heute so zu gruppieren wie Things, schalte **Nach Tageszeit gruppieren** in **Einstellungen → Allgemein → Startansicht und Tagesüberblick** ein: Heute listet dann **Vormittag**, **Nachmittag** und **Heute Abend**. [Tageszeiten](/docs/day-parts/#turn-them-on)
- Irgendwann ist eine eigene Liste, und <kbd>n</kbd> parkt eine Aufgabe dort oder holt sie zurück. Ein Startdatum stellt eine Aufgabe bis zu ihrem Tag zurück, wie ein Wann-Datum in der Zukunft in Things. [Wann eine Aufgabe beginnt](/docs/deadlines-and-start-dates/#when-a-task-starts)
- Die Schnelleingabe ersetzt Magic Plus von Things: `Buy stamps tomorrow #Errands @town`. [Syntax der Schnelleingabe](/docs/quick-add/)
- Installiere die App auf deinem iPhone aus Safari und schalte darin die Benachrichtigungen ein; der native Feinschliff von Things ist einer der Punkte, bei denen es vorn bleibt. [OpenTodo aufs Handy bringen](/how-to/install-on-your-phone/) [Auf iPhone und iPad](/docs/notifications/#on-iphone-and-ipad)
