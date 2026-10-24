# marketing-website Specification

## Purpose
The marketing pages of the website: the home page, comparisons, switch pages, the cost and trust pages and the tools, which give a first-time visitor what they need to decide about OpenTodo and the ways to get it.

## Requirements

### Requirement: Paths to get OpenTodo on the home page
Directly below the hero, the home page SHALL show the three ways to get OpenTodo: trying the demo, joining a server someone else runs with an invitation link, and running one's own server. It SHALL state that OpenTodo is not offered as a hosted service. Each path SHALL link to the page or documentation of the pinned release that continues it. The block SHALL read and link without JavaScript at 360 px wide.

#### Scenario: A visitor who will not run a server
- **WHEN** a visitor reads the block on a 360 px wide phone without JavaScript
- **THEN** the second path tells them to open the invitation link they were sent and links to the documentation for installing the app from the browser

#### Scenario: Demo lifetime from the docs
- **WHEN** the demo card states how long a sandbox lives
- **THEN** the statement matches the demo documentation of the pinned release and links to it

#### Scenario: No hosted sign-up is implied
- **WHEN** a visitor looks for a "sign up" or "start for free" path
- **THEN** the block says OpenTodo is not offered as a hosted service and offers the demo instead

### Requirement: What it costs page
The site SHALL have a page at `/cost/` that explains the cost of using OpenTodo in words and without currency: the free licence named by the bundle manifest, the server footprint from the bundle manifest, who installs and updates, and how this compares with a plan per person. Every statement about the app SHALL link to its documentation page of the pinned release. The page SHALL be in the main navigation and SHALL read fully at 360 px wide without JavaScript.

#### Scenario: Figures follow the release
- **WHEN** a new bundle is pinned with a different image size or idle memory
- **THEN** the cost page shows the new figures without any edit in this repository

#### Scenario: No prices
- **WHEN** the page is scanned for currency symbols or amounts
- **THEN** none are found; costs are described in words

### Requirement: About and trust page
The site SHALL have a page at `/about/` that says who maintains OpenTodo, when it was first and last released, what the licence means in plain words, where the security policy and the specifications are, how long the demo keeps a sandbox, what this website collects, and how to leave with one's data. Maintainer details SHALL come from the authors file and release dates from the bundle's changelog. The page SHALL be in the footer and SHALL read fully at 360 px wide without JavaScript.

#### Scenario: Release history follows the bundle
- **WHEN** a bundle with a newer release is pinned
- **THEN** the about page names the newer release and its date without any edit in this repository

#### Scenario: App statements are sourced
- **WHEN** the about page states what the app does, for example that data can be exported
- **THEN** the statement links to the documentation page of the pinned release

#### Scenario: Security policy one click away
- **WHEN** a visitor on the about page wants to report a vulnerability
- **THEN** a link leads to the app's security policy

### Requirement: Grouped navigation
From 768 px wide, the header SHALL show Features, Compare, What it costs, a Learn menu, Self-host, Developers and Docs on one line. The Learn menu SHALL list Guides, Templates, Toolkit, Blog and What's new and SHALL open and close without JavaScript, by keyboard and pointer. Below 768 px the phone menu SHALL show the same links in two groups, Product and Learn, in one panel that opens without JavaScript.

#### Scenario: Learn menu without JavaScript on a laptop
- **WHEN** a visitor at 1280 px wide with JavaScript disabled activates Learn with the keyboard
- **THEN** the links Guides, Templates, Toolkit, Blog and What's new are shown and work

#### Scenario: Learn follows the content
- **WHEN** no guide or template is published, or no post is published
- **THEN** the Learn menu is absent, or respectively lists no Blog link, as the content and blog specifications require

#### Scenario: Phone menu groups
- **WHEN** a visitor on a 360 px wide screen without JavaScript opens the menu
- **THEN** the Product group shows Features, Compare, What it costs, Self-host, Developers and Docs, and the Learn group shows Guides, Templates, Toolkit, Blog and What's new

#### Scenario: Tablet width
- **WHEN** the header is shown at 768 px wide
- **THEN** every header item stays on one line and the page does not scroll sideways

### Requirement: Hero demo reads cleanly without styles
The counts in the hero demo's sidebar SHALL NOT be marked up as emphasis, so a text-only rendering or a screen reader reads "Inbox 3", not emphasised text.

