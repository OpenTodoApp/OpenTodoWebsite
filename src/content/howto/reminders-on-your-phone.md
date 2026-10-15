---
title: Get reminders on your phone when the app is closed
summary: Turn on push notifications for the device, send a test, and read the delivery check if nothing arrives. iPhone has one extra rule.
lastReviewed: 2026-10-15
sources: [/docs/notifications/, /docs/install-app/]
group: Phone and notifications
minutes: 3
shot: notifications
order: 20
related: [reminders-not-arriving-on-iphone, install-on-your-phone]
---
## What you need

<!-- no-claim -->
- The app installed on the phone (on an iPhone or iPad this is required, not optional). [Put OpenTodo on your phone](/how-to/install-on-your-phone/)
- A server on an `https://` address: browsers require it for push. [Installing the app](/docs/install-app/)

## Steps

1. Open OpenTodo from its icon, then **Settings → Notifications**. [Get reminders when the app is closed](/docs/notifications/#get-reminders-when-the-app-is-closed)
2. Turn on **Enable notifications on this device** and allow notifications when the browser asks. [Get reminders when the app is closed](/docs/notifications/#get-reminders-when-the-app-is-closed)
3. Select **Send test notification**. Your server sends a real push to this device, the same way it sends reminders, and a notification appears even while OpenTodo is open. [Check that it works](/docs/notifications/#check-that-it-works)
4. Repeat on every device where you want reminders: phone, laptop, tablet. Each device decides for itself. Snoozing or dismissing on one applies to all. [Get reminders when the app is closed](/docs/notifications/#get-reminders-when-the-app-is-closed)

## What the test tells you

- **Received on this device:** done. Reminders will reach this device while the app is closed. [Check that it works](/docs/notifications/#check-that-it-works)
- **Accepted, but this device has not reported receiving it:** the push left your server but the phone did not show it. Check the operating system's notification settings for the app or browser, and focus or do-not-disturb modes. On iPhone and iPad, make sure you are in the installed app. [Check that it works](/docs/notifications/#check-that-it-works)
- **The subscription expired** or **the push service rejected the test:** select **Re-enable**. [Check that it works](/docs/notifications/#check-that-it-works)

## Privacy

<!-- no-claim -->
A push goes through your browser's push service and contains only an id and a time, encrypted so the service cannot read it; your phone shows the title from its own copy of the task. [Privacy](/docs/notifications/#privacy)

## If it does not work

- **"Notifications are blocked for this site":** you said no when the browser asked. Allow notifications for your OpenTodo address in the browser's site settings, then **Re-enable**. [When notifications don't arrive](/docs/notifications/#when-notifications-dont-arrive)
- **"Push notifications are turned off on this server":** the person running your server switched push off. Reminders still show inside the app. [When notifications don't arrive](/docs/notifications/#when-notifications-dont-arrive)
- On an iPhone, see [reminders not arriving on an iPhone](/how-to/reminders-not-arriving-on-iphone/) for the two things that catch most people. [On iPhone and iPad](/docs/notifications/#on-iphone-and-ipad)
