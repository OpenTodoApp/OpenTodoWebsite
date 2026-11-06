## ADDED Requirements

### Requirement: Press kit page
The site SHALL have a Press kit page at `/press-kit/`, linked from the footer, whose first section offers OpenTodo's brand assets for download.
- **Each asset:** a preview on a background it is meant for, its intended use, and one download link per file format and size.
- **Also shown:** the usage rules and the licence.
- **Source:** the files SHALL be the pinned bundle's `brand/` files, served by the site under `/brand/`, so the page always offers the logo of the release the site describes. With a bundle that carries the brand kit (`brand/kit/`), the page SHALL offer every kit file. With an older bundle, it SHALL offer the brand files that bundle has, and no link SHALL point to a file the bundle lacks.
- **Layout:** at 360 px the previews stack in one column, and every preview and link works without JavaScript.

#### Scenario: A journalist needs the logo for a dark slide
- **WHEN** someone opens the press kit on a site pinned to a release with the brand kit
- **THEN** they find the lockup on dark with an SVG link and two PNG sizes, each link downloads that file from the release's bundle, and the page names the use and the licence

#### Scenario: Pinned to a release without the kit
- **WHEN** the site is pinned to v0.22.0, whose bundle has no `brand/kit/`
- **THEN** the page offers that release's colour mark, mono mark, wordmark and 512 px icon, and the link check finds no broken link

#### Scenario: Phone without JavaScript
- **WHEN** the page is opened at 360 px with JavaScript turned off
- **THEN** every preview is visible in one column and every download link works
