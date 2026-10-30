---
app: Todoist
title: Moving from Todoist
summary: Download a Todoist backup and import the ZIP as it is, with a preview before anything is written. Projects, sections, subtasks, labels, priorities, dates, recurring tasks, reminders, deadlines and estimates come across; comments arrive in the description, assignees do not.
checkedOn: 2026-10-30
sources: [/docs/import/, /docs/import-export/, /docs/switch/todoist/, /docs/quick-add/, /docs/recurring-and-reminders/, /docs/deadlines-and-start-dates/]
importFormat: todoist-backup
compare: todoist
order: 1
keeps:
  - Projects, with their names, and sections, in the same order (boards open as boards)
  - Subtasks, by their indent
  - Priorities P1 to P4, the same scale
  - Labels written in tasks (@errands), removed from the title
  - Descriptions, and durations as estimates
  - Due dates and times, in the language you used Todoist in (six languages)
  - Recurring dates, when OpenTodo's repeat rules can express them
  - Reminders with a time or an offset
  - Deadlines, as deadlines
drops:
  - Comments, which are added to the description under "Comments" because their authors cannot be kept
  - Assignees (invite people and share the project again)
  - Dates or rules the import cannot read (the task arrives without a due date, with a warning quoting them)
  - Karma, filters and project sharing
terms:
  - them: "Task"
    us: "Task"
  - them: "Project"
    us: "Project"
    note: "Projects nest the same way."
  - them: "Section"
    us: "Section"
    note: "Shown as columns on the board."
  - them: "Label"
    us: "Label"
    note: "Personal in OpenTodo, even on shared projects."
  - them: "Priority P1 to P4"
    us: "Priority P1 to P4"
    note: "1 is highest in both."
  - them: "Due date with a recurring phrase"
    us: "Due date plus a Repeat rule"
    note: "Type it in quick add (every monday) or set it in the task panel."
  - them: "Filter"
    us: "Saved view"
  - them: "Reminder"
    us: "Reminder"
  - them: "Sub-task"
    us: "Subtask"
  - them: "Karma"
    us: "No equivalent"
---
## Before you start

<!-- no-claim -->
At the time of checking, Todoist keeps backups of every project as a ZIP file in its settings (look for **Backups**). A single project can also be exported as CSV from its menu, but a lone CSV file does not name its project. Trust your own file over this page.

OpenTodo recognises the backup as it is: no renaming, no spreadsheet. [Todoist](/docs/import/#todoist-todoist-csv-todoist-backup)

## Export from Todoist

1. In Todoist, open its settings, find **Backups** and download the latest one, a ZIP file such as `Todoist_backup_2026-09-19.zip`. <!-- checked 2026-10-30 --> [Switch from Todoist](/docs/switch/todoist/#export-from-todoist)

## Import into OpenTodo

1. Open **Settings → Data → Import data…** and choose the ZIP file. The preview shows **Todoist backup (ZIP)** and lists every project, section and task. [Switch from Todoist](/docs/switch/todoist/#import-into-opentodo)
2. In the preview, choose a time zone if your tasks have times, and read the warnings and the row list. Nothing is written yet. [Import from another app](/docs/import-export/#import-from-another-app)
3. Select **Import**. The tasks reach all your devices on their next sync. [Import from another app](/docs/import-export/#import-from-another-app)
4. Not happy? **Undo** under **Past imports** removes everything that import created, and you can import the file again with different options. [Undo an import](/docs/import-export/#undo-an-import)

## Your first week

- Rebuild your Todoist filters as saved views: `@waiting & open`, `#Work & p1 & due <= tomorrow`. The syntax is close to Todoist's. [Save a filter as a view](/how-to/save-a-filter-as-a-view/) [Find tasks with a filter](/docs/labels-and-filters/#find-tasks-with-a-filter)
- Turn on notifications on each device so the imported reminders arrive while the app is closed. [Set a reminder](/how-to/set-a-reminder/) [Add a reminder](/docs/recurring-and-reminders/#add-a-reminder)
- Share the projects you shared before, with a role per person. [Share a project](/how-to/share-a-project/) [Share a project](/docs/sharing/#share-a-project)
- Quick add works like Todoist's: `Call Sam tomorrow 3pm #Work @call p2`, and `every monday` sets a repeat rule. [Quick add syntax](/docs/quick-add/) [Repeat and remind](/docs/quick-add/#repeat-and-remind)
- Keep the backup until you are sure. An import can be undone at any time, and the same file imported twice creates nothing new. [Duplicates](/docs/import-export/#duplicates)
