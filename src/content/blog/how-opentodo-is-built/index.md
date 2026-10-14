---
title: "How OpenTodo is built: specs first, then AI agents"
summary: Every feature starts as a written specification. AI coding agents implement from it, a strict CI checks the result, and a person reviews every change before it's merged.
publishedAt: 2026-10-14
author: raffaele
category: development
draft: true
---
<!-- no-claim -->
OpenTodo is a large app for one maintainer: a Go server, a web app that works offline, sync between devices, sharing, encryption, an API, a command line and more. People often ask how that's possible. The short answer is a process with three parts: write it down first, let agents build from what's written, and check everything.

## Write it down first

<!-- no-claim -->
Every feature starts as a change in [OpenSpec](https://github.com/Fission-AI/OpenSpec), a small format for planning software. A change has four parts:

<!-- no-claim -->
- a **proposal**: why the change is needed and what it covers, including what it doesn't
- **specs**: the behaviour, as requirements with scenarios you can test, like "when two devices edit different fields of the same task, both edits survive" (the rule behind [how sync works](/docs/sync/))
- a **design**: how it will be built, and the alternatives that were rejected
- **tasks**: small steps, each with the check that proves it's done

<!-- no-claim -->
Writing this before any code is the most useful habit in the project. It catches unclear ideas while they're still cheap to change, and months later it explains why something works the way it does. All of it is public in the repository, under `openspec/`.

## Let agents build from the spec

<!-- no-claim -->
Much of the code is written by AI coding agents working from those specs. The spec matters more with an agent than with a person: an agent does what it's told very literally, so the clearer the scenarios, the better the result. When an agent gets something wrong, the fix is often in the spec, not the code.

## Check everything

<!-- no-claim -->
Nothing reaches the main branch without passing CI: Go and web tests, spec validation, a phone-layout check in Chromium and WebKit, and accessibility checks. Then a person reviews the change. The website you're reading works the same way: comparisons fail the build when their "checked on" date is too old, and every claim about what the app can do has to link to its documentation.

## Why bother

The result is an app whose behaviour is written down. If you want to know exactly how [sync](/docs/sync/) resolves two edits to the same task, or how the [architecture](/docs/architecture/) fits together, there's a document for it, and it matches what the code does. For a project you're trusting with your task list, that seemed worth the effort.
