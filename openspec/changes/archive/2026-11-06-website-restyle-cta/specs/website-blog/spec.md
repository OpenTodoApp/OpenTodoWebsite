# Spec Delta

## MODIFIED Requirements

### Requirement: Post page
Each published post SHALL have its own page at `/blog/<slug>/` showing its title, publish date, update date when set, reading time, author with a short bio, category, cover image when set, the full text, links to the previous and next posts, up to three related posts from the same category, and a closing call to action that offers the RSS feed and one line of ways to support the project. It SHALL read fully at 360 px wide without JavaScript.

#### Scenario: Reading a post on a phone without JavaScript
- **WHEN** a visitor opens a post on a 360 px wide screen with JavaScript disabled
- **THEN** the full text, images, code samples and links are readable and work, and the page does not scroll sideways

#### Scenario: Updated post
- **WHEN** a post has an update date
- **THEN** its page shows both the publish date and the update date
