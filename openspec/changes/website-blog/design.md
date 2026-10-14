# Design

## Context

- The site is Astro 7 with static output (`website-platform`). Content collections with Zod schemas live in `src/content/schemas.mjs`; rules that must fail the build are schema refinements, and the claim-and-source lint (`scripts/check-content.mjs`) runs before every build over guides, toolkit, essays and templates.
- `website-content-hub` added essays (`src/content/essays/`, two entries), generated "What's new" pages from the bundle's `changelog.json`, and `/feed.xml` with `@astrojs/rss`.
- The header navigation already holds seven links plus "Try the demo" (and "Star on GitHub" from 1180 px). Below 768 px it collapses into a `<details>` menu.
- Code blocks in content are rendered by Astro's default Markdown processor. Highlighting must not need client JavaScript.
- Specs: `specs/website-blog/spec.md`. Motivation: `proposal.md`.

## Goals / Non-Goals

**Goals:**
- Writing a post is adding one folder with a Markdown file and its images; everything else (index, categories, feeds, home strip, related posts) follows.
- The truthfulness rules are checked by the build, like the comparisons' dates and sources.
- Blog pages ship no JavaScript of their own.

**Non-Goals:**
- Tags. Four categories are enough at this volume; tags can come later without changing URLs.
- A separate visual identity for the blog. It uses the site's tokens, type and components.

## Decisions

### D1. One folder per post, slug from the folder
`src/content/blog/<slug>/index.md`, with the post's images next to it. The slug is the folder name and the URL is `/blog/<slug>/`, with no date in it, so a post can be corrected or re-dated without breaking links.

Front matter:
- `title`, `summary`, `publishedAt`, optional `updatedAt`
- `author` (a key in the authors data, D2), `category` (`news` | `releases` | `development` | `ownership`)
- optional `cover` (Astro `image()`) with a required `coverAlt` when present
- `release` (required for, and only allowed on, `releases`)
- `inDevelopment` (default false) and optional `shippedIn`
- `draft` (default false)

The schema goes in `src/content/schemas.mjs` as `blogSchema({ releaseExists })`, so the existing unit tests can exercise it without Astro. `release` and `shippedIn` must be versions present in the bundle's changelog; `releaseExists` is built from `src/lib/bundle.ts`. Slugs `page`, `category` and `feed.xml` are reserved and refused, since they collide with routes.

Alternatives considered:
- **Flat files with images in `src/assets/blog/`:** two places to edit per post, and image paths drift.
- **Dates in URLs:** ages links visibly and breaks them when a date changes.

### D2. Authors as a small data collection
`src/content/authors.json` maps a key to `{ name, bio, url }`. A post's `author` must be a key in it (a schema reference), so a typo fails the build. There are no avatars yet; that avoids an image per author for a single-author blog.

### D3. Routes
| Route | Page |
| --- | --- |
| `/blog/` and `/blog/page/<n>/` | Index: on page 1 the newest post is featured as a large card; then a grid of twelve per page. Uses Astro's `paginate()`. |
| `/blog/category/<category>/` and `…/page/<n>/` | One category, same layout without the featured card. |
| `/blog/<slug>/` | Post |
| `/blog/feed.xml` | Posts-only RSS 2.0 |

Published means `draft` is false and `publishedAt` is on or before the build date. One helper, `publishedPosts()` in `src/lib/blog.ts`, applies this, and every route, the home strip and both feeds use it, so the rule lives in one place.

### D4. Look and reading experience
- **Index:** the featured card has a cover (or a token-coloured panel with the category's icon from the sprite when there's no cover), a large title and the summary. Grid cards show the cover thumbnail or panel, category, title, summary, date and reading time. One column on phones, two from 640 px, three from 1024 px.
- **Post:**
  - A 68-character reading measure, 18 px body text, and generous line height.
  - Heading anchors, figures with captions, styled blockquotes and tables.
  - A server-rendered "On this page" list for posts with four or more second-level headings.
  - Reading time is the word count divided by 220, rounded up.
- **Code:** highlighted at build time by Astro's built-in highlighter, with light and dark themes switched by the colour-scheme media query. The output is inline-styled spans, no client JavaScript. If the default processor in Astro 7 doesn't highlight, code blocks keep the current unhighlighted styling. The task verifies which.
- **In-development notice:** a callout using the warning tokens, with an icon from the sprite and the publish date ("at the time of writing"). With `shippedIn` set it switches to a success callout: "Available since 0.4.0", linking to `/whats-new/0.4.0/`.
- **Social preview:** `og:image` is the cover rendered at 1200×630 through `getImage()`, otherwise the site default. `Base.astro` gains an optional `image` prop.

