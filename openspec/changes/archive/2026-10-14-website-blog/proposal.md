# Proposal

## Why

The maintainer wants one place to tell the OpenTodo story as it happens: news, what a release brings, and how the app is built. Today there is nowhere for that. Release notes are generated pages (`/whats-new/<version>`) that list changes without explaining them, the two essays sit in their own small section, and announcements end up only on Reddit or in GitHub release text, where they are lost a week later. A blog gives promotion a home that the site owns: every Reddit post, newsletter mention and Hacker News launch can link to a post that stays, ranks in search and feeds RSS readers.

## What Changes

- **A blog at `/blog/`:** a modern index (the latest post featured, then a grid of cards), one page per post, category pages and pagination. It is calm and readable on a phone and fully readable without JavaScript.
- **Posts as content entries** in a new `blog` collection, written in Markdown with checked front matter: title, summary, publish date, optional update date, author, category, optional cover image, optional release version, and a draft flag.
- **Four categories** that match what the maintainer wants to write about:
  - **News:** announcements, milestones, the project in the world.
  - **Releases:** what a release brings and why, linking to its generated "What's new" page.
  - **Development:** how OpenTodo is built: specs, design decisions, AI-assisted development, things in progress.
  - **Ownership:** the essays about owning your data. The two existing essays move here.
- **Truthfulness rules, enforced by the build:**
  - A release post must name a version that is in the pinned bundle's changelog.
  - A post that discusses work not yet released must say so, and every page of it shows a visible "in development" notice.
  - Claims about what OpenTodo can do link to the docs, as for guides (the same claim-and-source check).
- **Discovery:** "Blog" in the main navigation and footer, a "From the blog" strip on the home page with the three latest posts, posts in the site-wide `/feed.xml`, and a blog-only `/blog/feed.xml`.
- **Post pages:** reading time, author with a short bio, previous and next post, related posts from the same category, the closing calls to action, and the cover image as the social preview image.
- **Three launch posts**, drafted for the maintainer's review: an introduction to the blog (News), OpenTodo 0.3.0 (Releases) and how OpenTodo is built from specs with AI coding agents (Development).
- **Essays move:** `/essays/` and `/essays/<slug>/` redirect permanently to the blog, and the Essays section and its navigation links are removed. **BREAKING** for anyone who bookmarked an essay URL; the redirects keep those links working.

## Out of scope

- Comments, likes, view counters and any interactive social features.
- Email newsletters and subscriber lists. RSS is the subscription channel.
- Search across posts. Category pages and the feed cover browsing at this volume.
- Guest authors or a CMS. Posts arrive as pull requests like all other content.
- Generated social images: a post without a cover uses the site's default image. A generator would add a build dependency for little gain at this volume.
- Changes to the app or to the generated "What's new" pages.

**Pages and sections affected:** new `/blog/**` pages; the main navigation, footer and home page (a new strip); `/feed.xml`; `/essays/**`, which become redirects; and nginx configuration for those redirects.

## Capabilities

### New Capabilities

- `website-blog`: the blog's pages, post model, categories, rules that keep posts truthful (release posts, work in progress, sourced claims), discovery (navigation, home strip, feeds) and the move of the essays into it.

### Modified Capabilities

None in `openspec/specs/` (no capability has been archived yet). The in-flight change `website-content-hub` specifies essays under "Guides, toolkit and essays"; when both changes are archived, that requirement's essay part is superseded by this change. The design records the coordination.

## Impact

- **Website:** a new `blog` collection and schema in `src/content/`, pages under `src/pages/blog/`, post and card components, a home page strip, navigation and footer links, feed changes, and nginx redirects for `/essays/`.
- **Content:** `src/content/essays/*.md` move to `src/content/blog/`. Three new draft posts. `content/VOICE.md` gains a short section on blog posts, and `content/BACKLOG.md` gains blog topics.
- **Checks:** blog pages are covered by the existing link, emoji, third-party-script, accessibility and no-JavaScript checks automatically; new schema and claim-lint rules for posts.
- **Build dependencies:** none. Astro's content collections, image pipeline, built-in code highlighting and `@astrojs/rss` (already a dependency) cover everything.
