## MODIFIED Requirements

### Requirement: What's new and feed
The site SHALL offer an RSS feed listing new guides, templates, essays, posts and every release of the pinned bundle's changelog, each release linking its release post when one is published and the app's release notes otherwise. Release notes SHALL NOT be republished as separate pages; the old "What's new" addresses SHALL redirect to the release post or the release notes. Neither the feed nor the posts SHALL describe features that are not in a released version.

#### Scenario: New release
- **WHEN** the pinned bundle moves to a new release
- **THEN** the feed lists it, linking its release post once that is published and its release notes until then
