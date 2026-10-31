---
title: "OpenTodo 0.18.0: a day that knows about your meetings"
summary: "Meetings that count toward a full day, Re-plan for a morning that slipped, frames and slots on the calendar, energy on a task, Bento in the Daily check, and a calendar you can add to, colour and filter."
publishedAt: 2026-10-31
author: raffaele
category: releases
release: 0.18.0
tags: [time-management, focus]
---
<!-- no-claim -->
OpenTodo 0.18.0 is the second stop on [the road to 1.0](/blog/the-road-to-1-0/), and it is about getting through the day, not only storing tasks. As before, every new setting is off until you turn it on, so nothing changes for you unless you ask for it.

## A day that counts your meetings

Eight hours of tasks never fit into a day with three hours of meetings. Turn on **Count meetings in capacity** (Settings → Language and region → Calendar grid) and the busy events of your subscribed and connected calendars add to each day's total: `6h 45m / 8h`, with "4h 15m of tasks, 2h 30m in meetings" in the tooltip. A day whose tasks fit but not around its meetings turns amber instead of red. Free and all-day events never count. See [See whether the day fits](/docs/place-tasks-on-the-calendar/#see-whether-the-day-fits).

## Re-plan when the morning slips

When blocks you planned have passed without being done, the Day and Week header says so: **3 blocks behind · Re-plan**. Re-plan moves them, in their order and at their own length, into the free time left today, around your other blocks and meetings. It is a preview first, with the new places shown as dashed ghosts, and you choose what happens to tasks that no longer fit: leave them, or move them to tomorrow. **Apply** writes it with one Undo; **Cancel** leaves the day as it was. Nothing is rearranged without you. See [Re-plan the rest of the day](/docs/replan-the-day/).

## Frames and slots

A **frame** is the hours you keep for one kind of work: *Deep work* on weekdays from 09:00 to 11:00, or *Admin* late on Thursday afternoon. It shows as a quiet band behind the day's blocks and only guides: it never moves, blocks or creates anything. Give it a project, label or saved view, and **Plan from this frame** opens that list. See [Frames](/docs/frames/).

A **slot** is one block for several small tasks: *Admin · 16:00–16:45* with a checklist of the five things you mean to get through, *2 of 5 done*. Drop tasks on it, tick them off, move or resize it like any block, and it counts once toward the day. See [Slots](/docs/slots/).

## Energy and Bento

Some tasks need your best hour and some can be done half asleep. Turn on **Energy levels** in Settings → Account → How you work, and a task can be **Deep**, **Medium** or **Low**: from its menu, or with `~deep`, `~medium` or `~low` in quick add. The filter `energy: low & unblocked & today` is an end-of-the-day list of easy wins. See [Energy levels](/docs/method/set-up/#energy-levels) and [Filter queries](/docs/filters/).

The Daily check can now offer **Bento**: today's focus as three slots, one Large, one Medium and one Small task, picked by their estimates. **Frog** puts the Large one first, **Summit** the Medium one. **Three tasks** stays the default. See [Bento](/docs/method/rhythms/#bento).

## A clearer calendar

- **Deadlines show on their day**, as a chip with an amber diamond in Day and Week and a row in Month and Plan. See [Deadlines](/docs/deadlines-and-start-dates/#deadlines).
- **Add with the mouse**: double-click an empty quarter hour to add a task there, or right-click (a long press on a phone) for **Add task here…**, **New frame here…** and **New slot here…**. See [Add and colour on the calendar](/docs/calendar-add-and-colour/).
- **Colour by** project, label or priority, on the calendar and on boards. See [Colour by project, label or priority](/docs/calendar-add-and-colour/#colour-by-project-label-or-priority).
- **Filter…** narrows the calendar, or Upcoming, with a query, and a project gains a **Calendar** layout beside List, Board and Timeline. See [Filter the calendar](/docs/calendar-filter/).
- **Show completed tasks** keeps what you finished on the calendar, struck through. Thanks to [@arvkonstantin](https://github.com/arvkonstantin) for the idea and the code (#626). See [Completed tasks on the calendar](/docs/completed-on-the-calendar/).

## Smaller things and fixes

- **Manual order on label pages and in saved views.** **Order by: Manual order** was offered there, but dragging did nothing. Now each label and view keeps its own order, on every device and offline, without reordering the project. Thanks to [@osenchenko](https://github.com/osenchenko) for reporting it (#623). See [Group and order](/docs/group-and-order/).
- **Calendars published from Exchange on-premises load.** Their `.ics` addresses refused anything that wasn't a desktop browser, so they failed with *http_400*; OpenTodo now tries once more as a browser when a calendar answers that way. Thanks to [@osenchenko](https://github.com/osenchenko) for the diagnosis (#622). See [Exchange on-premises](/docs/calendar-feeds/#exchange-on-premises).
- **Quick add understands "every other"**: `Send timesheet every other friday` repeats every two weeks, in all six languages. And a month named in passing, as in `Collect the invoices from September and send them next monday`, no longer becomes the due date. See [Repeat and remind](/docs/quick-add/#repeat-and-remind).
- **Better on a phone**: a tap just beside a task's circle completes it instead of opening the task, and today's focus and the Bento slots can be filled by tap, not only with <kbd>f</kbd>. See [Pick the focus by touch](/docs/method/rhythms/#pick-the-focus-by-touch).

<!-- no-claim -->
One thing from the plan for 0.18 is not in this release: the urgency sort. It wasn't ready, and we would rather ship it right than ship it now.

## Upgrading

One migration and no new environment variables: replace the image or the binary and restart, and upgrade the server before your devices, since frames, slots, energy and the manual order are new synced data. As always, back up first; there are no down-migrations. See [Updating](/docs/self-hosting/docker/#updating). The full list of changes is in the [release notes](https://github.com/OpenTodoApp/OpenTodo/releases/tag/v0.18.0).
