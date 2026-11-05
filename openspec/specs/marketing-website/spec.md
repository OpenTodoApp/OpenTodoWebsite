# marketing-website Specification

## Purpose
The marketing pages of the website: the home page, features, switch pages, the trust pages and the tools, which give a first-time visitor what they need to decide about OpenTodo and the ways to get it.

## Requirements

### Requirement: Paths to get OpenTodo on the home page
The home page SHALL show the three ways to get OpenTodo: trying the demo, joining a server someone else runs with an invitation link, and running one's own server. It SHALL state that OpenTodo is not offered as a hosted service. Each path SHALL link to the page or documentation of the pinned release that continues it. The block SHALL read and link without JavaScript at 360 px wide.

#### Scenario: A visitor who will not run a server
- **WHEN** a visitor reads the block on a 360 px wide phone without JavaScript
- **THEN** the second path tells them to open the invitation link they were sent and links to the documentation for installing the app from the browser

#### Scenario: Demo lifetime from the docs
- **WHEN** the demo card states how long a sandbox lives
- **THEN** the statement matches the demo documentation of the pinned release and links to it

#### Scenario: No hosted sign-up is implied
- **WHEN** a visitor looks for a "sign up" or "start for free" path
- **THEN** the block says OpenTodo is not offered as a hosted service and offers the demo instead

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

### Requirement: Outcome-first home page
The home page SHALL open with the outcome for people who use a task app, not with implementation details. Above the first screenful it SHALL show a headline, a one-sentence promise and calls to action to try the demo and to get started, with the real app of the pinned release directly below: a stage that crossfades the Today, quick-add and board screenshots with their captions (only Today when the visitor prefers reduced motion), and the phone app beside it from 1024 px wide. No label above the headline and no section numbers. Architecture terms SHALL NOT appear above the fold.

#### Scenario: A Todoist user lands on the home page
- **WHEN** a visitor opens the home page on a 390 px wide phone
- **THEN** the first screenful shows the headline, the promise and the calls to action, and the Today screenshot is reachable by scrolling once, without any mention of op logs, clocks or SQLite

