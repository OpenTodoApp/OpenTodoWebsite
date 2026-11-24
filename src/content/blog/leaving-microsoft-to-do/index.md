---
title: "Leaving Microsoft To Do? Here is how to bring your tasks"
summary: Microsoft retires the To Do apps on 30 June 2027, personal accounts included. If you are looking for a new home for your lists, here is how to bring every one of them into OpenTodo, step by step.
publishedAt: 2026-11-24
author: raffaele
category: news
tags: [ownership, task-management]
---
<!-- no-claim -->
If you use Microsoft To Do, you may have read the news this month. Microsoft says that "[Microsoft To Do apps will retire on June 30, 2027](https://support.microsoft.com/en-us/planner/to-do-to-planner)", on the web, Windows, Mac, iOS and Android. Work and school accounts move to Planner. For personal accounts, the same page says: "To Do apps are also retiring for personal Microsoft accounts, including Microsoft 365 Personal and Family", and that Planner is not available for them. Microsoft also says it "will provide a way to export your To Do data before the apps retire".

<!-- no-claim -->
To Do is a good app. It is free, it is calm, and many people have years of lists in it. If you are one of them and you are wondering where to go next, welcome. There is no rush: you have until June 2027. This post shows one option and how to move to it in about ten minutes, without retyping anything.

## What OpenTodo is

