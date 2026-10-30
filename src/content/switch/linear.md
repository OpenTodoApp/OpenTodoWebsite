---
app: Linear
title: Moving from Linear
summary: Export your workspace's issues as CSV and import the file as it is, with a preview before anything is written. Issues, projects, statuses, priorities, labels, due dates, sub-issues, blocked-by links and estimates come across; cycles, milestones, comments and other people's assignments do not.
checkedOn: 2026-10-30
sources: [/docs/import/, /docs/import-export/, /docs/switch/linear/, /docs/sections-and-boards/, /docs/sharing/, /docs/issue-import/]
importFormat: linear-csv
compare: linear
order: 4
keeps:
  - Issues, with their descriptions, which start with the identifier (ENG-123)
  - Projects (or teams, for issues without a project), each opening as a board
  - Statuses, as sections in the same order, so the board has the same columns
  - Priorities Urgent to Low, as P1 to P4
  - Labels and due dates
  - Sub-issues, as subtasks
  - Blocked by links between issues in the same file
  - Estimates, as a number field on the project
  - Completed issues; canceled ones are completed with the label canceled
  - Issues assigned to you stay assigned to you
drops:
  - Cycles, milestones, initiatives, SLAs and the related and duplicate links (dropped with a warning)
  - Issues assigned to other people arrive unassigned; assign them again once the people have accounts
  - Comments and attachments (not in the CSV export)
  - Workflow automations and GitHub links (OpenTodo has its own rules and issue import)
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
At the time of checking, Linear exports a workspace's issues as one CSV file from its workspace settings (look for **Import / Export**). Trust your own file over this page.

OpenTodo recognises Linear's export as it is: no renaming, no spreadsheet. [Linear](/docs/import/#linear-linear-csv)

## Export from Linear

1. In Linear's workspace settings, open **Import / Export** and export the issues as CSV. <!-- checked 2026-10-30 --> [Switch from Linear](/docs/switch/linear/#export-from-linear)

## Import into OpenTodo

1. Open **Settings → Data → Import data…** and choose the file. The preview shows **Linear export (CSV)**. [Switch from Linear](/docs/switch/linear/#import-into-opentodo)
2. In the preview, check the warnings and the row list: created, skipped with the reason, or error with the row number. Nothing is written yet. [Import from another app](/docs/import-export/#import-from-another-app)
3. Select **Import**. Each project opens as a board with one column per status; the tasks reach every member's devices once the project is shared. An import can be undone. [Undo an import](/docs/import-export/#undo-an-import)

## Your first week

- Share each project with the team, editors for everyone, and assign the issues again. Assignees get a notification and an **Assigned to me** list. [Share a project](/how-to/share-a-project/) [Assign tasks](/docs/sharing/#assign-tasks)
- Switch the project to a board with <kbd>v</kbd>; the sections you imported are its columns. [Turn a project into a board](/how-to/turn-a-project-into-a-board/) [Switch to a board](/docs/sections-and-boards/#switch-to-a-board)
- Cycles: a saved view `#Launch & due <= 14 days` pinned to the sidebar is the two-week window; a dashboard puts the team's views side by side. [Save a filter as a view](/how-to/save-a-filter-as-a-view/) [Save your own views](/docs/views/#save-your-own-views)
- Work that lives in GitHub or GitLab: connect your account and the open issues assigned to you become tasks that close when the issue closes. Nothing is written back. [Issue import](/docs/issue-import/)
- Automations: rules change tasks when a label is added, a date passes or on a schedule, on your server. The REST API and the `ot` command line write to the same place as the app, and webhooks fire on changes. [Automation rules](/docs/automations/) [HTTP API](/docs/api/)
- Where Linear stays ahead, the comparison says so; this page is not a reason to leave it. [OpenTodo vs Linear](/vs/linear/)
