---
title: Changes do not show up on my other device
summary: Read the sync status at the top right of both devices. It names the reason, and clicking it syncs right away.
lastReviewed: 2026-10-15
sources: [/docs/offline-and-sync/, /docs/troubleshooting/]
group: Fix it
minutes: 2
order: 41
related: [app-looks-out-of-date, find-a-missing-task]
---
## Check these, in order

1. **Look at the status at the top right on both devices.** **Offline · 3 pending** means the changes are still waiting on that device and go as soon as it is online. **Syncing…** means they are on their way. [The sync status](/docs/offline-and-sync/#the-sync-status)
2. **Click the status** to sync right away, on the device that made the change and then on the other. [The sync status](/docs/offline-and-sync/#the-sync-status)
3. **Sync error:** hover over the status to see the reason. If the server is down or being updated, it clears once the server is back. [Changes don't show up on my other device](/docs/troubleshooting/#changes-dont-show-up-on-my-other-device)
4. **Signed out:** your session ended on that device. Sign in again; the waiting changes are sent afterwards. [The sync status](/docs/offline-and-sync/#the-sync-status)
5. **Locked:** your account uses end-to-end encryption and this device needs your passphrase. [The sync status](/docs/offline-and-sync/#the-sync-status)

## Good to know

- **Live** next to the status means this device gets other devices' changes within seconds. Without it, the app still checks regularly, just less often. [The sync status](/docs/offline-and-sync/#the-sync-status)
- If both devices changed the same field, the change made last wins everywhere; if they changed different fields, both are kept. There is no conflict to resolve. [When two devices change the same task](/docs/offline-and-sync/#when-two-devices-change-the-same-task)
- A device that was offline for weeks needs a minute after reconnecting to catch up. [Tips](/docs/offline-and-sync/#tips)
