# website-languages Specification

## Purpose
The site's languages: which pages exist in which languages, how they stay true to the English facts, how they are discovered, and how the site stays honest about what is not translated.

## Requirements

### Requirement: Honest scope note
Every translated page SHALL say, in its language, how this page relates to the languages in the pinned release's language documentation. When that documentation lists the page's language, the note SHALL say that the page and the app (through its language setting) are in that language, that quick add understands dates and times in it, and that the rest of the site and the documentation are in English. When it does not, the note SHALL say the page is in that language, that the rest of the site and the documentation are in English, and SHALL name the app's languages as that documentation lists them.

#### Scenario: Reader expects a localised app
- **WHEN** a visitor reads the French home page
- **THEN** a note under the hero says the application is in French too, that quick add understands French dates, and that the rest of the site and the documentation are in English

#### Scenario: A page language the app does not speak
- **WHEN** a visitor reads the Simplified Chinese home page
- **THEN** a note under the hero says the page is in Simplified Chinese, that the rest of the site and the documentation are in English, and names the app's languages from the pinned release's language documentation without saying the app speaks Chinese

### Requirement: Language discovery
Every page that exists in all languages SHALL carry `hreflang` alternates for each language and an `x-default` pointing at English, its `lang` attribute and Open Graph locale SHALL match its language, and the sitemap SHALL carry the alternates. Every page SHALL offer a language switch in the header (in the phone menu below 768 px) and in the footer: a disclosure that opens without JavaScript, shows the current language, and lists every language by its native name, linking this page's versions when they exist and otherwise each language's home page. No page SHALL show a separate bar or list of languages.

#### Scenario: Alternates on the English original
- **WHEN** the English home page is built
- **THEN** its head lists one alternate per language and an `x-default`

#### Scenario: English-only page
- **WHEN** a visitor on a how-to opens the language switch
- **THEN** its links lead to each language's home page, and the head carries no alternates

#### Scenario: Switching without JavaScript
- **WHEN** a visitor at 1280 px wide with JavaScript disabled opens the header's language switch on `/` and chooses Italiano
- **THEN** the Italian home page opens with `lang="it"`

### Requirement: Dictionary integrity
The translation dictionaries SHALL share one shape, contain no empty strings, use only known placeholders and link only within the site or the documentation, enforced by a unit test.

#### Scenario: Missing string
- **WHEN** a dictionary lacks a string the German one has
- **THEN** the unit test fails naming the language and the path

### Requirement: Translated home page
The site SHALL be English with a translated home page in German, French, Italian, Spanish, Portuguese and Simplified Chinese, at most ten languages in all. A translated home page SHALL live under its language's prefix, SHALL render the same sections in the same order as the English home page from the same component, and SHALL state the same facts as the English page, drawn from the bundle where the English page draws them. Its strings SHALL have the same shape as the English home page's strings, enforced by the unit test. Links without a translated target SHALL lead to the English pages. It SHALL read at 360 px wide without JavaScript.

#### Scenario: A language is added
- **WHEN** a dictionary for a seventh language is added with every string of the German one
- **THEN** its home page is built without any other change, and the unit test fails if a string is missing

#### Scenario: The English home page gains a string
- **WHEN** a string is added to the English home page's strings and not to the Italian ones
- **THEN** the unit test fails naming Italian and the path of the string

#### Scenario: Same story in every language
- **WHEN** a visitor opens `/it/` on a 390 px wide phone without JavaScript
- **THEN** the page shows the briefing headline over the Today screenshot, then your day, everything included with the pinned release's feature groups and counts, yours for good with AI on your terms, the three ways in, the community invitation and the end band, in that order

#### Scenario: Old translated addresses
- **WHEN** a visitor opens `/de/cost/` or `/fr/faq/`
- **THEN** the server redirects to the cost part or the questions on the English Compare page