OpenTodo is a free, open-source task manager (AGPL-3.0). It runs on a server you choose, your own or one a [host runs for you](/hosting/), so your lists stay with you and no company can retire them. [Set up your own server](/docs/getting-started/#set-up-your-own-server)

You use it [in the browser or installed as an app](/docs/install-app/) on your computer, on [Android](/docs/android-app/) and on [iPhone and iPad](/docs/ios-app/), and it keeps working offline. To look around first, open the [demo](https://demo.open-todo.app): a private sandbox with sample tasks, no account needed. [Try the demo](/docs/getting-started/#try-the-demo)

## Step 1: save your lists to one file

<!-- no-claim -->
To Do has no export button yet. Microsoft Graph, the service behind it, lets you read your own lists, and a short PowerShell script saves them to one file, `todo.json`. It only reads: it asks for one permission, **Tasks.Read**, and changes nothing in To Do.

<!-- no-claim -->
1. Install PowerShell 7. On Windows, run `winget install --id Microsoft.PowerShell --source winget` in **Terminal**, then open **PowerShell 7** from the Start menu (not the older **Windows PowerShell**). On a Mac, install the `.pkg` from [PowerShell's releases](https://github.com/PowerShell/PowerShell/releases), or run `brew install powershell`, then type `pwsh` in **Terminal**.
2. Install or update Microsoft's sign-in module, even if you have it already:
   ```powershell
   Install-Module Microsoft.Graph.Authentication -Scope CurrentUser -Force
   ```
   If it asks whether to trust **PSGallery**, type `A` and press Enter.
3. Paste the whole script below and press Enter. The first line is for a personal account (outlook.com, hotmail, live, Microsoft 365 Personal or Family). For a work or school account, change `$true` to `$false`.
   ```powershell
   $personal = $true
   $ErrorActionPreference = "Stop"
   $signIn = @{ Scopes = "Tasks.Read" }
   if ($personal) { $signIn.TenantId = "consumers" }
   Connect-MgGraph @signIn

   function Get-All($uri) {
     $items = @()
     while ($uri) {
       $page = Invoke-MgGraphRequest -Method GET -Uri $uri
       $items += $page.value
       $uri = $page.'@odata.nextLink'
     }
     return ,$items
   }

   try {
     $lists = Get-All "v1.0/me/todo/lists"
     foreach ($list in $lists) {
       Write-Host "Reading $($list.displayName)"
       $list["tasks"] = Get-All "v1.0/me/todo/lists/$($list.id)/tasks?`$expand=checklistItems,linkedResources"
     }
     $out = Join-Path $HOME "todo.json"
     ConvertTo-Json -InputObject @($lists) -Depth 10 | Set-Content -Encoding utf8 $out
     Disconnect-MgGraph
     Write-Host "Saved $($lists.Count) lists to $out"
   } catch { Write-Host "Stopped, nothing saved: $_" }
   ```
4. Sign in with the account you use in To Do and accept. The script names each list as it reads it and ends with `Saved … lists to …`. The file is in your home folder.

The `consumers` line matters: without it, a personal account's sign-in fails. The guide in the [release documentation](/docs/switch/microsoft-todo/#export-from-microsoft-to-do) does not have it yet, so use the script above, or the [rewritten guide on GitHub](https://github.com/OpenTodoApp/OpenTodo/blob/main/docs/switch/microsoft-todo.md), which also covers what to do when a step fails.

## Step 2: import it into OpenTodo

1. Open **Settings → Data → Import data**. [Switch from Microsoft To Do](/docs/switch/microsoft-todo/#import-into-opentodo)
2. Under **Switching from…**, choose **Microsoft To Do**, then choose `todo.json`. The preview shows **Microsoft To Do (JSON from the PowerShell script)** and every project and task it will create. Nothing is written yet. [Import from another app](/docs/import-export/#import-from-another-app)
3. Read the warnings and select **Import**. Your other devices receive everything on their next sync. [Import from another app](/docs/import-export/#import-from-another-app)
4. Changed your mind? **Undo** under **Past imports** removes everything that import created. [Undo an import](/docs/import-export/#undo-an-import)

The demo does not import files, so do this on your own server. [What is switched off on the demo](/docs/self-hosting/demo/#what-is-switched-off)

## Where your To Do things live

| If you used this in To Do | In OpenTodo |
| --- | --- |
| Lists | Projects, one per list; the default Tasks list goes to your Inbox. [What carries over](/docs/switch/microsoft-todo/#what-carries-over) |
| List groups | Not carried over: lists arrive side by side. Nest them as [sub-projects](/docs/projects/#sub-projects), or keep work and home apart in [workspaces](/docs/workspaces/). |
| My Day | Not carried over. [Today](/docs/today-and-upcoming/#plan-your-day-with-today) shows what is due today; a task you add there is due today. |
| Important | Priority 1. To keep an Important list, [save the filter](/docs/labels-and-filters/#save-a-filter-as-a-view) `p1` as a view. |
| Planned | [Upcoming](/docs/today-and-upcoming/#plan-your-week-with-upcoming) and the [Calendar](/docs/built-in-views/) show every dated task. |
| Steps | Subtasks; checked steps arrive completed. [What carries over](/docs/switch/microsoft-todo/#what-carries-over) |
| Reminders | A [reminder](/docs/recurring-and-reminders/#add-a-reminder) at the same moment. |
| Repeat | A [repeat rule](/docs/recurrence/) for daily, weekly, monthly on a day and yearly repeats. Others arrive without a rule and a warning: set them again, such as [`every 2nd thursday`](/docs/recurrence/#grammar). |
| Notes | The task's notes, as plain text. [What carries over](/docs/switch/microsoft-todo/#what-carries-over) |
| Shared lists | Your own projects, with all their tasks; the members are not in the file. [Share the project](/docs/sharing/#share-a-project) again. |
| Assigned to me | Not in the file: it comes from Planner. In OpenTodo, people [assign tasks](/docs/sharing/#assign-tasks) in shared projects. |
| Attachments | Links, such as the email a task came from, become link attachments. Files are not in the file; [attach them](/docs/attachments/) again. [What does not](/docs/switch/microsoft-todo/#what-does-not) |

Some things To Do does that OpenTodo does not: flagging an email in Outlook does not add a task, and someone has to run the server, you or a host. If those matter to you, that is a fair reason to choose differently. [Set up your own server](/docs/getting-started/#set-up-your-own-server)

## Better in the next release

The import works today: [Switch from Microsoft To Do](/docs/switch/microsoft-todo/). I am also improving it for the next release: due dates that land on the right day wherever you live (in the current release, a date can arrive one day early east of UTC, so glance at your dates after importing), more repeat patterns, such as every two weeks on chosen days, the second Thursday of the month and repeats with an end date, and cleaner notes. If you would rather wait for it, your lists are safe in To Do until June 2027, and an import can always be undone and run again.

## If you get stuck

<!-- no-claim -->
Ask on [Discord](https://discord.gg/mmSsuCRduD) or in [GitHub Discussions](https://github.com/OpenTodoApp/OpenTodo/discussions), and if something is broken, [open an issue](https://github.com/OpenTodoApp/OpenTodo/issues). When Microsoft publishes its own export, I will check it and support it if I can.
