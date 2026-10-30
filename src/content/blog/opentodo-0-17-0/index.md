---
title: "OpenTodo 0.17.0: calm limits for a busy day"
summary: "An optional Today limit with Done today, Morning, Afternoon and This Evening, sequential projects and areas, a review interval per project, Focus from any task, default reminders, and a pasted list that becomes one task per line."
publishedAt: 2026-10-30
author: raffaele
category: releases
release: 0.17.0
tags: [task-management, time-management]
---
<!-- no-claim -->
OpenTodo 0.17.0 is the first stop on [the road to 1.0](/blog/the-road-to-1-0/), and its theme is calm constraints: small limits that keep a busy list honest. Every one of them is off until you turn it on, so if you like OpenTodo the way it is, nothing changes.

## A Today you can finish

On a busy week Today can hold twenty tasks that will never all get done. A **Today limit** (3, 5, 7, 10, or any number up to 20) turns it into a closed list. Slots fill first come, first served: what you planned stays, and a task you capture during a full day waits in a folded **Waiting for a slot** group instead of pushing something out. Nothing is moved and nothing is refused, and **Take a slot** lets a waiting task in for the day. Set it in **Settings → General → Start view and briefing**. See [Today limit and Done today](/docs/today-limit/).

**Done today** lists what you finished, and **Log a win** adds work that was never a task, already done: the printer you fixed, the call that ran long. See [Done today](/docs/today-limit/#done-today).

## Morning, Afternoon and This Evening

A task or a habit can now belong to a part of the day. Turn on **Group by day part** and Today lists the day under **Morning**, **Afternoon** and **This Evening**. A task with a time goes to the part of its time, and a part you chose always wins. Drag a task onto a heading, pick it in the **When** editor, or type it: `call mum tomorrow evening`. See [Day parts](/docs/day-parts/).

## Sequential projects and areas

**Flow…** in a project's menu makes it **Sequential**: only the first open step is available, and the steps after it stay in place, dimmed, until it's their turn. Sections can be sequential on their own. **Area** marks an ongoing list such as Home or Finances: no progress bar, and never "without a next action" in the review. The new filter keyword `available` lists what you can actually do now. See [Sequential projects and areas](/docs/project-flows/).

## A review that only shows what is due

The weekly review's project walk now shows only the projects that are due. Each one comes up every week unless you choose **Review every…** 2 weeks, month, quarter or paused, and the rhythm is yours even in a shared project. **Put in maintenance** says a project is on low burn on purpose: its health reads *Maintenance* instead of a warning, and its tasks stay where they are. See [Review intervals and maintenance](/docs/review-intervals/).

## Smaller things you asked for

- **Focus from any task**: **Start focus** in every task menu, a clock button in the task panel, and Focus in the sidebar. When a session ends, **+5 min** keeps going, and background noise plays while you work. See [Focus](/docs/focus/#open-it) and [Focus breaks, presets and noise](/docs/focus-options/).
- **Default reminders**: set one reminder for tasks with a time and one for tasks with a date, once, and every task that gets a date gets it. See [Default reminders](/docs/default-reminders/).
- **Paste a list**: paste seven lines into quick add and OpenTodo offers to add seven tasks, one per line, with one Undo. See [Paste a list](/docs/quick-add/#paste-a-list).
- **Add new tasks at the top** of a list instead of the bottom, and the Add row stays in reach while a long list scrolls. See [Where new tasks go](/docs/quick-add/#where-new-tasks-go).
- **A tidier sidebar**: counts on every list if you want them, your own order for Inbox, Today and the rest, and icons for saved views. See [Sidebar counts and order](/docs/sidebar-counts-and-order/).
- A right-click on a task opens its menu where you clicked. See [Work from the list](/docs/work-from-the-list/).
- Today's schedule can stay open at the bottom of the sidebar. See [Schedule in the sidebar](/docs/sidebar-schedule/).
- Sub-projects inherit their parent's custom fields. See [Custom fields](/docs/custom-fields/).
- Fixed: Gemini and other compatible assistant providers now say what is wrong when **Test connection** fails, instead of a vague refusal. See [Set up the assistant](/docs/assistant-setup/#when-test-connection-fails).
- Also fixed: events saved from iOS Calendar over CalDAV, short calendar items drawn on top of each other, a selection bar that scrolled out of sight, and Copy buttons on a server reached over plain http. See [Calendar apps](/docs/caldav/).

## Upgrading

No migrations and no new environment variables: replace the image or the binary and restart, and upgrade the server before your devices. One thing to check: from 0.17.0 the image is published only as `ghcr.io/opentodoapp/opentodo`, and `ghcr.io/pixari/opentodo` stays at 0.16.0, so update your compose file if it still names the old one. See [the move to OpenTodoApp](/docs/self-hosting/docker/#the-move-to-opentodoapp). As always, back up first. The full list of changes is in the [release notes](https://github.com/OpenTodoApp/OpenTodo/releases/tag/v0.17.0).
