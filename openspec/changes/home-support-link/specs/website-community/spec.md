## MODIFIED Requirements

### Requirement: Ways to the support page
Every page SHALL link to `/support/` from the footer's Project group, and the footer's Community row SHALL link the GitHub repository (Star on GitHub), GitHub Sponsors, Buy me a coffee and Discord as plain text links. The header SHALL carry no support pill or button. The closing call to action of blog posts and blog listings SHALL say that OpenTodo is free and always will be, in one line of text links to the star, Sponsors, Buy me a coffee and `/support/`; the home page's closing line (the latest posts, the star) SHALL end with a text link "Support OpenTodo", in the page's language, leading to `/support/`; other content pages SHALL NOT repeat the ask. The About page's licence section SHALL link to `/support/`, and the Support page SHALL say that both ways to give take a one-off amount or a monthly membership. The footer SHALL fit without sideways scrolling from 360 px.

#### Scenario: Navigation on a phone
- **WHEN** a visitor opens any page at 360 px wide without JavaScript and opens the footer's Project group
- **THEN** it lists "Support OpenTodo", leading to `/support/`, and the Community row shows the star, sponsor, coffee and Discord links

#### Scenario: End of a guide
- **WHEN** a visitor reaches the end of a guide, and then the end of a blog post
- **THEN** the guide ends with one action and no support line, and the post ends with the support line linking `/support/`

#### Scenario: End of the home page
- **WHEN** a visitor reaches the end of the home page, in English or in German, at 360 px wide without JavaScript
- **THEN** the line under the latest posts links the blog, the star and "Support OpenTodo" ("OpenTodo unterstützen" in German), leading to `/support/`, and no other part of the page asks for support
