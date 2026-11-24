## 1. Search metadata and structured data

- [x] 1.1 `Base.astro`: Twitter tags, `max-image-preview:large`, no suffix on a title that names OpenTodo (`grep twitter: dist/index.html`)
- [x] 1.2 `Base.astro`: one JSON-LD graph per page; `schemaType` on lists and About; the home page's WebSite `@id` (`npm run check:seo`)
- [x] 1.3 Older blog pages say which page they are (`dist/blog/page/2/index.html`)

## 2. Speed

- [x] 2.1 `fetchpriority="high"` on the eager image of `ScreenshotFrame`, `ShotPicture` and `CoverImage` (Lighthouse "LCP request discovery" passes on the home page)

- [x] 2.2 `image.layout: 'constrained'` for pictures in posts (`grep srcset dist/blog/chores-that-come-back/index.html`); the page's height is unchanged
- [x] 2.3 The press kit's previews carry `width` and `height` (Lighthouse "unsized images" passes on `/press-kit/`)
- [x] 2.4 `scripts/serve.mjs` compresses text like nginx

## 3. Security headers

- [x] 3.1 `nginx.conf`: Content-Security-Policy, Strict-Transport-Security, X-Frame-Options, Cross-Origin-Opener-Policy, Permissions-Policy
- [x] 3.2 `scripts/serve.mjs` sends them; a unit test ties the policy to the script allow-list (`npm test`)

## 4. Checks

- [x] 4.1 `check:seo`: one `<h1>`, image `alt`, structured data on site pages, with a failing sample in `scripts/test/checks.test.mjs`
- [x] 4.2 `tests/a11y.spec.ts` fails on console errors (`npm run test:browser:full`)

## 5. Polish

- [x] 5.1 The polish block in `site.css`; nothing moves under `prefers-reduced-motion` (`npm run test:browser`, screenshots at 360 and 1280 px in light and dark)

## 6. Verify

- [x] 6.1 `npm run check`, `npm test`, `npm run build`, `npm run check:dist`, `npm run test:browser:full`, `openspec validate --all --strict`
- [x] 6.2 Lighthouse on the home, features, blog, a post and self-host pages, phone and desktop
