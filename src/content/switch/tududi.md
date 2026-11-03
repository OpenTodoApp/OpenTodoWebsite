---
app: Tududi
title: Moving from Tududi
summary: Tududi keeps everything in one SQLite file, and OpenTodo reads a copy of it, read-only, with a preview before anything is written. Areas, projects with their notes, tasks, subtasks, tags, priorities, dates, reminders and repeats come across; attachments, relations, habits and notes without a project do not.
checkedOn: 2026-11-03
sources: [/docs/import/, /docs/import-export/, /docs/switch/tududi/, /docs/projects/, /docs/recurrence/, /docs/views/]
importFormat: tududi-db
order: 9
keeps:
  - Areas, as parent projects with their projects inside
  - Done or cancelled projects, archived
  - Project descriptions and notes, as the project's notes
  - Tasks with subtasks under their parent, and task notes
  - Tasks without a project, and unprocessed inbox items, in your Inbox
  - Priorities high, medium, low and none, as P1 to P4
  - Due dates with their time, start dates, estimates and reminders
  - Comments, added under the note with their date
  - Done and archived tasks, completed; cancelled ones too, with a warning
  - Tags, as labels; the someday tag parks a task in Someday
  - Repeats daily, every N days, on weekdays, monthly, after completion, and the end date
  - Importing the same database again skips what is already there
drops:
  - Notes without a project (named in the preview, not imported)
  - Tags on projects (the tasks keep theirs)
  - Chosen weekdays every 2 or more weeks become every N weeks, with a warning
  - Attachments (their files are not in the database), task relations, habits' streaks, goals and people
terms:
  - them: "Task"
    us: "Task"
  - them: "Area"
    us: "Parent project"
  - them: "Project"
    us: "Project"
  - them: "Project note"
    us: "Project notes"
  - them: "Tag"
    us: "Label"
  - them: "someday tag"
    us: "Someday"
  - them: "Inbox"
    us: "Inbox"
  - them: "Today plan"
    us: "Today"
    note: "Tasks on your latest plan without a due date are due on the day you import."
  - them: "In progress, waiting"
    us: "Open task"
    note: "A dependency or a start date says why a task is waiting."
  - them: "Recurring task"
    us: "Repeat rule"
---
## Before you start

<!-- no-claim -->
At the time of checking, Tududi has no export button: whoever runs the Tududi server copies its database file. Trust your own server over this page.

OpenTodo reads the file from a private read-only copy on your server and deletes it right after the preview or the import. [Switch from Tududi](/docs/switch/tududi/#import-into-opentodo)

## Export from Tududi

1. Stop Tududi (for example `docker stop tududi`), so the file is not changing while you copy it. <!-- checked 2026-11-03 --> [Switch from Tududi](/docs/switch/tududi/#export-from-tududi)
2. Copy `production.sqlite3` out of its data folder: with the Docker image, `docker cp tududi:/app/db/production.sqlite3 .`; without Docker, the file `DB_FILE` points to. Then start Tududi again. A ZIP of the file uploads faster. [Switch from Tududi](/docs/switch/tududi/#export-from-tududi)

## Import into OpenTodo

1. Open **Settings → Data → Import data…**, choose **Tududi** under **Switching from…**, then the file or the ZIP. The preview shows **Tududi (database)**. [Switch from Tududi](/docs/switch/tududi/#import-into-opentodo) [Switching from…](/docs/switch/README/#switching-from)
2. Check the warnings, including the notes that will not come across. Nothing is written yet. [Import from another app](/docs/import-export/#import-from-another-app)
3. Select **Import**. An import can be undone. [Undo an import](/docs/import-export/#undo-an-import)

## Your first week

- Areas arrived as parent projects. A project can also be an area that never finishes and never asks for a next action. [Project flows](/docs/project-flows/)
- Copy the notes that had no project into a project's notes or a standalone note. [Notes](/docs/notes/)
- Someday holds the tasks you parked, out of Today and Upcoming until you bring them back. [Park ideas in Someday](/docs/views/#park-ideas-in-someday)
- Both apps are self-hosted: OpenTodo runs as one binary or one container with its SQLite file. [Docker](/docs/self-hosting/docker/)
