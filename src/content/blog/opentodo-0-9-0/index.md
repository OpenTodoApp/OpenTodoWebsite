---
title: "OpenTodo 0.9.0: where the time goes, and a calmer way to edit"
summary: Time tracking and a Focus timer, a two-week Plan view, Close the day, tasks that remember where they came from, GitHub and GitLab issues as tasks, and everyday editing that gets out of the way.
publishedAt: 2026-10-21
author: raffaele
category: releases
release: 0.9.0
---
<!-- no-claim -->
OpenTodo 0.9.0 is out. Until now the app was good at telling you what to do and quiet about the doing itself: how long things take, what fits in the next two weeks, what to do with the leftovers at the end of a day. This release is about that part. It also comes out of a long list of small complaints about editing, and I fixed every one of them.

## Where the time goes

You can now start and stop a timer on any task, see it run in the sidebar, and add past work by hand. Rows compare what you tracked with what you estimated, `35m / 1h`, and Statistics adds it up per day and project. One timer runs at a time, even when two devices started one while offline. It is all in [time tracking](/docs/time-tracking/), including a CSV export for the people who bill by the hour.

[Focus](/docs/focus/) is the quiet companion to it: one task and a large timer, with Pomodoro, an open-ended Flowtime or a plain countdown. Each stretch of work is logged on the task. Breaks never are.

## Two weeks at a glance, and an end to the day

The calendar has a fourth mode, [Plan](/docs/calendar-views/#plan-the-next-two-weeks). It shows the next fourteen days side by side, each with a bar that fills up against the length of your day: task estimates, busy meetings from calendars you subscribed to, and the next occurrences of repeating tasks. When a day is full, you see it before it happens, and you drag a task to a lighter one.

At the other end of the day, [Close the day](/docs/method/rhythms/#close-the-day) takes the unfinished tasks of today one by one: tomorrow, another day, someday, or keep it. Everything is applied in one step, and one Undo takes it back. You can leave a line for tomorrow, and it greets you in the next morning's check.

## Tasks that remember where they came from

A page you saved from the share sheet, the bookmarklet or the browser extension now keeps its link, shown as a small chip on the task that opens the page. A link to a GitHub, GitLab, Jira or Linear issue reads as the issue, `o/r#7` or `ENG-123`. The [capture guide](/docs/capture/#where-a-task-came-from) explains where each kind of origin comes from.

If your issues live on GitHub or GitLab, [issue import](/docs/issue-import/) can bring the ones assigned to you into a project of your choice. The task follows the issue: it is completed when the issue closes and renamed when the issue is renamed. Nothing is ever written back. The owner of the server turns it on; it is off by default.

## Editing that gets out of the way

<!-- no-claim -->
Most of this release is small, and you will notice it every day.

- **Edit where the task is.** Click a title in a list and it becomes a field, with the date, priority, labels and project in a quiet bar underneath. Enter saves; the panel opens only when you ask for it. If you prefer the old click, one setting brings it back. See [edit a task](/docs/tasks-and-projects/#edit-a-task).
- **`#` and `@` suggest as you type**, in quick add and in a task's title, and `#Home/Docs` picks a project inside another. Typing ` tomorrow p1` at the end of an existing title now sets the date and the priority, and only reads what you just typed. See [quick add](/docs/quick-add/).
- **Pause after <kbd>g</kbd>** and a small card lists every place you can go next. The shortcut sheet is one compact line per shortcut. See [keyboard shortcuts](/docs/keyboard/).
- **The task panel reads as four short lines**: where the task lives, when, how, and who. The When editor offers Today, Tomorrow, This weekend and Next week with the date each one means. See [the task panel](/docs/task-panel/).

## Upgrading

<!-- no-claim -->
Pull the `0.9` image or the new binary and restart. One migration runs at startup, and no new setting is required. The build also moves to Go 1.27.3, which fixes a certificate-checking vulnerability in the standard library. The full list is on the What's new page and in the [0.9.0 release notes](https://github.com/OpenTodoApp/OpenTodo/releases/tag/v0.9.0), with the binaries. If you want to try it before installing anything, the [demo](https://demo.open-todo.app) already runs it.
