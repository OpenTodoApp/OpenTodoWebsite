---
app: Things
title: Moving from Things
summary: Things has no export button, but OpenTodo reads a copy of its database, with a preview before anything is written. Areas, projects, headings, to-dos, checklists, tags, notes, deadlines, Someday and This Evening come across.
checkedOn: 2026-10-15
sources: [/docs/import/, /docs/import-export/, /docs/project-flows/, /docs/deadlines-and-start-dates/, /docs/day-parts/, /docs/views/]
importFormat: things-db
compare: things
order: 2
keeps:
  - To-dos, with their notes
  - Areas as parent projects, with their projects inside
  - Headings, as sections
  - Checklist items, as subtasks (checked ones completed)
  - Tags, as labels (nested tags as parent and child)
  - The When date, as the due date, and its reminder time
  - Deadlines, as deadlines
  - Someday, as parked tasks
  - This Evening
  - Repeating to-dos, when OpenTodo's repeat rules can say the same
  - The Logbook, as completed tasks (canceled ones get the label canceled)
drops:
  - Trashed items
  - Repeat rules OpenTodo cannot express; set those again by hand
  - Things Cloud sharing (share the project again in OpenTodo)
terms:
  - them: "To-do"
    us: "Task"
  - them: "Project"
    us: "Project"
  - them: "Area"
    us: "Parent project, with the Area flow"
    note: "An Area imports as the project above its projects; mark it as an area so it never shows progress or asks for a next action."
  - them: "Heading"
    us: "Section"
    note: "Also the columns of the board."
  - them: "Tag"
    us: "Label"
  - them: "Deadline"
    us: "Deadline"
  - them: "When (a date)"
    us: "Due date"
  - them: "This Evening"
    us: "This Evening"
    note: "Morning and Afternoon exist too, once day parts are on."
  - them: "Someday"
    us: "Someday"
  - them: "Checklist"
    us: "Subtasks"
  - them: "Logbook"
    us: "Completed"
  - them: "Repeating to-do"
    us: "Repeat rule"
---
## Before you start

<!-- no-claim -->
At the time of checking, Things offers no export to CSV or text: its data lives in a database file meant for the app itself. Cultured Code's support article "Accessing the Things database" explains how to make a copy, and that copy is what OpenTodo imports.

The file is read on your server from a private copy, read-only, and deleted right after the preview or the import. [Things database](/docs/import/#things-database-things-db)

## Copy the database

1. Quit Things: the copy must be made while the app is closed. [Things database](/docs/import/#things-database-things-db)
2. On a Mac, open `~/Library/Group Containers/JLMPQHK86H.com.culturedcode.ThingsMac/`, then the `ThingsData-…` folder, and copy (do not move) `Things Database.thingsdatabase`. [Things database](/docs/import/#things-database-things-db)
3. Upload its `main.sqlite` (right-click the copy and choose **Show Package Contents**), or a ZIP of the whole folder. On iPhone or iPad the same article describes a diagnostics code that sends `Things Database.aar`; tap it to unpack it into the same folder. [Things database](/docs/import/#things-database-things-db)

## Import into OpenTodo

1. Open **Settings → Data → Import data…** and choose the file. [Import from another app](/docs/import-export/#import-from-another-app)
2. In the preview, check the detected format and the row list. Problems are listed first, with the row number and the reason. Nothing is written yet. [Import from another app](/docs/import-export/#import-from-another-app)
3. Select **Import**. Importing the same file twice creates nothing new, and an import can be undone. [Undo an import](/docs/import-export/#undo-an-import)

## Your first week

- Mark each imported Area as an area: **Flow…** in its menu, then **Area**. It shows no progress and is never listed as without a next action in the weekly review. [Areas](/docs/project-flows/#areas)
- A Things project whose steps go in order can be **Sequential**: only the first open step is available, and the next one comes up when you complete it. [Sequential projects](/docs/project-flows/#sequential-projects)
- To group Today the way Things does, turn on **Group by day part** in **Settings → General → Start view and briefing**: Today then lists **Morning**, **Afternoon** and **This Evening**. [Day parts](/docs/day-parts/#turn-them-on)
- Someday is a list of its own, and <kbd>n</kbd> parks a task there or brings it back. A start date defers a task until its day, like a Things When date in the future. [When a task starts](/docs/deadlines-and-start-dates/#when-a-task-starts)
- Quick add replaces Things' Magic Plus: `Buy stamps tomorrow #Errands @town`. [Quick add syntax](/docs/quick-add/)
- On your iPhone, install the app from Safari and turn on notifications in it; Things' native polish is one of the places it stays ahead, as the comparison says. [Put OpenTodo on your phone](/how-to/install-on-your-phone/) [On iPhone and iPad](/docs/notifications/#on-iphone-and-ipad)