### D5. Claim lint covers the blog
`scripts/check-content.mjs` adds `blog` to its collections and reads each post's front matter (`yaml` is already a dependency). For posts with `inDevelopment: true` the feature-keyword rule is skipped, because they describe things not in the docs yet, but every `/docs/` link must still resolve. Internal links to `/blog/<slug>/` are added to the known pages.

### D6. Feeds
`/feed.xml` gains published posts (using `publishedAt`) and drops the essays, which become posts. The new `/blog/feed.xml` uses the same item mapping, from one function in `src/lib/blog.ts`. Both carry `<link rel="alternate">` tags: the site-wide feed in the layout, the blog feed on blog pages.

### D7. Navigation, footer and home page
- **Navigation:** "Blog" goes after "Guides", appearing once a post is published, mirroring how Templates and Guides appear. The footer gets "Blog" and loses "Essays".
- **Header width:** eight links plus the demo button must fit on one line from 768 px. The header already scales link padding; the task measures it at 768, 1024 and 1280 px, and raises the "Star on GitHub" button's breakpoint if needed. The browser checks gain 768 px for the horizontal-scroll test so a future link can't silently break it.
- **Home page:** a "From the blog" section with the three latest posts, between the "How it works" section and the closing calls to action. It is not rendered when no post is published.

### D8. Essays become Ownership posts
The two essays move to `src/content/blog/<same-slug>/index.md` with `category: ownership` and `publishedAt` set to their current `lastReviewed`. The `essays` collection, its pages, its feed items and its links (footer, the guides index) are removed.

nginx gets two redirects:

```nginx
location = /essays/ { return 301 /blog/category/ownership/; }
location ~ ^/essays/([a-z0-9-]+)/?$ { return 301 /blog/$1/; }
```

The `website-content-hub` spec keeps "a few essays" as a requirement. When that change is archived, its essay wording must point to the blog; that edit is part of archiving it, not of this change.

### D9. Launch posts
Three drafts, each with the claim lint passing:
- **News:** "Welcome to the OpenTodo blog": what the blog will cover and how to follow it (RSS).
- **Releases:** "OpenTodo 0.3.0: bring your own AI" (`release: 0.3.0`), built from the 0.3.0 changelog.
- **Development:** "How OpenTodo is built: specs first, then AI agents", about OpenSpec changes, Claude Code implementing from specs, CI and review.

The maintainer reviews and edits all three before merge.

### Effect on build time and download size
- **Build:** a handful of extra pages, plus image variants for covers (AVIF and WebP at a few widths). First builds grow by a few seconds per cover, and the image cache makes later builds near-instant. Highlighting adds well under a second at this volume.
- **Visitors:** blog pages load no JavaScript beyond the existing analytics script. Covers are responsive and lazy-loaded except the featured one. Highlighted code adds a few KB of inline markup per post with code. The home page grows by three cards, about 2 KB of HTML plus lazy-loaded thumbnails.

## Risks / Trade-offs

- **[Navigation crowding at 768–1024 px]** → Measured in a task, with a 768 px horizontal-scroll check added to the browser tests. If it doesn't fit, the menu breakpoint question goes back to the maintainer, since `website-platform` specifies 768 px.
- **[Development posts go stale once the work ships]** → `shippedIn` flips the notice. The release post for that version should list the development posts it fulfils.
- **[Release posts written ahead of the release fail the build]** → Intended. Draft them with `draft: true` and publish in the pull request that bumps `bundle.json`.
- **[Breaking essay URLs]** → Permanent redirects in nginx. The link check covers internal links, and redirects are tested in the Docker smoke step.
- **[Agent-written posts sound generic]** → The voice guide gains a blog section (first person from the maintainer, concrete, dated), and nothing merges without review.

## Migration Plan

1. Add the collection, pages and checks with the three launch posts as drafts; verify on the pull request preview.
2. Move the essays and add the redirects in the same pull request, so no URL is ever missing.
3. Remove `draft` from the launch posts after the maintainer's review, then merge.

Rollback: revert the merge. The essays come back with their old URLs, since the redirects go with the revert.

## Open Questions

- The author bio wording and link (the maintainer's choice; it's plain data in `authors.json`).
