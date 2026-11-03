---
app: Vikunja
title: Moving from Vikunja
summary: Vikunja exports all your data as one ZIP, and OpenTodo reads it as it is, with a preview before anything is written. Projects, sub-projects, Kanban buckets, tasks, labels, repeats, reminders, subtasks, blocked-by relations, comments and attached files come across; assignees, end dates and the other views do not.
checkedOn: 2026-11-03
sources: [/docs/import/, /docs/import-export/, /docs/switch/vikunja/, /docs/sections-and-boards/, /docs/notes-and-subtasks/, /docs/sharing/]
importFormat: vikunja-export
order: 6
keeps:
  - Projects and sub-projects; archived ones arrive archived
  - Your Vikunja Inbox, as your Inbox
  - Kanban buckets, as sections, and the project opens as a board
  - Tasks with their descriptions, done tasks with when they were done
  - Due dates with their time, and start dates
  - Priorities DO NOW and Urgent as P1, High P2, Medium P3, Low and unset P4
  - Labels
  - Repeats every N days, monthly, and after completion
  - Reminders at a time, and before or after the due or start date
  - Subtasks, and blocked by relations as dependencies
  - Attached files, stored on your server
  - Comments, added under the description with their date
  - Importing the same ZIP again skips what is already there
drops:
  - End dates and reminders relative to them (dropped with a warning)
  - Repeats in hours, and relations other than subtasks and blocked by (dropped with a warning)
  - Assignees; share the project and assign the tasks again
  - Colours, percent done, favourites, saved filters and project backgrounds
  - The List, Gantt and Table views (OpenTodo has its own list, board and timeline)
terms:
  - them: "Task"
    us: "Task"
  - them: "Project"
    us: "Project"
  - them: "Child project"
    us: "Sub-project"
  - them: "Bucket"
    us: "Section (a board column)"
  - them: "Label"
    us: "Label"
  - them: "Priority DO NOW to Low"
    us: "Priority P1 to P4"
  - them: "Subtask relation"
    us: "Subtask"
  - them: "Blocked by"
    us: "Waits for"
    note: "A task that waits on another shows as not yet available."
  - them: "Saved filter"
    us: "Saved view"
  - them: "Gantt view"
    us: "Timeline"
  - them: "Team"
    us: "Shared project with roles"
---
## Before you start

<!-- no-claim -->
At the time of checking, Vikunja 0.22 and later export your data from the avatar menu's **Settings → Export your data**, and the export is a ZIP you download once it is ready. Trust your own server over this page.

OpenTodo reads the ZIP as it is; do not unpack it. [Switch from Vikunja](/docs/switch/vikunja/#export-from-vikunja)

## Export from Vikunja

1. Open **Settings → Export your data**, enter your password and select **Request a copy of my Vikunja data**. <!-- checked 2026-11-03 --> [Switch from Vikunja](/docs/switch/vikunja/#export-from-vikunja)
2. When Vikunja says the export is ready, go back to the same page and select **Download a copy of my data**. [Switch from Vikunja](/docs/switch/vikunja/#export-from-vikunja)

## Import into OpenTodo

1. Open **Settings → Data → Import data…**, choose **Vikunja** under **Switching from…**, then the ZIP. The preview shows **Vikunja (export ZIP)**. [Switch from Vikunja](/docs/switch/vikunja/#import-into-opentodo) [Switching from…](/docs/switch/README/#switching-from)
2. Check the warnings and the row list. Nothing is written yet. [Import from another app](/docs/import-export/#import-from-another-app)
3. Select **Import**. Each project with buckets opens as a board, and the attached files are on your server. An import can be undone. [Undo an import](/docs/import-export/#undo-an-import)

## Your first week

- Share the projects you shared in Vikunja, editors for everyone, and assign the tasks again. [Share a project](/how-to/share-a-project/) [Assign tasks](/docs/sharing/#assign-tasks)
- Switch a project between its list and its board with <kbd>v</kbd>; the buckets you imported are its columns. [Switch to a board](/docs/sections-and-boards/#switch-to-a-board)
- Blocked by arrived as dependencies: a task waiting on another is not offered as available until that one is done. [Wait for another task](/docs/notes-and-subtasks/#wait-for-another-task)
- The Gantt chart: a project's tasks as bars on a timeline, with deadlines and today. [Timeline](/docs/project-timeline/)
- Saved filters: write the query again and save it as a view in the sidebar. [Saved views](/docs/saved-views/)
