---
app: Linear
title: Moving from Linear
summary: Export issues as CSV from any view, rename three columns, import with a preview. Issues, projects, labels, due dates, priorities and sub-issues come across; cycles, estimates and workflow states do not.
checkedOn: 2026-10-15
sources: [/docs/import/, /docs/import-export/, /docs/sections-and-boards/, /docs/sharing/]
importFormat: linear-csv
compare: linear
order: 4
keeps:
  - Issues, with their descriptions
  - Projects, as projects (a team can be a parent project)
  - Labels
  - Due dates
  - Priorities, after converting the words
  - Sub-issues, through the parent issue column
  - Statuses, as sections if you keep the column
drops:
  - Cycles, estimates, SLAs, milestones and initiatives
  - Assignees (dropped with a warning; assign again once the people have accounts)
  - Comments and attachments
  - Workflow automations, GitHub links and integrations
terms:
  - them: "Issue"
    us: "Task"
  - them: "Project"
    us: "Project"
  - them: "Team"
    us: "Parent project"
    note: "OpenTodo has no teams; a project per team with sub-projects works for a team of five."
  - them: "Status (Todo, In Progress, Done)"
    us: "Section, and Completed"
    note: "Sections show as board columns; a done issue is a completed task."
  - them: "Label"
    us: "Label"
  - them: "Priority Urgent, High, Medium, Low"
    us: "Priority P1, P2, P3, P4"
  - them: "Sub-issue"
    us: "Subtask"
  - them: "Assignee"
    us: "Assignee"
  - them: "Cycle"
    us: "No equivalent"
    note: "A saved view \"due <= 14 days\" is the nearest thing."
  - them: "Custom view"
    us: "Saved view"
  - them: "Triage"
    us: "Inbox"
---
## Before you start

<!-- no-claim -->
At the time of checking, Linear exports issues as CSV from any view, project or issue list (open the command menu with <kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>K</kbd> and choose **Export issues as CSV…**), with columns including `ID`, `Team`, `Title`, `Description`, `Status`, `Estimate`, `Priority`, `Project`, `Assignee`, `Labels`, `Due Date` and `Parent issue`. Members can export up to 250 issues at a time; admins more. Trust your own file over this page.

OpenTodo reads a CSV with a header row and a `title` column; header names are case-insensitive and spaces count as underscores, so `Title`, `Description`, `Project`, `Labels` and `Due Date` are read as they are. The columns it understands are in the [import reference](/docs/import/#csv-csv).

## Export from Linear

1. Open the view or project to move, press <kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>K</kbd> and choose **Export issues as CSV…**. Repeat per team or project if you have more than the limit. <!-- checked 2026-10-15 --> [Import formats](/docs/import/#csv-csv)
2. Open the file in a spreadsheet. [Import formats](/docs/import/#csv-csv)

## Tidy the file

1. **Rename `Parent issue` to `parent`.** Its value is the parent's `ID`, which OpenTodo matches against the `id` column, so rename `ID` to `id` as well. Sub-issues become subtasks. [Mapping rules](/docs/import/#mapping-rules)
2. **Convert `Priority`.** Replace `Urgent` with `1`, `High` with `2`, `Medium` with `3`, `Low` with `4`, and clear `No priority`. [CSV columns](/docs/import/#csv-csv)
3. **Decide what `Status` becomes.** Rename it `section` and your board has the same columns as Linear's (Todo, In Progress, Done). Or add a `completed` column with `yes` on done issues and drop the status. You can do both. [Sections](/docs/import/#sections)
4. **Delete `Estimate`, `Cycle`, `Assignee` and the other columns you do not need.** Unknown columns are listed as ignored in the preview; `Assignee` is recognised as unsupported and dropped with a warning on each row. [CSV columns](/docs/import/#csv-csv)

## Import into OpenTodo

1. Open **Settings → Data → Import data…** and choose the file. [Import from another app](/docs/import-export/#import-from-another-app)
2. In the preview, pick the target project for rows without one (a project per team works well), check the time zone, and read the row list: created, skipped with the reason, or error with the row number. Nothing is written yet. [Import from another app](/docs/import-export/#import-from-another-app)
3. Select **Import**. The tasks reach every member's devices once the project is shared. An import can be undone. [Undo an import](/docs/import-export/#undo-an-import)

## Your first week

- Share each project with the team, editors for everyone, and assign the issues again. Assignees get a notification and an **Assigned to me** list. [Share a project](/how-to/share-a-project/) [Assign tasks](/docs/sharing/#assign-tasks)
- Switch the project to a board with <kbd>v</kbd>; the sections you imported are its columns. [Turn a project into a board](/how-to/turn-a-project-into-a-board/) [Switch to a board](/docs/sections-and-boards/#switch-to-a-board)
- Cycles: a saved view `#Launch & due <= 14 days` pinned to the sidebar is the two-week window; a dashboard puts the team's views side by side. [Save a filter as a view](/how-to/save-a-filter-as-a-view/) [Save your own views](/docs/views/#save-your-own-views)
- Scripts and automations: the REST API and the `ot` command line write to the same place as the app, and webhooks fire on changes. [For developers](/developers/) [HTTP API](/docs/api/)
- Where Linear stays ahead, the comparison says so; this page is not a reason to leave it. [OpenTodo vs Linear](/vs/linear/)
