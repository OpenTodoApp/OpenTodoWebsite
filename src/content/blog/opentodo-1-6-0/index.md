---
title: "OpenTodo 1.6: away, a quarter view and safer sign-out"
summary: "Away skips your repeating tasks while you are off, the Calendar gains a Quarter view, workspaces an Activity page, and Undo goes back more than one step. Also: links to other apps, CalDAV push, an Android widget, three languages, an OpenAPI description, CORS, sync recovery and security fixes."
publishedAt: 2026-11-21
author: raffaele
category: releases
release: 1.6.0
tags: [task-management, time-management]
---
<!-- no-claim -->
OpenTodo 1.6.0 is out today. It is the release of Away, and of a lot of everyday polish: a Quarter view in the Calendar, an Activity page for a workspace, Undo and Redo that go back more than one step, and three new languages. It also carries security fixes, so I recommend upgrading. Here is what changed.

## Away

When you go on holiday or are ill for a few days, the repeating tasks keep coming and Today fills with things you could not do. **Away…**, in Today's menu or the command palette, skips their occurrences from one day to another in one batch, with one Undo. You can set it after the fact too. See [Set an away period](/docs/away/#set-an-away-period).

Habit streaks survive the gap, and a task that repeats after completion moves to the day after you return. Reminders and the email digest pause on every device while you are away; they are dropped, not delivered later. Today reads *Away until Friday*, and **End now** brings you back early. See [What it does](/docs/away/#what-it-does) and [While you are away](/docs/away/#while-you-are-away).

Scripts can do the same with `ot away` or the API. See [From a script](/docs/away/#from-a-script).

## A quarter on one screen

The Calendar's range switch has a **Quarter** view between Month and Plan: the three months of the calendar quarter as compact grids, with the Year's marks for how busy each day is. <kbd>g</kbd> then <kbd>q</kbd> opens it, and <kbd>[</kbd> and <kbd>]</kbd> step a quarter at a time. See [See the quarter](/docs/quarter-calendar/#see-the-quarter).

Plan gains two spans in its page menu: **3 days**, and **Custom…** for any number of days from 2 to 90. The device remembers the mode and the span you used last. See [Choose a Plan span](/docs/quarter-calendar/#choose-a-plan-span).

## What happened in a workspace

A workspace has an **Activity** page, opened from the workspace menu. It lists every change in its projects and Inbox, yours and everyone's, by day. Narrow it by date range, by several kinds of change at once, by project and by person; the device remembers the filters. See [Workspace activity](/docs/workspace-activity/) and [Filter](/docs/workspace-activity/#filter).

Logging or stopping time on a task now shows there too, as "tracked 42m", never with the note you wrote. See [Time tracked](/docs/workspace-activity/#time-tracked).

## Undo and Redo, more than once

<kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>Z</kbd> now walks back through your recent actions, not only while the undo toast is showing, and <kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> (or <kbd>Ctrl</kbd>+<kbd>Y</kbd>) brings them back. Undo and Redo are in the command palette as well, each named for its step, such as "Undo: Complete 2 tasks". Undoing something you created moves it to the Trash. See [Undo and redo](/docs/task-history/#undo-and-redo) and [Keyboard shortcuts](/docs/keyboard/#everywhere).

## Also new

- **Links to other apps.** Settings → Integrations → Links to other apps lists the kinds of link that may open another app on your devices, such as `zotero` or `obsidian:open`. It is empty until you add one, and each device asks once before the first link opens. See [Links to other apps](/docs/app-links/) and [Allow an app](/docs/app-links/#allow-an-app).
- **Push to calendar apps.** With **Push to calendar apps** on (Settings → Integrations → Calendar apps, off by default), apps that support WebDAV-Push, such as DAVx⁵, sync within about a minute of a change instead of polling. A push names no task, list or person. See [Push to calendar apps](/docs/caldav/#push-to-calendar-apps).
- **A Completed widget for Android.** Beside Today, a home-screen widget shows how many tasks you completed today and a bar for each of the last seven days; a tap opens Statistics. See [Widgets](/docs/android-app/#widgets).
- **Polish, Turkish and Russian.** The app is now in Polski, translated by nkkfs, who maintains it, and in Türkçe; quick add understands both. Русский arrives as a community translation that no native speaker has read yet. French now speaks to you as "tu". See [The app in your language](/docs/language/) and [Quick add languages](/docs/quick-add/#languages); if you speak Russian, [become its reviewer](/docs/translating/#maintainers).
- **An OpenAPI description of the API.** Every server serves it at `/api/v1/openapi.json`, generated from the server's own code, with an example for every request and response. Generate a typed client with any OpenAPI tool, or import it into Postman, Insomnia or Bruno. See [OpenAPI description](/docs/api/#openapi-description).
- **The API from your own web pages.** List their origins in `OPENTODO_CORS_ORIGINS`, and a page there can call the API with an API token; a `read` token suits a dashboard. A signed-in browser's session is never shared with those pages. See [Calling the API from another site](/docs/api/#calling-the-api-from-another-site).
- **A guide to building your own client**, from REST only to a full offline client. See [Build your own client](/docs/build-a-client/).
- **Subtasks, closer at hand.** Reorder them from the task with a handle or <kbd>Alt</kbd>+<kbd>Up</kbd> and <kbd>Alt</kbd>+<kbd>Down</kbd>, add one from a muted line under the last, and use them from `ot` with `--parent`. See [Subtasks](/docs/notes-and-subtasks/#break-a-task-into-subtasks).
- **Filter by section.** `section: Review` lists the tasks in sections of that name across every project, and `no section` the tasks in none. See [Filter queries](/docs/filters/#terms).

## Fixes worth naming

- **Sync recovers on its own.** A sync step that never finishes is given up after two minutes and tried again. When the tab that runs sync stops answering, another open tab takes over within about a minute, and the sync status reads "Not synced since …" in amber after 15 minutes without a sync. One change the server cannot accept is refused alone, and the rest of the sync goes through. See [The sync status](/docs/offline-and-sync/#the-sync-status) and [Exchange](/docs/sync/#exchange).
- **The iPhone app opens when your server is down.** It starts from its last copy, shows the tasks it holds and syncs once the server answers again. Links, the Today widget and reminders also work on a server at an ordinary `https://` address. See [Offline](/docs/ios-app/#offline).
- **Dictation works in the Android app**, where it used to fail at once with "voice capture is unavailable". See [Voice input](/docs/android-app/#voice-input).
- **Google Calendar sync no longer stops with `http_409`** when a task is written again after its event was removed. See [Calendar sync](/docs/calendar-sync/).

## Security

- **See and disconnect the AI apps connected to your account.** Apps you connected by signing in, such as Gemini, ChatGPT or Claude, are listed in Settings → Account → Security → Session with their access and last use, and **Disconnect** ends an app's access at once. See [Ending access](/docs/mcp-oauth/#ending-access).
- **Sign out everywhere also ends connected AI apps**, along with every session, API token and app password. They have to be connected again. See [Settings: Account](/docs/settings-you/#account).
- **A different account signing in clears the previous one's data.** If a session ended without a sign-out and another account then signed in on the same device, the new account could see the previous account's local tasks. Now the device clears its local copy before anything is shown or synced, as signing out does; the same account signing back in keeps its unsynced work. Signing out or switching accounts also clears what the browser kept outside that copy, such as comment drafts and links you trusted. The [release notes](/changelog/#v1-6-0) describe the fix; signing out itself is in [Signing out](/docs/offline-and-sync/#signing-out).
- **Listing API tokens and connected apps needs a full or admin token**; read and agent tokens get `403`. See [Token scopes](/docs/api/#token-scopes).

## Upgrading

Back up first, then replace the image or the binary and restart, for example `docker compose pull && docker compose up -d`. One migration runs at start, for pushing changes to calendar apps, and there are no down-migrations. No new variable is required. See [Updating](/docs/self-hosting/docker/#updating).

Two variables are optional. `OPENTODO_CORS_ORIGINS` lists the web origins whose pages may call the API with a token; unset, there are none, as before. `OPENTODO_CALDAV_PUSH` presets **Push to calendar apps**, which is off by default. See the [configuration reference](/docs/self-hosting/configuration/#server-and-network) and [Features](/docs/self-hosting/configuration/#features).

Scripts that list tokens (`GET /api/v1/tokens`) or connected apps (`GET /api/v1/me/oauth-grants`) now need a full or admin token. See [Token scopes](/docs/api/#token-scopes).

Update every device that shares an account. Away periods, links to other apps, Today's manual order and the daily-notes settings are new synced values that a 1.5 device ignores. See [Several devices](/docs/offline-and-sync/#several-devices).

The full list of changes is in the [release notes](/changelog/#v1-6-0) and on [GitHub](https://github.com/OpenTodoApp/OpenTodo/releases/tag/v1.6.0).
