---
title: "OpenTodo 0.19.0: repeating tasks, the year and your notes"
summary: "Coming occurrences of repeating tasks on the calendar, changes to one occurrence or to the series from a date on, tasks that span days, a Year view, a Notes page with standalone notes, folding board columns and your own accent colour."
publishedAt: 2026-10-31
author: raffaele
category: releases
release: 0.19.0
tags: [task-management, time-management]
---
<!-- no-claim -->
OpenTodo 0.19.0 is the third stop on [the road to 1.0](/blog/the-road-to-1-0/), and it is about time over more than one day: routines that repeat, plans that take a week, and the notes that go with them.

## See repeating tasks ahead

A repeating task used to stand on one date only, so next Tuesday's Spanish class was missing from the calendar until you finished this one. Day, Week and Month now draw the coming occurrences as faint blocks with a dashed edge, worked out on your device from the rule, offline too. Upcoming can list the next 14 days of them if you turn it on in its menu. See [Repeating tasks on the calendar](/docs/repeating-on-the-calendar/#see-repeating-tasks-ahead).

## Change one, or change from a date on

Any coming occurrence can now be changed alone, the way a calendar does "this event only": complete it early, skip it, move it to another day or edit it, from its menu or by dragging it. The rest of the series stays as it was. See [Change one occurrence](/docs/repeating-on-the-calendar/#change-one-occurrence).

When a routine changes for good (the class moves to 19:00 after the break, gym day moves from Monday to Tuesday), open an occurrence and choose **This and following**. The old series ends the day before and a new one starts on that date with the change, in one step with one Undo. History carries across: a habit keeps its streak, and `for 20 times` still means twenty sessions in all. See [Change from one date on](/docs/repeating-on-the-calendar/#change-from-one-date-on). Thanks to [@pieros7](https://github.com/pieros7), whose request in #537 started this work.

And when you fix a typo with **All occurrences**, you can now choose **Also past ones**, so the done sessions get the new title too. Past dates and completions never change. See [All occurrences: only future ones or also past ones](/docs/recurrence/#all-occurrences-only-future-ones-or-also-past-ones).

## Tasks that span days

A trip, a conference or a week of writing used to show as one dot on its last day. Turn on **Multi-day** in the When editor's **Start** tab and the task is drawn from its start to its due date: a bar in the Week, "Day 2 of 3" in the Day, a bar across the Month. Drag the bar to move it, or drag an end to change the first or last day. Upcoming lists it once with its range, and Today shows it while it lasts. See [Tasks that span days](/docs/tasks-that-span-days/).

## Several months, and the year

The Month can now stack **2**, **3** or **6** months, for a term or a quarter of launches. A new **Year** view (`g y`) shows the twelve months as small grids, with a mark under each day for how busy it is and a red dot where the estimates exceed your day. Click a day to open it. Month and Year load only when you first open them, so the app's first load got a little smaller. See [Several months and the year](/docs/months-and-year/).

## Notes

**Notes** in the sidebar (`g e`) lists everything you have written: the notes of your tasks, the notes of your projects, and a new kind of note that is not a task at all, such as meeting notes or a packing list you keep for next year. The newest change comes first, 50 at a time with **Show more**. Search finds every word you type, on your device, so it works offline and with end-to-end encryption. A note can become a task and back with one Undo. See [Notes](/docs/notes/) and [Notes, tasks and scripts](/docs/notes-to-tasks/).

On a computer, a note now has a small **Formatting** button that keeps the formatting row above it until you press it again. See [The formatting row](/docs/formatting-row/#on-a-computer).

## Boards and colour

- **Fold a board column.** A "Done" or "Later" column can become a narrow strip with its count, and still takes cards dropped on it. See [Fold a column](/docs/fold-columns/#fold-a-column).
- **Notes on cards.** A board can show the first two lines of each card's notes under its title. See [Show notes on cards](/docs/fold-columns/#show-notes-on-cards).
- **Your own accent colour.** Pick **Custom** in Settings → Appearance → Theme and choose any colour. If it would be hard to read, the app adjusts its lightness until it passes in light and dark, and tells you it did. See [Your own accent colour](/docs/custom-accent/).

## Smaller things and fixes

- **The Inbox shows only the Inbox.** The **Planned, no project** group at its end is gone: tasks with a date are in Today and Upcoming, and the Inbox holds what has neither a project nor a date. See [Where planned tasks go](/docs/today-and-upcoming/#where-planned-tasks-go).
- **Offline, the app no longer reloads into an empty page** when a part of it that wasn't loaded yet can't be fetched. It stays where you are and does without that part until you are back online. See [Working offline](/docs/offline-and-sync/#working-offline).
- **The server removes old note versions.** Every save of a note used to be kept forever. Now old copies are cleared after 30 days, keeping one per day, and the owner sees the database's size in Settings. See [Database size and compaction](/docs/backups/#database-size-and-compaction).

## Upgrading

No migration and no new environment variables: replace the image or the binary and restart, and upgrade the server before your devices, since notes, spans and occurrences are new synced data. A database created before this version is rewritten once in the background, at a quiet moment and only when there is enough free disk space, so it can shrink; see [Database size and compaction](/docs/backups/#database-size-and-compaction). As always, back up first; there are no down-migrations. See [Updating](/docs/self-hosting/docker/#updating). The full list of changes is in the [release notes](https://github.com/OpenTodoApp/OpenTodo/releases/tag/v0.19.0).
