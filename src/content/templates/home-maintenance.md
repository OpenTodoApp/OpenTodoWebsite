---
title: Home maintenance
summary: The yearly and seasonal jobs every home needs, repeating so you never have to remember them.
category: Home
lastReviewed: 2026-10-14
sources: [/docs/recurrence/, /docs/reminders/]
order: 9
labels:
  - name: outside
  - name: inside
projects:
  - name: Home maintenance
    color: "#64748b"
    sections:
      - name: Every season
        tasks:
          - title: Clean the gutters
            due: +2w
            recurrence: every 3 months
            labels: [outside]
          - title: Replace the cooker hood filter
            due: +1m
            recurrence: every 3 months
            labels: [inside]
      - name: Every year
        tasks:
          - title: Service the boiler
            due: +1m
            recurrence: every year
            priority: 2
            labels: [inside]
          - title: Check the roof and chimney
            due: +2m
            recurrence: every year
            labels: [outside]
          - title: Bleed the radiators
            due: +3w
            recurrence: every year
            labels: [inside]
---
Some jobs come round only once a season or once a year, which is exactly why they get forgotten. Every task here [repeats](/docs/recurrence/) at its own interval; add a [reminder](/docs/reminders/) to the ones that need booking a tradesperson.
