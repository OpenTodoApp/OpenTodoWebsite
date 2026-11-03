---
title: "OpenTodo 0.22.0: fast with big accounts, and easier to move in"
summary: "Big accounts are much faster and a new device downloads only the latest notes. Five new importers with a Switching from… list, sorting by custom fields, a written stability promise for 1.0, and Back that closes what is open on Android."
publishedAt: 2026-11-03
author: raffaele
category: releases
release: 0.22.0
tags: [task-management, ownership]
---
<!-- no-claim -->
OpenTodo 0.22.0 is about two things: staying quick when you have years of tasks, and making it easy to arrive from the app you use now. Here is what changed.

## Fast with big accounts

Some people arrive with thousands of open tasks and tens of thousands done, and the app should not slow down for them. This release was measured against a 10,000-task test account, and the numbers it is now held to are written down. See [Performance budgets](/docs/performance/).

<!-- no-claim -->
What that means in practice:

- **Completing a task in a 2,000-task project** used to take about 4 seconds on a computer and 15 on a phone before the tick showed. Now it shows in the same frame as the click.
- **Opening that project** takes about 0.1 second instead of 2.
- **A new device's first copy of a 10,000-task account** took over two minutes. It now takes about 12 seconds on a laptop.
- **The first screen** no longer downloads Settings, the Calendar or Import up front, so the first load fell from 745 KB to 648 KB. Those screens still open offline. See [Performance budgets](/docs/performance/#latest-results).

Rows below the screen are drawn a moment after the top ones but stay in the page, so find in page, drag and drop and screen readers still reach all of them. If you use the HTTP API, `GET /api/v1/tasks?project_id=<id>` now really lists one project's tasks; before, the parameter was ignored. See [One project's items](/docs/api/#one-projects-items).

## Note history that stays small

Every time you save a note, OpenTodo keeps the version so devices can merge your edits. Over a year that adds up. On a test account with 500 notes saved 300 times each, the clean-up of old versions never finished; it now finishes in a few minutes of background work, in short steps of about 20 ms so it never holds up a sync, and the database went from 2.6 GB to 240 MB. See [Mergeable documents](/docs/sync/#mergeable-documents).

A device signing in for the first time now asks only for the latest copy of each note instead of every saved version: on that same account it downloads 43 MB instead of 2 GB. Older apps keep working and download the whole history as before. See [First copy](/docs/sync/#first-copy).

## Moving in from more apps

You can now import from **OmniFocus**, **Vikunja**, **Notion**, **Super Productivity** and **Tududi** ([Import formats](/docs/import/)):

- **OmniFocus**: the CSV export brings projects, actions and action groups, tags, due, defer and planned dates, estimates, flags and notes. Repeat rules are not in OmniFocus's CSV, and the preview says so. [Switch from OmniFocus](/docs/switch/omnifocus/)
- **Vikunja**: the data export ZIP brings projects and sub-projects, Kanban buckets as sections, labels, repeats, reminders, subtasks, "blocked by" relations, comments and attached files. [Switch from Vikunja](/docs/switch/vikunja/)
- **Notion**: since Notion's columns are your own, the preview proposes which column holds the status, the due date, labels, priority, project and notes, and you can change each one before importing. Each database becomes a project and each row's page its description. [Switch from Notion](/docs/switch/notion/)
- **Super Productivity**: the backup file brings projects, tags, tasks, archived tasks, deadlines, estimates and repeats, and your tracked time arrives as one time entry per day, so your totals stay the same. [Switch from Super Productivity](/docs/switch/super-productivity/)
- **Tududi**: a copy of its database file brings areas, projects with their notes, tasks, subtasks, tags, priorities, dates and repeats. The file is read from a private read-only copy and deleted afterwards. [Switch from Tududi](/docs/switch/tududi/)

To make the start easier, the Import screen now opens with **Switching from…**: choose the app you use now, and its export steps appear right there with the format already set. The guides list fifteen apps, each with what comes with you, what stays behind and when the import was last checked against a real export. As always, nothing is written before you have seen the preview, and an import can be undone. See [Switch from another app](/docs/switch/README/) and [Undo an import](/docs/import-export/#undo-an-import).

<!-- no-claim -->
On this site, each new app has its own page with the export steps and a word list: [OmniFocus](/switch/omnifocus/), [Vikunja](/switch/vikunja/), [Notion](/switch/notion/), [Super Productivity](/switch/super-productivity/) and [Tududi](/switch/tududi/).

## Sort by custom fields

Project lists, label pages and saved views can now be ordered by a Number or Date field, such as a cost or a review date. Fields with the same name match across projects, and the order follows a field when you rename it. Pick it under **Order by**. See [Order by](/docs/group-and-order/#order-by) and [Custom fields](/docs/custom-fields/).

## A promise for 1.0

OpenTodo is getting close to 1.0, and people who build on it should know what they can rely on. [Stability and compatibility](/docs/stability/) now says it in writing: within 1.x, the `/api/v1/` routes, the sync protocol, the export format, the MCP tools and the `ot` command line only grow. A route that will be replaced is deprecated for at least a year first. Any release from 0.1.0 on upgrades directly to the latest.

<!-- no-claim -->
This is checked on every change, not just promised: the tests upgrade a data directory written by every released version, replay the recorded calls of the web app, `ot` and the browser extension against the current server, and import every released version's export.

## Back on Android closes what is open

<!-- no-claim -->
On an Android phone, the back gesture used to leave a sheet, a menu, the command palette or the phone drawer on screen while the page behind it changed. Now Back closes the topmost of them and leaves the page where it was; a second Back goes back as it always did. The closed drawer also no longer sits in the tab order or gets read by screen readers, and in Select mode a tap on a row ticks it instead of opening the task.

## Smaller things

- **Suggestions after adding.** If you turn it on, the assistant proposes a clearer title, a project and a few subtasks right after you add a task. Nothing changes until you select **Apply**. See [Suggest after adding](/docs/assistant-suggest-after-add/).
- **Taking turns tells you.** When the person whose turn it is leaves a shared project, the next person now gets the **It's your turn** notification too. See [Take turns](/docs/take-turns/).
- **Move to project from the right-click menu** moves the task again.
- **No more cut-off words** in two-way switches such as **This occurrence / All occurrences**, and tab rows in long translations fade at the edge instead of cutting the last tab.

## Upgrading

Replace the image or the binary and restart, and upgrade the server before your devices. One migration runs at start, there is no new variable, and there is no way back to an older version, so back up first. On a large, old database the first clean-up of note history may run for a minute or two in the background. See [Updating](/docs/self-hosting/docker/#updating).

The full list of changes is in the [release notes](https://github.com/OpenTodoApp/OpenTodo/releases/tag/v0.22.0).
