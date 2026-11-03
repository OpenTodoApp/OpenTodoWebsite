---
app: OmniFocus
title: Moving from OmniFocus
summary: OmniFocus exports what its window shows as a CSV file, and OpenTodo reads it as it is, with a preview before anything is written. Projects, actions, action groups, tags, due, defer and planned dates, estimates, flags and notes come across; repeat rules, folders and attachments are not in the file.
checkedOn: 2026-11-03
sources: [/docs/import/, /docs/import-export/, /docs/switch/omnifocus/, /docs/deadlines-and-start-dates/, /docs/project-flows/]
importFormat: omnifocus-csv
order: 5
keeps:
  - Projects; done and dropped ones arrive archived, on-hold ones active with a warning
  - Actions, and action groups as tasks with subtasks
  - Actions outside a project, in your Inbox
  - Tags (or the contexts of OmniFocus 2), as labels
  - Due dates with their time, and defer dates as start dates
  - Planned dates of OmniFocus 4.7 as due dates, with the due date as the deadline
  - Estimated durations, flagged actions as priority 1, and notes
  - Completed actions with their completion dates
  - A newer export of the same database skips what you already imported
drops:
  - Repeat rules (not in OmniFocus's CSV; the preview says so, set them again)
  - Folders (recreate them as parent projects)
  - Attachments and review intervals (not in the file)
  - The order of a sequential project (turn the project's flow back on)
  - Items the window hid when you exported
terms:
  - them: "Action"
    us: "Task"
  - them: "Action group"
    us: "Task with subtasks"
  - them: "Project"
    us: "Project"
  - them: "Folder"
    us: "Parent project"
  - them: "Tag (Context)"
    us: "Label"
  - them: "Flagged"
    us: "Priority P1"
  - them: "Defer date"
    us: "Start date"
    note: "A start date keeps a task out of Today until its day."
  - them: "Due date"
    us: "Deadline, or due date"
    note: "With planned dates, the planned date is the due date and the due date the deadline."
  - them: "Sequential project"
    us: "Sequential project flow"
  - them: "Single action list"
    us: "Area"
    note: "A project that never finishes and never asks for a next action."
  - them: "Forecast"
    us: "Upcoming"
  - them: "Review"
    us: "Weekly review and review intervals"
---
## Before you start

<!-- no-claim -->
At the time of checking, OmniFocus exports CSV from the Mac app's **File → Export** and from the iPhone and iPad app's settings. Trust your own app over this page.

The export holds only what the window shows, so show everything first. OpenTodo recognises the file as it is, in UTF-8 or UTF-16. [Switch from OmniFocus](/docs/switch/omnifocus/#export-from-omnifocus)

## Export from OmniFocus

1. On a Mac, open the **Projects** perspective, choose **View → Show All** (or set the filter to **All**) and expand the folders. <!-- checked 2026-11-03 --> [Switch from OmniFocus](/docs/switch/omnifocus/#export-from-omnifocus)
2. Choose **File → Export**, pick **Comma Separated Values (CSV)** (or **CSV UTF-16**) and save the file. On iPhone or iPad, use **Settings → Database → Export to CSV**. [Switch from OmniFocus](/docs/switch/omnifocus/#export-from-omnifocus)

## Import into OpenTodo

1. Open **Settings → Data → Import data…**, choose **OmniFocus** under **Switching from…**, then the file. The preview shows **OmniFocus (CSV)**. [Switch from OmniFocus](/docs/switch/omnifocus/#import-into-opentodo) [Switching from…](/docs/switch/README/#switching-from)
2. Pick the time zone you used OmniFocus in, because OmniFocus writes its dates in UTC, and check the warnings. Nothing is written yet. [Import from another app](/docs/import-export/#import-from-another-app)
3. Select **Import**. An import can be undone. [Undo an import](/docs/import-export/#undo-an-import)

## Your first week

- Set the repeats again: type `every weekday` or `every 2 weeks` into a task's date. [Recurring task rules](/docs/recurrence/)
- Make a project sequential again with its flow, so only the next step shows as available. A single action list is an area. [Project flows](/docs/project-flows/)
- Defer dates arrived as start dates: the task stays out of Today until its day, and a deadline stays separate from the day you plan to do it. [Deadlines and start dates](/docs/deadlines-and-start-dates/)
- Perspectives: a saved filter such as `@errands & available` pinned to the sidebar does the same job. [Saved views](/docs/saved-views/)
- The review: each project can be reviewed weekly, monthly, quarterly or not at all, in a guided weekly review. [Review intervals](/docs/review-intervals/)
