---
competitor: Todoist
title: OpenTodo and Todoist compared
summary: Todoist is polished, everywhere and full of integrations. OpenTodo gives you most of the daily workflow on a server you own, offline on every device, without a plan per person.
checkedOn: 2026-10-14
audience: For people who like Todoist's quick add and filters, and want their lists on their own server without a monthly plan per person.
order: 1
importFormat: todoist-csv
switchGuide: /docs/switch/todoist/
cost:
  them: A free plan with limits (for example five personal projects and three filter views), then a monthly or yearly plan per person for the full app; team features cost per member.
  us: Free and open source. You pay only for the small server you run it on, whether one person uses it or the whole household.
rows:
  - feature: Natural-language quick add
    them: yes
    us: yes
    sourceDoc: /docs/quick-add/
  - feature: Recurring tasks with readable rules
    them: yes
    us: yes
    sourceDoc: /docs/recurrence/
  - feature: Filters and saved views
    them: partial
    us: yes
    note: Todoist's free plan allows three filter views.
    sourceDoc: /docs/filters/
  - feature: Boards and sections
    them: yes
    us: yes
    sourceDoc: /docs/sections-and-boards/
  - feature: Calendar with time blocks
    them: partial
    us: yes
    note: Todoist's calendar layout is on paid plans.
    sourceDoc: /docs/time-blocking/
  - feature: Shared projects, comments and assignees
    them: yes
    us: yes
    sourceDoc: /docs/sharing/
  - feature: Works fully offline on every device
    them: partial
    us: yes
    sourceDoc: /docs/offline-and-sync/
  - feature: Your data on your own server
    them: no
    us: yes
    sourceDoc: /docs/self-hosting/docker/
  - feature: Optional end-to-end encryption
    them: no
    us: yes
    sourceDoc: /docs/e2ee/
  - feature: Native apps in the app stores, watch and widgets
    them: yes
    us: no
    note: OpenTodo installs from the browser on phones and computers.
  - feature: Hundreds of ready-made integrations
    them: yes
    us: partial
    note: OpenTodo has an API, webhooks, CalDAV and MCP, but no integration directory.
    sourceDoc: /docs/webhooks/
  - feature: Built-in AI assistant
    them: yes
    us: yes
    note: In OpenTodo it uses your provider and key, and is off until you turn it on.
    sourceDoc: /docs/assistant/
gaps:
  - title: Native apps and devices
    detail: Todoist has apps in every app store, home screen widgets and watch apps. OpenTodo is an installable web app, with no widgets and no watch app.
  - title: Integrations
    detail: Todoist connects to a long list of services out of the box. OpenTodo gives you the building blocks (API, webhooks, calendar sync) and leaves the wiring to you.
  - title: Nothing to run
    detail: Todoist is a service; you sign up and you are done. OpenTodo needs someone to run a small server, even if that takes minutes.
---
Todoist is one of the best task apps there is, and if you only want a list on your phone, it is hard to beat. People come to OpenTodo for different reasons: they want the whole household on one setup without paying per person, they want their tasks on hardware they control, or they want an app that keeps working when the connection does not.

The table below is honest in both directions. Where Todoist is ahead, it says so.
