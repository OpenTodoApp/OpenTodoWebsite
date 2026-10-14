# website-blog Specification

## Purpose

Defines the OpenTodo blog: where news, release stories, development write-ups and essays are published on the website, how posts are organised and found, and the rules that keep every post truthful about what the released app can do.

## Requirements

### Requirement: Blog index
The site SHALL have a blog index at `/blog/` that lists published posts newest first, with the latest post featured and every post shown with its title, summary, category, publish date and reading time. It SHALL be readable and navigable at 360 px wide and without JavaScript, with no horizontal scrolling.

#### Scenario: Reader opens the blog
- **WHEN** a visitor opens `/blog/`
- **THEN** the newest published post appears first and featured, followed by the others in order of publish date

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens `/blog/` on a 360 px wide screen with JavaScript disabled
- **THEN** every post card shows its title, summary, category and date, links to its post, and the page does not scroll sideways

### Requirement: Blog pagination
The blog index and each category page SHALL show at most twelve posts per page and link to the previous and next pages with plain links that work without JavaScript.

#### Scenario: More posts than fit one page
- **WHEN** there are fifteen published posts
- **THEN** `/blog/` shows twelve and links to `/blog/page/2/`, which shows the remaining three and links back

### Requirement: Post page
Each published post SHALL have its own page at `/blog/<slug>/` showing its title, publish date, update date when set, reading time, author with a short bio, category, cover image when set, the full text, links to the previous and next posts, up to three related posts from the same category, and the site's closing calls to action. It SHALL read fully at 360 px wide without JavaScript.

#### Scenario: Reading a post on a phone without JavaScript
- **WHEN** a visitor opens a post on a 360 px wide screen with JavaScript disabled
- **THEN** the full text, images, code samples and links are readable and work, and the page does not scroll sideways

#### Scenario: Updated post
- **WHEN** a post has an update date
- **THEN** its page shows both the publish date and the update date

### Requirement: Categories
Every post SHALL belong to exactly one category: News, Releases, Development or Ownership. Each category SHALL have its own page listing its posts, linked from the blog index and from every post of that category, readable without JavaScript.

#### Scenario: Browsing a category
- **WHEN** a visitor selects the Development category
- **THEN** a page lists only Development posts, newest first

#### Scenario: Post without a valid category
- **WHEN** a post's category is missing or not one of the four
- **THEN** the build fails and names the post and the field

### Requirement: Checked post metadata
A post SHALL have a title, a summary, a publish date, an author known to the site and a category, checked at build time. A missing or malformed field SHALL fail the build and name the post and the field. A post with a publish date in the future or marked as a draft SHALL NOT be published.

#### Scenario: Missing publish date
- **WHEN** a post has no publish date
- **THEN** the build fails and names the post and the missing field

#### Scenario: Draft post
- **WHEN** a post is marked as a draft
- **THEN** it has no page and does not appear on the index, category pages, home page or feeds

### Requirement: Release posts follow the pinned release
A post in the Releases category SHALL name a version that is present in the pinned bundle's changelog, and its page SHALL link to that version's "What's new" page. A release post naming a version that is not in the pinned bundle SHALL fail the build, so no post can announce a release the site does not describe.

#### Scenario: Announcing a released version
- **WHEN** a release post names version 0.3.0 and the pinned bundle's changelog contains 0.3.0
- **THEN** the post is published and links to `/whats-new/0.3.0/`

#### Scenario: Announcing a version too early
- **WHEN** a release post names version 0.4.0 and the pinned bundle's changelog does not contain it
- **THEN** the build fails and names the post and the version

### Requirement: Work in progress is marked
A post that discusses features not in the pinned release SHALL be marked as such, and its page SHALL show a visible notice near the top saying that the work described is in development and not yet in a release. The notice SHALL be visible without JavaScript.

#### Scenario: Development post about unreleased work
- **WHEN** a Development post is marked as covering unreleased work
- **THEN** its page shows the in-development notice above the text, and its card on the index carries an "In development" label

#### Scenario: The work ships later
- **WHEN** the post is later marked as shipped in a version present in the pinned bundle's changelog
- **THEN** the notice instead says the work is available since that version and links to its "What's new" page, and naming a version not in the bundle fails the build

### Requirement: Sourced claims
Every statement in a post about what the released OpenTodo can do SHALL link to a documentation page of the pinned bundle, and every link to the docs SHALL resolve in that bundle. A paragraph that mentions a feature without a docs link SHALL fail the content check, naming the post and the line, unless it is explicitly marked as making no claim or the post is marked as covering unreleased work.

#### Scenario: Claim without a source
- **WHEN** a News post says OpenTodo has end-to-end encryption without linking to the docs
- **THEN** the content check fails and names the post and the line

#### Scenario: Docs link that no longer exists
- **WHEN** the pinned bundle changes and a page a post links to is gone
- **THEN** the content check fails and names the post and the link

### Requirement: Blog in navigation and on the home page
The main navigation and the footer of every page SHALL link to the blog once at least one post is published, and the home page SHALL show the three latest published posts with a link to the blog. Both SHALL work at 360 px wide without JavaScript.

#### Scenario: First post published
- **WHEN** the first post is published
- **THEN** every page's main navigation and footer offer Blog, including the phone menu without JavaScript, and the home page shows the post

### Requirement: Feeds include the blog
The site-wide feed SHALL include every published post, and the blog SHALL also offer its own RSS 2.0 feed of posts only, newest first. Drafts and future-dated posts SHALL NOT appear in either feed.

#### Scenario: Subscribing to the blog
- **WHEN** a reader adds `/blog/feed.xml` to an RSS reader
- **THEN** it lists published posts with title, summary, link and publish date, newest first

### Requirement: Essays live in the blog
The essays SHALL be published as Ownership posts on the blog. Every former essay URL under `/essays/` SHALL redirect permanently to the corresponding post, and `/essays/` SHALL redirect to the Ownership category page.

#### Scenario: Old essay link
- **WHEN** a visitor opens `/essays/your-tasks-on-your-server/`
- **THEN** they are redirected permanently to `/blog/your-tasks-on-your-server/`

### Requirement: Posts are reviewed before publishing
Every post SHALL reach the site through a pull request approved by the maintainer, and drafts written by an agent SHALL follow the repository's voice guide. Nothing SHALL publish a post automatically.

#### Scenario: Agent-drafted post
- **WHEN** an agent drafts a post
- **THEN** it opens a pull request with the rendered preview, and the post is not published until the maintainer merges it
