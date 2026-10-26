---
title: "OpenTodo 0.6.0: your language, and a look back at your week"
summary: The app in six languages, statistics and a guided weekly review, filters by completion date, habits with streaks, custom fields, a display mode for wall tablets and e-ink, and host mode for running many servers in one process.
publishedAt: 2026-10-16
author: raffaele
category: releases
release: 0.6.0
---
<!-- no-claim -->
OpenTodo 0.6.0 is out. Until now the app was good at telling you what comes next and bad at telling you what already happened. This release fixes that, and it finally speaks more than English.

## The app in your language

The interface now comes in English, German, French, Spanish, Italian and Portuguese, the same six languages quick add already understood. You pick one under **Settings → General → Language**, or leave it on the browser's language. The choice syncs to every device, and switching works offline. The [language guide](/docs/language/) has the details, and [translating OpenTodo](/docs/translating/) explains how to add another one.

## What did I do last week?

This started as a question in [issue #86](https://github.com/OpenTodoApp/OpenTodo/issues/86): "I'd like to construct a query that shows what I've done over last week or month." You can now. [Filter queries](/docs/filters/) take a completion date, `completed = last week` or `completed >= this month`, and every date term understands periods like `this week`, `last month` or `3 weeks ago`, starting on the first day of the week you chose. Save one as a view and it stays current.

The [Completed view](/docs/built-in-views/) is now a logbook, grouped by the day you finished each task, and it no longer stops at the latest hundred.

## Statistics and a weekly review

**Statistics** shows what you completed, created, finished late and let slip, for this week, last week or the last four or twelve weeks, with charts per day, weekday and project. It is computed on your device from your own tasks, and nothing is sent anywhere. **Review** walks you through a weekly review in four steps with live data: empty the Inbox, look back, give every project a next action, look ahead. If your server sends email, you can also get a short digest on your review day. All of it is in [weekly review and statistics](/docs/review-and-statistics/).

## Habits, custom fields and display mode

A repeating task can now be [tracked as a habit](/docs/recurring-and-reminders/#track-a-habit): it shows your current and best streak and a month of done, skipped and missed days, and skipping a day keeps the chain.

[Custom fields](/docs/custom-fields/) add typed values to a project's tasks (text, number, date, choice, link, checkbox), with a columns layout and filters like `cost > 100`.

[Display mode](/docs/display-mode/) puts Today, Upcoming, a project or a saved view full screen in large type with a clock, for a tablet on the fridge or an e-ink panel.

## Leaving other apps, and hosting many servers

The [importers](/docs/import/) from Todoist, TickTick, Linear and Things keep more of what you had: TickTick creation and completion times, the right time for all-day reminders, and Todoist reminders in the task's own time zone.

For people who run OpenTodo for others, [host mode](/docs/self-hosting/host-mode/) serves many independent servers from one process, with limits per server and an archive that moves a server to self-hosting in one download. A normal self-hosted server is unchanged.

## One fix you will notice

Since 0.5.0, pointing at a task turned its circle into a selection checkbox, so clicking to complete a task selected it instead. The circle completes again; [bulk selection](/docs/bulk-actions/) starts with Ctrl or ⌘ and a click, or the <kbd>x</kbd> key.

<!-- no-claim -->
The full list, with upgrade notes, is on the What's new page and in the [0.6.0 release notes](https://github.com/OpenTodoApp/OpenTodo/releases/tag/v0.6.0), which also have the binaries. Upgrading is a pull of the `0.6` image: one migration runs at startup, and no new setting is required.
