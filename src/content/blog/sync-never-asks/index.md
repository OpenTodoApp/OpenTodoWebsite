---
title: "Why sync never asks which version you want"
summary: Two devices change the same task while one of them is offline, and nobody is shown a merge dialog. Here is the rule that makes that work, what it costs, and where it is written down.
publishedAt: 2026-11-14
author: raffaele
category: development
---
You complete a task on your phone in a tunnel. At the same moment, someone at home renames it on a laptop. When the phone is back online, the task is completed and has the new name. Nobody was asked which version to keep. This post is about why, because it is the decision in OpenTodo I would defend first. The full rules are in [the sync protocol](/docs/sync/).

## One edit, one field

<!-- no-claim -->
Most merge dialogs exist because an app syncs whole records. Two people touched "the task", so the app has two tasks and no way to choose.

OpenTodo never syncs a task. Every edit is a small operation that sets one field of one thing: this task's title, that task's completion time, a project's colour. An operation carries the value, a timestamp and the id of the device that made it ([the operation](/docs/sync/#operation)).

<!-- no-claim -->
So the tunnel example was never a conflict. One operation set `completed_at`, another set `title`. They are different fields, and both are kept.

## When it really is the same field

<!-- no-claim -->
Sometimes two devices do change the same field: you move a task to Friday, your partner moves it to Saturday. One of them has to win, and every device has to pick the same one without talking to the others.

The rule fits on one line: the operation with the later timestamp wins, and if two timestamps are equal, the one from the greater device id does ([the winner rule](/docs/sync/#winner-rule)). The same comparison runs on the server, written in Go, and on every device, written in TypeScript.

<!-- no-claim -->
That rule has three useful properties. Devices that have seen the same operations hold the same state, whatever order they arrived in. Applying an operation twice changes nothing, so a retry after a dropped connection is safe. And an operation can be made with no server in sight and merged later. Computer scientists call a structure like this a CRDT; this is about the simplest one there is, a map of last-writer-wins registers.

## Clocks are the hard part

<!-- no-claim -->
"Later" is only as good as the clocks. A phone whose clock is ten minutes ahead would win every disagreement.

So devices do not use the wall clock alone. Each device stamps an operation with the later of its corrected clock and one more than the last stamp it has used or seen, so its own stamps only go forwards, and an edit made after reading someone else's change is stamped after it. After each exchange a device compares its clock with the server's and corrects for a difference of more than two seconds. An operation stamped more than five minutes into the future is sent back to be stamped again ([clocks](/docs/sync/#clocks)).

## Deleting is a field too

Deleting a task sets one more field, the time it was deleted, and lists leave it out. Because it is an ordinary field under the same rule, a delete on one device beats older edits from another and the task does not come back by itself; restoring from the Trash clears the field again ([deletes](/docs/sync/#deletes)).

## Where one winner is not good enough

<!-- no-claim -->
For a date, one winner is right: a task is due on Friday or on Saturday, not both. For a note it is wrong. If two people each add a paragraph, both paragraphs should stay.

Notes therefore merge character by character. A note is stored as a mergeable document, and a device that receives someone else's version merges it with its own instead of replacing it ([mergeable documents](/docs/sync/#mergeable-documents)).

## What it costs

<!-- no-claim -->
Last writer wins means that, on the same field, the earlier writer loses without being told. I accept that for a title or a due date, where the alternative is a dialog nobody reads. It would not be acceptable for long text, which is why notes work differently.

The other cost is the log. It only grows, and every save of a note writes a whole document, so a background job removes the old copies of notes that no device can still need ([compaction](/docs/sync/#compaction)).

## Why offline comes free

Each phone and computer keeps a full copy and applies your edit there first; the server hears about it afterwards ([offline and sync](/docs/offline-and-sync/)). Once every edit is an operation that can wait, there is no separate offline mode to build. Offline is the normal case with a longer delay.

It also means there is one way in. The REST API, CalDAV, email to task and the importers write through the same log ([REST writes](/docs/sync/#rest-writes)), so a task created from a script reaches your phone the same way as one typed on the laptop.

<!-- no-claim -->
If you want to see it, the [sync playground](/playground/) lets you take two devices offline, edit both and bring them back.
