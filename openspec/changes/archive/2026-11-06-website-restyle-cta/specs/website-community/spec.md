# Spec Delta

## MODIFIED Requirements

### Requirement: Community invitation on the home page and at the end of content pages
The home page in every language SHALL have a community section, placed after the self-hosting section and before the blog and the closing call to action, that invites visitors to join the Discord server in a friendly, first-person-plural voice (what they will find there: questions answered, set-ups shared, ideas heard by the maintainer) and shows the Discord button. The Support page and the Learn page's troubleshooting section SHALL show the Discord button; the closing call to action of content pages SHALL NOT, since every footer links Discord. Both SHALL read at 360 px wide without JavaScript, and their text SHALL make no claim about the app that needs a docs link.

#### Scenario: English home page
- **WHEN** a visitor scrolls the home page past "How it works"
- **THEN** a section titled "Come and say hello." invites them to the Discord server and shows the Discord button

#### Scenario: German home page
- **WHEN** a visitor opens the German home page
- **THEN** the same section appears with German text and a German button label

#### Scenario: End of a guide
- **WHEN** a visitor reaches the end of a guide
- **THEN** the closing call to action shows one action and no Discord or coffee button, and the footer links Discord

### Requirement: Ways to the support page
Every page SHALL link to `/support/` from the footer's Project group, and the footer's Community row SHALL link the GitHub repository (Star on GitHub), GitHub Sponsors, Buy me a coffee and Discord as plain text links. The header SHALL carry no support pill or button. The closing call to action of blog posts and blog listings SHALL say that OpenTodo is free and always will be, in one line of text links to the star, Sponsors, Buy me a coffee and `/support/`; other content pages SHALL NOT repeat the ask. The About page's licence section SHALL link to `/support/`, and the Support page SHALL say that both ways to give take a one-off amount or a monthly membership. The footer SHALL fit without sideways scrolling from 360 px.

#### Scenario: Navigation on a phone
- **WHEN** a visitor opens any page at 360 px wide without JavaScript and opens the footer's Project group
- **THEN** it lists "Support OpenTodo", leading to `/support/`, and the Community row shows the star, sponsor, coffee and Discord links

#### Scenario: End of a guide
- **WHEN** a visitor reaches the end of a guide, and then the end of a blog post
- **THEN** the guide ends with one action and no support line, and the post ends with the support line linking `/support/`
