---
title: Kanban for a small team
summary: Columns for stages, cards you move, a limit on work in progress, and everyone looking at the same board. Sections and the board view do it out of the box.
lastReviewed: 2026-10-15
sources: [/docs/sections-and-boards/, /docs/sharing/, /docs/filters/, /docs/views/]
templates: [product-launch]
tags: [task-management, teamwork]
order: 8
---
<!-- no-claim -->
Kanban comes from factory floors: make the work visible, limit how much is in progress, and pull the next thing only when there is room. For a team of three to five it is the lightest system that still answers "where does this stand?" without a meeting.

## Why it works

<!-- no-claim -->
A list hides the bottleneck; a board shows it. When the "In progress" column is full, the team stops starting and begins finishing, which is where throughput comes from. The rule is simple enough to keep without a manager.

## Set it up in OpenTodo

1. **One project per flow**, shared with the team as editors. [Share a project](/docs/sharing/#share-a-project)
2. **Add sections for the stages**: To do, In progress, Waiting, Done. Then press <kbd>v</kbd>: each section is a column. [Switch to a board](/docs/sections-and-boards/#switch-to-a-board)
3. **Move cards** by dragging, or select one and press <kbd>Shift</kbd>+<kbd>→</kbd>. The change reaches everyone within seconds. [Move cards between columns](/docs/sections-and-boards/#move-cards-between-columns)
4. **Set a limit for In progress** and write it into the section name: "In progress (max 3)". The heading shows how many open tasks it holds, so the limit is visible to everyone. [Add a section](/docs/sections-and-boards/#add-a-section)
5. **Assign each card** to one person, and use comments on the card for the conversation. [Assign tasks](/docs/sharing/#assign-tasks)
6. **See what moved since yesterday** in Activity, filtered by project. [See what others changed](/docs/sharing/#see-what-others-changed)

## Make it stick

- A daily glance at the board replaces the stand-up: columns left to right, newest card first. The [Week calendar](/docs/time-blocking/#open-the-calendar) shows whether the In-progress cards fit the week.
- Each person pins a view `#Launch & @me-ish`: assignees are not a filter term, but `Assigned to me` in the sidebar already lists exactly their cards. [The built-in views](/docs/views/#the-built-in-views)
- Blocked work goes to Waiting with a comment saying on whom; a saved view `#Launch & search: waiting` collects it. [Find tasks with a filter](/docs/labels-and-filters/#find-tasks-with-a-filter)
- The [product launch template](/templates/product-launch/) is a board with Backlog, This week, Launch day and Week after, ready to share. [Sections and boards](/docs/sections-and-boards/)
