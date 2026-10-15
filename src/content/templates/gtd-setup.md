---
title: Getting Things Done setup
summary: Contexts, a waiting-for list and a someday list, ready for the GTD method in a few minutes.
category: Method
audience: Professionals
layout: list
tags: [task-management, prioritisation]
howToUse:
  - "Import the file; it creates the labels, the GTD project and its sections."
  - "Save the views the guide suggests, such as `@phone & !@waiting`, and pin them to the sidebar."
  - "Every Friday, the review task asks you to check each project for a next action."
makeItYours:
  - "Rename the contexts to the places you actually work: `@office`, `@workshop`, `@town`."
  - "Delete the sections you do not use; a smaller system is one you keep."
  - "Give the review task a time that fits your week."
lastReviewed: 2026-10-15
sources: [/docs/labels-and-filters/, /docs/filters/, /docs/views/]
guide: getting-things-done
order: 2
labels:
  - name: home
  - name: computer
  - name: phone
  - name: errand
  - name: waiting
  - name: someday
projects:
  - name: GTD
    color: "#2563eb"
    sections:
      - name: Next actions
        tasks:
          - title: Call the bank about the new card
            labels: [phone]
          - title: Update the budget spreadsheet
            labels: [computer]
            estimate: 30
          - title: Pick up the dry cleaning
            labels: [errand]
          - title: Fix the squeaky door
            labels: [home]
      - name: Waiting for
        tasks:
          - title: Quote from the electrician
            labels: [waiting]
            due: +1w
          - title: Reply from Sam about the venue
            labels: [waiting]
            due: +3d
      - name: Someday / maybe
        tasks:
          - title: Learn to make sourdough
            labels: [someday]
          - title: Plan a trip to Japan
            labels: [someday]
  - name: Projects list
    color: "#7c3aed"
    tasks:
      - title: Review every project for a next action
        due: +0d
        recurrence: every week
        estimate: 15
---
Getting Things Done works with any tool that has an inbox, contexts and lists. In OpenTodo, contexts are [labels](/docs/labels-and-filters/) and each list is a saved filter.

The template creates the [labels](/docs/labels-and-filters/) `@home`, `@computer`, `@phone`, `@errand`, `@waiting` and `@someday`, a GTD project with sections for next actions, waiting-for and someday, and a weekly reminder to check every project for a next action.

Create views like `@phone & !@waiting` for the moments you have only your phone. [Saved views](/docs/views/) can be pinned to the sidebar with live counts.
