## MODIFIED Requirements

### Requirement: Languages and translated pages
The site SHALL be English with translated versions of the home page, the cost page, the FAQ and, while it exists, the Open Loops page, in the languages the app's quick add understands in the pinned release (German, French, Italian, Spanish and Portuguese), at most ten languages in all. A translated page SHALL live under its language's prefix and SHALL state the same facts as the English page, drawn from the bundle where the English page draws them. On the translated Open Loops page the names and descriptions of the method's terms SHALL come from the pinned bundle's `method.json` in that language, and only the surrounding sentences from the site's dictionaries.

#### Scenario: Cost figures in German
- **WHEN** a visitor opens the German cost page
- **THEN** the image size, idle memory and minimum server are the bundle manifest's figures, the same as on the English page

#### Scenario: A language is added
- **WHEN** a dictionary for a seventh language is added with every string of the German one
- **THEN** its translated pages are built without any other change, and the unit test fails if a string is missing

#### Scenario: The method in Italian
- **WHEN** a visitor opens `/it/open-loops/` built from the 0.8.0 bundle
- **THEN** every move name equals the Italian name in that bundle's `method.json`, which is the name the app of that version shows in Italian

#### Scenario: A language the bundle's vocabulary lacks
- **WHEN** the site has a language that the pinned `method.json` does not list in `languages`
- **THEN** that language's Open Loops page is not built, its language switcher offers only the languages that have the page, and the build passes
