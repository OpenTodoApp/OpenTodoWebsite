# Proposal: website-get-started

## Why

The ways to get OpenTodo are spread over the home page's "Three ways in", `/install/`, `/self-host/`, the server planner, the switch pages and the capture page, and the header's main action had nowhere of its own to go. The redesign gives "Get started", the header's primary button, one page that answers "how do I start?" in full.

## What Changes

- **New `/start/` page:**
  - the three ways in (demo, join a server, run your own);
  - "Run your own server": every deploy target whose self-hosting guide the pinned bundle has, the `docker run` line from the manifest, and links to the planner and Self-host;
  - "On your devices": each install page, the capture page and the command line;
  - "Moving from another app": each switch guide and the import formats.
- **Get started button:** `NAV.start` points to `/start/`, so the header's primary button, the phone menu and the footer open it.
- **Existing pages stay:** `/install/`, `/self-host/`, `/self-host/plan/`, `/capture/` and `/switch/`. `/start/` gathers them.

**Out of scope**
- The home page's "Three ways in" (`website-home-v2`).
- Any redirect.

**Pages affected:** new `/start/`, plus the Get started links in the header and footer.

**New build dependency:** none.
