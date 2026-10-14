---
title: Study plan
summary: Weekly study blocks, revision and exam dates for a course or certification.
category: Personal
lastReviewed: 2026-10-14
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
