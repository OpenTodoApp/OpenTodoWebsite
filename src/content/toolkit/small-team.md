---
title: Set up OpenTodo for a small team
summary: Accounts, shared projects, boards and assignees for a team of a few people, on a server the team controls.
lastReviewed: 2026-10-14
sources: [/docs/sharing/, /docs/sections-and-boards/, /docs/self-hosting/sso/, /docs/notifications/]
templates: [product-launch, new-job]
order: 2
---
<!-- no-claim -->
OpenTodo suits small teams that want a fast shared task list without a heavyweight process. Here is a setup that works for three to fifteen people.

## Accounts

- If your team already has an identity provider, connect it with [single sign-on](/docs/self-hosting/sso/) so people sign in with the account they have.
- Otherwise, invite each person with an invitation link ([sharing and accounts](/docs/sharing/)), and ask everyone to turn on [two-factor sign-in](/docs/account-security/).

## Projects and boards

Create one shared project per stream of work. Use sections for stages and switch the project to a [board](/docs/sections-and-boards/) for a Kanban view: Backlog, This week, Review, Done.

- [Assign](/docs/sharing/) each task to one person, so it shows in their "Assigned to me".
- Discuss in [comments](/docs/sharing/) on the task, and @mention people to notify them.
- The activity feed shows who did what across shared projects; see [notifications](/docs/notifications/).

## A weekly rhythm

Spend fifteen minutes together each week on the [board](/docs/sections-and-boards/): move what is done, pull the next tasks into This week, and check estimates against the [Week calendar](/docs/time-blocking/).

## Templates to start from

The [Product launch template](/templates/product-launch/) is a ready-made team [board](/docs/sections-and-boards/), and the [First 90 days template](/templates/new-job/) helps a new teammate get going.

## Connect your tools

[Webhooks](/docs/webhooks/) send task events to a chat relay or automation tool, and the [API](/docs/api/) lets scripts create tasks, for example from a monitoring alert.
