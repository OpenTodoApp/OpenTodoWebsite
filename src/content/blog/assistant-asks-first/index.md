---
title: "An assistant that asks first"
summary: "From OpenTodo 1.4, the assistant answers with your tasks, days and projects drawn as the app draws them, proposes every change for you to edit and apply, and one Undo takes it back. It works with the model you choose, even one on your own network."
# Placeholder: set on release day of OpenTodo 1.4, then remove `draft`.
publishedAt: 2099-12-31
author: raffaele
category: news
cover: ./cover.png
coverAlt: "Today in OpenTodo with the assistant panel open on the right. Under the request to move three overdue tasks to Thursday, Proposed changes shows Thursday 12 November as a day: Renew passport, Call the plumber about the leak at 09:30 and Run club at 18:00 are marked proposed with a checkbox and a pencil each, between the tasks already on that day, above the buttons Apply 3 changes and Discard."
tags: [task-management, time-management]
series: in-practice
part: 14
draft: true
---
<!-- no-claim -->
An assistant that changes your tasks on its own is hard to trust: you find out what it did afterwards. One that only talks leaves the moving to you. From version 1.4, OpenTodo's assistant takes the middle way: it reads, shows and proposes, and you decide.

## Ask, and see the tasks themselves

Press <kbd>Shift</kbd>+<kbd>I</kbd>, or select **Ask** on Today, and type a question the way you would ask a person. The tray under the box says what it carries along, such as **Context: Today**. [Ask, review and undo](/docs/assistant-ask/#open-the-assistant)

Where it saves reading, the answer shows the app's own view: tasks as rows you can tick off, a day with its planned total, deadlines, free time, a project's board or timeline, tracked time. They are read from your device, so they stay current and work offline. [Answers that show your tasks](/docs/assistant-answers/#what-answers-can-show)

<!-- no-claim -->
![The assistant panel in the dark theme answering What's overdue, and what's still on for today? A block headed Due today lists seven tasks as rows with checkboxes, times, projects, labels and estimates, such as Get three quotes for the kitchen at 10:00 in Home renovation and Pick up groceries at 18:00. Below, the answer says there are 3 overdue tasks and 7 due today, the token count, and two suggested next steps: Reschedule the overdue tasks and Plan the rest of my day.](./answer-with-tasks.png)

The latest answer may end with up to three next steps, such as **Reschedule the overdue tasks**; selecting one sends it as your message. [Suggested next steps](/docs/assistant-answers/#suggested-next-steps)

## A proposal you can shape

Ask for a change and nothing changes. The answer ends with **Proposed changes**, drawn in the shape of what it touches: moves within one week as a calendar, a new project as an outline, places on a map, with **List** one switch away. [Shape a proposal](/docs/assistant-proposals/#its-own-shape)

Every item has a pencil for its title, dates, time and priority. In the video below the assistant kept the plumber call at 09:30, but the account's memory says calls go after 14:00, so I changed the time. The item is marked **edited**, and what you entered is what applies. In the calendar you can also drag an item to another day, or use <kbd>Alt</kbd>+<kbd>↑</kbd> and <kbd>Alt</kbd>+<kbd>↓</kbd>. [Edit an item](/docs/assistant-proposals/#edit-an-item)

<!-- no-claim -->
![Proposed changes in the light theme for Thursday 12 November. Renew passport and Run club are marked proposed; Call the plumber about the leak now reads 14:30 and is marked edited. Tasks already on that day, such as Plan the team offsite at 09:00, sit between them without checkboxes. Below are Apply 3 changes and Discard.](./proposal-edited.png)

While the proposal is open, your next message amends it instead of starting over, and **Before and after** shows each value now and as proposed. Uncheck what you do not want, then **Apply**. [Ask for more](/docs/assistant-proposals/#ask-for-more)

Ask it to give the untimed tasks of a day a time, and the proposal is that day, time-blocked around what is already fixed. [Its own shape](/docs/assistant-proposals/#its-own-shape)

<!-- no-claim -->
![A time-blocked Wednesday in the dark theme: Proposed changes gives Landing page hero 09:00, Launch email sequence 10:30 and Pick paint colours 15:15 around Measure the hallway at 08:30 and Draft the conference talk at 13:00, which stay as they were.](./time-blocked-day.png)

**Undo** puts back every value the proposal changed and moves the tasks it created to the Trash, in one step, also offline. [Undo](/docs/assistant-ask/#undo)

<!-- no-claim -->
<figure>
<video controls muted playsinline preload="none" poster="/media/blog/assistant-asks-first/assistant-poster.jpg" width="1920" height="1080">
<source src="/media/blog/assistant-asks-first/assistant.mp4" type="video/mp4">
</video>
<figcaption>A question in Today, the answer as task rows, a request to move three overdue tasks to Thursday, the proposal as Thursday's calendar, the plumber call moved to 14:30 with the pencil, Apply and Undo. About a minute, no sound, the waits for the model sped up, recorded on a local instance of OpenTodo ahead of 1.4 with Claude Sonnet 5.5.</figcaption>
</figure>

## Where you already are

Some jobs start from their subject. A task's **⋯** menu has **Rewrite this**, **Find a slot** (a time in your free hours over the next seven days that fits its estimate) and **Break this down**; a project's has **What's next?**; Today's has **Brief me**: the agenda, the deadlines and how you are doing. What's next? and Brief me change nothing. [The assistant where you work](/docs/assistant-in-context/)

<!-- no-claim -->
![The answer to Brief me in the light theme, under the message marked Skill: Brief me: Tuesday 10 November as a day with its tasks and times, from Get three quotes for the kitchen at 10:00 to Pick up groceries at 18:00 and 4h 15m planned of 8h, the line No deadlines on these days, and tiles for Done 5, Earlier 3, Inbox 2 and Today 10.](./brief-me.png)

A routine's **Ask AI** step can show the same blocks: a *Morning briefing* puts the day's agenda and the tasks to start with under its line in the Inbox card. The run keeps only which tasks and days, never text. [AI steps](/docs/routines/#ai-steps)

## What it remembers

Memory holds short facts that the assistant keeps to, such as "Works Monday to Thursday": at most 20 lines, in **Settings → Integrations → Assistant → Memory**. The assistant can propose one when you state a fact, but it exists only after you apply it. Nothing is remembered silently. [What the assistant remembers](/docs/assistant-memory/#only-what-you-confirm)

<!-- no-claim -->
![The Memory list in Settings in the dark theme with three lines: Works Monday to Thursday; Fridays are off, Mornings are for deep work; calls after 14:00, and Sam Rivera helps with the home renovation, with Add and Clear all below.](./memory.png)

## What is sent, and where it stays

Before your first message the panel names the provider and model and what may be sent: tasks, comments, notes, tracked time, project and label names, the names of people you share with, your memory and your messages. Nothing goes out until you select **Accept and continue**. In a shared project that includes text other members wrote. [Before your first message](/docs/assistant-privacy/#before-your-first-message)

Conversations live only in your browser, never synced or backed up, and the server keeps nothing of a turn after it answered. [Conversations stay on this device](/docs/assistant-privacy/#conversations-stay-on-this-device)

Memory goes to the provider with every message, and nowhere else: MCP clients, API tokens, routines' AI steps and other people never receive it. It syncs to your devices and is end-to-end encrypted on an encrypted account. [Never to anyone else](/docs/assistant-memory/#never-to-anyone-else)

On an encrypted account the server never runs the assistant. If the owner allows it, it runs on your device with your own key, and the server sees only that you agreed. [End-to-end encrypted accounts](/docs/assistant-privacy/#end-to-end-encrypted-accounts)

The owner chooses the model: Anthropic, OpenAI, Google Gemini or any server with the OpenAI-compatible format, such as Ollama or LM Studio on a machine at home. It must support tool use; for the multi-step skills, choose 7B or more. [A local model](/docs/assistant-owner-options/#a-local-model)

## A few ways to use it

<!-- no-claim -->
These are general tips rather than a routine of mine; take the ones that fit.

- **Read before you ask for changes.** A question that only reads sends fewer tool definitions to the model, so it costs less. [Ask and review](/docs/assistant-ask/#ask-and-review)
- **Put your rules in memory.** "Calls after 14:00" once, instead of in every request. [What the assistant remembers](/docs/assistant-memory/)
- **Read the proposal.** In my recording the model misread the clock once and corrected itself in its next answer. The review is there for that. [Safety](/docs/assistant-skills/#safety)

## What it does not do

- It never applies a change by itself, unless you turn on **Small changes without review**: off by default, and limited to completion, dates, priority or labels of at most three tasks. [Small changes without review](/docs/assistant-settings/#small-changes-without-review)
- It cannot change sharing, members, settings or tokens, delete anything permanently, browse the web or send messages. [Safety](/docs/assistant-skills/#safety)
- It is off until the owner of your server turns it on, and off on the public demo. [AI assistant](/docs/assistant/#demo-instance)

## Try it

The assistant comes with OpenTodo 1.4. The owner sets it up in **Settings → Integrations → Assistant** ([Set up the assistant](/docs/assistant-setup/)); then press <kbd>Shift</kbd>+<kbd>I</kbd>. Assistants like Claude Desktop that connect over MCP can show the same task blocks too. [Blocks in the assistant's answer](/docs/mcp/#blocks-in-the-assistants-answer-mcp-apps)
