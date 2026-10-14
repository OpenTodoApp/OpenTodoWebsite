---
title: Household chores
summary: Daily, weekly and monthly chores on repeat, ready to share and assign in a household.
category: Home
lastReviewed: 2026-10-14
sources: [/docs/recurrence/, /docs/sharing/]
order: 6
labels:
  - name: kitchen
  - name: cleaning
  - name: garden
projects:
  - name: Household
    color: "#16a34a"
    sections:
      - name: Daily
        tasks:
          - title: Load or empty the dishwasher
            due: +0d
            recurrence: every day
            labels: [kitchen]
          - title: Wipe the kitchen counters
            due: +0d
            recurrence: every day
            labels: [kitchen]
      - name: Weekly
        tasks:
          - title: Vacuum and mop
            due: +0d
            recurrence: every saturday
            estimate: 45
            labels: [cleaning]
          - title: Change the bed sheets
            due: +0d
            recurrence: every sunday
            labels: [cleaning]
          - title: Take out recycling
            due: +0d
            recurrence: every tuesday
          - title: Water the plants
            due: +0d
            recurrence: every wednesday and saturday
            labels: [garden]
      - name: Monthly
        tasks:
          - title: Clean the fridge
            due: +1w
            recurrence: every month
            labels: [kitchen]
          - title: Descale the kettle and coffee machine
            due: +2w
            recurrence: every month
            labels: [kitchen]
          - title: Test the smoke alarms
            due: +3w
            recurrence: every month
---
Chores are the reason many households want a shared task list. Every task here [repeats](/docs/recurrence/) on its own schedule, and when you complete one the next occurrence appears.

[Share the project](/docs/sharing/) with everyone at home and assign tasks to people, or leave them open for whoever gets there first.
