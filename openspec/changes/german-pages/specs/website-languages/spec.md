## MODIFIED Requirements

### Requirement: Language discovery
Every translated page and its English original SHALL carry `hreflang` alternates for English, for each language the page exists in, and an `x-default` pointing at English, and no alternate for a language the page does not exist in. Its `lang` attribute and Open Graph locale SHALL match its language, and the sitemap SHALL carry the same alternates. Every page SHALL offer a language switch in the header (in the phone menu below 768 px) and in the footer: a disclosure that opens without JavaScript, shows the current language, and lists every language by its native name, linking this page's version in a language when it exists and otherwise that language's home page. No page SHALL show a separate bar or list of languages. The alternates stay true because they are derived from the one list of translated pages and their languages, which the unit test checks against the pages that are built.

#### Scenario: Alternates on the English original
- **WHEN** the English home page is built
- **THEN** its head lists one alternate per language and an `x-default`

#### Scenario: English-only page
- **WHEN** a visitor on a how-to opens the language switch
- **THEN** its links lead to each language's home page, and the head carries no alternates

#### Scenario: Switching without JavaScript
- **WHEN** a visitor at 1280 px wide with JavaScript disabled opens the header's language switch on `/` and chooses Italiano
- **THEN** the Italian home page opens with `lang="it"`

#### Scenario: Page in English and German only
- **WHEN** `/self-host/` is built
- **THEN** its head lists alternates for English, German and `x-default` and none for French, Italian, Spanish, Portuguese or Chinese, and the sitemap entry for `/self-host/` lists the same

#### Scenario: Switching from a German-only page
- **WHEN** a visitor on `/de/self-host/` opens the language switch and chooses Français
- **THEN** the French home page `/fr/` opens, and choosing English opens `/self-host/`

## ADDED Requirements

### Requirement: Pages in English and German only
The visitor's path SHALL also exist in German, under `/de/` with the English slugs, and in no other language: the features catalogue (`/features/` and its group pages), `/start/`, `/install/` and its platform pages, `/self-host/`, the switch index `/switch/`, and the switch guides for Todoist, Microsoft To Do and Things. Each German page SHALL render the same sections in the same order as its English original from the same component, show the language note, state the same facts drawn from the same sources (the bundle, the feature catalogue, the platform records), keep the English page's links to the documentation (which is English), and read at 360 px wide without JavaScript. Links from a German page to a page that exists in German SHALL lead to the German page; links to any other page SHALL lead to the English one. Adding a further page or language to this list SHALL be a change to this requirement.

#### Scenario: German self-hosting page
- **WHEN** a visitor opens `/de/self-host/` on a 390 px wide phone without JavaScript
- **THEN** the page is in German with `lang="de"` and the language note, and shows the headline and actions, the footprint figures of the pinned release, the install methods with their commands, the sync section, the three data cards and the end band, in that order

#### Scenario: German features catalogue
- **WHEN** a visitor opens `/de/features/`
- **THEN** every group of the English catalogue appears with its German title, its first entries with German names and lines linking the same documentation pages, and a link to `/de/features/<group>/`, which lists every feature of the group in German

#### Scenario: Moving through the German path
- **WHEN** a visitor on `/de/start/` follows "Install the app" and then the Android card
- **THEN** `/de/install/` and then `/de/install/android/` open in German, and the Android steps link the English documentation section they come from

#### Scenario: English pages unchanged
- **WHEN** the English originals are built after this change
- **THEN** their visible text is the same as before; only their head gains the German alternate

#### Scenario: Another language asked for
- **WHEN** a visitor opens `/fr/self-host/`
- **THEN** the site answers with its not-found page, as for any page that does not exist

### Requirement: The German text stays complete
Every item the German pages read SHALL have a German twin: each feature and feature group of the catalogue, each platform record, each deploy target, and each string of the shared components and pages. A unit test SHALL fail when an English item has none, naming the item, so a feature or platform added in English cannot ship with an English line on a German page.

#### Scenario: A feature is added in English
- **WHEN** a feature is added to the catalogue with an English name and line only
- **THEN** the unit test fails naming the feature's documentation page and German

#### Scenario: A platform's steps change
- **WHEN** a step is added to the English Android platform record
- **THEN** the unit test fails until the German record has the same number of steps

### Requirement: German switch guides stay true to the English ones
Each German switch guide SHALL state the same facts as its English guide: the same checked-on date, the same documentation sources, the same import format, and the same number of items that come across, that do not, and of mapped terms. A unit test SHALL fail when an English guide changes any of these and its German guide does not follow, naming the guide and the field. The German guides SHALL be held to the same freshness rule as the English ones: their checked-on date at most 180 days old, or the build fails.

#### Scenario: English guide is rechecked
- **WHEN** the English Todoist guide's `checkedOn` moves to a new date and the German guide keeps the old one
- **THEN** the unit test fails naming `checkedOn` and the German Todoist guide

#### Scenario: An item is added to what comes across
- **WHEN** the English Things guide gains an item under what comes across
- **THEN** the unit test fails until the German Things guide has the same number of items

#### Scenario: Reading a German guide
- **WHEN** a visitor opens `/de/switch/microsoft-todo/` at 360 px wide without JavaScript
- **THEN** the page is in German with the language note, shows what comes across and what does not, the steps, the term table and the list of documentation pages, and its actions lead to the import guide in the documentation and to the demo

#### Scenario: The German switch index
- **WHEN** a visitor opens `/de/switch/`
- **THEN** the guides for Todoist, Microsoft To Do and Things link their German pages, and every other guide links its English page
