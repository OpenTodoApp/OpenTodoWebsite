# Design

## Context

See proposal.md. `about.astro` builds its hero facts from the changelog (first and latest release) and the manifest (licence). The manifest's `facts` already include `specCount`, `docsPages`, `importFormatCount`, `quickAddLanguages` and `license`. `authors.json` holds `name`, `bio` and `url` per author; the post page shows name and bio.

## Goals / Non-Goals

**Goals:** a human first impression on `/about/`, checkable figures wherever the site asks for trust, and no figure without a source.

**Non-Goals:** build-time calls to GitHub's API; a team page; social proof of any kind that the bundle cannot back.

## Decisions

1. **Figures only from the manifest.** `ProofStrip` takes a list of fact keys and renders those present in `manifest.facts`, each with a fixed link target (`specCount` → the app repository's `openspec/specs/`, `docsPages` → `/docs/`, `importFormatCount` → `/docs/import/`, `license` → the licence file). Missing keys are skipped. *Alternative:* GitHub stars and contributors at build time; rejected for now because it adds a network dependency and a rate limit to every build and a number that is not tied to a release. It can be revisited in its own change.
2. **The strip is a Statement variant.** It renders inside a Statement section (`website-section-system`), so it counts as one section and never as cards.
3. **Photo as a repository asset.** `authors.json` `photo` is a path under `src/assets/authors/`, validated by the schema to be a local file; Astro's image pipeline produces AVIF and WebP at 2× the display size. `alt` is the author's name. No remote images, so no third-party request.
4. **The note is Markdown in the authors file, reviewed like content.** It is short (the schema caps it at 120 words) and the voice lint (`website-voice-and-releases`) applies to it. The about page renders it as the opening section; the post author box keeps using `bio`.
5. **Release dates stay true and move down.** A "Release history" line ("First released 11 October 2026; the latest is 0.7.0 from 18 October 2026, see every release") replaces the hero facts. Nothing is hidden; it is just not the headline.

## Risks / Trade-offs

- [A small count can read as weak, for example a first release with few specs] → the strip shows what exists; the maintainer can drop the strip from a page in review. The about page always shows the licence.
- [The photo becomes outdated] → it is the maintainer's file and changes only in their pull requests.
- [Fact keys renamed in a future bundle] → the bundle's stable-layout requirement covers manifest fields; a renamed key makes the figure disappear, and a unit test (`scripts/test/proof.test.mjs`) reads the pinned manifest and fails when fewer than two of the strip's keys are present.

## Effect on build and downloads

Build time: one more image through the existing pipeline. Downloads: the about page adds one photo of roughly 15–25 kB in AVIF; the strip is text. No new JavaScript.
