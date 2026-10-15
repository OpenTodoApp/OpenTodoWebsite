---
title: Save a filter as a view in the sidebar
summary: Ask "every call I need to make this week", then pin the answer to the sidebar with a live count, on all your devices.
lastReviewed: 2026-10-15
sources: [/docs/labels-and-filters/, /docs/views/, /docs/filters/]
group: Every day
minutes: 3
shot: filter
order: 14
related: [plan-your-day, add-a-task-with-everything-in-one-line]
---
## What you need

<!-- no-claim -->
- A few tasks with labels, projects or dates to ask about.

## Steps

1. Open **Filter** in the sidebar (<kbd>g</kbd> then <kbd>f</kbd>) and type a query. Results appear as you type, grouped by project. [Find tasks with a filter](/docs/labels-and-filters/#find-tasks-with-a-filter)
2. Combine small pieces: `@call` (has this label), `#Work` (in this project), `p1`, `overdue`, `due <= 7 days`, `search: invoice`. Join them with `&` (and), `|` (or) and `!` (not), and use brackets: `(@call | @errand) & due <= 7 days`. [Find tasks with a filter](/docs/labels-and-filters/#find-tasks-with-a-filter)
3. When the results are what you want, press <kbd>s</kbd> (or use the save button) and give the view a name. It appears under **Views** in the sidebar with a live count, and syncs to your other devices. [Save a filter as a view](/docs/labels-and-filters/#save-a-filter-as-a-view)
4. From the top of the saved view, choose how to group it (by project, date, priority or label) and sort it. To change the query, press <kbd>/</kbd>, edit it and press <kbd>Enter</kbd>. [Save your own views](/docs/views/#save-your-own-views)

## Ideas

- `@waiting & open`: everything you are waiting on. Pin it as "Waiting on others". [Tips](/docs/labels-and-filters/#tips)
- `#Work & p1 & due <= tomorrow`: the most important work for today and tomorrow. [Find tasks with a filter](/docs/labels-and-filters/#find-tasks-with-a-filter)
- Put up to six saved views side by side as a dashboard for a morning review. [Build a dashboard](/docs/views/#build-a-dashboard)

## If it does not work

- A message under the box says where the query is wrong, and the previous results stay visible. Names with spaces go in quotes: `#"Client A"`. The full language, with ten worked examples, is in the [filter queries reference](/docs/filters/).
