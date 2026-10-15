---
title: Recover the owner password
summary: "There is no reset email. Shell access to the host is the proof of ownership: one command prints a single-use reset link."
lastReviewed: 2026-10-15
sources: [/docs/self-hosting/docker/, /docs/account-security/]
group: Run the server
audience: operator
minutes: 2
order: 53
related: [cannot-sign-in, invite-people-to-your-server]
---
## What you need

<!-- no-claim -->
- Shell access to the machine that runs the container. That access is the proof of ownership; no port, setting or email is involved. [Recovering owner access](/docs/self-hosting/docker/#recovering-owner-access)

## Steps

1. On the host, run `docker compose exec opentodo /opentodo reset-owner-password` while the server runs (or `docker compose run --rm --no-deps opentodo reset-owner-password` while it is stopped). [Recovering owner access](/docs/self-hosting/docker/#recovering-owner-access)
2. Open the link it prints. It starts with your server's base URL; pass `--base-url https://…` if none is configured. [Recovering owner access](/docs/self-hosting/docker/#recovering-owner-access)
3. Set a new password. The link works once, any earlier owner link stops working, and using it signs the owner out everywhere. The event is recorded in the audit log. [Recovering owner access](/docs/self-hosting/docker/#recovering-owner-access)

## Good to know

- Everyone else's forgotten passwords are your job as owner: create a single-use reset link in **Settings → Administration → Users** and send it yourself. [Managing users](/docs/self-hosting/docker/#managing-users)
- Lost the second factor as well? `mfa-reset` is described next to the password command. [Recovering owner access](/docs/self-hosting/docker/#recovering-owner-access)
