---
title: Moving house
summary: Everything from notice periods to the last box, in sections you can share with everyone who is moving.
category: Home
audience: Households
layout: board
tags: [teamwork, task-management]
howToUse:
  - "Import the file, then share the project with everyone who is moving."
  - "Due dates count from the day you import; set the moving day and move the rest to match."
  - "Switch the project to a board to see the stages side by side."
makeItYours:
  - "Delete the tasks that do not apply (no pets, no car) and add the ones that do."
  - "Assign the admin tasks to one person and the packing to everyone."
  - "Add a label `@call` for the tasks that need a phone call during office hours."
lastReviewed: 2026-10-15
sources: [/docs/sharing/, /docs/sections-and-boards/]
order: 3
labels:
  - name: admin
  - name: packing
projects:
  - name: Moving house
    color: "#d97706"
    sections:
      - name: Six weeks before
        tasks:
          - title: Give notice to the landlord
            due: +0d
            priority: 1
            labels: [admin]
          - title: Book the removal company
            due: +3d
            priority: 2
            subtasks:
              - title: Get three quotes
              - title: Check insurance cover
          - title: Declutter one room per weekend
            due: +1w
            recurrence: every saturday
            labels: [packing]
      - name: Two weeks before
        tasks:
          - title: Redirect post
            due: +4w
            labels: [admin]
          - title: Tell the bank, doctor and employer
            due: +4w
            labels: [admin]
          - title: Order boxes and tape
            due: +4w
            labels: [packing]
      - name: Moving day
        tasks:
          - title: Read the meters and take photos
            due: +6w
            priority: 1
          - title: Pack an open-first box
            due: +6w
            labels: [packing]
            subtasks:
              - title: Kettle, mugs and tea
              - title: Toilet paper and towels
              - title: Phone chargers
      - name: After the move
        tasks:
          - title: Register at the new address
            due: +7w
            labels: [admin]
          - title: Update the address everywhere online
            due: +7w
            labels: [admin]
---
Moving is a project with a deadline and a lot of people involved. Import this template, then [share the project](/docs/sharing/) with everyone who is moving so each person can pick up tasks.

The sections follow the calendar, from six weeks before to after the move. Switch the project to a [board](/docs/sections-and-boards/) to see the stages side by side. Due dates are set relative to the day you import the file, so adjust the first one and move the rest as needed.
