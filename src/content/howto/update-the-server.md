---
title: Update the server to a new release
summary: Pull the new image and restart. The database updates itself on start, and every device switches to the new app by itself.
lastReviewed: 2026-10-15
sources: [/docs/self-hosting/docker/, /docs/self-hosting/coolify/, /docs/install-app/]
group: Run the server
audience: operator
minutes: 3
order: 52
related: [turn-on-backups, app-looks-out-of-date]
---
## What you need

<!-- no-claim -->
- A recent backup, or at least a backup schedule that ran. [Turn on backups](/how-to/turn-on-backups/)
- The release notes for what changed: [What's new](/whats-new/).

## With Docker Compose

1. Run `docker compose pull && docker compose up -d`. The new container replaces the old one and applies migrations at startup. [Updating](/docs/self-hosting/docker/#updating)
2. Open the address and check the version at the top of the in-app docs. Done. [Updating](/docs/self-hosting/docker/#updating)

## With Coolify

1. If you pinned a release line such as `0.3`, patch releases arrive on the next **Deploy**; for a new minor version, change the tag in the compose file first. [One-click template](/docs/self-hosting/coolify/#one-click-template-pending-in-coolifys-service-list)
2. Select **Deploy**. Coolify starts the new container before stopping the old one, which OpenTodo supports from 0.2.0 on. [Updating](/docs/self-hosting/docker/#updating)

## On everyone's devices

<!-- no-claim -->
Nothing to do. The app fetches the new version in the background and switches to it on its own, usually with one quick reload. Someone who still sees the old version closes the app completely and opens it again. [Updates](/docs/install-app/#updates)

## Good to know

- Pin a release line (`ghcr.io/pixari/opentodo:0.3`) rather than `latest`, which follows the main branch. [Option A: Docker Compose from the repository](/docs/self-hosting/coolify/#option-a-docker-compose-from-the-repository)
- Maintenance commands such as restore need every server process stopped. [Updating](/docs/self-hosting/docker/#updating)
