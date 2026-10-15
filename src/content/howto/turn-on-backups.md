---
title: Turn on scheduled backups
summary: A daily snapshot to a folder, S3-compatible storage or WebDAV, with retention and optional encryption. Set it once; it then runs on its own.
lastReviewed: 2026-10-15
sources: [/docs/backups/]
group: Run the server
audience: operator
minutes: 5
shot: settings-backups
order: 51
related: [update-the-server, invite-people-to-your-server]
---
## What you need

<!-- no-claim -->
- To be the owner of the server. [Backups](/docs/backups/)
- Somewhere for the copies to go. A folder on the server is better than nothing but is on the same disk; S3 or WebDAV gets them off it. [Destinations](/docs/backups/#destinations)

## Steps

1. Sign in as the owner and open **Settings → Backups**. The top of the page shows the schedule, the next run and the last run with its outcome. [Quick start](/docs/backups/#quick-start)
2. Select **Change settings** and pick a destination: **Folder on the server**, **S3-compatible storage** (AWS, Backblaze B2, Cloudflare R2, Wasabi, MinIO and others) or **WebDAV** (Nextcloud, a NAS). [Destinations](/docs/backups/#destinations)
3. Choose a schedule, for example daily at 03:00, and how many backups to keep (7 by default). [Schedule and retention](/docs/backups/#schedule-and-retention)
4. Optionally set a passphrase to encrypt the archives. A forgotten passphrase cannot be recovered, so store it in a password manager. [Encryption and secrets](/docs/backups/#encryption-and-secrets)
5. **Save backup settings**, then **Test destination** and **Back up now**. The status shows the run and its outcome, and each run is listed under **Recent runs**. [Quick start](/docs/backups/#quick-start)

## Good to know

- If the server was off when a backup was due, one runs shortly after it starts again. [Schedule and retention](/docs/backups/#schedule-and-retention)
- Restoring replaces the whole database and runs with the server stopped, from the same binary; the docs give the exact commands for Docker Compose. Try it once on a spare machine, so the day you need it is not the first time. [Restore](/docs/backups/#restore)
- The passphrase and destination credentials are stored only in a secrets file on the server and never included in an archive. [Encryption and secrets](/docs/backups/#encryption-and-secrets)
