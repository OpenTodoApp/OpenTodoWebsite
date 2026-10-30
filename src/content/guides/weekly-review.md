---
title: How to do a weekly review
summary: Thirty minutes every Friday that keep your task list trustworthy, with a template and a saved view to make it a habit.
lastReviewed: 2026-10-30
sources: [/docs/recurrence/, /docs/filters/, /docs/views/, /docs/time-blocking/, /docs/review-and-statistics/, /docs/review-intervals/]
templates: [weekly-review]
tags: [habits, task-management]
order: 1
---
A task list only helps when you trust it. The weekly review is the habit that earns that trust: once a week you empty every inbox, look at what happened, and decide what matters next. It takes about thirty minutes.

## Why weekly

<!-- no-claim -->
Daily planning is about today. A week is long enough for things to drift (a promise in a meeting, a note on paper, a task that slipped three times) and short enough that catching up is still quick.

## The three steps

1. **Get clear.** Collect everything that landed in the last week: paper notes, flagged emails, the Inbox. Turn each into a task or throw it away. Use [quick add](/docs/quick-add/) to type them in fast.
2. **Look back.** Skim what you completed, then deal with everything overdue: do it, give it a new date, or drop it. The [Today view](/docs/views/) puts overdue tasks first.
3. **Look ahead.** Check next week's calendar and pick three priorities. Mark them `p1` so they stand out, as described in [the filter guide](/docs/filters/).

## Set it up in OpenTodo

Download the [Weekly review template](/templates/weekly-review/) and import it. It creates a project whose tasks [repeat every Friday](/docs/recurrence/), each with a small estimate so the review fits into half an hour on your [Week calendar](/docs/time-blocking/).

Then create a saved view with the query `@review & due <= today` and pin it to the sidebar. When Friday comes, that view is your review checklist. [Saved views](/docs/views/) show a live count, so you can see at a glance whether the review is done.

OpenTodo also has a guided weekly review of its own, in seven steps with live data. Its project walk shows one card per project, and only the projects that are due: each comes up every week unless you choose **Review every…** 2 weeks, month, quarter or paused for it (press <kbd>e</kbd> on its card). [The seven steps](/docs/review-and-statistics/#the-seven-steps) [How often a project comes up](/docs/review-intervals/#how-often-a-project-comes-up)

## Make it stick

<!-- no-claim -->
Put it in the same slot every week, ideally Friday afternoon when the week is still fresh. Keep it short: if it takes longer than thirty minutes, you are doing the work instead of reviewing it. Skip a week if you must, but never two.

- If the review keeps nagging about a project you are deliberately leaving alone for a while, press <kbd>m</kbd> on its card to **put it in maintenance**: it is no longer called stalled or without a next action, and its tasks stay where they are. [Maintenance](/docs/review-intervals/#maintenance)
