---
app: Microsoft To Do
title: Moving from Microsoft To Do
summary: Microsoft To Do has no export button, but a short PowerShell script reads your lists through Microsoft Graph into one file that OpenTodo imports, with a preview before anything is written. Lists, steps, due dates, reminders and most repeats come across.
checkedOn: 2026-11-06
sources: [/docs/switch/microsoft-todo/, /docs/import/, /docs/import-export/, /docs/sharing/, /docs/recurring-and-reminders/, /docs/quick-add/]
importFormat: microsoft-todo-json
order: 10
keeps:
  - Every list, as a project; your default Tasks list goes to the Inbox
  - Titles, notes as plain text, and steps as subtasks
  - Important tasks as priority 1, and categories as labels
  - Due and start dates as To Do shows them, and reminders at their moment
  - Repeats every few days, on weekdays, on a day of the month or once a year
  - Linked resources, such as the email a task came from, as link attachments
  - Completed tasks, with the time they were completed
drops:
  - Repeats such as "the second Thursday of the month", and repeat end dates (dropped with a warning)
  - File attachments, which are not in the exported file (dropped with a warning)
  - Sharing (shared lists arrive as your own projects; share them again)
terms:
  - them: "List"
    us: "Project"
  - them: "Tasks (the default list)"
    us: "Inbox"
  - them: "Step"
    us: "Subtask"
  - them: "Important"
    us: "Priority 1"
  - them: "Category"
    us: "Label"
  - them: "Shared list"
    us: "Shared project"
    note: "With a role per person."
---
## Before you start

<!-- no-claim -->
At the time of checking, Microsoft To Do has no export button. Microsoft Graph, the service behind it, lets you read your own lists, and a short script saves them to one file. Signing in only allows reading: nothing changes in To Do. Trust your own screen over this page.

OpenTodo recognises that file as it is. [Microsoft To Do](/docs/import/#microsoft-to-do-microsoft-todo-json)

## Export from Microsoft To Do

1. Install PowerShell 7 (Windows, macOS or Linux) and run the script on the switch guide in the docs. It opens a Microsoft sign-in page, asks to read your tasks, and writes `todo.json` in the current folder. <!-- checked 2026-11-06 --> [Switch from Microsoft To Do](/docs/switch/microsoft-todo/#export-from-microsoft-to-do)
2. No PowerShell? The same guide shows how to read your lists in Graph Explorer and paste them into one file. [Switch from Microsoft To Do](/docs/switch/microsoft-todo/#export-from-microsoft-to-do)

## Import into OpenTodo

1. Open **Settings → Data → Import data…** and choose `todo.json`. The preview shows **Microsoft To Do (JSON from the PowerShell script)** and lists every project and task. [Switch from Microsoft To Do](/docs/switch/microsoft-todo/#import-into-opentodo)
2. Read the warnings and the row list. Nothing is written yet. [Import from another app](/docs/import-export/#import-from-another-app)
3. Select **Import**. The tasks reach all your devices on their next sync. [Import from another app](/docs/import-export/#import-from-another-app)
4. Not happy? **Undo** under **Past imports** removes everything that import created. [Undo an import](/docs/import-export/#undo-an-import)

## Your first week

- Share the lists you shared before, with a role per person. [Share a project](/how-to/share-a-project/) [Share a project](/docs/sharing/#share-a-project)
- Turn on notifications on each device so the imported reminders arrive while the app is closed. [Set a reminder](/how-to/set-a-reminder/) [Add a reminder](/docs/recurring-and-reminders/#add-a-reminder)
- Add tasks the way you say them: `Water the plants every monday #Home` sets the repeat rule and the project in one line. [Quick add syntax](/docs/quick-add/) [Repeat and remind](/docs/quick-add/#repeat-and-remind)
- Keep `todo.json` until you are sure. An import can be undone at any time. [Undo an import](/docs/import-export/#undo-an-import)
