---
title: Study plan
summary: Weekly study blocks, revision and exam dates for a course or certification.
category: Personal
audience: Students
layout: calendar
tags: [time-management, focus]
howToUse:
  - "Import the file; the study blocks repeat on fixed days and already carry estimates."
  - "Open the Week calendar to see the blocks in place, and drag them to the hours that suit you."
  - "Milestones are dated from the import day; set the exam date and move them back from it."
makeItYours:
  - "One project per subject, with the same sections, keeps revision on track."
  - "Shorten the blocks if you work better in short bursts; the Pomodoro guide shows how."
  - "Add a `@revise` label and a saved view for the last two weeks."
lastReviewed: 2026-10-18
sources: [/docs/time-blocking/, /docs/recurrence/]
order: 10
labels:
  - name: study
projects:
  - name: Study plan
    color: "#db2777"
    sections:
      - name: Weekly rhythm
        tasks:
          - title: Study block, new material
            due: +1d
            time: "19:00"
            recurrence: every monday, wednesday
            estimate: 90
            labels: [study]
          - title: Practice questions
            due: +5d
            time: "10:00"
            recurrence: every saturday
            estimate: 60
            labels: [study]
      - name: Milestones
        tasks:
          - title: Finish the first half of the syllabus
            due: +6w
            priority: 2
          - title: Full mock exam
            due: +10w
            priority: 1
            estimate: 180
          - title: Exam day
            due: +12w
            priority: 1
---
Studying works best as a rhythm. This template puts fixed study blocks on your [Week calendar](/docs/time-blocking/) with [repeating rules](/docs/recurrence/), plus the milestones that keep you on track.
