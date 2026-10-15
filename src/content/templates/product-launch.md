---
title: Product launch
summary: A small team's launch plan on a board, from final checks to the announcement and the week after.
category: Work
audience: Teams
layout: board
tags: [teamwork, time-management]
howToUse:
  - "Import the file, share the project with your team as editors, and show it as a board."
  - "Assign the tasks and give each an estimate; the Week calendar then shows whether the plan fits the days you have."
  - "Move cards across Backlog, This week, Launch day and Week after as the launch approaches."
makeItYours:
  - "Rename the sections to your own stages, or add a \"Blocked\" column."
  - "Save a view `#Launch & due <= 7 days` for the stand-up."
  - "Add a label per workstream (`@marketing`, `@engineering`) and filter the board by it."
lastReviewed: 2026-10-15
sources: [/docs/sections-and-boards/, /docs/sharing/, /docs/time-blocking/]
order: 5
labels:
  - name: marketing
  - name: engineering
  - name: support
projects:
  - name: Product launch
    color: "#7c3aed"
    sections:
      - name: Backlog
        tasks:
          - title: Write the announcement post
            labels: [marketing]
            estimate: 120
          - title: Record a two-minute demo video
            labels: [marketing]
            estimate: 90
      - name: This week
        tasks:
          - title: Freeze features and cut the release candidate
            due: +2d
            priority: 1
            labels: [engineering]
          - title: Update the documentation
            due: +3d
            priority: 2
            labels: [engineering]
            estimate: 180
          - title: Prepare support answers for the top ten questions
            due: +4d
            labels: [support]
      - name: Launch day
        tasks:
          - title: Publish the release
            due: +1w
            time: "09:00"
            priority: 1
            labels: [engineering]
          - title: Send the announcement
            due: +1w
            time: "10:00"
            priority: 1
            labels: [marketing]
      - name: Week after
        tasks:
          - title: Collect feedback and file follow-ups
            due: +2w
            labels: [support]
          - title: Write a short retrospective
            due: +2w
            estimate: 45
---
A launch needs everyone to see the same plan. Import this template, [share the project](/docs/sharing/) with your team as editors, and show it as a [board](/docs/sections-and-boards/): Backlog, This week, Launch day, Week after.

Tasks carry estimates, so the [Week calendar](/docs/time-blocking/) shows whether the plan fits into the days you have.
