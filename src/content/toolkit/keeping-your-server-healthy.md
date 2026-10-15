---
title: Keeping your server healthy
summary: "The short checklist for the person who runs it: after install, every month, when a release ships, and when you move to a new machine."
lastReviewed: 2026-10-15
sources: [/docs/self-hosting/docker/, /docs/backups/, /docs/notifications/, /docs/self-hosting/coolify/]
templates: []
order: 5
---
<!-- no-claim -->
Most of this is a few minutes a month. The one thing that must not slip is the backup.

## Right after installing

1. Confirm the address is `https://`, so the app installs on phones and passkeys are offered. With Coolify this comes with the domain; with plain Docker, a reverse proxy gives it to you. [Passkeys need an https base URL](/docs/self-hosting/docker/#passkeys-need-an-https-base-url)
2. Turn on scheduled backups to storage that is not on the same disk, with a passphrase if you like, and run **Back up now** once. [Quick start](/docs/backups/#quick-start)
3. Send yourself a test notification from **Settings → Notifications** on your phone, so you know reminders reach it. [Check that it works](/docs/notifications/#check-that-it-works)
4. Invite the people who will use it, one link each. [Invite people to your server](/how-to/invite-people-to-your-server/) [Invite someone new](/docs/sharing/#invite-someone-new)
5. Pin a release line (`0.3`) in your compose file rather than `latest`. [Option A: Docker Compose](/docs/self-hosting/coolify/#option-a-docker-compose-from-the-repository)

## Every month

- Open **Settings → Backups** and check that the last run succeeded. [Schedule and retention](/docs/backups/#schedule-and-retention)
- Glance at **Settings → Activity → Audit log** for sign-ins you do not recognise. [Audit log](/docs/self-hosting/docker/#audit-log)
- Check [What's new](/whats-new/) for a release, and update if there is one. [Update the server](/how-to/update-the-server/)

## Twice a year

- Restore a backup onto a spare machine or a throwaway container, and sign in there. A backup you have never restored is a hope, not a backup. [Restore](/docs/backups/#restore)
- Make sure a second person could take over: where the server is, where the backups go, and that the restore command is written down. [Recovering owner access](/docs/self-hosting/docker/#recovering-owner-access)

## Moving to a new machine

1. Take a backup, or stop the container and copy the data folder. [Backup and restore](/docs/self-hosting/docker/#backup-and-restore)
2. Start OpenTodo on the new machine with the same `OPENTODO_BASE_URL`, and restore the backup into it with the container stopped. [Restore](/docs/backups/#restore)
3. Point the domain at the new machine. Passkeys are tied to the domain's host, so keeping the domain keeps everyone's passkeys. [Passkeys need an https base URL](/docs/self-hosting/docker/#passkeys-need-an-https-base-url)
4. Everyone's installed apps keep working; they sync with the new server the next time they open. [Offline and sync](/docs/offline-and-sync/)

## When people ask you things

- "I forgot my password": create a reset link in **Settings → Administration → Users** and send it. [Managing users](/docs/self-hosting/docker/#managing-users)
- "I lost my phone with the two-factor codes": reset their second factor from the same place. [Managing users](/docs/self-hosting/docker/#managing-users)
- "I can't install it" or "reminders don't arrive": the [install pages](/install/) and the [reminders how-to](/how-to/reminders-on-your-phone/) walk them through it. [Notifications](/docs/notifications/)
