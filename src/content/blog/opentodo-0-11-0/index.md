---
title: "OpenTodo 0.11.0: Precision, a quieter app that tells you what matters"
summary: "A new look for the whole app: one line per task, a sentence on Today that says what stands out, tasks that open as a page, Views, an All projects table, one palette for quick add and commands, delivery channels, a filter builder and a Claude Code plugin."
publishedAt: 2026-10-24
author: raffaele
category: releases
release: 0.11.0
draft: true
---
<!-- no-claim -->
OpenTodo 0.11.0 is out, and it looks different. I called the redesign Precision: fewer boxes, fewer colours, more room for your tasks. It is the first version of the app I truly like looking at, and it gives me solid ground to build on.

## One line per task

Every task on a wide list is one line now: the title on the left, and its date, project, labels, estimate and assignee in aligned columns on the right, so you can scan down a list instead of reading it. Pages fill one quiet surface, colour is kept for what needs you (late in red, a full day in amber), and the sidebar sits on the plain background. The [interface guide](/docs/interface-guide/) walks through the new layout.

## Today tells you what stands out

Under the title, Today now says in a sentence what matters: "Three things matter today. Renew the passport is 2 days late, Monday is already full, and Mia answered about Boiler." Your device works it out from your own tasks, offline, in all six languages; no AI writes it. Each part of the sentence [opens what it names](/docs/briefing/#open-what-it-names), and you can hide it if you don't want it. More in [the briefing](/docs/briefing/).

## Tasks as a page, and the Inbox beside its tasks

Opening a task shows it [full page](/docs/task-panel/), with where it lives and where it sits in the list, and <kbd>j</kbd> and <kbd>k</kbd> move to the next one. On a wide screen the Inbox [keeps the selected task beside the list](/docs/process-the-inbox/#the-inbox-beside-its-tasks), ready to edit, and each row says where the task came from.

## Views, and a table of every project

Filters are now [Views](/docs/saved-views/), with display options for the layout, grouping, order and the properties each row shows. You no longer need to know the query syntax: the [filter builder](/docs/filters/#build-a-filter-without-typing) shows the conditions in words. [All projects](/docs/all-projects/) is a table that says where to look, with one word per project: Late, Overdue, Quiet or On track, worked out on your device from plain rules.

## One palette, and reminders where you already look

Quick add and <kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>K</kbd> [share one palette](/docs/quick-add/#in-the-command-bar), and quick add shows what it understood as rows you can edit. [Delivery channels](/docs/notification-channels/) send reminders and notifications to ntfy, Pushover, Gotify or any address as a signed webhook.

## Claude Code, on your own server

A [Claude Code plugin](/docs/claude/) connects Claude to your server's MCP endpoint, with skills that teach it to read before changing, show a plan first and never follow instructions written inside tasks.

## Upgrading

One migration and no new environment variables: replace the image or the binary and restart. As always, back up first; there are no down-migrations. The full list of changes is in the [release notes](https://github.com/pixari/opentodo/releases/tag/v0.11.0).
