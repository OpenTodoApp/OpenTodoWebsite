#!/usr/bin/env node
// SEO check (website-seo-depth D3): every built page, the docs included, has a non-empty <title>,
// a meta description, a canonical link and a social card that is built; titles are unique; every hreflang alternate is a built
// page that lists the same set back, with an x-default; and the sitemap lists every page that is
// not marked noindex.
import fs from 'node:fs';
import path from 'node:path';
import { htmlFiles, load, report, urlOf } from './lib.mjs';

const SITE = 'https://open-todo.app';

export function checkSeo(dir) {
  const problems = [];
  const files = htmlFiles(dir).filter((f) => !/(^|\/)404(\.html|\/index\.html)$/.test(path.relative(dir, f)));
  const pages = new Map(files.map((f) => [urlOf(dir, f), f]));
  const titles = new Map();
  const sitemap = new Set();
  for (const f of fs.readdirSync(dir).filter((n) => /^sitemap-\d+\.xml$/.test(n))) {
    for (const m of fs.readFileSync(path.join(dir, f), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) sitemap.add(m[1].replace(SITE, ''));
  }
  for (const [page, file] of pages) {
    const root = load(file);
    const title = root.querySelector('head title')?.text.trim();
    if (!title) problems.push(`${page}: no <title>`);
    else titles.set(title, [...(titles.get(title) ?? []), page]);
    if (!root.querySelector('meta[name="description"]')?.getAttribute('content')?.trim()) problems.push(`${page}: no meta description`);
    if (!root.querySelector('link[rel="canonical"]')?.getAttribute('href')) problems.push(`${page}: no canonical link`);
    const og = root.querySelector('meta[property="og:image"]')?.getAttribute('content');
    if (!og) problems.push(`${page}: no og:image`);
    else if (og.startsWith(SITE) && !fs.existsSync(path.join(dir, decodeURI(og.slice(SITE.length))))) problems.push(`${page}: og:image ${og} is not built`);
    const noindex = /noindex/.test(root.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '');
    if (!noindex && sitemap.size && !sitemap.has(page)) problems.push(`${page}: not in the sitemap`);
    const alts = root.querySelectorAll('link[rel="alternate"][hreflang]').map((a) => [a.getAttribute('hreflang'), a.getAttribute('href').replace(SITE, '')]);
    if (!alts.length) continue;
    if (!alts.some(([h]) => h === 'x-default')) problems.push(`${page}: hreflang alternates without x-default`);
    const set = alts.filter(([h]) => h !== 'x-default').map(([h, u]) => `${h} ${u}`).sort().join('|');
    if (!alts.some(([h, u]) => h !== 'x-default' && u === page)) problems.push(`${page}: hreflang alternates do not include the page itself`);
    for (const [h, u] of alts) {
      const other = pages.get(u);
      if (!other) { problems.push(`${page}: hreflang ${h} points at ${u}, which is not built`); continue; }
      const back = load(other).querySelectorAll('link[rel="alternate"][hreflang]').filter((a) => a.getAttribute('hreflang') !== 'x-default').map((a) => `${a.getAttribute('hreflang')} ${a.getAttribute('href').replace(SITE, '')}`).sort().join('|');
      if (back !== set) problems.push(`${page}: hreflang ${h} (${u}) does not list the same alternates back`);
    }
  }
  if (!sitemap.size) problems.push('no sitemap-N.xml in the build');
  for (const [t, us] of titles) if (us.length > 1) problems.push(`duplicate title "${t}": ${us.join(', ')}`);
  return { problems, pages: pages.size, sitemap: sitemap.size };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dir = path.resolve(process.argv[2] ?? 'dist');
  const { problems, pages, sitemap } = checkSeo(dir);
  report('seo', problems, `${pages} pages with a title, description and canonical; hreflang reciprocal; ${sitemap} sitemap entries cover every page`);
}
