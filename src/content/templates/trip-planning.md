---
title: Trip planning
summary: Bookings, documents and a packing list with subtasks, for a holiday or a work trip.
category: Personal
audience: Everyone
layout: list
tags: [task-management]
howToUse:
  - "Import the file; the three sections are book, documents and pack."
  - "Add a reminder to the passport task if the trip is far away."
  - "Tick the packing subtasks off on your phone while you pack."
makeItYours:
  - "Copy the packing list into a \"Standard packing\" project and reuse it for every trip."
  - "Share the project with your travel companions and split the bookings."
  - "Add the dates: flights, check-in, the day the insurance must be sorted."
lastReviewed: 2026-10-15
sources: [/docs/tasks-and-projects/, /docs/reminders/]
order: 4
labels:
  - name: booking
  - name: packing
projects:
  - name: Trip
    color: "#0891b2"
    sections:
      - name: Book
        tasks:
          - title: Flights or train tickets
            due: +2d
            priority: 1
            labels: [booking]
          - title: Accommodation
            due: +3d
            priority: 1
            labels: [booking]
          - title: Travel insurance
            due: +1w
            labels: [booking]
      - name: Documents
        tasks:
          - title: Check passport expiry date
            due: +0d
            priority: 1
          - title: Print or download tickets
            due: +3w
      - name: Pack
        tasks:
          - title: Clothes
            due: +4w
            labels: [packing]
            subtasks:
              - title: Rain jacket
              - title: Comfortable shoes
          - title: Toiletries
            due: +4w
            labels: [packing]
          - title: Chargers and adapters
            due: +4w
            labels: [packing]
---
A trip has three phases: book, sort out the documents, pack. This template gives each a section and uses [subtasks](/docs/tasks-and-projects/) for the packing list, so you can tick items off on your phone while you pack.

Add a [reminder](/docs/reminders/) to the passport task if your trip is far away; renewals take time.
