# Proposal

## Why

The owner asked to remove the Compare section (PLAN-1.0 Track C). Next to Features and the switch guides it was a second place answering "should I leave my app", its tables needed re-checking every 180 days, and it pulled the site toward the competitors' framing instead of OpenTodo's own.

## What Changes

- `/vs/` and `/vs/linear|things|todoist/` are no longer built; nginx answers them with permanent redirects: `/vs/` to `/features/`, each comparison to that app's switch guide.
- The old `/cost` and `/faq` redirects (and their language variants, now including `zh`) lead to `/self-host/plan/` and `/learn/` instead of Compare.
- The `compare` collection, `CompareTable`, `faq.ts`, `compareSchema` and their tests go; switch guides lose their "OpenTodo vs" button and `compare` field; content links to `/vs/` are rewritten.
- AGENTS.md and `openspec/config.yaml` describe the honesty rule for switch guides instead of comparisons.

Pages affected: `/vs/**` (removed), switch guides, the home page's "What it costs" link, one toolkit page. Out of scope: switch guide content beyond the removed links. No new build dependency.

## Capabilities

### Modified Capabilities

- `marketing-website`: the comparison requirements are removed; requirements that used a comparison page as their example now use a switch guide.
- `website-platform`: typed content and structured data no longer mention comparisons; moved pages gain the Compare redirects.
- `website-languages`: the old translated cost and FAQ addresses redirect to the server plan and Learn.

## Impact

`src/pages/vs/`, `src/content/compare/`, `src/components/CompareTable.astro`, `src/lib/faq.ts`, `src/content/schemas.mjs`, `src/content.config.ts`, `scripts/check-content.mjs`, `scripts/test/schemas.test.mjs`, `tests/islands.spec.ts`, `nginx.conf`, `src/pages/switch/[slug].astro`, switch and toolkit content, AGENTS.md, README.md, `openspec/config.yaml`.
