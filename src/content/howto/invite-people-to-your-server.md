---
title: Invite people to your server
summary: Sign-up is closed after the owner account. You bring people in with single-use invitation links, one each, sent however you like.
lastReviewed: 2026-10-15
sources: [/docs/sharing/, /docs/self-hosting/docker/]
group: Run the server
audience: operator
minutes: 2
shot: settings-users
order: 50
related: [invite-someone-with-a-link, turn-on-backups]
---
## What you need

<!-- no-claim -->
- To be the owner or an admin of the server. [Invite someone new](/docs/sharing/#invite-someone-new)

## Steps

1. Open **Settings → Administration → Members**. [Invite someone new](/docs/sharing/#invite-someone-new)
2. Optionally enter the person's email, choose how long the link stays valid, and select **Create invitation**. [Invite someone new](/docs/sharing/#invite-someone-new)
3. Copy the link and send it to them yourself, by message or email. OpenTodo sends no emails. The link works once. [Invite someone new](/docs/sharing/#invite-someone-new)
4. They open it, choose a name and a password, and have their own account with their own private tasks. Share projects with them afterwards. [Share a project](/docs/sharing/#share-a-project)

## Good to know

- Keep sign-up closed. Opening it to anyone who can reach the server is rarely what you want on a public address. [Docker Compose](/docs/self-hosting/docker/#docker-compose)
- A project invite link can create the account and share the project in one step, when you create it as owner or admin, or when you allow members to do so in **Settings → Access policies**. [Who can bring new people](/docs/sharing/#who-can-bring-new-people)
- Forgotten passwords come back to you: the owner creates a single-use reset link for the person in **Settings → Administration → Users** and sends it; nothing is emailed. [Managing users](/docs/self-hosting/docker/#managing-users)
