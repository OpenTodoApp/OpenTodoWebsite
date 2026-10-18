## MODIFIED Requirements

### Requirement: Blog in navigation and on the home page
The main navigation and the footer of every page SHALL link to the blog once at least one post is published, and the home page SHALL show the latest published post (its category, title and date, linking to the post) with a link to the blog, directly above the closing section. Both SHALL work at 360 px wide without JavaScript.

#### Scenario: First post published
- **WHEN** the first post is published
- **THEN** every page's main navigation and footer offer Blog, including the phone menu without JavaScript, and the home page shows the post

#### Scenario: A newer post
- **WHEN** a newer post is published and the site is rebuilt
- **THEN** the home page shows the newer post in place of the previous one, with no edit to the home page
