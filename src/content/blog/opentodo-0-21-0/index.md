---
title: "OpenTodo 0.21.0: planning horizons and the home"
summary: "Plan for this week or this month without a made-up date, pin a few objectives for the quarter and the week, keep a reusable grocery list, take turns on chores, and get location reminders on Android. Also Close instead of Done, and a phone Day calendar with room for the hours."
publishedAt: 2026-11-02
author: raffaele
category: releases
release: 0.21.0
tags: [time-management, goals, teamwork]
---
<!-- no-claim -->
OpenTodo 0.21.0 is about two things: planning further than tomorrow without pretending, and the small shared jobs of a home. Here is what changed.

## Time sectors

Plenty of tasks belong to "sometime this week" or "this month", and giving them a date only to move it again every evening gets old. A task can now be planned for a period instead of a day: **This week**, **Next week**, **This month**, **Next month**, **This quarter** or **Next quarter**. Turn on **Time sectors** in Settings → Account → How you work, then pick a sector in the **Sector** tab of the When editor, or type `this week` or `sometime next week` in quick add. See [Time sectors](/docs/time-sectors/).

A sectored task leaves the Inbox, is never overdue, and keeps its deadline if it has one. When its period ends, the row reads **From week 44** and nothing is rewritten behind your back. In the Calendar, **Plan from a list › Time sectors** groups those tasks by sector, ready to drag onto a day. See [Plan the week from your sectors](/docs/time-sectors/#plan-the-week-from-your-sectors).

## Objectives

Turn on **Objectives** and write a few short lines that say what this quarter and this week are for. They sit above the Plan's columns, and the weekly review's Look ahead step lets you write next week's and carry, finish or drop last week's open ones. At most five per period, one line each, so they stay a reminder and not another list. See [Objectives](/docs/objectives/) and [In the weekly review](/docs/objectives/#in-the-weekly-review).

## Reusable lists

A grocery list is the same twenty things over and over. A project can now be a **reusable list**: **Project menu → List… → Reusable list**. Add "milk" when Milk was ticked off last week and the old item comes back in its section with its notes, instead of a second Milk. The app says "Milk is back on the list", with **Undo** and **Add anyway**. Matching happens on your device, so it works offline in the shop, and ticked items wait at the end in a **Got it** group. See [Reusable lists](/docs/reusable-lists/) and [Adding an item that is already there](/docs/reusable-lists/#adding-an-item-that-is-already-there).

**Sort into aisles** offers sections such as Produce and Dairy and eggs in your language, and new items land in the right one. See [Sort a list into aisles](/docs/reusable-list-aisles/).

## Take turns on chores

The bins on Monday, the bathroom on Saturday: a repeating task in a shared project can now pass from person to person each time it is done. Open the task's assignee, choose **Take turns…**, pick the people and put them in order. Completing the task gives the next occurrence to the next person, who gets an **It's your turn** notification. Skipping or reassigning doesn't pass the turn, and if someone leaves the project, their turn goes to the next person. See [Take turns](/docs/take-turns/).

## Location reminders on Android

A task with a location can remind you when you arrive at the place or leave it: **Add reminder → At a place → When I arrive** or **When I leave**, with a radius from 100 m to 5 km. The phone watches the places with Android's own proximity alerts, without Google Play services, and your position never leaves it. See [Location reminders](/docs/location-reminders/) and [Privacy and limits](/docs/location-reminders/#privacy-and-limits).

For now they are in the Android app from GitHub and F-Droid. The Google Play version gets them once Google has reviewed the background location use, and until then it says so in its settings. See [Location reminders in the Android app](/docs/android-app/#location-reminders).

## Smaller things

- **Close, not Done.** The editors of a task's details ended with **Done**, which on a phone sits right under the task's checkbox and reads like "complete the task". Buttons that only close a panel now say **Close**. They do exactly what they did before. See [Task panel](/docs/task-panel/).
- **The phone Day calendar leaves room for the hours.** With more than three unscheduled tasks, the lane above the hours folds behind an **Unscheduled** header with a count, so dragging a task onto a time is easy again. See [Calendar views](/docs/calendar-views/).
- **Subtasks go to Later with their parent** instead of being left behind at the top of the list. See [When a task starts](/docs/deadlines-and-start-dates/#when-a-task-starts).
- **Deleting a task always offers Undo**, from the command palette and saved views too, and a big delete asks first. See [Trash and history](/docs/trash-and-history/).

## Upgrading

Replace the image or the binary and restart, and upgrade the server before your devices. There is no migration and no new variable, but back up first anyway. See [Updating](/docs/self-hosting/docker/#updating).

If you use end-to-end encryption, update: older notes and a few other kinds of text are now encrypted too, and it happens by itself on your next unlocked sync. See [End-to-end encryption](/docs/e2ee/#enabling-plaintext-that-appears-later-purging-disabling).

The full list of changes is in the [release notes](https://github.com/OpenTodoApp/OpenTodo/releases/tag/v0.21.0).
