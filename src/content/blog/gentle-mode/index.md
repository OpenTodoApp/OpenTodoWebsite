---
title: "Gentle mode: a calmer OpenTodo for ADHD brains"
summary: I've been researching why task apps fail so many people with ADHD. Here's what I'd like to build into OpenTodo, and I'd love your feedback before I start.
publishedAt: 2026-11-07
author: raffaele
category: development
inDevelopment: true
---
<!-- no-claim -->
Over the last weeks I've been reading and researching how ADHD affects planning and getting things done, and why so many people with ADHD try one task app after another and give up on all of them. This post is what I'd like to build in response. Nothing is built yet. I'm asking for your feedback first, on [the discussion on GitHub](https://github.com/OpenTodoApp/OpenTodo/discussions/1023).

## What I learned

<!-- no-claim -->
Based on my research, one point keeps coming up: people with ADHD usually know what they need to do. The hard parts are starting, staying on one thing, feeling time pass, and coming back after a bad week.

<!-- no-claim -->
Most task apps make those parts harder. They wait passively for you to open them. They show a red pile of overdue tasks after a few rough days. They ask for a project, a date and a priority before a thought is even saved, and by then the thought is gone. A streak that drops to zero after one missed day turns a bad week into a reason to stop using the app altogether.

<!-- no-claim -->
What helps is fairly consistent: capture in a few seconds without deciding anything, a way through being stuck that isn't just "break it into smaller steps", a day that fits the energy you actually have, one thing on the screen while you work, and a kind way back after time away. Two warnings come with it. The novelty of a new system fades after a few weeks, so it has to need almost no upkeep. And help nobody asked for, like "you haven't worked on this today", feels like being watched and backfires on the days you need help most.

## What OpenTodo already has

<!-- no-claim -->
More than I expected. Quick add understands plain language and voice, the Inbox can be sorted one card at a time, Today can be limited, deadlines are already separate from the days you plan to work, Focus mode has a timer and background noise, and replanning the day shows you a preview before anything moves. Most of what's missing is glue between these pieces, gentler defaults, and a few small new features.

## The idea: Gentle mode

<!-- no-claim -->
One switch in How you work. It turns on a set of settings and features that work well together, in one step, and every piece can still be turned off on its own. I'd rather call it Gentle mode than ADHD mode: plenty of people without a diagnosis, or going through burnout, anxiety or a long illness, may want the same things, and nobody should have to label themselves to turn it on.

<!-- no-claim -->
Some of the changes would apply to everyone, because they make the app better for all of us. Past planned days would stop showing in red and stop being called late; only real deadlines would keep their colour. You could mark a task done straight from its reminder, the focus timer would become calmer, and you could park a distracting thought without leaving the task you're on.

<!-- no-claim -->
Inside Gentle mode, a few of the ideas I'm most excited about:

<!-- no-claim -->
- **A first step on every task.** "Open the tax PDF" instead of "do taxes", shown when you start and in reminders.
- **Just two minutes.** Start a task for two minutes. If you stop then, that counts as a win.
- **Help me start.** A gentle question, "what makes this hard right now?", that leads to a breakdown showing only step one, permission to do it badly, or a smaller version or tomorrow, with no penalty.
- **How's your head today?** Clear, cloudy or foggy. On a foggy day, Today shows one or two things and real deadlines only. Nothing is moved or lost.
- **The Now screen.** One task, its first step and a Start button, with a quiet look at what comes next.
- **Fresh start.** After a few days away: "Welcome back. What's one thing that matters today?" One tap moves everything without a real deadline out of the way, and you can undo it.
- **Habits without broken streaks.** "6 of the last 7 days" instead of a counter that drops to zero.
- **Reminders that say when and what.** "After your 14:00 call: open the tax PDF", and optionally repeating until it's done.

<!-- no-claim -->
The full plan, with all 37 items in seven groups, the principles behind them and the order I'd build them in, is on [the GitHub discussion](https://github.com/OpenTodoApp/OpenTodo/discussions/1023).

## What I won't build

<!-- no-claim -->
No auto-scheduler that reshuffles your whole day when one thing runs over. No points, levels or "perfect day" rewards that punish bad days. No nudges you didn't ask for. Nothing about how you work is sent to a server: anything the app learns stays on your device, and it all works without AI.

## I'd love your feedback

<!-- no-claim -->
If you have ADHD, live with someone who does, or just recognise yourself in any of this, please tell me what you think on [the discussion](https://github.com/OpenTodoApp/OpenTodo/discussions/1023). A few questions to start with:

<!-- no-claim -->
- If you could only have three of these ideas, which would they be?
- What's missing that your brain needs?
- What here sounds annoying, childish or stressful?
- Is "Gentle mode" the right name?
- Would you be willing to review each part before it's released, and try it early?

<!-- no-claim -->
You don't need a diagnosis, or to explain yourself, to take part. Blunt feedback is very welcome.
