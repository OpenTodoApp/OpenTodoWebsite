---
title: "OpenTodo 0.12.0: details in place, group mentions and the assistant on encrypted accounts"
summary: "Press → to see a task's details under its row, mention a whole group, filter by workspace, format comments, complete ot commands with Tab, and use the assistant on an end-to-end encrypted account from your own device."
publishedAt: 2026-10-25
author: raffaele
category: releases
release: 0.12.0
draft: true
---
<!-- no-claim -->
OpenTodo 0.12.0 builds on the Precision redesign of 0.11. Some of it comes straight from your comments, like a key to see a task's details without leaving the list. There are also mentions for a whole household or team, and an assistant that works even when the server can't read your tasks.

## Details under the row

Select a task and press <kbd>→</kbd>: its notes, dates, labels, subtasks and what it waits for open right under the row, and <kbd>←</kbd> or <kbd>Esc</kbd> closes them again. On a phone, the small arrow at the end of a row does the same. You can tick subtasks there, and **Open task** is one click away. More in [Expand a row](/docs/expand-a-row/).

## Mention a group, filter by workspace

In a comment or a task's notes, `@Adults` now mentions a whole group of the workspace: everyone in it who can see the task gets one notification, and nobody outside the project is told. Filters and Views understand `workspace: Home`, so one View can gather tasks from several workspaces. See [Workspaces](/docs/workspaces/#mention-a-group) and [Filters](/docs/filters/#workspaces).

The comment box gets an **@** button for mentions and, on a computer, a **Formatting** button for bold, lists and links. Comments are still stored as Markdown.

## The assistant on encrypted accounts

The server can't read an end-to-end encrypted account, so until now the assistant couldn't help there. When the server owner allows it, your device now runs the assistant itself, with your own key for Anthropic, OpenAI or Gemini, or a model server such as Ollama on your network. The key stays in your browser, and the server sees neither it nor your tasks. Proposals, review and undo work as before. The owner's side and the trade-offs are in [the assistant on encrypted accounts](/docs/assistant-encrypted/).

## Smaller things

- `ot` has [shell completion](/docs/cli/#shell-completion) for bash, zsh and fish, including your project and label names.
- When Upcoming says "Friday and Monday are already full", each day is its own link, and **Settings → General** has a switch for [the briefing](/docs/briefing/).
- The rest of the app now holds up at larger browser text sizes, and an empty Inbox with planned tasks below it shows one quiet line instead of a big picture.
- OpenTodo has been submitted to the app stores of Umbrel, CasaOS, TrueNAS, Cosmos, Dokploy, Easypanel and Portainer.

## Upgrading

No migrations and no new environment variables: replace the image or the binary and restart. As always, back up first. The full list of changes is in the [release notes](https://github.com/pixari/opentodo/releases/tag/v0.12.0).
