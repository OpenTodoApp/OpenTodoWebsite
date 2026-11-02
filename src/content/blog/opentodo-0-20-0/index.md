---
title: "OpenTodo 0.20.0: routines and themes"
summary: "Routines with steps, starters, Describe it and AI steps you review first. Themes: fourteen editor palettes, your own, VS Code import and a server default. Also Outlook calendar sync, an Obsidian plugin, Upcoming that starts with Today, and a Multipath TCP security note."
publishedAt: 2026-11-02
author: raffaele
category: releases
release: 0.20.0
tags: [task-management, habits]
---
<!-- no-claim -->
OpenTodo 0.20.0 is about two things: making the app do the repetitive parts for you, and making it look the way you like. Before the features, one thing for everyone who runs a server.

## First, a security note

Go turns on Multipath TCP for Linux listeners by default, and CVE-2026-98432, a use-after-free in the Linux kernel's TCP connection handling, can be reached through MPTCP listeners. OpenTodo gains nothing from MPTCP, so the server and `ot` now turn it off. That keeps the kernel's MPTCP code out of reach, but it is a mitigation, not the fix: a container runs on the host's kernel, so please update the host's kernel through your distribution as soon as a patched one is available. See [Host kernel](/docs/self-hosting/docker/#host-kernel).

## Routines

Automation rules could change the task that triggered them and nothing more. They are now **routines**: a trigger and a list of steps, each using what the steps before it produced. A routine can find tasks by a condition, a filter or a saved view, change them, create tasks one per line of a note, comment, count, sort, repeat for each, notify you, send a webhook or email you. "Every Friday, turn the lines of my Groceries note into tasks in Errands" is now four steps. Every rule you already had keeps working as a one-step routine. See [Routines](/docs/routines/).

**More → Routines** has an editor that shows each step as a sentence, with its bold words as buttons that open the right picker, and every card previews what it would do while you edit. **Test** tries the routine against your data before it runs, each routine has a history with **Undo run**, and the Inbox shows **Routines since your last visit** when something happened, so a run that failed at night doesn't go unnoticed. See [The editor](/docs/routines/#the-editor).

You don't have to start from an empty page:

- **Starters.** Eleven ready-made routines, such as Groceries from a note, Sunday overdue sweep, Evening roll-over and Monthly review, in your language. See [Start from a starter](/docs/routines/#start-from-a-starter).
- **Describe it.** Write one sentence and the assistant drafts the routine. The editor opens the draft unsaved, so you check each step before anything is saved or run. See [Describe it](/docs/routines/#describe-it).

A routine can also **ask AI** to judge or summarise: "turn these meeting notes into tasks", "summarise what I finished this week". A run with an AI step writes nothing by itself. Its changes wait as a proposal in the Inbox, which you review item by item and apply with one Undo. **Apply without asking** exists, is off by default, and only you can turn it on in the app, with a cap per run and a daily token budget per routine. See [AI steps](/docs/routines/#ai-steps).

A household or a small team can give a **shared project** its own routines, such as "every Monday, give this week's chores a date". Everyone in the project sees the routine and its runs, and it only ever sees the project. See [Routines of a shared project](/docs/routines/#routines-of-a-shared-project). On an end-to-end encrypted account, routines that read text now run on one of your own devices instead of being skipped. See [Encrypted accounts](/docs/routines/#encrypted-accounts).

## Themes

The look of the app was light or dark, plus an accent. It is now a **theme**, and there are plenty to choose from:

- **Fourteen editor palettes** next to OpenTodo Light and Dark: Solarized, Gruvbox, Catppuccin, Rosé Pine, Tokyo Night and One in light and dark, plus Nord and Dracula. Each one passes the same contrast check as every theme, and each card credits the palette's author. See [Catalogue](/docs/themes/#catalogue).
- **Your own themes.** Up to 20, made in an editor with a live preview, synced to your devices. Contrast problems are listed with a **Fix** that keeps each colour's hue. See [Your own themes](/docs/themes/#your-own-themes).
- **Import a VS Code theme.** The importer maps a VS Code colour theme onto OpenTodo's colours and shows a report before saving. See [Importing a VS Code colour theme](/docs/themes/#importing-a-vs-code-colour-theme).
- **A server default.** The owner of a family, club or company server can pick the default light and dark theme and offer server themes. Your own choice always wins. See [Themes from your server](/docs/themes/#themes-from-your-server).

There is deliberately no custom CSS; [Themes](/docs/themes/#no-custom-css) explains why.

## Outlook and Microsoft 365

Calendar sync now reaches Outlook.com, Hotmail and Live accounts and Microsoft 365 work or school accounts, which offer no CalDAV. Once the server owner sets up a Microsoft client, **Connect Microsoft** sits next to CalDAV and Google in **Settings → Integrations → Calendar sync**, and it works like the other connections: dated tasks become events, and moving an event moves the task. See [Connect Microsoft Outlook](/docs/calendar-sync/#connect-microsoft-outlook), and for the owner [Set up the Microsoft client](/docs/calendar-sync/#set-up-the-microsoft-client-server-owner).

## An Obsidian plugin

The new **OpenTodo plugin for Obsidian**, for desktop and mobile, sends the line at the cursor, or each line of a selection, as a task. The line then links to the task, and the task links back to the note. It can also keep a folder of task files in two-way sync, like `ot vault` does, so people with Obsidian only on a phone get folder sync too. See [Send a line](/docs/obsidian/#send-a-line) and [Sync a folder](/docs/obsidian/#sync-a-folder).

The plugin is submitted to Obsidian's community directory, but it isn't listed there yet. Until it is, install it by hand from the [plugin's releases](https://github.com/OpenTodoApp/obsidian-opentodo/releases) or with BRAT. See [Install](/docs/obsidian/#install).

## Today and Upcoming

- **Upcoming can start with Today.** Turn on **Start with Today** in Upcoming's menu and it opens with Today's own groups, then Tomorrow and the days after: one list for now and next. See [Start Upcoming with Today](/docs/upcoming-with-today/).
- **Tasks with a time stay in sight.** With a Today limit and a full Today, a task like "send the form today by 4" used to wait in a folded group shown only as a count. The group now names the next waiting task with a time and lists up to three of them, each with **Take a slot**. Slots are still first come, first served. See [Tasks with a time today](/docs/today-limit/#tasks-with-a-time-today).
- **Today's count on the app icon.** The installed app's icon shows how many of today's tasks are still open, on iPhone and iPad (once notifications are allowed) and in apps installed from Chrome or Edge. See [App icon badge](/docs/app-icon-badge/).

## Smaller things

- **Speak or photograph a list.** The assistant can take a spoken brain dump or photos of a whiteboard and propose the tasks in one batch for you to review. See [Speak or photograph a list](/docs/assistant-capture/).
- **Your calendars in Week, Month and Year.** Events of subscribed and connected calendars now show in every calendar view, not only Day.
- **Long titles use the room beside them**, wrapping to a second line instead of being cut next to an empty space.
- **Typing on an iPhone no longer zooms the app in.**

## Upgrading

Replace the image or the binary and restart, and upgrade the server before your devices. Four migrations run at start and there are no down-migrations, so back up first. There is no new mandatory environment variable; Outlook calendar sync is optional. And once more: update the host's kernel. See [Updating](/docs/self-hosting/docker/#updating). The full list of changes is in the [release notes](https://github.com/OpenTodoApp/OpenTodo/releases/tag/v0.20.0).
