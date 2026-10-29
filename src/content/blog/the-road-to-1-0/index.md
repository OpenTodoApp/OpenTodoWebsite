---
title: The road to 1.0
summary: Six releases between now and OpenTodo 1.0, what each one is for, and the promises that do not change on the way.
publishedAt: 2026-10-29
author: raffaele
category: development
inDevelopment: true
tags: [task-management, time-management]
---
<!-- no-claim -->
OpenTodo started with a simple promise: a task manager as good as the ones you pay for every month, running on your own server. The first roadmap is done. This post is about the next one, the plan from 0.17 to 1.0.

<!-- no-claim -->
Before writing it I studied the market: the list apps people switch from, the paid planners, the methods people actually read, and every open issue on GitHub. About a third of what the research suggested is already in OpenTodo, so the plan only holds what is still missing.

## Three gaps, and one more

<!-- no-claim -->
The research kept pointing to three places where OpenTodo can still get much better.

<!-- no-claim -->
- **Getting through the day,** not only storing tasks. Paid planners charge a lot for a few simple ideas: a day that knows about your meetings, a way to re-plan the afternoon when the morning went wrong, blocks of time that hold several small tasks.
- **Ideas from the methods people read.** Sequential projects, a review rhythm per project, a short list for today instead of an endless one.
- **Being everywhere you are:** iPhone, Shortcuts, Obsidian, your voice, Outlook.

<!-- no-claim -->
The fourth is trust. To be the obvious choice, a task manager has to be safe, accessible, fast with a big account, easy to move into, and stable for years. That is what 1.0 is about.

## The six releases

<!-- no-claim -->
**0.17, Calm constraints.** Projects can be sequential, so only the next step shows up, or an ongoing area without a progress bar. Each project gets its own review rhythm. Today can have an optional limit, with a place for what waits its turn, and a Done today list. Plus quick wins many of you asked for: add tasks at the top, counts in the sidebar, Focus one tap away, default reminders.

<!-- no-claim -->
**0.18, The mindful daily planner.** Meetings count toward a full day. One button re-plans the rest of the day after a busy morning, as a preview you confirm and can undo. Recurring frames on the calendar, like deep work from 9 to 11, and slots that hold a few small tasks. An energy property, a deterministic urgency sort, and a clearer calendar.

<!-- no-claim -->
**0.19, Series and time.** Repeating tasks show their future occurrences, and you can move, skip or edit just one, or change everything from one date on. Tasks can span several days. A year view, folding board columns, and your own accent colour.

<!-- no-claim -->
**0.20, Everywhere.** The iPhone app in the App Store, with Siri, Shortcuts and widgets. Focus as a Live Activity. An Obsidian plugin. Speak a brain dump, or snap a photo of handwritten notes, and review the tasks it proposes before anything is added. Outlook calendar sync, and the Android app in production on Google Play and F-Droid.

<!-- no-claim -->
**0.21, Horizons and home.** Plan for "next week" or "this quarter" without inventing a due date. A few quarterly objectives, as small cards next to your plan rather than a separate goals database. A grocery mode that reopens an item instead of duplicating it, chores that rotate between people, reminders when you arrive somewhere, and more languages.

<!-- no-claim -->
**1.0, Trust.** A stable API and data format with a written compatibility promise. An independent security review, with the findings fixed before release. An accessibility audit to WCAG 2.2 AA. Performance budgets for 10,000 tasks, on phones too. A checked path from every app people switch from. CalDAV tested on real clients.

## What will not change

<!-- no-claim -->
A plan is also a list of things I will not do.

<!-- no-claim -->
- **Calm by default.** Every new idea is something you switch on. If you want a simple list, you never have to meet any of it.
- **Nothing changes without you.** Re-planning, the assistant and automations propose; you confirm, and one Undo takes it back. No autopilot rearranging your week.
- **No enterprise weight.** No story points, velocity charts or permission matrices.
- **Free, forever.** No paid tier for the server, the apps or any feature, ever. That includes the iPhone and Android apps.
- **It works offline and with encryption.** Every feature works without a connection and on end-to-end encrypted accounts, or says clearly where it cannot.

## Where to follow it, and how to help

<!-- no-claim -->
Each item is an OpenSpec change in the repository, with a proposal, a design and the tasks to build it, and each has an issue in its milestone on GitHub. The [roadmap](https://github.com/OpenTodoApp/OpenTodo/blob/main/ROADMAP.md) lists them all with their links.

<!-- no-claim -->
If one of them matters to you, say so on its issue: what you would use it for is the most useful thing you can tell me. If you would like to build one, read its change and comment before you start, so we do not do the same work twice. Many of the 0.17 items are small and good first contributions.

<!-- no-claim -->
Dates are honest guesses, not promises. Each milestone ends with a release and a post here, and the order may move if your feedback says it should.
