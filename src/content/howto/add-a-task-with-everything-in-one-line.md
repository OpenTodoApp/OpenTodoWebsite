---
title: Add a task with its date, project and label in one line
summary: "Type \"Call Sam tomorrow 3pm #Work @call p2 +30m\" and OpenTodo fills in everything. In six languages."
lastReviewed: 2026-10-15
sources: [/docs/quick-add/, /docs/tasks-and-projects/]
group: Every day
minutes: 2
shot: quick-add
order: 10
related: [make-a-task-repeat, set-a-reminder]
---
## What you need

<!-- no-claim -->
- Nothing. This works in every task list, on the phone too.

## Steps

1. Press <kbd>q</kbd> in any list, or click **Add a task**. [Add a task](/docs/tasks-and-projects/#add-a-task)
2. Type the task, then the details in any order. A date in everyday words (`tomorrow`, `next wed`, `3 Feb`), a time (`at 3pm`, `15:00`), `#project`, `@label`, a priority `p1` to `p4`, and an estimate like `+30m`. [Tokens](/docs/quick-add/#tokens-any-language)
3. Watch the chips under the box: each one shows what was understood, and the title preview shows what will be saved. A word taken by mistake ("may" the name, not the month)? Select the × on its chip, or press <kbd>Backspace</kbd> twice at the end of the line. [Preview chips](/docs/quick-add/#preview-chips)
4. Press <kbd>Enter</kbd>. The task is created with everything set, and the box stays open for the next one. [Quick add syntax](/docs/quick-add/)

## Good to know

- Dates work in English, German, French, Italian, Spanish and Portuguese, all at once: `demain à 15h` and `morgen um 15 Uhr` both work. [Languages](/docs/quick-add/#languages)
- Text in double quotes is never interpreted: `Read "Next Friday" tomorrow`. [Preview chips](/docs/quick-add/#preview-chips)
- Where you are matters: a task typed in Today is due today, one typed in a project goes into that project, unless the line says otherwise. [Views and defaults](/docs/quick-add/#views-and-defaults)
- Repeat rules are not read here. Add the task, then open it and set **Repeat**. [Make a task repeat](/docs/recurring-and-reminders/#make-a-task-repeat)

## If it does not work

- A word is read as a date, project or priority every time: turn parsing off for this device in **Settings → Capture → Quick add**. [Quick add got it wrong](/docs/troubleshooting/#quick-add-got-it-wrong)
- A `#project` stays in the title: no project matches that name or prefix, or two do. Type more of the name; the chip shows the path when it matches. [Tokens](/docs/quick-add/#tokens-any-language)
