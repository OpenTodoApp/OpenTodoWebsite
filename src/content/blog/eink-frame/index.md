---
title: I put my to-do list on an e-ink frame
summary: I built an e-ink weather frame for my kids. Then I pointed it at OpenTodo's display mode, and the same frame now shows the day's tasks. How it works, and how to do it yourself.
publishedAt: 2026-11-06
author: raffaele
category: news
cover: ./frame.webp
coverAlt: A deep white box frame standing on a wooden table. Behind the glass and a white passe-partout, a black-and-white e-ink panel shows OpenTodo's display mode, with the clock at 9:24 AM, the date Friday, November 6, the next three days on the left and Earlier and Today groups of tasks with round checkboxes on the right.
tags: [task-management]
---
<!-- no-claim -->
A few weeks ago I built an e-ink frame for my kids. They can't read yet, so it tells them the weather with drawings, and at night the bear on it goes to sleep. I wrote the whole story on my [personal blog](https://pixari.dev/posts/i-built-an-e-ink-weather-frame-for-kids-who-cant-read-yet/), including my fight with the board's memory.

<!-- no-claim -->
It sits by the door, and everyone looks at it on the way out. After a while I caught myself thinking: what if it showed the day as well? Not the weather, the actual day. What's overdue, what's today, what's coming this weekend.

<!-- no-claim -->
I happen to build a task manager. So that is what it does now, at least for the photos above and below, which show the [OpenTodo demo](https://demo.open-todo.app) and its sample tasks.

## How it works

<!-- no-claim -->
The frame is very simple hardware: a Waveshare 7.5" e-Paper V2 panel (800×480, black and white), a Waveshare E-Paper ESP32 driver board (Rev 3, USB-C) and a deep white box frame with a passe-partout. It cost about €130 in total.

<!-- no-claim -->
The clever part, if there is one, is that the board doesn't draw anything itself. A small Docker container on my always-on home PC renders an HTML page every 15 minutes, takes a screenshot of it with Playwright, and converts it to a 1-bit image of 48,000 bytes. The ESP32 fetches that over the home network, a hash lets it skip the redraw when nothing changed, and a small custom ESPHome component streams the image to the panel 1 KB at a time, because the board has no PSRAM.

<!-- no-claim -->
Because the frame only ever sees a picture, I didn't have to touch the board at all. I pointed the renderer at an OpenTodo display address instead of my weather page, at 800×480, with `eink=1` and a text size that fits the panel. Same screenshot, same 1-bit conversion, same ESP32.

![A close-up of the e-ink panel. On the left, a large clock reads 9:24 AM above Friday, November 6, and below it Saturday, Sunday and Monday each list a few tasks with their times, such as Measure the hallway at 08:30 and Pay rent. On the right, the Earlier group lists Renew passport, Call the plumber about the leak and Run club, and the Today group lists Get three quotes for the kitchen, Review pull request #42, Write release notes for v1.0, 1:1 with Chen and Pick up groceries, each with an empty round checkbox.](./closeup.webp)

<!-- no-claim -->
One honest side effect: the weather page changed rarely, so the hash saved a lot of redraws. A page with a clock on it changes every time, so the hash has much less to do now. And the clock is only as fresh as the last screenshot, up to 15 minutes old. For a frame by the door, that is fine.

## Why display mode fits e-ink

[Display mode](/docs/display-mode/) was made for exactly this kind of screen: one view, full screen, in large type, with a clock and no sidebar, menus or quick add. The Today display shows the clock and date, the tasks from earlier days, today's tasks and the next three days as columns, which is what you see in the photo.

E-ink is slow and has no colour, and [`eink=1`](/docs/display-mode/#make-it-readable) takes care of both. It turns on high contrast, so there are no soft tints for the 1-bit conversion to lose, and no motion, so the screenshot never catches a fade halfway. It also drops the seconds from the clock, which would be wrong on any screen that refreshes every 15 minutes.

The display also [reads the device's own copy of the tasks](/docs/display-mode/#live-and-offline), so a task completed on a phone shows up within seconds in the browser, and the list stays on screen if the network drops. On my frame "within seconds" becomes "at the next quarter hour", which nobody in my house has complained about yet.

## Doing it yourself

The address is [`/display/today`](/docs/display-mode/#open-a-display) on your own server. There are also `/display/upcoming`, `/display/project/<id>` and `/display/view/<id>`, if your frame should show the groceries or a family project instead. The options go in the address: `size=m`, `l` or `xl`, `contrast=high`, `motion=none`, `days=1` to `days=7`, and `eink=1`. For example, `/display/today?eink=1&size=xl`.

Don't sign the screen in as yourself. For a screen others walk past, the docs suggest [a viewer account](/docs/display-mode/#set-up-a-shared-screen): create an account for it and share the household project with it as a viewer, so the server refuses every change from it. If you'd rather have no account on the device at all, a [public link](/docs/public-links/#show-it-on-a-display) works on a display too.

<!-- no-claim -->
Then you need something that turns a web page into a picture. Mine is the approach above: render the page in a headless browser, take a screenshot at the panel's size, convert it to 1-bit, and let the board fetch it. The hardware, the wiring and the memory trouble are all in the [original post](https://pixari.dev/posts/i-built-an-e-ink-weather-frame-for-kids-who-cant-read-yet/).

If soldering-adjacent evenings aren't your thing, there is a shortcut: e-ink tablets with Chrome or another Chromium browser [can open display mode directly](/docs/display-mode/#set-up-a-shared-screen), no ESP32 needed. The Kindle browser doesn't work, sadly.

<!-- no-claim -->
If you try it, I'd love to see a photo. The [display mode docs](/docs/display-mode/) have the details, and the [demo](https://demo.open-todo.app) lets you open `/display/today?eink=1` in a private sandbox without installing anything.
