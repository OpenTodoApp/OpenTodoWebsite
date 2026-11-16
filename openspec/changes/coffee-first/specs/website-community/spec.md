## ADDED Requirements

### Requirement: Buy Me a Coffee first
Wherever the site offers both Buy Me a Coffee and GitHub Sponsors, Buy Me a Coffee SHALL come first: in both button rows of the support page, in the footer's Community row, and in the support line at the end of blog posts and blog listings. The wording and the addresses of both SHALL stay as they are, from the site-wide constants.

#### Scenario: Support page buttons
- **WHEN** a visitor opens `/support/` at 360 px wide without JavaScript
- **THEN** each button row shows "Buy me a coffee" before "Sponsor on GitHub"

#### Scenario: Footer and blog posts
- **WHEN** a visitor reaches the footer of any page, or the end of a blog post
- **THEN** the Buy me a coffee link comes before the GitHub Sponsors link
