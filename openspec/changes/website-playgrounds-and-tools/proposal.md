# Proposal

## Why

The sync playground on the self-hosting page proves the hardest idea in the product in thirty seconds. The two features people who switch care about most, quick add and filters, are only described. And the person who will run the server reads three install methods and a table of variables, then assembles a compose file by hand. Three small interactive tools answer "what does it understand?", "what would match?" and "what exactly do I run?" in the browser, with nothing to install and nothing sent anywhere.

## What Changes

- **Quick-add playground (`/playground/#quick-add`).** Type a line, see the chips and the title that would be saved. A miniature of the app's parser following the quick add reference (English vocabulary: dates and times, `#project` against four sample projects, `@label`, `p1` to `p4`, `+30m`, double quotes). Examples to click. Reads without JavaScript as a table of examples.
- **Filter playground (`/playground/#filters`).** Type a query, see which of fourteen sample tasks match. A miniature of the filter language (`@`, `#`, `##`, `p1` to `p4`, `today`, `tomorrow`, `overdue`, `no date`, `no project`, `due <= 7 days`, `due before friday`, `search:`, `completed`, `&`, `|`, `!`, brackets), with the app's rule that completed tasks appear only when the query names them, and an error line that keeps the previous results. Reads without JavaScript as the sample list.
- **Server planner (`/self-host/plan/`).** Where it runs, how phones reach it, who uses it, where backups go, optional features, the domain. It answers "is that enough?" from the footprint in the docs, builds the checklist in order with a docs link per step, writes the `docker-compose.yml` with the documented variables (base URL, trusted proxies, sign-up, CalDAV, MCP, push, single sign-on, email to task with a Docker secret, backup presets) and the Caddy snippet, and offers a copy button. Nothing is stored or sent. Without JavaScript it shows the most common setup.
- **Links:** the home page's features section, the self-hosting page, the cost page, the help page, the first-server toolkit piece and the footer.

## Out of scope

- Using the app's real parser on the site: the bundle does not ship it. The miniatures say so and point at the demo for the real thing. If a later bundle ships the parser as a module, the playgrounds switch to it.
- A per-user capacity calculator: the docs give one footprint and one "plenty" threshold, not per-user figures, and the voice guide forbids invented numbers. The planner answers with the documented facts.
- Generating Kubernetes, Nomad or systemd units.

Pages affected: two new pages, the home, self-hosting, cost and help pages, the footer, one toolkit piece. No new build dependency.

## Capabilities

### Modified Capabilities

- `marketing-website`: adds the quick-add and filter playgrounds and the server planner.

## Impact

- **Website:** `src/components/QuickAddPlayground.astro`, `FilterPlayground.astro`, `ServerPlanner.astro`, `src/pages/playground.astro`, `src/pages/self-host/plan.astro`, styles, links, `scripts/check-content.mjs` (routes), three island tests.
- **Visitors:** the playground page loads about 9 KB of script (two islands), the planner page about 5 KB; no other page loads them. No image.
- **Dependencies:** none.