#### Scenario: Text rendering
- **WHEN** the home page is rendered as plain text
- **THEN** the sidebar reads "Inbox 3" and "Today 4" without emphasis markers

### Requirement: Outcome-first home page
The home page SHALL open with the outcome for people who use a task app, not with implementation details. Above the first screenful it SHALL show a headline, a one-sentence promise and calls to action to try the demo, self-host and import, with the live demo of the app directly below. Architecture terms SHALL NOT appear above the fold.

#### Scenario: A Todoist user lands on the home page
- **WHEN** a visitor opens the home page on a 390 px wide phone
- **THEN** the first screenful shows the headline, the promise and the calls to action, and the live demo is reachable by scrolling once, without any mention of op logs, clocks or SQLite

### Requirement: Differentiators and proof on the home page
Below the hero, the home page SHALL present the differentiators (one server for a whole household, full offline use, optional end-to-end encryption, assistants with the user's own model key, leaving at any time), real screenshots, and a short teaser that links to the self-hosting page.

#### Scenario: Technical detail is one click away
- **WHEN** a visitor wants to know how sync works
- **THEN** a link from the home page leads to the self-hosting page with the interactive sync demo

### Requirement: Honest comparison pages
The site SHALL have one comparison page each for Todoist, Things and Linear. Each SHALL contain a feature table with rows where the competitor is ahead as well as rows where OpenTodo is ahead, the date the comparison was last checked, the cost difference in words without exact prices, and a link to the matching switch guide.

#### Scenario: A gap is shown
- **WHEN** a visitor reads the Things comparison
- **THEN** the table shows that Things has native Apple Watch and widget support and OpenTodo does not

#### Scenario: Stale comparison
- **WHEN** a comparison page's "checked on" date is older than six months at build time
- **THEN** the website check reports the page as stale

### Requirement: Comparisons are fair and sourced
Competitor names SHALL appear as text only, without their logos or visual identity, and every claim about OpenTodo on a comparison page SHALL link to the documentation page of the pinned release that supports it.

#### Scenario: Unsourced claim
- **WHEN** a comparison row claims an OpenTodo feature without a documentation link
- **THEN** the build fails and names the page and the row

### Requirement: Switch calls to action follow the importers
A "Switch from <app>" call to action SHALL appear only for apps whose named import format is released in the version the site describes, and SHALL lead to that app's switch guide. For other apps the site SHALL link to the general import guide instead and SHALL NOT promise a one-step switch.

#### Scenario: Importer not yet released
- **WHEN** the site is built while the Linear import format is not in the released version
- **THEN** the Linear comparison links to the general import guide and shows no "Switch from Linear" button

### Requirement: Audience pages
The site SHALL have a self-hosting page with the sync demo, footprint, container, Coolify and one-click install instructions, and a developers page with the API, command-line client, MCP, webhooks and open specifications. Both SHALL be linked from the main navigation of every page.

#### Scenario: Navigation
- **WHEN** a visitor is on any comparison page
- **THEN** the main navigation offers Features, Compare, Self-host, Developers and Docs

### Requirement: Consistent visual language
Every page SHALL use the app's colour palette and typeface, icons from one line-icon set, and real screenshots of the app shown in a consistent frame, in light and dark. Emoji and Unicode symbols SHALL NOT be used as icons. Every page SHALL follow the visitor's light or dark preference.

#### Scenario: No emoji icons
- **WHEN** the website check scans the built pages
- **THEN** it reports any emoji or symbol used as an icon in navigation, feature lists or buttons

#### Scenario: Dark preference
- **WHEN** a visitor whose system prefers dark opens a comparison page
- **THEN** the page and its screenshots are shown in their dark variants

### Requirement: Fast, private and accessible pages
Every page SHALL work without JavaScript for reading and navigation, SHALL load no third-party scripts other than the site's self-hosted analytics, and SHALL meet WCAG 2.2 AA in light and dark at widths from 360 px, without horizontal scrolling.

#### Scenario: Reading without scripts
- **WHEN** a visitor opens the Todoist comparison with JavaScript disabled
- **THEN** the full text, table and links are readable and work

#### Scenario: Accessibility check
- **WHEN** the website check runs an automated accessibility audit on every page in light and dark
- **THEN** it fails on any serious or critical violation

### Requirement: Quick-add playground
The site SHALL offer a quick-add playground that shows, for a typed line, the chips the app would show and the title it would save, following the quick add reference of the pinned release. It SHALL say it is a miniature in English and link the reference and the demo. Without JavaScript it SHALL show a table of examples.

#### Scenario: A full line
- **WHEN** a visitor types `Call Sam tomorrow at 3pm #work @call p2 +45m`
- **THEN** chips for the date and time, the project, the label, the priority and the estimate appear and the title reads "Call Sam"

#### Scenario: Quoted text
- **WHEN** a visitor types `Watch "Next Friday" tomorrow`
- **THEN** only the date chip appears and the title reads "Watch Next Friday"

### Requirement: Filter playground
The site SHALL offer a filter playground that applies a typed query to a sample list of tasks following the filter language of the pinned release, showing completed tasks only when the query names them and keeping the previous results on a query it cannot read. Without JavaScript it SHALL show the sample list.

#### Scenario: Overdue in the Inbox
- **WHEN** a visitor types `overdue & no project`
- **THEN** only the sample tasks that are overdue and have no project remain, with a count

#### Scenario: Unfinished query
- **WHEN** a visitor types `@call &`
- **THEN** an error line says the query cannot be read yet and the previous results stay

### Requirement: Server planner
The site SHALL offer a planner that, from a few answers about the server, produces a checklist with a documentation link per step, a `docker-compose.yml` using only variables documented for the pinned release and its image line, and a reverse-proxy snippet when needed. It SHALL quote the documented footprint as its "is it enough" answer, SHALL store or send nothing, and SHALL show the most common setup without JavaScript.

#### Scenario: Grammar coverage
- **WHEN** a visitor types `(@call | @errand) & due <= 7 days` or `##Work & !completed`
- **THEN** brackets, `|`, `!`, `##` and the date comparison are applied as the reference describes

#### Scenario: Cloudflare in front
- **WHEN** a visitor chooses Cloudflare's proxy
- **THEN** the compose file sets the trusted proxies to `cloudflare` and the checklist explains why

#### Scenario: Raspberry Pi
- **WHEN** a visitor chooses a Raspberry Pi
- **THEN** the compose file mounts a bind-mounted data folder and the first step is the ownership command from the documentation

#### Scenario: Secrets never real
- **WHEN** single sign-on or email to task is chosen
- **THEN** the generated values for secrets are placeholders and the page recommends file-based secrets

### Requirement: Capture landing page
The site SHALL have a page at `/capture/` presenting the share sheet, the browser extension and the bookmarklet as described in the capture documentation of the pinned release, with the install steps for the extension, the share sheet's support by platform, and its privacy facts, every statement linked to that documentation. It SHALL be linked from the footer, the help page and the install pages, and SHALL read at 360 px wide without JavaScript.

#### Scenario: Extension not in the stores
- **WHEN** a visitor looks for the extension in a browser store
- **THEN** the page says it installs unpacked from a release download and links the releases

#### Scenario: Safari share sheet
- **WHEN** a visitor on an iPhone reads the platform list
- **THEN** it says Safari offers no share target for web apps and points to the bookmarklet

### Requirement: Accessibility statement
The site SHALL have a page at `/accessibility/` stating the target (WCAG 2.2 AA in light and dark from 360 px, with and without JavaScript), how it is checked on every change, what the statement does not cover (the documentation served from the bundle and the app itself), known limitations, a review date and how to report a problem. It SHALL be linked from the footer of every page.

#### Scenario: Reporting a problem
- **WHEN** a visitor cannot use a page
- **THEN** the statement gives a reporting channel and says what to include

#### Scenario: Docs excluded honestly
- **WHEN** a visitor asks whether the docs are covered
- **THEN** the statement says they come from the app project and are outside this site's audit

### Requirement: Demo status page
The site SHALL have a page at `/status/` describing the demo as the demo documentation of the pinned release does (sandbox lifetime, the nightly reset, what is switched off, isolation), linking the demo's health endpoint as the live check, and telling an expired sandbox apart from an outage. The page SHALL make no request on the visitor's behalf.

#### Scenario: Expired sandbox
- **WHEN** a visitor sees "Your demo sandbox has expired"
- **THEN** the status page says it is the time limit or the nightly reset, not an outage, and what to do

#### Scenario: Version differs
- **WHEN** the demo runs a version other than the one the site describes
- **THEN** the page says the health endpoint names the demo's version and which version the site describes
