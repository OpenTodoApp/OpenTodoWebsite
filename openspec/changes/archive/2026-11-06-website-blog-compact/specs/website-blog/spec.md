# Spec Delta

## MODIFIED Requirements

### Requirement: Blog index
The site SHALL have a blog index at `/blog/` that lists published posts newest first, one row per post with its publish date, title, a summary of at most two lines and its category (or "In development"), without cover images. It SHALL be readable and navigable at 360 px wide and without JavaScript, with no horizontal scrolling.

#### Scenario: Reader opens the blog
- **WHEN** a visitor opens `/blog/`
- **THEN** the newest published post is the first row, followed by the others in order of publish date

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens `/blog/` on a 360 px wide screen with JavaScript disabled
- **THEN** every row shows its date, category, title and summary, links to its post, and the page does not scroll sideways

### Requirement: Blog pagination
The blog index and each category page SHALL show at most twenty posts per page and link to the previous and next pages with plain links that work without JavaScript.

#### Scenario: More posts than fit one page
- **WHEN** there are twenty-three published posts
- **THEN** `/blog/` shows twenty and links to `/blog/page/2/`, which shows the remaining three and links back

### Requirement: Post page
Each published post SHALL have its own page at `/blog/<slug>/` showing its category, publish date and reading time on one line above its title, update date when set, author with a short bio, category, cover image when set, the full text, links to the previous and next posts, up to three related posts from the same category as rows, and a closing call to action that offers the RSS feed and one line of ways to support the project. It SHALL read fully at 360 px wide without JavaScript.

#### Scenario: Reading a post on a phone without JavaScript
- **WHEN** a visitor opens a post on a 360 px wide screen with JavaScript disabled
- **THEN** the full text, images, code samples and links are readable and work, and the page does not scroll sideways

#### Scenario: Updated post
- **WHEN** a post has an update date
- **THEN** its page shows both the publish date and the update date
