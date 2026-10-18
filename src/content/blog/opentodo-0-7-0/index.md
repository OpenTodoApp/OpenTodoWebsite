---
title: "OpenTodo 0.7.0: harder to break into, harder to lose"
summary: A hardening release after a review of the whole code base. Your account is harder to take over, sync keeps your changes in more situations, backups behave on big servers, and fourteen more platforms can install it.
publishedAt: 2026-10-18
author: raffaele
category: releases
release: 0.7.0
draft: true
---
<!-- no-claim -->
OpenTodo 0.7.0 is out. It has two new features and a lot of fixes, and that is on purpose: before adding more, I read the whole code base again, looking for the places where it could let you down. This release is what that review found.

## Your account is harder to take over

The server now treats changes to sign-in and administration as a separate kind of request. Adding a passkey, creating a token or changing who can use the server needs your signed-in session or an **admin** token; an ordinary API token is refused. Repeated wrong passwords lock password sign-in for a while, and **Sign out everywhere** ends every session and token at once. The details are in [account security](/docs/account-security/) and the [API reference](/docs/api/).

A new server that is reachable from the internet also asks for a setup code before anyone can create the owner account, so a fresh install cannot be claimed by a stranger who finds it first. The code is printed in the server's log; the [Docker guide](/docs/self-hosting/docker/) shows where.

## Sync keeps your changes in more places

Most of the fixes are about not losing an edit. A device with a wrong clock, a proxy that answers in the server's place, signing out in the middle of a sync, and the history of a project you just joined were all situations where a change could go missing. They no longer are. [Offline and sync](/docs/offline-and-sync/) describes how the app behaves now.

If you use end-to-end encryption, the server can no longer switch it off on your devices, and links you attached before turning it on are now encrypted too. [End-to-end encryption](/docs/e2ee/) has the threat model, including what the server still can and cannot do.

## Backups that behave on big servers

A [backup](/docs/backups/) now checks the free disk space first and stops with a clear message instead of filling the disk, and uploads to S3-compatible storage work above 5 GB. Large servers and long lists also answer faster.

## Fourteen more ways to install it

There are new templates for Kubernetes (a Helm chart), Podman, CapRover, Fly.io, Render, Synology, CasaOS and ZimaOS, Cosmos Cloud, Dokploy, Easypanel, Portainer, Runtipi, TrueNAS and Umbrel, and OpenTodo is now in Unraid's Community Applications. Every template uses a new `stable` image tag, so updating is pulling the same tag again. The [Kubernetes guide](/docs/self-hosting/kubernetes/) and the [Unraid guide](/docs/self-hosting/unraid/) are good places to start.

## Easier with a screen reader

Screen readers now hear what the small chips on a task say, follow the selection as you move through a list with the keyboard, and are told when you go to another page. A "Skip to content" link jumps past the sidebar. [Keyboard shortcuts](/docs/keyboard/) covers the list navigation.

## Before you upgrade

Two things need your attention. Password resets, sign-up confirmations and invitations are emailed only when `OPENTODO_BASE_URL` is set, so set it if you have not. And scripts that change credentials or administer the server need an admin token instead of a full one. Four migrations run at startup, and there are no down-migrations, so back up your data folder first. [Updating the server](/docs/self-hosting/docker/#updating) walks through it.

<!-- no-claim -->
The full list of changes, with every upgrade note, is on the What's new page and in the [0.7.0 release notes](https://github.com/pixari/opentodo/releases/tag/v0.7.0), which also have the binaries and checksums.
