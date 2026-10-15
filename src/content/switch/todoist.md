---
app: Todoist
title: Moving from Todoist
summary: Export each project as CSV, tidy three columns in a spreadsheet, import with a preview. Tasks, projects, sections, subtasks, labels, priorities and dates come across; comments do not.
checkedOn: 2026-10-15
sources: [/docs/import/, /docs/import-export/, /docs/quick-add/, /docs/recurring-and-reminders/]
importFormat: todoist-csv
compare: todoist
order: 1
keeps:
  - Tasks, with their descriptions
  - Projects, one per exported file, and sections when you add a section column
  - Subtasks, when you fill the parent column
  - Priorities P1 to P4, the same scale
  - Labels, as a labels column
  - Due dates, once written as dates (2026-10-20)
  - Completed tasks, as completed
drops:
  - Comments (the preview counts them; they belong to their authors)
  - Dates written in words in Todoist's export, until you rewrite them
  - Recurring rules in Todoist's own phrasing that the import cannot read (the preview names each one)
  - Deadlines separate from the scheduled day, durations and attachments
  - Karma, filters, reminders set in Todoist, and project sharing (invite people again)
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
    note: "The rule is set in the task panel, not typed in quick add."
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
At the time of checking, Todoist exports one project at a time as a CSV file (open the project, the three-dot menu at the top right, **Export as CSV**). The file has one row per task, section and comment, with columns named `TYPE`, `CONTENT`, `DESCRIPTION`, `PRIORITY`, `INDENT`, `AUTHOR`, `RESPONSIBLE`, `DATE`, `DATE_LANG`, `TIMEZONE` and a few more. Trust what you see in your own file over this page.

OpenTodo reads CSV files with a header row and a `title` column; `content` is accepted as the title column's name, `description` and `priority` as they are, so a Todoist file is half-way there already. The columns it understands, with every accepted spelling, are in the [import reference](/docs/import/#csv-csv).

## Export from Todoist

1. Open a project in Todoist, open the three-dot menu at the top right and choose **Export as CSV**. Repeat for each project you want to bring over. <!-- checked 2026-10-15 --> [Import formats](/docs/import/#csv-csv)
2. Open each file in a spreadsheet. You will see a `TYPE` column with `task`, `section` and `note` rows. [Import formats](/docs/import/#csv-csv)

## Tidy the file

1. **Delete the `note` rows.** They are comments, and OpenTodo does not import comments: they belong to their authors. [Own export, comments](/docs/import/#own-export-opentodo)
2. **Turn the `section` rows into a column.** Add a column named `section`, fill it for the task rows below each section row with that section's name, then delete the section rows. OpenTodo creates the sections in the project. [Sections](/docs/import/#sections)
3. **Add a `labels` column.** Todoist writes labels inside the task text as `@label`; move them into a `labels` column, comma-separated. Missing labels are created on import. [CSV columns](/docs/import/#csv-csv)
4. **Rewrite `DATE` as `due_date`.** Rename the column, and write dates as `2026-10-20` (with an optional `due_time` column for `14:30`). Todoist writes dates in words, often in your language, and those are not read. [CSV columns](/docs/import/#csv-csv)
5. **Recurring tasks:** put the rule in a `recurrence` column, in words OpenTodo knows: `every day`, `every monday`, `every 2 weeks`, `every! 3 days` for "after completion". Anything it cannot read is shown as a warning in the preview and the task is imported without a rule. [Recurrence](/docs/import/#recurrence)
6. **Subtasks:** `INDENT` 2 marks a subtask. Add a `parent` column and write the parent task's title in it (or give rows an `id` column and use the parent's id). [Mapping rules](/docs/import/#mapping-rules)
7. **Priorities** stay as they are: Todoist's 1 to 4 with 1 the highest matches OpenTodo's. Check them in the preview. [CSV columns](/docs/import/#csv-csv)

## Import into OpenTodo

1. In OpenTodo, open **Settings → Data → Import data…** and choose the file. [Import from another app](/docs/import-export/#import-from-another-app)
2. In the preview, set the **target project** to a project with the Todoist project's name (type a new name to create it), check the time zone, and read the row list: created, skipped (with the reason) or error (with the row number and the reason). Nothing is written yet. [Import from another app](/docs/import-export/#import-from-another-app)
3. Select **Import**. The tasks reach all your devices on their next sync. Repeat for each file. [Import from another app](/docs/import-export/#import-from-another-app)
4. Not happy? **Undo** under **Past imports** removes everything that import created, and you can import the file again with different options. [Undo an import](/docs/import-export/#undo-an-import)

## Your first week

- Rebuild your Todoist filters as saved views: `@waiting & open`, `#Work & p1 & due <= tomorrow`. The syntax is close to Todoist's. [Save a filter as a view](/how-to/save-a-filter-as-a-view/) [Find tasks with a filter](/docs/labels-and-filters/#find-tasks-with-a-filter)
- Set your reminders again; they are not in the export. "1 day before" on bills, "at due time" on calls. [Set a reminder](/how-to/set-a-reminder/) [Add a reminder](/docs/recurring-and-reminders/#add-a-reminder)
- Share the projects you shared before, with a role per person. [Share a project](/how-to/share-a-project/) [Share a project](/docs/sharing/#share-a-project)
- Quick add works like Todoist's: `Call Sam tomorrow 3pm #Work @call p2`. One difference: repeat rules go in the task panel, not in the line. [Quick add syntax](/docs/quick-add/)
- Keep the CSV files until you are sure. An import can be undone at any time, and the same file imported twice creates nothing new. [Duplicates](/docs/import-export/#duplicates)
