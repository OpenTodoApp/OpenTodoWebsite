---
title: Meal planning
summary: A weekly rhythm for choosing meals, writing the shopping list and prepping ahead.
category: Home
lastReviewed: 2026-10-14
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
