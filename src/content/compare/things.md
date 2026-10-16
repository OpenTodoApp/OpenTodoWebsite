---
competitor: Things
title: OpenTodo and Things compared
summary: Things is a beautifully crafted personal task manager for Apple devices. OpenTodo runs on every platform, shares lists with the people you live with, and keeps your data on your server.
checkedOn: 2026-10-14
audience: For people who love Things' calm but need Android, Windows or the web, or want to share lists with their household.
order: 2
importFormat: things-db
switchGuide: /docs/switch/things/
cost:
  them: A one-time purchase per Apple platform (Mac, iPhone and iPad are bought separately), with free sync. No subscription.
  us: Free and open source. You run it on a small server you already have or rent cheaply, for as many people as you like.
rows:
  - feature: Calm, focused design
    them: yes
    us: yes
    sourceDoc: /docs/views/
  - feature: Native Apple Watch app and widgets
    them: yes
    us: no
    note: OpenTodo has neither.
  - feature: Deep Apple integration (Shortcuts, Siri, Share sheet)
    them: yes
    us: partial
    note: OpenTodo installs from Safari and accepts shared pages, but has no Siri or Shortcuts actions.
    sourceDoc: /docs/capture/
  - feature: Android, Windows, Linux and the web
    them: no
    us: yes
    sourceDoc: /docs/install-app/
  - feature: Share projects with other people
    them: no
    us: yes
    sourceDoc: /docs/sharing/
  - feature: Reminders and repeating tasks
    them: yes
    us: yes
    sourceDoc: /docs/recurring-and-reminders/
  - feature: Filters and saved views
    them: partial
    us: yes
    note: Things filters by tags inside its lists.
    sourceDoc: /docs/filters/
  - feature: Works offline
    them: yes
    us: yes
    sourceDoc: /docs/offline-and-sync/
  - feature: Your data on your own server
    them: no
    us: yes
    sourceDoc: /docs/self-hosting/docker/
  - feature: Export everything any time
    them: partial
    us: yes
    sourceDoc: /docs/import-export/
gaps:
  - title: Apple Watch and widgets
    detail: Things has a native Apple Watch app and home screen widgets. OpenTodo has no watch app and no widgets.
  - title: Polish on Apple devices
    detail: Things is a native app built for each Apple platform, with Siri and Shortcuts. OpenTodo is a web app you install, and on an iPhone it feels like one.
  - title: Nothing to run
    detail: Things syncs through its own free service. OpenTodo needs a server, even a very small one.
---
Things is the app many people point to when they talk about calm, well-made software, and we agree. It is also personal by design and lives only on Apple devices.

OpenTodo is for when that stops fitting: a partner on Android, a work laptop on Windows, a shopping list the whole family should see.
