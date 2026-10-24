## REMOVED Requirements

### Requirement: Languages and translated pages
**Reason**: The cost page and the FAQ became parts of the English Compare page (website-compare-v2); only the home page stays translated.
**Migration**: The translated cost and FAQ addresses redirect to `/vs/#cost` and `/vs/#faq`; see "Translated home page".

## ADDED Requirements

### Requirement: Translated home page
The site SHALL be English with a translated home page in the languages the app's quick add understands in the pinned release (German, French, Italian, Spanish and Portuguese), at most ten languages in all. A translated home page SHALL live under its language's prefix and SHALL state the same facts as the English page, drawn from the bundle where the English page draws them, and SHALL read at 360 px wide without JavaScript.

#### Scenario: A language is added
- **WHEN** a dictionary for a seventh language is added with every string of the German one
- **THEN** its home page is built without any other change, and the unit test fails if a string is missing

#### Scenario: Old translated addresses
- **WHEN** a visitor opens `/de/cost/` or `/fr/faq/`
- **THEN** the server redirects to the cost part or the questions on the English Compare page

## MODIFIED Requirements

### Requirement: Language discovery
Every page that exists in all languages SHALL carry `hreflang` alternates for each language and an `x-default` pointing at English, its `lang` attribute and Open Graph locale SHALL match its language, the sitemap SHALL carry the alternates, and every page's footer SHALL link the languages (this page's versions when they exist, otherwise each language's home page). Translated pages SHALL also show a language bar.

#### Scenario: Alternates on the English original
- **WHEN** the English home page is built
- **THEN** its head lists one alternate per language and an `x-default`

#### Scenario: English-only page
- **WHEN** a visitor is on a how-to
- **THEN** the footer's language links lead to each language's home page, and the head carries no alternates
