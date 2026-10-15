---
title: Running OpenTodo on a Raspberry Pi
summary: The whole household's task list on a device the size of a deck of cards, for a few watts. What to buy, how to start it, and how to keep the data safe.
lastReviewed: 2026-10-15
sources: [/docs/self-hosting/docker/, /docs/backups/, /docs/import/, /docs/install-app/]
templates: []
order: 4
---
<!-- no-claim -->
A Raspberry Pi is the cheapest server most people will ever run, and OpenTodo is small enough to be happy on it.

## What you need

- A Raspberry Pi with a 64-bit system (Raspberry Pi OS 64-bit on a Pi 4 or 5, 1 GB of memory or more). OpenTodo publishes its image for `arm64`, so it runs there without any special build. [Resource usage](/docs/self-hosting/docker/#resource-usage)
- Docker installed on it, following Docker's own instructions for Raspberry Pi OS. <!-- no-claim -->
- A way for your phones to reach it from outside the house, if you want that: a domain and a reverse proxy with HTTPS, or a private network such as Tailscale between your devices. Installing the app and push notifications need an `https://` address. [Behind a reverse proxy](/docs/self-hosting/docker/#behind-a-reverse-proxy)

## Start it

1. Create a folder for the data and give it to the user the container runs as: `mkdir -p ./data && sudo chown 65532:65532 ./data`. [Bind mounts](/docs/self-hosting/docker/#bind-mounts)
2. Start the container with that folder mounted at `/data`, port 8080 published, and `OPENTODO_BASE_URL` set to the address your phones will use. [Plain docker run](/docs/self-hosting/docker/#plain-docker-run)
3. Open the address. The first visitor creates the owner account, and sign-up closes. [Docker Compose](/docs/self-hosting/docker/#docker-compose)
4. Put a reverse proxy such as Caddy in front for HTTPS, and set `OPENTODO_BASE_URL` to the public `https://` address so cookies are secure and passkeys are offered. [Behind a reverse proxy](/docs/self-hosting/docker/#behind-a-reverse-proxy)

## Keep the data safe

<!-- no-claim -->
SD cards fail. Treat the Pi as the thing that runs OpenTodo, not the thing that keeps your data.

- Turn on scheduled backups to somewhere else: a USB disk mounted into the container, a NAS over WebDAV, or S3-compatible storage. The folder-on-the-server option is on the same card and protects only against mistakes. [Destinations](/docs/backups/#destinations)
- Restore is one command with the container stopped; try it once on a second card so you know it works. [Restore](/docs/backups/#restore)
- Everyone can also download their own data as one file at any time. [Download everything](/how-to/download-everything/)

## Good to know

- Memory: OpenTodo idles at about 20 MB. A large JSON import peaks higher during its preview; on a 1 GB Pi keep the default import file limit. [Memory](/docs/import/#memory)
- Updates are a pull and a restart, like anywhere else. [Updating](/docs/self-hosting/docker/#updating)
- The container's health check works without curl or a shell, so Docker's own status is reliable. [Health](/docs/self-hosting/docker/#health)
- If the Pi is only reachable at home, the apps on your phones keep working outside: they hold a full copy and sync when you are back. [Offline and sync](/docs/offline-and-sync/)
