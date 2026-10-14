# Tasks

## 1. Post model

- [ ] 1.1 Add `blogSchema({ releaseExists })` to `src/content/schemas.mjs` (D1): required title, summary, publishedAt, author, category; optional updatedAt, cover with required coverAlt, release only and always on `releases`, inDevelopment, shippedIn, draft; reserved slugs refused. Verify with unit tests in `scripts/test/schemas.test.mjs`: a post without `publishedAt` fails naming the field, a release post naming 0.4.0 fails while 0.3.0 passes, `shippedIn` with an unknown version fails, a cover without alt text fails, and the slug `page` is refused.
- [ ] 1.2 Add the `authors` data collection (`src/content/authors.json`, D2) and the `blog` collection to `src/content.config.ts` with `author` as a reference. Verify a test post with an unknown author key makes `npm run build` fail and names the post.
- [ ] 1.3 Add `src/lib/blog.ts` with `publishedPosts()` (drafts and future dates excluded), reading time, related posts and the feed item mapping (D3, D6). Verify with unit tests: a draft and a post dated tomorrow are excluded, reading time is the word count divided by 220 rounded up, and related posts share the category and exclude the post itself.

## 2. Pages

- [ ] 2.1 Build `/blog/` and `/blog/page/<n>/` with the featured first post and a card grid of twelve per page (D3, D4). Verify with sample posts: fifteen posts give two pages linked both ways, the newest is featured on page 1 only, and at 360 px without JavaScript every card shows title, summary, category and date with no sideways scroll (browser checks).
- [ ] 2.2 Build `/blog/category/<category>/` with pagination, and link each category from the index and from posts. Verify the Development page lists only Development posts newest first, and the no-JS browser check passes on it.
- [ ] 2.3 Build `/blog/<slug>/` (D4): title, dates (the update date when set), reading time, author and bio, category, cover, prose styles, "On this page" for four or more second-level headings, previous and next, three related posts, and the closing calls to action. Verify a post renders fully at 360 px without JavaScript, and the axe check passes on it in light and dark.
- [ ] 2.4 Add the in-development notice and the shipped notice (D4). Verify a post with `inDevelopment: true` shows the notice above the text without JavaScript and its card carries "In development", and with `shippedIn: 0.3.0` the notice says "Available since 0.3.0" and links to `/whats-new/0.3.0/`.
- [ ] 2.5 Check code highlighting in Astro 7's default Markdown processor and style code blocks for light and dark (D4). Verify a post with a shell and a JSON block renders without client JavaScript, the contrast check passes in both themes, and record in design.md whether highlighting is on.
- [ ] 2.6 Use the cover as `og:image` through an optional `image` prop on `Base.astro`, rendered at 1200×630, with the default image otherwise. Verify in the built HTML that a post with a cover has a 1200×630 `og:image` from `/_astro/` and one without has `/assets/og.png`.

## 3. Rules and discovery

- [ ] 3.1 Extend `scripts/check-content.mjs` to the blog (D5): the feature-keyword rule except for `inDevelopment` posts, docs links resolved for every post, and `/blog/<slug>/` added to the known pages. Verify with a unit test in `scripts/test/claim-lint.test.mjs`, and by running the check on a sample post that claims encryption without a link (it fails naming the post and line) and on the same post marked `inDevelopment` (it passes).
- [ ] 3.2 Add posts to `/feed.xml` and create `/blog/feed.xml` with `<link rel="alternate">` on blog pages (D6). Verify both parse as RSS 2.0, list published posts newest first, and contain no drafts or future-dated posts.
- [ ] 3.3 Add "Blog" to the main navigation after "Guides" once a post is published, and to the footer (D7). Measure the header at 768, 1024 and 1280 px, adjust spacing or the star button's breakpoint if needed, and add 768 px to the horizontal-scroll browser check. Verify the phone menu shows Blog without JavaScript and no width from 360 to 1280 px scrolls sideways.
- [ ] 3.4 Add the "From the blog" section to the home page with the three latest posts (D7). Verify it shows exactly three posts newest first and is absent from the build when no post is published.

## 4. Essays move to the blog

- [ ] 4.1 Move both essays to `src/content/blog/<slug>/index.md` as Ownership posts dated from their `lastReviewed`. Remove the `essays` collection, its pages, its feed items, the footer link and the guides index link (D8). Verify the build passes, `/blog/your-tasks-on-your-server/` renders, and no page links to `/essays/` (link check).
- [ ] 4.2 Add the two nginx redirects (D8) and a step in the Docker smoke test of `.github/workflows/checks.yml`. Verify locally with the container that `/essays/` answers 301 to `/blog/category/ownership/` and `/essays/your-tasks-on-your-server/` answers 301 to `/blog/your-tasks-on-your-server/`.

## 5. Launch content and guidance

- [ ] 5.1 Add a "Blog posts" section to `content/VOICE.md` (first person from the maintainer, concrete and dated, release posts only for released versions, development posts marked) and blog topics to `content/BACKLOG.md`. Verify the maintainer approves both in the pull request.
- [ ] 5.2 Write the three launch posts as drafts (D9): the welcome post (News), "OpenTodo 0.3.0: bring your own AI" (Releases, `release: 0.3.0`) and "How OpenTodo is built: specs first, then AI agents" (Development), with the author entry. Verify the claim lint and link check pass, and the maintainer approves each post in the preview before `draft` is removed.
- [ ] 5.3 Update `README.md` and `AGENTS.md` with how to write a post (folder, front matter, images, draft, release and development rules). Verify that following the README steps on a sample post produces a page at `/blog/<slug>/`.

## 6. Integration

- [ ] 6.1 Run all website checks: `npm test`, `npm run build`, `npm run check`, `npm run check:dist` and `npm run test:browser`. Also run `openspec validate --all --strict`. Verify every check passes and the pull request preview shows the blog at 360, 768 and 1280 px in light and dark.

## Workflow follow-up

- Archive the change after the maintainer has reviewed and merged it.
- When `website-content-hub` is archived, point its essay wording at the blog (see design D8).
