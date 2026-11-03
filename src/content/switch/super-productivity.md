---
app: Super Productivity
title: Moving from Super Productivity
summary: Super Productivity saves everything as one backup file, and OpenTodo reads it as it is, with a preview before anything is written. Projects, tags, tasks, subtasks, archived tasks, planned days, deadlines, reminders, estimates, repeats and your tracked time come across; boards, metrics and focus history do not.
checkedOn: 2026-11-03
sources: [/docs/import/, /docs/import-export/, /docs/switch/super-productivity/, /docs/time-tracking/, /docs/focus/, /docs/recurrence/]
importFormat: super-productivity-json
order: 8
keeps:
  - Projects; archived ones arrive archived
  - Super Productivity's Inbox, as your Inbox
  - Tasks with their notes, subtasks, and done tasks with when they were done
  - Archived tasks, completed
  - Tags, as labels
  - Planned days and times, as due dates and times in the time zone you choose
  - Deadlines and reminders
  - Time estimates, rounded up to the minute
  - Tracked time, as one time entry per task and day, so your totals stay the same
  - Repeats daily, on chosen weekdays, monthly, yearly, every N days to years, and after completion
  - Tasks from a GitHub issue keep a link to it
  - Importing the same backup again skips what is already there
drops:
  - The clock times of tracked work (the backup keeps a total per day; entries start at 09:00)
  - Paused repeats, and chosen weekdays every 2 or more weeks, arrive with a warning
  - Links to other trackers' issues when the backup does not say where they are
  - Boards, metrics, counters, focus mode history, plugins and the app's settings
terms:
  - them: "Task"
    us: "Task"
  - them: "Project"
    us: "Project"
  - them: "Tag"
    us: "Label"
  - them: "Sub task"
    us: "Subtask"
  - them: "Planned for a day"
    us: "Due date"
  - them: "Deadline"
    us: "Deadline"
  - them: "Time estimate"
    us: "Estimate"
  - them: "Time spent"
    us: "Time entries"
  - them: "Repeat config"
    us: "Repeat rule"
  - them: "Focus mode"
    us: "Focus timer"
    note: "Pomodoro, Flowtime or Countdown, logged to the task."
  - them: "Worklog"
    us: "Time tracking report and CSV export"
  - them: "Archive"
    us: "Completed"
---
## Before you start

<!-- no-claim -->
At the time of checking, Super Productivity exports its data from **Settings → Sync & Backup** on desktop, web and mobile. Trust your own app over this page.

OpenTodo reads the backup JSON as it is, tracked time included. [Switch from Super Productivity](/docs/switch/super-productivity/)

## Export from Super Productivity

1. Open **Settings → Sync & Backup**, and under **Import/Export** select **Export data**. The app saves a file such as `sp-backup_2026-11-03.json`. <!-- checked 2026-11-03 --> [Switch from Super Productivity](/docs/switch/super-productivity/#export-from-super-productivity)

## Import into OpenTodo

1. Open **Settings → Data → Import data…**, choose **Super Productivity** under **Switching from…**, then the file. The preview shows **Super Productivity (backup JSON)**. [Switch from Super Productivity](/docs/switch/super-productivity/#import-into-opentodo) [Switching from…](/docs/switch/README/#switching-from)
2. Choose the time zone for the planned times and check the warnings. Nothing is written yet. [Import from another app](/docs/import-export/#import-from-another-app)
3. Select **Import**. An import can be undone. [Undo an import](/docs/import-export/#undo-an-import)

## Your first week

- Your time arrived as one entry per task and day. Start and stop the timer on a task, add past work, and export the entries as CSV. [Time tracking](/docs/time-tracking/)
- Focus sessions: Pomodoro, Flowtime or Countdown, started from any task and logged to it. [Focus timer](/docs/focus/)
- Today: cap it at a few tasks and see what you finished. [A Today limit](/docs/today-limit/)
- GitHub and GitLab: connect your account and the open issues assigned to you become tasks that close with the issue. [Issue import](/docs/issue-import/)
