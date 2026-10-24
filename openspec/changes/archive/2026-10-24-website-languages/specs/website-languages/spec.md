# Spec Delta

## Purpose

The site's languages: which pages exist in which languages, how they stay true to the English facts, how they are discovered, and how the site stays honest about what is not translated.

## ADDED Requirements

### Requirement: Languages and translated pages
The site SHALL be English with translated versions of the home page, the cost page and the FAQ in the languages the app's quick add understands in the pinned release (German, French, Italian, Spanish and Portuguese), at most ten languages in all. A translated page SHALL live under its language's prefix and SHALL state the same facts as the English page, drawn from the bundle where the English page draws them.

#### Scenario: Cost figures in German
- **WHEN** a visitor opens the German cost page
- **THEN** the image size, idle memory and minimum server are the bundle manifest's figures, the same as on the English page

#### Scenario: A language is added
- **WHEN** a dictionary for a seventh language is added with every string of the German one
- **THEN** its three pages are built without any other change, and the unit test fails if a string is missing

### Requirement: Honest scope note
Every translated page SHALL say, in its language, that the page is translated while the rest of the site, the documentation and the app are in English, and that the app's quick add understands dates and times in that language.

#### Scenario: Reader expects a localised app
- **WHEN** a visitor reads the French home page
- **THEN** a note under the hero says the application and the documentation are in English and that quick add understands French dates

### Requirement: Language discovery
Every page that exists in all languages SHALL carry `hreflang` alternates for each language and an `x-default` pointing at English, its `lang` attribute and Open Graph locale SHALL match its language, the sitemap SHALL carry the alternates, and every page's footer SHALL link the languages (this page's versions when they exist, otherwise each language's home page). Translated pages SHALL also show a language bar.

#### Scenario: Alternates on the English original
- **WHEN** the English FAQ is built
- **THEN** its head lists one alternate per language and an `x-default`

#### Scenario: English-only page
- **WHEN** a visitor is on a how-to
- **THEN** the footer's language links lead to each language's home page, and the head carries no alternates

### Requirement: Dictionary integrity
The translation dictionaries SHALL share one shape, contain no empty strings, use only known placeholders and link only within the site or the documentation, enforced by a unit test.

#### Scenario: Missing string
- **WHEN** a dictionary lacks a string the German one has
- **THEN** the unit test fails naming the language and the path
