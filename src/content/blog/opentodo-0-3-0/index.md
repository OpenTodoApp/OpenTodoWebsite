---
title: "OpenTodo 0.3.0: bring your own AI"
summary: An assistant in the app that proposes changes you review, assistants you already use making changes over MCP, and a command line ready for coding agents. All of it off until you turn it on.
publishedAt: 2026-10-14
author: raffaele
category: releases
release: 0.3.0
---
<!-- no-claim -->
OpenTodo 0.3.0 is about bringing your own AI, if you want one. Nothing in this release sends your tasks anywhere unless the person who runs the server turns it on, and every person sees what goes where before their first message.

## An assistant inside the app

There is now a chat panel in OpenTodo that answers questions about your tasks and proposes changes: "move everything overdue to Friday", "break this task into steps". Each proposal is a list of changes in everyday language. You tick the ones you want, apply them in one step, and undo them in one step. The [assistant guide](/docs/assistant/) shows the whole flow.

It works with Anthropic, OpenAI, Google Gemini, or a model on your own network such as Ollama or LM Studio, with your own key. The owner can let each member bring their own provider and key too. Keys stay on the server and are never sent back to the app or written to backups, as the [assistant settings](/docs/assistant/) describe.

## Assistants you already use

If you already talk to an assistant all day, it can now make changes to your tasks over [MCP](/docs/mcp/), not only read them. Two switches have to be on for that: one for the owner and one for you. Every change shows up in history with the assistant's name and can be undone, and nothing is ever deleted for good.

## A command line for coding agents

The `ot` [command line](/docs/cli/) now has everything an agent needs to use it safely: JSON output with schemas, a dry run for every change, idempotency keys so a retry never creates a duplicate, and a skill file that explains all of this to the agent.

## Which one to pick

The three options suit different people. The [Use AI with OpenTodo](/docs/ai-and-agents/) page compares them side by side, including what each one can and cannot touch.

## Also in this release

You can now share a project with a single [invite link](/docs/sharing/), with a role and an expiry, and settings are split into sections with their own pages.

<!-- no-claim -->
The complete list, including upgrade notes and the two small breaking changes in `ot`, is on the What's new page linked above.
