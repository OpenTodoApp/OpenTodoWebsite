---
app: Notion
title: Moving from Notion
summary: Notion exports a page with its databases as a Markdown and CSV ZIP. OpenTodo reads it, proposes which of your own columns holds the status, due date, labels, priority, project and notes, and lets you change each choice in the preview. People, formulas, comments and the files stored in Notion do not come across.
checkedOn: 2026-11-03
sources: [/docs/import/, /docs/import-export/, /docs/switch/notion/, /docs/notes-and-subtasks/, /docs/custom-fields/, /docs/sharing/]
importFormat: notion-csv
order: 7
keeps:
  - Each task database, as a project named after it
  - Each row, as a task, with its page as the task's description
  - Text, checklists and links of a row's page; images as links
  - Sub-items, as subtasks under their parent
  - Rows marked Done, Complete, Completed or Archived (or a ticked checkbox), completed
  - Dates with or without a time; a date range gives the start date and the due date
  - A multi-select's tags, as labels
  - High, Urgent or P1 as priority 1, Medium or P2 as 2, Low or P3 as 3
  - A relation or select naming a project, to put a task in that project
  - A text column, added to the top of the description
  - Importing the same export again skips what is already there
drops:
  - Columns you leave as Not imported, and people, numbers, formulas, rollups and files (the preview names them once)
  - Assignees; share the project and assign the tasks again
  - Pages that are not rows of a database, and comments
  - Files and images stored in Notion (their links stay in the description, the files are not copied)
  - Notion's views; OpenTodo has its own list, board, timeline and calendar
terms:
  - them: "Database"
    us: "Project"
  - them: "Row (page)"
    us: "Task, with the page as its description"
  - them: "Sub-item"
    us: "Subtask"
  - them: "Status or checkbox"
    us: "Completed"
  - them: "Multi-select tags"
    us: "Labels"
  - them: "Date property"
    us: "Due date (and a start date for a range)"
  - them: "Board view"
    us: "Board (sections as columns)"
  - them: "Timeline view"
    us: "Timeline"
  - them: "Calendar view"
    us: "A project as a calendar"
  - them: "Filtered view"
    us: "Saved view"
  - them: "Other properties"
    us: "Custom fields"
    note: "Not imported; add the ones you need as fields on the project."
---
## Before you start

<!-- no-claim -->
At the time of checking, Notion exports a page or a database from its **•••** menu, and the whole workspace from the workspace settings. Large exports may arrive as an emailed link. Trust your own workspace over this page.

Your columns are your own, so the importer does not assume their names: it guesses, and you decide. [Switch from Notion](/docs/switch/notion/)

## Export from Notion

1. Open the page that holds your task database, or the database itself. <!-- checked 2026-11-03 --> [Switch from Notion](/docs/switch/notion/#export-from-notion)
2. Open **•••** at the top right, choose **Export**, pick **Markdown & CSV**, turn on **Include subpages** and select **Export**. Keep the ZIP as it is. [Switch from Notion](/docs/switch/notion/#export-from-notion)

## Import into OpenTodo

1. Open **Settings → Data → Import data…**, choose **Notion** under **Switching from…**, then the ZIP. The preview shows **Notion (Markdown and CSV export)**. [Switch from Notion](/docs/switch/notion/#import-into-opentodo) [Switching from…](/docs/switch/README/#switching-from)
2. Under **Which column holds what**, check the column chosen for the status, due date, labels, priority, project and notes. Change any of them, or choose **Not imported**; the preview updates right away. [Switch from Notion](/docs/switch/notion/#import-into-opentodo)
3. Check the warnings and select **Import**. Nothing is written before that, and an import can be undone. [Undo an import](/docs/import-export/#undo-an-import)

A single CSV from Notion looks like any spreadsheet, so choose **Notion (Markdown and CSV export)** as the format to import it the same way, without the pages. [Switch from Notion](/docs/switch/notion/#import-into-opentodo)

## Your first week

- Columns that did not come across, such as a cost or a client: add them as typed fields on the project, and sort the list by a number or date field. [Custom fields](/docs/custom-fields/) [Group and order](/docs/group-and-order/#order-by)
- Your board: a project switches between its list and its board with <kbd>v</kbd>. [Switch to a board](/docs/sections-and-boards/#switch-to-a-board)
- Share the projects your team used and assign the tasks again. [Share a project](/how-to/share-a-project/) [Assign tasks](/docs/sharing/#assign-tasks)
- Pages that were not tasks: keep them as project notes or standalone notes, searched on your device. [Notes](/docs/notes/)
