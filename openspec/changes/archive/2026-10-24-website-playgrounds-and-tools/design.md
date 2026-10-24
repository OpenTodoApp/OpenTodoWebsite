# Design

## Context

- **Builds on** the island pattern of `website-platform` and `website-switcher-pages` (`HeroDemo`, `SyncPlayground`, `InstallTabs`: markup at build time, a script that enhances it, a no-JS fallback), and the self-hosting docs of the pinned release (`/docs/quick-add/`, `/docs/filters/`, `/docs/self-hosting/docker/`, `/docs/self-hosting/coolify/#environment-variables`, `/docs/backups/#environment-presets`, `/docs/self-hosting/sso/`, `/docs/email/`).
- **Constraint:** released facts only. The playgrounds implement a documented subset and say so; the planner emits only documented variables and the documented image line.
- **Specs:** `specs/marketing-website/spec.md`.

## Decisions

### D1. Quick-add miniature in the browser
A small parser in the island's script follows the reference in order: quoted text is protected first, then `#project` (exact or unique prefix against four sample projects, as the docs describe), `@label`, `p1` to `p4`, `+duration`, then the first date phrase (today, tomorrow, weekdays with "next" semantics on Monday-start weeks, "in N days/weeks/months", "next week/month", "3 Feb", "Feb 3", ISO and day/month numeric dates) and the first time (`3pm`, `at 9`, `15:00`, noon, midnight, "in 3 hours"), with "on/by/due" removed before a date and a lone time meaning today. Chips render the resolved date in the visitor's locale. English only, four sample projects: the page says the app does six languages and knows the visitor's real projects. Not a copy of the app's code; a readable subset that the docs vouch for.

### D2. Filter miniature over sample data
A tokeniser and a recursive-descent parser implement the documented grammar with the documented precedence (`!` binds tightest, then `&`, then `|`, brackets group; adjacent terms are an implicit `&`). Fourteen sample tasks with due offsets relative to today, projects (one nested, to show `##`), labels and priorities; two are completed, and completed tasks are shown only when the query names them, as in the app. A bad query shows an error line and keeps the previous results, as the app does. The sample list is rendered at build time (`define:vars` passes it to the script), so the page reads without JavaScript.

### D3. Server planner from documented variables
A form with radio groups and checkboxes; every change re-renders a verdict, a checklist, the compose file and the proxy snippet. The verdict quotes the docs' footprint and "plenty" threshold rather than computing a number. The compose file uses the release line from the manifest (`ghcr.io/pixari/opentodo:<major.minor>`, as the Coolify docs recommend over `latest`), the named volume (a bind mount on a Pi, with the ownership step in the checklist), the documented environment variables, and a Docker secret for the IMAP password; secrets are placeholders and the page recommends the `_FILE` variants. The container port is published only on a LAN-only or Coolify setup, matching the proxy guidance. A copy button appears only when the clipboard API exists. Without JavaScript the page shows the most common setup's file and checklist.

## Effect on build and download
- Build: two pages; nothing else.
- Download: the playground page ships about 9 KB of script, the planner about 5 KB, both only on their page; no image. The sample list and examples are HTML the page would carry anyway.

## Risks / Trade-offs
- A miniature can disagree with the app on an edge case. Each playground says it is a miniature and links the reference and the demo; the island tests pin the documented examples.
- The planner's placeholders could be deployed as-is. The output marks every secret `change-me` and the checklist's first steps tell the reader to replace them.
