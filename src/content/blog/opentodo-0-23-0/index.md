---
title: "OpenTodo 0.23.0: a threat model you can check"
summary: "A published threat model, how its security is verified, what it does not protect and a disclosure policy with response times, plus the hardening they called for. Also OAuth for MCP apps, Simplified Chinese, a new logo, the 1.0 docs and many fixes from your reports."
publishedAt: 2026-11-06
author: raffaele
category: releases
release: 0.23.0
tags: [ownership, task-management]
---
<!-- no-claim -->
A few days ago someone told me that before more features, they wanted to know the foundations of OpenTodo are solid. I agreed, and 0.23.0 is the first release of that plan: it is about trust. Here is what changed.

## What we defend, and how you can check

OpenTodo now publishes a [threat model](/docs/security/threat-model/). It names what a server holds, where the trust boundaries are, and thirteen kinds of attacker, from an anonymous visitor to a misled AI agent, a malicious server for an encrypted account and another tenant in host mode. For each one it says what is defended, by which mechanism, which tests would fail if that broke, and what is not defended.

[How we verify security](/docs/security/how-we-verify/) is the retrospective people asked for: how sync, encryption, route policies, token scopes, outbound requests and importers are checked, which tests, fuzzing and static analysis sit behind each claim, every past security fix, and the gaps that are still open.

[Security limits](/docs/security/limits/) says in one place what OpenTodo does not protect: what the person who runs your server can see with and without end-to-end encryption, what is stored unencrypted, what backups contain, and how far host mode and the demo keep people apart. I would rather you read this page before you trust the app than find it out later.

<!-- no-claim -->
The [security policy](https://github.com/OpenTodoApp/OpenTodo/blob/main/SECURITY.md#what-to-expect) now makes promises with numbers: an answer to a report within 3 business days, an assessment within 10, fix targets by severity (7 days for Critical, 30 for High, 90 for Medium), coordinated disclosure within 90 days with an advisory and a CVE, and a safe harbour for research on a server you run yourself. Every server also answers `/.well-known/security.txt` with the same channels.

To be plain about one thing: no outside security review has happened yet. The [scope for an independent review](/docs/security/review-scope/) is written and ready for one. Until it happens, nothing on this site claims one. The [Security page](/security/) gathers all of this.

## The hardening they called for

Writing the threat model turned up places where the defence was thinner than it should be. They are fixed in this release:

- **AI agents have limits per account**, not only per token: at most 60 write calls a minute and 2,000 changed items a day for all of one person's agent tokens and apps together, so making more tokens does not raise the budget. An agent can also no longer create, turn on or run a routine that sends a webhook or an email. See [Limits](/docs/mcp/#limits) and [Prompt injection](/docs/mcp/#prompt-injection).
- **First-run setup under a domain name asks for the setup code** until a base URL is set, so nobody else can register as the owner of a fresh server through a name they point at it. Opening it by IP address or a local name works as before. See [The setup code](/docs/self-hosting/docker/#the-setup-code).
- **Imports refuse oversized fields and deeply nested files** that no real export contains. See [Import limits](/docs/import/#jobs-limits-and-undo).
- **Backups and single sign-on connect directly** to what the owner configured, without a proxy from the environment or a redirect to another host. See [Backups](/docs/backups/#destinations).

<!-- no-claim -->
Cookie writes now need the browser's Fetch Metadata or a JSON body, encrypted accounts refuse a weaker key record than the app writes, and the share target only keeps shares whose origin the browser states. The [release notes](/changelog/#v0-23-0) list each one.

## Connect ChatGPT, claude.ai and Gemini by URL

Some AI apps will not take a pasted token; Gemini says it outright. The MCP endpoint now also speaks OAuth: you create a client under **Settings → Integrations → AI assistants**, paste its id and secret into the app, and allow the connection in a consent dialog. Access tokens stop working after an hour, refresh tokens are replaced on every use, and deleting the client cuts the app off. Each connection shows up as an ordinary API token. See [OAuth clients](/docs/mcp-oauth/).

## Simplified Chinese

The app, reminders, emails, the browser extension and the phone apps can now use 简体中文, which makes seven languages. A browser set to Simplified Chinese follows it; Traditional Chinese stays in English. Quick add still reads the six languages it read before. See [The app in your language](/docs/language/). If you are a native speaker, I would love [your help with the wording](/blog/help-review-translations/).

## A new logo and the 1.0 docs

<!-- no-claim -->
OpenTodo has a new mark: an open tray with a tick dropping into it. It is in the app, the installed icon, the browser extension, the Android launcher (with a themed version on Android 13 and later) and on this site.

The [docs](/docs/) now open on search and six entry points: Get started, Use OpenTodo, Self-host, Integrate, Reference and Under the hood. New for 1.0 are a [self-hosting handbook](/docs/self-hosting/README/) that goes from an empty host to a monitored server with a restore drill, a [configuration reference](/docs/self-hosting/configuration/) with every variable, a [contributor guide](/docs/contributing/first-contribution/) and a [roadmap](/docs/roadmap/) built from the repository.

## Fixed because you asked

- **Imported tasks no longer show an internal id** such as `dfc92cb10aed05a4:1` at the end of every row; they say "Imported from Todoist" in the details, and list columns line up again. See [Import and export](/docs/import-export/).
- **A saved view in display mode lists the same tasks as the view**, also when its query uses workspaces, assignees or custom fields. See [Display mode](/docs/display-mode/).
- **`by` in quick add sets the deadline**: `Install winter tires by March 31` gets a deadline, not a planned date. See [Dates and times](/docs/quick-add/#dates-and-times).
- **Repeat on the first, second, third or fourth weekday of the month**, as in `every first weekday`. See [Recurrence rules](/docs/recurrence/#grammar).
- **Group and order a list from the keyboard**: `r g p` groups by priority, `r o d` orders by due date. See [Group and order](/docs/keyboard/#group-and-order).
- **Today can hide tasks assigned to other people**, from Today's menu. See [Plan your day](/docs/today-and-upcoming/#plan-your-day-with-today).

<!-- no-claim -->
There is more: calendar events in Upcoming, a subtask's full path, comment webhooks, a one-click alternative to every drag, a switch for single-key shortcuts, and a long list of keyboard and screen reader fixes.

## Upgrading

<!-- no-claim -->
Replace the image or the binary and restart, and upgrade the server before your devices. Three migrations run at start, there is no new required variable, and there is no way back to an older version, so back up first. If your server reached a backup destination or your identity provider only through a proxy, it now needs a direct route. See [Updating](/docs/self-hosting/docker/#updating).

The full list of changes is in the [release notes](https://github.com/OpenTodoApp/OpenTodo/releases/tag/v0.23.0).
