---
title: Set up OpenTodo for your household
summary: For the person who runs the server and for everyone who just uses the app, from first install to shared chores.
lastReviewed: 2026-10-14
sources: [/docs/self-hosting/docker/, /docs/sharing/, /docs/install-app/, /docs/notifications/]
templates: [household-chores, meal-planning, moving-house]
order: 1
---
<!-- no-claim -->
One person sets things up once; everyone else just gets a good app. This page has a part for each.

## For the person who runs the server

1. **Install it.** One container with one data volume is enough; follow the [Docker guide](/docs/self-hosting/docker/) or the [Coolify guide](/docs/self-hosting/coolify/). A small VPS or a Raspberry Pi at home works.
2. **Create your owner account** on the first visit. Sign-up closes after that, as the [getting started guide](/docs/getting-started/) explains.
3. **Invite your household.** Create an invitation link for each person, or share a project with an invite link; see [sharing](/docs/sharing/).
4. **Turn on backups.** Schedule them to a folder, S3 or WebDAV in the [backup settings](/docs/backups/).

## For everyone else

1. Open the address you were sent and create your account.
2. [Install the app](/docs/install-app/) on your phone and computer from the browser. It gets its own icon and works offline.
3. Turn on [notifications](/docs/notifications/) so reminders reach you.

## Share what you have in common

Each person keeps their own lists private. For shared life, create [shared projects](/docs/sharing/):

- **Household chores**, with tasks that [repeat](/docs/recurrence/) and are assigned to people. Start from the [Household chores template](/templates/household-chores/).
- **Groceries and meals**, where whoever is in the shop sees the list live. Try the [Meal planning template](/templates/meal-planning/).
- **Big projects** like a move, [shared](/docs/sharing/) with everyone involved, as in the [Moving house template](/templates/moving-house/).

[Roles](/docs/sharing/) keep it tidy: a viewer can only look, an editor can change tasks, an admin can also manage members.
