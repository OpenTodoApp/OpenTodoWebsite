---
title: Your first server, if you have never run one
summary: What "self-hosting" actually asks of you, the three places a server can live, the path with the least to learn, and what a month of upkeep looks like.
lastReviewed: 2026-10-15
sources: [/docs/self-hosting/coolify/, /docs/self-hosting/docker/, /docs/backups/, /docs/install-app/]
templates: []
order: 3
---
<!-- no-claim -->
You do not need to be a developer. You need to be the kind of person who can follow a recipe and does not mind reading an error message. This page is for you.

## What you are signing up for

<!-- no-claim -->
A server is a computer that stays on and that your phone can reach. OpenTodo on it is one program in one container with one folder of data: no database to install, no configuration file to write. The work is in three parts: give the program a place to run, give it an address with a padlock (`https://`), and keep it updated and backed up. [Running with Docker](/docs/self-hosting/docker/)

## Where it can live

<!-- no-claim -->
Cheapest first:

- **A machine already at home:** a NAS, a mini PC, an old laptop. Costs nothing more than it does today; reaching it from outside the house is the part to learn.
- **A Raspberry Pi:** a one-off purchase and a few watts. OpenTodo ships for its processor. [Running OpenTodo on a Raspberry Pi](/toolkit/raspberry-pi/)
- **A small rented server (a VPS):** a provider gives you a computer in their data centre with a public address, for a monthly fee for the whole household. The smallest plan of any provider is more than enough; OpenTodo idles at about 20 MB of memory. [Resource usage](/docs/self-hosting/docker/#resource-usage)

Prices are in words on purpose: [what it costs](/cost/).

## The path with the least to learn

<!-- no-claim -->
Coolify is a free program that turns a rented server into a place you deploy things to by clicking, and it takes care of the padlock. If you have never run a server, this is the path.

1. Rent the smallest server a provider offers and follow Coolify's own install instructions on it. Give it a domain name, or a subdomain of one you own, such as `todo.example.com`, pointing at the server's address. <!-- no-claim -->
2. In Coolify, choose **+ New → Docker Compose**, paste the OpenTodo service template, and set **Domains** to `https://todo.example.com`. [One-click template](/docs/self-hosting/coolify/#one-click-template-pending-in-coolifys-service-list)
3. Select **Deploy**, then open the domain right away: the first visitor creates the owner account, and sign-up closes after that. [Deploying on Coolify](/docs/self-hosting/coolify/)
4. Open **Settings → Backups** and turn on a daily backup to storage that is not on the same server. [Backups](/docs/backups/#quick-start)
5. Invite your household from **Settings → Administration → Members**, one link each. [Invite people to your server](/how-to/invite-people-to-your-server/) [Invite someone new](/docs/sharing/#invite-someone-new)
6. Install the app on your phone from the browser and turn on notifications in it. [Install the app](/install/) [Installing the app](/docs/install-app/)

If you already run Docker somewhere, the plain Docker path is three commands. [Docker Compose](/docs/self-hosting/docker/#docker-compose)

## What a month looks like

- **Updates:** when a release comes out, pull the new image and restart; the database updates itself. A few minutes, every few weeks. [Update the server](/how-to/update-the-server/)
- **Backups:** nothing, once they are scheduled. Glance at **Settings → Backups** now and then to see the last run succeeded. [Schedule and retention](/docs/backups/#schedule-and-retention)
- **People:** a forgotten password means you create a reset link and send it; nothing is emailed by the server. [Managing users](/docs/self-hosting/docker/#managing-users)
- **The rest:** [keeping your server healthy](/toolkit/keeping-your-server-healthy/) is the longer checklist.

## When something goes wrong

- The app cannot be installed on a phone or shows no **Security** section: the address is not `https://`. Coolify gives you that when the domain starts with `https://`. [Passkeys](/docs/self-hosting/coolify/#passkeys)
- The owner forgot the password: one command on the server prints a reset link. [Recover the owner password](/how-to/recover-the-owner-password/)
- Anything else: the troubleshooting page, then an issue on GitHub. [Troubleshooting](/docs/troubleshooting/)
