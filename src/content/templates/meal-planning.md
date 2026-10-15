---
title: Meal planning
summary: A weekly rhythm for choosing meals, writing the shopping list and prepping ahead.
category: Home
audience: Households
layout: list
tags: [habits, teamwork]
howToUse:
  - "Import the file; the Sunday rhythm repeats every week: choose, write the list, shop, prep."
  - "Share the project so whoever is in the shop sees the list live."
  - "Add this week's groceries as subtasks of the shopping task and tick them off in the aisle."
makeItYours:
  - "Move the planning day to whenever your week starts."
  - "Add a section per weekday with the dish as the task title, so the plan is visible on the phone."
  - "Keep a \"Staples\" section of things you always need and copy from it."
lastReviewed: 2026-10-15
sources: [/docs/recurrence/, /docs/sharing/]
order: 7
labels:
  - name: shopping
projects:
  - name: Meals
    color: "#ea580c"
    sections:
      - name: Plan
        tasks:
          - title: Choose dinners for the week
            due: +0d
            recurrence: every sunday
            estimate: 15
          - title: Check the fridge and cupboards
            due: +0d
            recurrence: every sunday
      - name: Shop
        tasks:
          - title: Write the shopping list
            due: +0d
            recurrence: every sunday
            labels: [shopping]
          - title: Big shop
            due: +1d
            recurrence: every monday
            labels: [shopping]
      - name: Prep
        tasks:
          - title: Cook a batch of grains and vegetables
            due: +0d
            recurrence: every sunday
            estimate: 60
---
Planning meals once a week saves both money and evenings. This template sets a Sunday rhythm with [repeating tasks](/docs/recurrence/): choose, write the list, shop, prep.

Keep the shopping list in the same [shared project](/docs/sharing/) so whoever is in the shop sees it live.
