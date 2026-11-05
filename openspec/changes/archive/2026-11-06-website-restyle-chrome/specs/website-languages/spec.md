# Spec Delta

## MODIFIED Requirements

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
