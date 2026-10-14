---
title: Weekly review
summary: A thirty-minute Friday ritual that empties your inboxes, looks back at the week and plans the next one.
category: Method
lastReviewed: 2026-10-14
sources: [/docs/recurrence/, /docs/filters/, /docs/views/]
guide: weekly-review
order: 1
labels:
  - name: review
projects:
  - name: Weekly review
    color: "#059669"
    sections:
      - name: Get clear
        tasks:
          - title: Empty the inbox
            due: +0d
            time: "16:00"
            recurrence: every friday
            estimate: 10
            labels: [review]
            subtasks:
              - title: Paper notes and receipts
              - title: Email flagged for follow-up
              - title: Inbox in OpenTodo
          - title: Close open loops from meetings
            due: +0d
            recurrence: every friday
            estimate: 5
            labels: [review]
      - name: Look back
        tasks:
          - title: Skim what you completed this week
            due: +0d
            recurrence: every friday
            estimate: 5
            labels: [review]
          - title: Reschedule or drop anything overdue
            due: +0d
            recurrence: every friday
            estimate: 5
            labels: [review]
      - name: Look ahead
        tasks:
          - title: Check next week's calendar
            due: +0d
            recurrence: every friday
            estimate: 5
            labels: [review]
          - title: Pick three priorities for next week
            due: +0d
            recurrence: every friday
            priority: 1
            estimate: 5
            labels: [review]
---
A weekly review keeps a task list trustworthy. Once a week you get everything out of your head, look at what happened, and decide what matters next.

This template gives you a project with three sections that repeat [every Friday](/docs/recurrence/). Each task carries a small estimate, so the whole review fits in about thirty minutes on the [Day and Week calendars](/docs/time-blocking/).

Pair it with a saved view such as `@review & due <= today`, pinned to the sidebar, and you have a review dashboard in one click. The [filters guide](/docs/filters/) explains the query language.
