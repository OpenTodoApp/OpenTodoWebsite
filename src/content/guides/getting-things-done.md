---
title: Getting Things Done with OpenTodo
summary: Contexts as labels, lists as saved views and a weekly review, so the GTD method runs on your own server.
lastReviewed: 2026-10-30
sources: [/docs/labels-and-filters/, /docs/filters/, /docs/views/, /docs/quick-add/, /docs/project-flows/]
templates: [gtd-setup, weekly-review]
tags: [task-management, prioritisation]
order: 2
---
<!-- no-claim -->
Getting Things Done, the method David Allen described, is simple at heart: capture everything, decide what each thing means, keep reminders in trusted lists, and review them. Any tool with an inbox, contexts and lists can carry it. Here is how the parts map onto OpenTodo.

## Capture into the Inbox

Everything starts in the Inbox. Use [quick add](/docs/quick-add/) from any view, [email to task](/docs/email/), or the share sheet on your phone ([capture](/docs/capture/)). Don't organise while capturing; just get it out of your head.

## Clarify and organise

Go through the Inbox and ask of each item: is it actionable? If not, delete it or move it to someday. If it is, what is the very next physical action?

- **Contexts** become [labels](/docs/labels-and-filters/): `@home`, `@computer`, `@phone`, `@errand`.
- **Waiting for** is a [label](/docs/labels-and-filters/) too: `@waiting`, with a due date for when you will chase it.
- **Projects** are projects, and each needs at least one next action. When the steps must happen in order, make the project **Sequential** with **Flow…** in its menu: only the first open step is available, and the next one becomes available when you complete it. An ongoing responsibility such as Home or Finances can be an **Area**, which never finishes and is never listed as without a next action. [Sequential projects](/docs/project-flows/#sequential-projects) [Areas](/docs/project-flows/#areas)
- **Someday / maybe** is a label you check during the review, tagged `@someday`, with no date. See [labels and filters](/docs/labels-and-filters/).

## Engage with context lists

Your next-action lists are [saved views](/docs/views/). A few that work well:

- `@phone & !@waiting & open` for a few minutes between meetings
- `@errand & open` when you are out
- `@computer & (p1 | p2)` for focused work
- `available & @home`: only what can be done now, so the later steps of a sequential project stay out of the way ([where it shows](/docs/project-flows/#where-it-shows))

Pin them to the sidebar; their counts update live, even offline. The [filter language](/docs/filters/) has more examples.

## Review weekly

GTD falls apart without the weekly review. Follow the [weekly review guide](/guides/weekly-review/) and use its template.

## Get started

[Import](/docs/import/) the [GTD setup template](/templates/gtd-setup/). It creates the labels, a project with next actions, waiting-for and someday sections, and a repeating task to check every project for a next action.
