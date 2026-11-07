---
title: "OpenTodo 1.0: a promise, not a feature"
summary: "1.0 adds no feature. It is a promise that the API, sync, export, MCP tools, the CLI and upgrades from any release stay compatible within 1.x, with the security, accessibility and performance work that lets me make it, and what each of them does not cover yet."
publishedAt: 2026-11-07
author: raffaele
category: releases
release: 1.0.0
tags: [ownership, task-management]
---
<!-- no-claim -->
OpenTodo 1.0.0 is out. If you are looking for the new features, there are none: this release is a promise. From today, what you build on OpenTodo keeps working for as long as it says 1.x, and every release can upgrade from every earlier one. Here is what that promise covers, the work behind it, and where it still falls short.

## What 1.0 promises

Within 1.x, nothing you rely on is removed or changed incompatibly; things are only added. That covers the HTTP API under `/api/v1/`, its error codes, the sync protocol and every synced field, the export format, the MCP tools that AI assistants call, and the `ot` command-line client with its flags and `--json` output. Scripts, phone apps and assistants you connect today keep working with later 1.x servers. See [Stability and compatibility](/docs/stability/#the-v1-surface).

Any release from 0.1.0 on upgrades directly to 1.0.0, with no version in between, and devices continue from where they were without downloading everything again. This is tested on every change: CI opens a data directory written by every released minor version and checks that the projects, tasks, members, attachments, tokens and passwords all come through. See [Upgrades](/docs/stability/#upgrades).

## The trust work behind it

<!-- no-claim -->
I did not want to make that promise on top of foundations nobody could check. The last releases were about making them checkable.

OpenTodo publishes a [threat model](/docs/security/threat-model/) with thirteen kinds of attacker, [how we verify security](/docs/security/how-we-verify/) with the tests behind each claim and the gaps still open, and the [security limits](/docs/security/limits/): what it does not protect, said in one place.

Writing them turned up places to harden, and 0.23 and 0.24 shipped the fixes:

- **The audit log is tamper-evident.** Each event carries a hash of itself and of the one before, so an event changed or removed outside OpenTodo shows up as a broken link. See [Checking the log for tampering](/docs/self-hosting/docker/#checking-the-log-for-tampering).
- **A device that answers AI connectors for an encrypted account shows what it reads**, and can ask before anything leaves it. See [Cloud connectors through your device](/docs/mcp/#cloud-connectors-through-your-device).
- **ChatGPT, Claude and Gemini connect with OAuth**, with short-lived tokens you can cut off by deleting the client. See [OAuth clients](/docs/mcp-oauth/).
- **Another site can no longer sign you out.** A page on a sibling subdomain could end your session; the route matrix, which checks every route against what it promises, found it. See [How we verify security](/docs/security/how-we-verify/#the-route-policy-wrapper).

Before every release, including this one, the code changed since the last release also goes through an [AI security review](/docs/security/how-we-verify/#ai-security-review-before-each-release). It is an extra layer, not an independent review. No outside security review has happened yet; the [review scope](/docs/security/review-scope/) is ready and one is still sought on [#588](https://github.com/OpenTodoApp/OpenTodo/issues/588). Until it happens, nothing here claims one.

## Accessibility

OpenTodo has an [accessibility statement](/docs/accessibility/#conformance-status) against WCAG 2.2 AA, and it claims partial conformance. Keyboard-only use and 200% zoom are tested on every core screen. Passes with NVDA, VoiceOver and TalkBack are not recorded yet. If you use one of them, the steps are in the [audit for 1.0.0](/docs/accessibility/audit-1.0.0/), and results are very welcome on [#9](https://github.com/OpenTodoApp/OpenTodo/issues/9).

## Performance

There are now [performance budgets](/docs/performance/#budgets) for an account with 10,000 tasks, checked every night in CI. Getting them to pass made long lists much faster. Completing a task in a 2,000-task project on the phone profile went from over 200 ms to about 100 ms. Note search stays quick right after a first sync, and a sync no longer waits while the database tidies its log.

<!-- no-claim -->
To be honest about those numbers: they are CI measurements, in desktop Chromium and in a phone profile with a four times slower CPU, not on real phones or a Raspberry Pi. Measuring real devices is planned after 1.0 on [#990](https://github.com/OpenTodoApp/OpenTodo/issues/990).

## Upgrading

Replace the image or the binary and restart. There is no migration and no new required variable since 0.24.0. Coming from an older release, back up first, read the upgrade notes of the releases you skip, and upgrade the server before your devices. See [Updating](/docs/self-hosting/docker/#updating).

If you would rather not run a server yourself, OpenTodo also runs on a managed pod: see [Hosting](/hosting/) and [Running on PikaPods](/docs/self-hosting/pikapods/).

## Thank you

<!-- no-claim -->
Many of the fixes in the last months started as someone's report. Thank you to everyone who opened an issue or tested a release, among them kiwikern, who found the Android widget unreadable in light mode, yannickdoteu, whose two suggestions made the Things import work from an iPhone, and sh0nuff, osenchenko and n3uron4 for a long run of careful reports.

## After 1.0

<!-- no-claim -->
Features come back now, on top of foundations that stay put. The queue has a Done action on reminder notifications ([#967](https://github.com/OpenTodoApp/OpenTodo/issues/967)), the iPhone app in the App Store ([#600](https://github.com/OpenTodoApp/OpenTodo/issues/600)), more languages with community reviewers ([help review translations](/blog/help-review-translations/)) and measuring on real devices ([#990](https://github.com/OpenTodoApp/OpenTodo/issues/990)). The [roadmap](/docs/roadmap/) has the rest.

The full list of changes is in the [release notes](/changelog/#v1-0-0) and on [GitHub](https://github.com/OpenTodoApp/OpenTodo/releases/tag/v1.0.0).
