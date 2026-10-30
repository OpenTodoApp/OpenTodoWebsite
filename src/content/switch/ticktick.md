---
app: TickTick
title: Moving from TickTick
summary: TickTick's backup is one CSV, and OpenTodo reads it as it is, with a preview before anything is written. Folders, lists, board columns, checklists, tags, priorities, dates, reminders, repeat rules and completed tasks come across; start dates, habits and the Pomodoro log do not.
checkedOn: 2026-10-30
sources: [/docs/import/, /docs/import-export/, /docs/switch/ticktick/, /docs/recurring-and-reminders/, /docs/deadlines-and-start-dates/, /docs/time-blocking/]
importFormat: ticktick-csv
order: 3
keeps:
  - Tasks, with their content as descriptions
  - Folders, as parent projects, with their lists as projects inside
  - Kanban columns, as sections (lists you used as a board open as boards)
  - Checklists, as a task with one subtask per item (checked items completed)
  - Subtasks and tags (as labels)
  - Priorities high, medium, low and none, as P1 to P4
  - Due dates and times as you saw them, all-day tasks as dates
  - Reminders, and repeat rules when OpenTodo can express them
  - Completed tasks; abandoned ones are completed with the label canceled
drops:
  - Start dates (OpenTodo has them, but the import does not read TickTick's; set them again)
  - Repeat rules OpenTodo cannot express (dropped with a warning; the task is kept)
  - Habits and their streaks, and the Pomodoro and focus records (not in the backup)
  - Attachments and comments (not in the backup)
  - Calendar subscriptions and shared lists (share again in OpenTodo)
terms:
  - them: "Task"
    us: "Task"
  - them: "List"
    us: "Project"
  - them: "Folder"
    us: "Parent project"
  - them: "Section / Kanban column"
    us: "Section"
  - them: "Tag"
    us: "Label"
  - them: "Priority High, Medium, Low, None"
    us: "Priority P1, P2, P3, P4"
  - them: "Repeat"
    us: "Repeat rule"
  - them: "Reminder"
    us: "Reminder"
  - them: "Pomodoro / estimated duration"
    us: "Estimate"
    note: "Estimates feed the Day and Week calendar."
  - them: "Habit"
    us: "Repeating task tracked as a habit"
    note: "Turn on Track as a habit under Repeat; TickTick's habits are not in its backup, so set them up again."
  - them: "Filter / Smart list"
    us: "Saved view"
---
## Before you start

<!-- no-claim -->
At the time of checking, TickTick's export is a backup made from its settings (look for **Backup**), which downloads one CSV file of every list, named like `TickTick-backup-2026-10-14.csv`. Trust your own file over this page.

OpenTodo recognises the backup as it is: no renaming, no spreadsheet. The few lines of notes above the header are skipped. [TickTick](/docs/import/#ticktick-ticktick-csv)

## Export from TickTick

1. In TickTick, open its settings, find **Backup** and download the CSV. <!-- checked 2026-10-30 --> [Switch from TickTick](/docs/switch/ticktick/#export-from-ticktick)

## Import into OpenTodo

1. Open **Settings → Data → Import data…** and choose the file. The preview shows **TickTick backup (CSV)**. [Switch from TickTick](/docs/switch/ticktick/#import-into-opentodo)
2. In the preview, check the warnings and the row list; problems come first with the row number and the reason. Nothing is written yet. [Import from another app](/docs/import-export/#import-from-another-app)
3. Select **Import**. One file brings all your lists; the tasks reach every device on its next sync. An import can be undone. [Undo an import](/docs/import-export/#undo-an-import)

## Your first week

- Start dates: a task can wait until its day and leave Today until then; set them again on the tasks that had one in TickTick. [When a task starts](/docs/deadlines-and-start-dates/#when-a-task-starts)
- Habits: give a repeating task **Track as a habit** under **Repeat**; its row shows a streak. [Track a habit](/docs/recurring-and-reminders/#track-a-habit)
- Pomodoro habits: give tasks an estimate (`+25m` in quick add, or <kbd>e</kbd>) and plan them on the Day calendar; the header shows whether the day fits. [Plan your day](/how-to/plan-your-day/) [Estimate how long a task takes](/docs/time-blocking/#estimate-how-long-a-task-takes)
- Smart lists become saved views: `due <= 7 days & p1`, `@errand & !completed`. [Save a filter as a view](/how-to/save-a-filter-as-a-view/) [Save your own views](/docs/views/#save-your-own-views)
- Turn on notifications on each device so reminders arrive while the app is closed. [Get reminders on your phone](/how-to/reminders-on-your-phone/) [Get reminders when the app is closed](/docs/notifications/#get-reminders-when-the-app-is-closed)
- Share the lists you shared before, with a role per person. [Share a project](/how-to/share-a-project/) [Share a project](/docs/sharing/#share-a-project)
