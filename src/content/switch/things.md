---
app: Things
title: Moving from Things
summary: Things has no CSV export, so the path is copy and paste into a spreadsheet, then an import with a preview. Titles, notes, projects, headings, tags and deadlines come across; start dates and Someday do not exist here yet.
checkedOn: 2026-10-15
sources: [/docs/import/, /docs/import-export/, /docs/tasks-and-projects/, /docs/views/]
importFormat: things-json
compare: things
order: 2
keeps:
  - To-dos, with their notes
  - Projects, and Areas as parent projects
  - Headings, as sections
  - Checklist items, as subtasks
  - Tags, as labels
  - Deadlines, as due dates
  - The Logbook, as completed tasks (if you copy it)
drops:
  - "When (start) dates and the Someday and Anytime lists: there is no start date in this release, so a to-do is either dated or not"
  - This Evening
  - Repeating to-dos' rules, unless you write them into a recurrence column
  - Reminders set in Things
  - Things Cloud sharing (share the project again in OpenTodo)
terms:
  - them: "To-do"
    us: "Task"
  - them: "Project"
    us: "Project"
  - them: "Area"
    us: "Parent project"
    note: "OpenTodo nests projects; an Area becomes the project above its projects."
  - them: "Heading"
    us: "Section"
    note: "Also the columns of the board."
  - them: "Tag"
    us: "Label"
  - them: "Deadline"
    us: "Due date"
  - them: "When (Today, This Evening, a date, Someday)"
    us: "Due date, or no date"
    note: "Start dates and Someday are on the roadmap, not in this release."
  - them: "Checklist"
    us: "Subtasks"
  - them: "Logbook"
    us: "Completed"
  - them: "Repeating to-do"
    us: "Repeat rule"
---
## Before you start

<!-- no-claim -->
At the time of checking, Things offers no export to CSV or text: its data lives in a database file meant for the app itself. The practical path is to select the to-dos in a list, copy them, and paste into a spreadsheet, which gives you their titles (and, depending on the version, their notes) one per row. From there you build the columns OpenTodo reads. It is more work than a one-click export, so do it one project at a time and start with the ones you use most.

OpenTodo imports any CSV with a header row and a `title` column, plus optional columns for `description`, `project`, `section`, `parent`, `priority`, `due_date`, `labels`, `recurrence`, `completed` and more. The full list is in the [import reference](/docs/import/#csv-csv).

## Build the spreadsheet

1. In Things, open a project, select all its to-dos and copy. Paste into a spreadsheet so each to-do is a row. Name the first column `title`. [Import formats](/docs/import/#csv-csv)
2. Add a `project` column with the project's name, and, if the project sits in an Area, make the Area a project too: import the Area as a project first, then choose it as the parent of each project in OpenTodo afterwards. [Organise with projects](/docs/tasks-and-projects/#organise-with-projects)
3. Add a `section` column for the heading each to-do sat under. OpenTodo creates the sections in the project. [Sections](/docs/import/#sections)
4. Add a `labels` column with the to-do's tags, comma-separated. Missing labels are created. [CSV columns](/docs/import/#csv-csv)
5. Add a `due_date` column for deadlines, written as `2026-10-20`. A Things **When** date is not a deadline; if you want a dated to-do to show in Today on that day, write that date as its `due_date`, otherwise leave it empty and it goes to the project with no date. [Dates and times](/docs/tasks-and-projects/#dates-and-times)
6. Checklist items become subtasks: give them their own rows, with a `parent` column holding the parent to-do's title. [Mapping rules](/docs/import/#mapping-rules)
7. Copy the notes of each to-do into a `description` column if you want them. [CSV columns](/docs/import/#csv-csv)
8. For the Logbook, add a `completed` column with `yes` on finished to-dos. [CSV columns](/docs/import/#csv-csv)

## Import into OpenTodo

1. Open **Settings → Data → Import data…** and choose the file. [Import from another app](/docs/import-export/#import-from-another-app)
2. In the preview, check the detected format, the target project for rows without one, and the row list. Problems are listed first, with the row number and the reason. Nothing is written yet. [Import from another app](/docs/import-export/#import-from-another-app)
3. Select **Import**, and repeat per project. Importing the same file twice creates nothing new, and an import can be undone. [Undo an import](/docs/import-export/#undo-an-import)

## Your first week

- Things' calm comes partly from the **When** date. The nearest habit in OpenTodo today: leave to-dos undated in their project and pull the day's picks into **Today** with a date, or place them on the Day calendar with <kbd>s</kbd>. [Plan your day](/how-to/plan-your-day/)
- Someday: a label `@someday` and a saved view `@someday` give you the list back, until start dates ship. [Save a filter as a view](/how-to/save-a-filter-as-a-view/) [Tips](/docs/labels-and-filters/#tips)
- Quick add replaces Things' Magic Plus: `Buy stamps tomorrow #Errands @town`. [Quick add syntax](/docs/quick-add/)
- Set up repeating to-dos again with a **Repeat** rule in the task panel, including "after completion" ones. [Make a task repeat](/how-to/make-a-task-repeat/) [Make a task repeat](/docs/recurring-and-reminders/#make-a-task-repeat)
- On your iPhone, install the app from Safari and turn on notifications in it; Things' native polish is one of the places it stays ahead, as the comparison says. [Put OpenTodo on your phone](/how-to/install-on-your-phone/) [On iPhone and iPad](/docs/notifications/#on-iphone-and-ipad)
