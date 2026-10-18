## MODIFIED Requirements

### Requirement: Blog index
The site SHALL have a blog index at `/blog/` that lists published posts newest first, with the latest post featured and every post shown with its title, summary, category, publish date and reading time. A post with a cover image SHALL show it on its card; a post without one SHALL show a typographic cover made from its title on its category's tint, not an icon or a placeholder. It SHALL be readable and navigable at 360 px wide and without JavaScript, with no horizontal scrolling.

#### Scenario: Reader opens the blog
- **WHEN** a visitor opens `/blog/`
- **THEN** the newest published post appears first and featured, followed by the others in order of publish date

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens `/blog/` on a 360 px wide screen with JavaScript disabled
- **THEN** every post card shows its title, summary, category and date, links to its post, and the page does not scroll sideways

#### Scenario: Post without a cover
- **WHEN** a published post has no `cover` in its front matter
- **THEN** its card shows the post title set as the cover on the category's tint, readable in light and dark at 4.5:1 contrast, and the card's image area contains no icon
