---
title: "OpenTodo 0.13.0: a side panel, detailed rows and your own grouping"
summary: "Open tasks beside any list, show rows with every label and a priority you can read without colour, group and order projects and labels, find settings faster, and plan the calendar from a label."
publishedAt: 2026-10-25
author: raffaele
category: releases
release: 0.13.0
---
<!-- no-claim -->
OpenTodo 0.13.0 comes almost entirely from your issues and comments, one day after 0.12. Most of it is about how you look at your lists: where a task opens, how much a row shows, and how a list is grouped.

## Tasks in a side panel

Since 0.11 a task opens as a page. If you'd rather keep the list in view, **Settings → Appearance → Task details → Open tasks** now has **In a side panel**. On a computer, every list then shows the selected task beside it, with its notes, subtasks, attachments and comments. Moving through the list with the keyboard shows each task in turn, the panel stays open until you close it, and you can drag its edge to the width you like. Phones keep the page. More in [the task page](/docs/task-panel/#open-tasks-beside-the-list).

## Detailed rows

One line per task is quick to scan, but it hides things. Rows can now be **Detailed**: the title, the parent task, and a line with the date, priority, deadline, project and as many labels as fit. Priority is now shown as bars and as P1 to P3 too, so you don't need to tell colours apart. Choose it for everything in **Settings → Appearance → Task rows**, or for one list in its **Display options**. See [one-line and detailed rows](/docs/row-layouts/).

## Group and order projects and labels

Projects and label pages get the **Display options** that Views already had: group by section, date, priority or label, and order by priority, date, deadline, title or by hand. Each project and label remembers its own choice on all your devices. See [group and order a list](/docs/group-and-order/).

## Settings you can find

Settings had grown long. Each section now opens as a short list of its pages, each with its state in a word ("Webhooks · 2"), and search takes you straight to the setting. Old links still work. See [Settings](/docs/settings/).

## Smaller things

- **Plan from a list** in the Calendar can use a label or a saved View: label this week's tasks "week" and plan from that. See [place tasks on the calendar](/docs/place-tasks-on-the-calendar/).
- Drag the top edge of a calendar block to change when it starts.
- The [Home Assistant integration and add-on](/docs/home-assistant/) show your lists in Home Assistant and let Assist add to them.
- Imports can go into a workspace you choose.
- Fixed: attaching a link to a task with no files, the planning list closing, placing tasks from it with the [keyboard](/docs/place-tasks-on-the-calendar/), an "Undone." notice that wouldn't leave, the time of a planned task in its details, and moving the second section up.

## Upgrading

No migrations and no new environment variables: replace the image or the binary and restart. As always, back up first. The full list of changes is in the [release notes](https://github.com/OpenTodoApp/OpenTodo/releases/tag/v0.13.0).