### Requirement: Differentiators and proof on the home page
The home page SHALL present the differentiators (one server for a whole household, full offline use, optional end-to-end encryption, AI only on the person's terms with their own model, leaving at any time), each linked to its documentation or guide, real screenshots of the pinned release, and a path that links to the self-hosting page.

#### Scenario: Technical detail is one click away
- **WHEN** a visitor wants to know how sync works
- **THEN** a link from the home page leads to the self-hosting page with the interactive sync demo

### Requirement: Switch calls to action follow the importers
A "Switch from <app>" call to action SHALL appear only for apps whose named import format is released in the version the site describes, and SHALL lead to that app's switch guide. For other apps the site SHALL link to the general import guide instead and SHALL NOT promise a one-step switch.

#### Scenario: Importer not yet released
- **WHEN** the site is built while the Linear import format is not in the released version
- **THEN** the Linear switch guide links to the general import guide and shows no "Switch from Linear" button

### Requirement: Audience pages
The site SHALL have a self-hosting page with the sync demo, footprint, container, Coolify and one-click install instructions, and a technical entry point, "Under the hood" at `/under-the-hood/`, with groups of link rows: how it works (architecture, sync protocol, offline and sync, shared contracts), building on it (the API, the command line, MCP, webhooks, CalDAV), what it promises (stability, performance budgets, the roadmap, the changelog), security (the Security page, end-to-end encryption) and releases and source (verifying the image, downloads and Android app, the repository, the open specifications). Every row SHALL link the pinned docs or the repository, read at 360 px wide without JavaScript, and add nothing to the home page. Both SHALL be linked from the footer of every page.

#### Scenario: Navigation
- **WHEN** a visitor is on any page
- **THEN** the footer links Self-host and Under the hood

### Requirement: Consistent visual language
Every page SHALL use the app's colours, typeface, line icons and real screenshots, and follow the visitor's light or dark preference; emoji and Unicode symbols SHALL NOT be icons. In plain CSS, at every width and without JavaScript, pages SHALL follow the app's flat look: surface and canvas tokens, hairlines instead of shadows except on floating panels, no decorative gradients, no imitation browser chrome, and grey for navigation state, every colour from the bundle's tokens.

#### Scenario: No emoji icons
- **WHEN** the website check scans the built pages
- **THEN** it reports any emoji or symbol used as an icon in navigation, feature lists or buttons

#### Scenario: Dark preference
- **WHEN** a visitor whose system prefers dark opens a switch guide
- **THEN** the page and its screenshots are shown in their dark variants

#### Scenario: Flat look follows the bundle
- **WHEN** the bundle pin moves to a release with a different canvas, surface or border token and the site is rebuilt
- **THEN** every band, frame and hairline uses the new values with no edit in this repository, and no card, button or screenshot has a shadow

#### Scenario: Current page in the navigation
- **WHEN** a visitor opens the blog at 1280 px wide
- **THEN** the Blog link in the header is marked with the grey selected surface and strong text, not with the accent colour

### Requirement: Fast, private and accessible pages
Every page SHALL work without JavaScript for reading and navigation, SHALL load no third-party scripts other than the site's self-hosted analytics, and SHALL meet WCAG 2.2 AA in light and dark at widths from 360 px, without horizontal scrolling.

#### Scenario: Reading without scripts
- **WHEN** a visitor opens the Todoist switch guide with JavaScript disabled
- **THEN** the full text and links are readable and work

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

### Requirement: Five-destination navigation
From 768 px wide, the header SHALL show Features, Learn, Docs and Blog on one line, then the language switch, a "Star" link to the app repository and one primary action, Try the demo. Below 768 px the header SHALL show the logo, Try the demo and a menu button whose panel opens without JavaScript, by keyboard and pointer, and shows the same destinations, Get started, Star on GitHub and the language switch. The guidance content (guides, how-tos, toolkit, templates, switch pages and topics) SHALL be reached through the Learn page and the footer rather than a menu in the header.

#### Scenario: Learn without JavaScript on a laptop
- **WHEN** a visitor at 1280 px wide with JavaScript disabled activates Learn with the keyboard
- **THEN** the Learn page opens and links the guides, how-tos, toolkit and templates

#### Scenario: Blog follows the content
- **WHEN** no post is published
- **THEN** the header and the phone menu list no Blog link, as the blog specification requires

#### Scenario: Phone menu
- **WHEN** a visitor on a 360 px wide screen without JavaScript opens the menu
- **THEN** it shows Features, Learn, Docs and Blog, then Get started and Star on GitHub, and each works, while Try the demo stays visible in the bar

#### Scenario: Tablet width
- **WHEN** the header is shown at 768 px wide
- **THEN** every header item stays on one line and the page does not scroll sideways

### Requirement: Features page
The site SHALL have a features overview at `/features/` and one page per group at `/features/<group>/`, on the catalog layout Learn shares. The overview SHALL show each group's first five features with the group's count and a link to its page, then the integrations, the apps it imports from and that nothing costs extra; a group's page SHALL list all its features. Every feature SHALL have a one-line description and link its documentation page in the pinned bundle. The header's Features link SHALL open this page. The page SHALL read without JavaScript and at 360 px wide, with each description under its feature's name.

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens `/features/` at 360 px wide with JavaScript disabled
- **THEN** every group, its first features and the link to the group's page are shown and work, the rail reaches every group, and the page does not scroll sideways

### Requirement: Feature list follows the pinned release
The feature list SHALL come from one data module whose entries name their documentation page and the first release that has it. Entries newer than the pinned release SHALL be left out, a shipped entry whose documentation page is missing from the bundle SHALL fail the build, and the import apps SHALL come from the bundle manifest's import formats.

#### Scenario: A feature from a later release
- **WHEN** the site is built against a bundle older than a feature's first release
- **THEN** the features page does not list it, and the count in the page head leaves it out

#### Scenario: A docs page is renamed
- **WHEN** a listed feature's documentation page no longer exists in the pinned bundle
- **THEN** the build fails naming the feature and the missing page

### Requirement: Get started page
The site SHALL have a page at `/start/`, opened by the header's Get started action, that offers the three ways in (try the demo, join a server, run your own), lists every deploy target whose self-hosting guide the pinned bundle has with the Docker command built from the bundle manifest, links each install page and the capture page, and links each switch guide saying whether the pinned release imports that app's export. It SHALL read at 360 px wide without JavaScript.

#### Scenario: A new deploy guide
- **WHEN** the pinned bundle adds a self-hosting guide for a platform the page knows
- **THEN** `/start/` lists that platform with a link to its guide, with no other edit

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens `/start/` at 360 px wide with JavaScript disabled
- **THEN** the three ways in, the deploy targets, the Docker command, the device list and the switch guides are shown and their links work, and nothing scrolls sideways

### Requirement: Everything included on the home page
The home page SHALL show the breadth of the pinned release in one compact part: every feature group with its count, each linking its page on the features catalog, the integrations and import apps by name, and a link to the features page saying no feature is held back for a paid plan. It SHALL use the features page's data, so it follows the pinned release. At 360 px wide and without JavaScript every group link SHALL work.

#### Scenario: A new release adds a feature
- **WHEN** the pin moves to a release that adds a listed feature
- **THEN** its group's count on the home page grows with no edit to the home page

### Requirement: Security and trust page
The site SHALL have a page at `/security/`, linked as "Security" from the footer's Project group on every page and from About's security section, with four groups of link rows: how to report a vulnerability privately (GitHub's private reporting, per the app's security policy); what protects the data (the security policy, account security, end-to-end encryption and its threat model, no telemetry with the map provider named); how to check what you run (image and download verification, Android app verification, the source); and what is being written for 1.0 (the threat model, how changes are verified, an independent review), marked as not yet published until the app repository publishes them under `docs/security/`, at which point the rows SHALL link them. Every statement SHALL link the document that backs it. The page SHALL read at 360 px wide without JavaScript, in light and dark.

#### Scenario: Before the threat model is published
- **WHEN** the pinned bundle has no `docs/security/` pages
- **THEN** the "Being written for 1.0" rows carry no link and a note names the work in review

#### Scenario: Verifying an image
- **WHEN** a visitor follows "Verify the image and downloads"
- **THEN** the Docker guide opens at its verification section

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens `/security/` at 360 px wide with JavaScript disabled
- **THEN** every group and link is readable and works, and the page does not scroll sideways
