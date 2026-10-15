---
title: Reminders do not arrive on my iPhone
summary: "Two rules catch most people: iOS 16.4 or later, and the installed app rather than a Safari tab. Then the delivery check tells you the rest."
lastReviewed: 2026-10-15
sources: [/docs/notifications/, /docs/install-app/, /docs/troubleshooting/]
group: Fix it
minutes: 3
order: 40
related: [reminders-on-your-phone, install-on-your-phone]
---
## Check these, in order

1. **Is the app installed on the home screen, and did you open it from there?** On an iPhone or iPad, push notifications work only in the installed app, never in a Safari tab. Add it with Share → **Add to Home Screen**, then do everything below from that icon. [On iPhone and iPad](/docs/notifications/#on-iphone-and-ipad)
2. **Is it iOS or iPadOS 16.4 or later?** Older versions cannot receive web push at all. [On iPhone and iPad](/docs/notifications/#on-iphone-and-ipad)
3. **Are notifications turned on for this device?** In the installed app, open **Settings → Notifications**, turn on **Enable notifications on this device** and allow them when asked. [Get reminders when the app is closed](/docs/notifications/#get-reminders-when-the-app-is-closed)
4. **Send a test notification** and read the result. **Received on this device** means it works. **Accepted, but this device has not reported receiving it** means the push left the server but iOS did not show it: check **Settings → Notifications → OpenTodo** in iOS and your Focus modes. [Check that it works](/docs/notifications/#check-that-it-works)
5. **Read the delivery check** under the options: each line push needs on this device, with a fix next to any problem (browser support, permission, service worker, subscription, server reaching the push service). [Check that it works](/docs/notifications/#check-that-it-works)

## Still nothing

- **"Push notifications are turned off on this server":** the person running your server switched push off. Reminders still show while the app is open. [When notifications don't arrive](/docs/notifications/#when-notifications-dont-arrive)
- **The address is not `https://`:** browsers require it for push and for installing. Ask whoever runs your server. [I can't install the app](/docs/troubleshooting/#i-cant-install-the-app-or-add-a-passkey)
- **The reminder is on a task with a date but no time:** "at due time" fires at 09:00 that day. Give the task a time if you expected it earlier. [Tips](/docs/recurring-and-reminders/#tips)
