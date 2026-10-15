---
title: The Eisenhower matrix with filters
summary: Sort tasks by urgent and important using priorities, due dates and four saved views side by side.
lastReviewed: 2026-10-14
sources: [/docs/filters/, /docs/views/]
templates: [weekly-review]
tags: [prioritisation]
order: 4
---
<!-- no-claim -->
The Eisenhower matrix splits work into four boxes: urgent and important (do it), important but not urgent (schedule it), urgent but not important (delegate it), and neither (drop it). It is a good antidote to a long list where everything looks equally loud.

## Map the two axes

- **Important** is priority: treat `p1` and `p2` as important, `p3` and `p4` as not. See the [filter terms](/docs/filters/).
- **Urgent** is the due date: due within the next three days, or overdue, expressed with `due <= 3 days` in the [filter language](/docs/filters/).

## Four views

Create these [saved views](/docs/views/):

| Box | Query |
| --- | --- |
| Do now | `(p1 \| p2) & due <= 3 days & open` |
| Schedule | `(p1 \| p2) & (due > 3 days \| no date) & open` |
| Delegate | `(p3 \| p4) & due <= 3 days & open` |
| Drop | `(p3 \| p4) & (due > 3 days \| no date) & open` |

Then put all four on a dashboard, side by side; a [dashboard](/docs/views/) shows up to six views at once with their counts.

## Use it in your review

The matrix works best once a week, during your [weekly review](/guides/weekly-review/): empty the Drop box, give Schedule tasks a date, and hand Delegate tasks to someone (assign them in a [shared project](/docs/sharing/)).
