---
title: "OpenTodo 0.10.0: a calmer app, with room for more people"
summary: A redrawn interface and phone layout, workspaces and groups, automation rules, one editor for notes and comments, task pages for people without an account, task locations, a Markdown vault and six more importers.
publishedAt: 2026-10-23
author: raffaele
category: releases
release: 0.10.0
---
<!-- no-claim -->
OpenTodo 0.10.0 is out. I started this app for myself, and most of this release comes from the people who started using it with me: the messages, the issues, the screenshots of things that felt wrong. Thank you. Two themes run through it: the app got quieter to look at, and it got better at holding more than one person's work.

## A quieter app, on every screen

Every list now uses one task row. When a day has timed tasks, the times stand in a column before the titles, so it reads like a schedule; the line under a title is one run of muted text, and only labels keep a little colour. Hovering a row on a wide screen shows Schedule, Priority and More. See [what a row shows](/docs/work-from-the-list/#what-a-row-shows).

On a phone, two rows sit above your tasks: the top bar and quick add. Swipe a task right to complete it, left to schedule it, and hold it to select it. A task opens as a sheet over its list, and you drag it down to close it. The [interface guide](/docs/interface-guide/#on-a-phone) has the details.

One small fix came straight from a Reddit thread: opening a task no longer moves the list. Pages now start at the left edge, so the panel opens into the space beside the list and everything else stays where it is. See [the page template](/docs/interface-guide/#the-page-template).

## Work and home, apart

[Workspaces](/docs/workspaces/) keep work and home apart: each one has its own projects, labels, filters and people, and the sidebar's header switches between them. Inside a workspace you can make groups, so a project is shared with "Family" or "Design" in one step and stays up to date as the group changes. See [members and groups](/docs/workspaces/#members-and-groups).

## Tasks that look after themselves

[Automation rules](/docs/automations/) let a task change itself: when the label "waiting" is added, move it to Waiting; every Sunday evening, give overdue tasks tomorrow's date; when a task is due, notify me. A rule has a trigger, optional conditions with a live count of matching tasks, and actions. Rules run only for the person who made them, and their [history](/docs/automations/#history) shows what each one did.

## Writing, together

Notes and comments now share [one editor](/docs/formatting/). Type `/` for a menu with headings, lists, tables, quotes, code, links and images, paste a screenshot straight in, and `@` to mention someone. Comments can get a [reaction](/docs/comments-and-activity/#comment-on-a-task) too: a thumbs up, a heart, a check, and a few more.

Sometimes the person who should do a task has no account. A [task page](/docs/task-pages/) turns one task into a calm page at a private link, with its dates, checklist, map and conversation. You choose whether guests can read, reply, or also tick things off, and their replies arrive as comments.

## Where, and in what file

A task can say [where it happens](/docs/locations-and-places/): search an address, pick a point on a map, or save a place you use often. Maps go through your own server, and the server owner can switch them off; see [maps and privacy](/docs/locations-and-places/#maps-and-privacy).

If you live in Markdown, the [vault](/docs/vault/) writes your tasks as a folder of files, one per project, in the Obsidian Tasks format. `ot vault sync` keeps the files and the app in step both ways: tick a line in Obsidian and every device sees it.

## Coming from somewhere else

The importer reads [six more apps](/docs/import/#formats): Google Tasks, Trello, Asana, Microsoft To Do, Apple Reminders and Any.do. Each has a short guide, for example [from Trello](/docs/switch/trello/) or [from Google Tasks](/docs/switch/google-tasks/). Lists become projects, checklists become subtasks, and every task remembers where it came from.

## Your own name on it

If you run OpenTodo for a family, a club or a small team, [Branding](/docs/self-hosting/branding/) lets the owner give the server its own name and logo. They show in the browser tab, the installed app and the sign-in screen, which then reads "Powered by OpenTodo".

There is also an early [Android app](/docs/android-app/) in the repository: a small shell around your own server that adds phone reminders, the share menu and widgets. It is not in the app stores yet, and I would rather test it properly first.

## Upgrading

<!-- no-claim -->
Pull the `0.10` image or the new binary and restart. Version 0.10.1 followed the same day with a small documentation fix, so the image and binaries to take are 0.10.1. Six migrations run at startup, and no new setting is required: maps, dictation through your own speech service and automation rules each have optional settings, described in the release notes. As always, upgrade the server before your devices, and keep a backup, since migrations only go forward. The full list is on the What's new page and in the [0.10.0 release notes](https://github.com/pixari/opentodo/releases/tag/v0.10.0); the binaries are on the [0.10.1 release](https://github.com/pixari/opentodo/releases/tag/v0.10.1). If you want to try it first, the [demo](https://demo.open-todo.app) already runs it.
