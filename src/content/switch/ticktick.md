---
app: TickTick
title: Moving from TickTick
summary: TickTick's backup is already a CSV. Rename a few columns, convert the priority numbers, import with a preview. Lists, tags, dates, repeat rules and completed tasks come across; habits and the Pomodoro log do not.
checkedOn: 2026-10-15
sources: [/docs/import/, /docs/import-export/, /docs/recurring-and-reminders/, /docs/time-blocking/]
importFormat: ticktick-csv
order: 3
keeps:
  - Tasks, with their content as descriptions
  - Lists, as projects; folders as parent projects if you want them
  - Kanban columns, as sections
  - Tags, as labels
  - Due dates and times
  - Repeat rules written as RRULE, which OpenTodo reads when it can express them
  - Completed tasks, once the status column is converted
  - Subtasks, through the parent id column
drops:
  - Habits and their streaks, and the Pomodoro and focus records
  - Start dates (not in this release)
  - Reminders, unless the preview can read TickTick's spelling; set them again if not
  - Attachments and comments
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
    us: "No equivalent"
    note: "Habits are on the roadmap, not in this release."
  - them: "Filter / Smart list"
    us: "Saved view"
---
## Before you start

<!-- no-claim -->
At the time of checking, TickTick's export is a backup made from the web app (Settings → Account → **Generate Backup**), which downloads a CSV file of every list. The file starts with a few lines of notes above the real header, and its columns include `Folder Name`, `List Name`, `Title`, `Content`, `Tags`, `Due Date`, `Reminder`, `Repeat`, `Priority`, `Status`, `Completed Time`, `Column Name`, `taskId` and `parentId`. Trust your own file over this page.

OpenTodo reads a CSV with a header row and a `title` column; spaces in header names count as underscores, so `Due Date` is already `due_date`. The columns it understands are in the [import reference](/docs/import/#csv-csv).

## Export from TickTick

1. In the TickTick web app, open **Settings → Account** and select **Generate Backup**. Download the CSV. <!-- checked 2026-10-15 --> [Import formats](/docs/import/#csv-csv)
2. Open it in a spreadsheet and delete the note lines above the header row, so the header is the first line. [Import formats](/docs/import/#formats)

## Tidy the file

1. **Rename `Content` to `description`.** OpenTodo would otherwise read `content` as a second title column. [CSV columns](/docs/import/#csv-csv)
2. **Rename `List Name` to `project`** and **`Column Name` to `section`**. Lists become projects and Kanban columns become sections. [Sections](/docs/import/#sections)
3. **Rename `taskId` to `id` and `parentId` to `parent`.** Subtasks then find their parents. [Mapping rules](/docs/import/#mapping-rules)
4. **Convert `Priority`.** TickTick writes 5 (high), 3 (medium), 1 (low) and 0 (none); OpenTodo wants 1 to 4 with 1 the highest. Replace 5 with 1, 3 with 2, 1 with 3 and 0 with 4 (or with the words `high`, `medium`, `low`, `none`). [CSV columns](/docs/import/#csv-csv)
5. **Convert `Status`.** TickTick marks completed tasks with 2; rename the column to `completed` and replace 2 with `yes`, everything else with nothing. Completion times come from `Completed Time` if you rename it `completed_at`. [CSV columns](/docs/import/#csv-csv)
6. **Leave `Tags`, `Due Date` and `Repeat` as they are.** Tags become labels, `Due Date` is read as a date-time, and RRULE repeat rules are read when the rule can be expressed; the preview names any it cannot. [Recurrence](/docs/import/#recurrence)
7. **Reminders:** OpenTodo reads durations such as `-PT15M` and `1 day`; if the preview does not accept TickTick's spelling, delete the column and set reminders again in the app. [Reminders](/docs/import/#reminders)

## Import into OpenTodo

1. Open **Settings → Data → Import data…** and choose the file. [Import from another app](/docs/import-export/#import-from-another-app)
2. In the preview, check the time zone (dates with a zone are converted to it), then read the row list; problems come first with the row number and the reason. Nothing is written yet. [Import from another app](/docs/import-export/#import-from-another-app)
3. Select **Import**. One file brings all your lists; the tasks reach every device on its next sync. An import can be undone. [Undo an import](/docs/import-export/#undo-an-import)

## Your first week

- Pomodoro habits: give tasks an estimate (`+25m` in quick add, or <kbd>e</kbd>) and plan them on the Day calendar; the header shows whether the day fits. [Plan your day](/how-to/plan-your-day/) [Estimate how long a task takes](/docs/time-blocking/#estimate-how-long-a-task-takes)
- Smart lists become saved views: `due <= 7 days & p1`, `@errand & !completed`. [Save a filter as a view](/how-to/save-a-filter-as-a-view/) [Save your own views](/docs/views/#save-your-own-views)
- Turn on notifications on each device so reminders arrive while the app is closed. [Get reminders on your phone](/how-to/reminders-on-your-phone/) [Get reminders when the app is closed](/docs/notifications/#get-reminders-when-the-app-is-closed)
- Share the lists you shared before, with a role per person. [Share a project](/how-to/share-a-project/) [Share a project](/docs/sharing/#share-a-project)
