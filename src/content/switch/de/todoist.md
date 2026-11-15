---
app: Todoist
lang: de
title: Von Todoist wechseln
summary: Lade eine Todoist-Sicherung herunter und importiere die ZIP-Datei unverändert, mit einer Vorschau, bevor etwas geschrieben wird. Projekte, Abschnitte, Unteraufgaben, Labels, Prioritäten, Daten, wiederkehrende Aufgaben, Erinnerungen, Fristen und Schätzungen kommen mit; Kommentare landen in der Beschreibung, Zuweisungen nicht.
checkedOn: 2026-10-30
sources: [/docs/import/, /docs/import-export/, /docs/switch/todoist/, /docs/quick-add/, /docs/recurring-and-reminders/, /docs/deadlines-and-start-dates/]
importFormat: todoist-backup
order: 1
keeps:
  - Projekte mit ihren Namen, und Abschnitte, in derselben Reihenfolge (Boards öffnen sich als Boards)
  - Unteraufgaben, anhand ihrer Einrückung
  - Prioritäten P1 bis P4, dieselbe Skala
  - In Aufgaben geschriebene Labels (@besorgungen), aus dem Titel entfernt
  - Beschreibungen, und Dauern als Schätzungen
  - Fälligkeitsdaten und -zeiten, in der Sprache, in der du Todoist benutzt hast (sechs Sprachen)
  - Wiederkehrende Daten, wenn die Wiederholungsregeln von OpenTodo sie ausdrücken können
  - Erinnerungen mit einer Uhrzeit oder einem Abstand
  - Fristen, als Fristen
drops:
  - Kommentare, die unter „Kommentare“ an die Beschreibung angehängt werden, weil ihre Verfasser nicht erhalten bleiben können
  - Zuweisungen (lade die Personen ein und teile das Projekt erneut)
  - Daten oder Regeln, die der Import nicht lesen kann (die Aufgabe kommt ohne Fälligkeitsdatum an, mit einer Warnung, die sie zitiert)
  - Karma, Filter und das Teilen von Projekten
terms:
  - them: "Aufgabe"
    us: "Aufgabe"
  - them: "Projekt"
    us: "Projekt"
    note: "Projekte lassen sich genauso verschachteln."
  - them: "Abschnitt"
    us: "Abschnitt"
    note: "Auf dem Board als Spalten angezeigt."
  - them: "Label"
    us: "Label"
    note: "In OpenTodo persönlich, auch in geteilten Projekten."
  - them: "Priorität P1 bis P4"
    us: "Priorität P1 bis P4"
    note: "1 ist in beiden die höchste."
  - them: "Fälligkeitsdatum mit wiederkehrender Angabe"
    us: "Fälligkeitsdatum plus eine Wiederholungsregel"
    note: "Tipp es in die Schnelleingabe (every monday) oder stell es im Aufgabenbereich ein."
  - them: "Filter"
    us: "Gespeicherte Ansicht"
  - them: "Erinnerung"
    us: "Erinnerung"
  - them: "Unteraufgabe"
    us: "Unteraufgabe"
  - them: "Karma"
    us: "Keine Entsprechung"
---
## Bevor du anfängst

<!-- no-claim -->
Zum Zeitpunkt der Prüfung bewahrt Todoist Sicherungen aller Projekte als ZIP-Datei in seinen Einstellungen auf (such nach **Backups**). Ein einzelnes Projekt lässt sich auch über sein Menü als CSV exportieren, aber eine einzelne CSV-Datei nennt ihr Projekt nicht. Verlass dich eher auf deine eigene Datei als auf diese Seite.

OpenTodo erkennt die Sicherung so, wie sie ist: nichts umbenennen, keine Tabelle. [Todoist](/docs/import/#todoist-todoist-csv-todoist-backup)

## Aus Todoist exportieren

1. Öffne in Todoist die Einstellungen, such **Backups** und lade die neueste Sicherung herunter, eine ZIP-Datei wie `Todoist_backup_2026-09-19.zip`. <!-- checked 2026-10-30 --> [Von Todoist wechseln](/docs/switch/todoist/#export-from-todoist)

## In OpenTodo importieren

1. Öffne **Einstellungen → Daten → Daten importieren…** und wähle die ZIP-Datei. Die Vorschau zeigt **Todoist-Sicherung (ZIP)** und listet jedes Projekt, jeden Abschnitt und jede Aufgabe. [Von Todoist wechseln](/docs/switch/todoist/#import-into-opentodo)
2. Wähle in der Vorschau eine Zeitzone, wenn deine Aufgaben Uhrzeiten haben, und lies die Warnungen und die Zeilenliste. Noch wird nichts geschrieben. [Aus einer anderen App importieren](/docs/import-export/#import-from-another-app)
3. Wähle **Importieren**. Die Aufgaben erreichen alle deine Geräte bei ihrer nächsten Synchronisierung. [Aus einer anderen App importieren](/docs/import-export/#import-from-another-app)
4. Nicht zufrieden? **Rückgängig** unter **Frühere Importe** entfernt alles, was dieser Import angelegt hat, und du kannst die Datei mit anderen Optionen erneut importieren. [Einen Import rückgängig machen](/docs/import-export/#undo-an-import)

## Deine erste Woche

- Bau deine Todoist-Filter als gespeicherte Ansichten nach: `@waiting & open`, `#Work & p1 & due <= tomorrow`. Die Syntax ist der von Todoist ähnlich. [Einen Filter als Ansicht speichern](/how-to/save-a-filter-as-a-view/) [Aufgaben mit einem Filter finden](/docs/labels-and-filters/#find-tasks-with-a-filter)
- Schalte auf jedem Gerät die Benachrichtigungen ein, damit die importierten Erinnerungen ankommen, während die App geschlossen ist. [Eine Erinnerung setzen](/how-to/set-a-reminder/) [Eine Erinnerung hinzufügen](/docs/recurring-and-reminders/#add-a-reminder)
- Teile die Projekte, die du vorher geteilt hast, mit einer Rolle pro Person. [Ein Projekt teilen](/how-to/share-a-project/) [Ein Projekt teilen](/docs/sharing/#share-a-project)
- Die Schnelleingabe funktioniert wie die von Todoist: `Call Sam tomorrow 3pm #Work @call p2`, und `every monday` setzt eine Wiederholungsregel. [Syntax der Schnelleingabe](/docs/quick-add/) [Wiederholen und erinnern](/docs/quick-add/#repeat-and-remind)
- Behalte die Sicherung, bis du dir sicher bist. Ein Import lässt sich jederzeit rückgängig machen, und dieselbe Datei zweimal importiert legt nichts Neues an. [Duplikate](/docs/import-export/#duplicates)
