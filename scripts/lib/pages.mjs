// Which built pages the browser checks visit (ci-fast-checks D1, D2).
//
//   all      every page in dist/ (main, the nightly run, `npm run test:browser:full`)
//   sample   one page of every page template in src/pages, and every page of a
//            route under [lang] (the home page in every language); pull requests
//   a list   the pages a content-only pull request changed, from comparing each
//            page's HTML with the last build of main
//
// The docs under /docs/ are copied from the bundle byte for byte and checked by the
// app, so no mode visits them.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

/** Every page of the site in `dir` as a URL path, sorted. */
export function sitePages(dir = 'dist') {
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { if (path.relative(dir, p) !== 'docs') walk(p); }
      else if (e.name === 'index.html') out.push(urlOf(dir, d));
    }
  };
  walk(dir);
  return out.sort();
}

function urlOf(dir, d) {
  const rel = path.relative(dir, d).split(path.sep).join('/');
  return rel ? `/${rel}/` : '/';
}

/** The page templates in `pagesDir`: one route per .astro file, as segment lists. */
export function routes(pagesDir = 'src/pages') {
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.astro')) {
        const segs = path.relative(pagesDir, p).slice(0, -'.astro'.length).split(path.sep);
        if (segs.at(-1) === 'index') segs.pop();
        out.push({ file: path.relative(pagesDir, p).split(path.sep).join('/'), segs });
      }
    }
  };
  walk(pagesDir);
  return out;
}

// A static segment outranks a parameter, which outranks a rest parameter (Astro's order).
const rank = (seg) => (seg.startsWith('[...') ? 2 : seg.startsWith('[') ? 1 : 0);

function matches(segs, parts) {
  if (!segs.length) return !parts.length;
  const [s, ...rest] = segs;
  if (s.startsWith('[...')) {
    for (let n = 0; n <= parts.length; n++) if (matches(rest, parts.slice(n))) return true;
    return false;
  }
  if (!parts.length) return false;
  if (!s.startsWith('[') && s !== parts[0]) return false;
  return matches(rest, parts.slice(1));
}

function moreSpecific(a, b) {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    // Both match the same URL, so the longer one ends in a rest parameter that matched nothing.
    if (i >= a.length) return true;
    if (i >= b.length) return false;
    if (rank(a[i]) !== rank(b[i])) return rank(a[i]) < rank(b[i]);
  }
  return false;
}

/** The route that renders `url`, or undefined when no template matches it. */
export function routeOf(url, all) {
  const parts = url.split('/').filter(Boolean);
  let best;
  for (const r of all) if (matches(r.segs, parts) && (!best || moreSpecific(r.segs, best.segs))) best = r;
  return best;
}

/**
 * One page per template: the largest built page of each route, so the sample sees
 * the most of what the template can show. Every page of a route under [lang] (the
 * home page in each language), and every page no template accounts for.
 */
export function samplePages(dir = 'dist', pagesDir = 'src/pages') {
  const all = routes(pagesDir);
  const pick = new Map();
  const out = new Set();
  for (const url of sitePages(dir)) {
    const r = routeOf(url, all);
    if (!r || r.segs[0] === '[lang]') { out.add(url); continue; }
    const size = fs.statSync(path.join(dir, url, 'index.html')).size;
    const cur = pick.get(r.file);
    if (!cur || size > cur.size || (size === cur.size && url < cur.url)) pick.set(r.file, { url, size });
  }
  for (const { url } of pick.values()) out.add(url);
  return [...out].sort();
}

/** Each page's SHA-256 of its HTML, written after a build of main. */
export function pageHashes(dir = 'dist') {
  const out = {};
  for (const url of sitePages(dir)) out[url] = crypto.createHash('sha256').update(fs.readFileSync(path.join(dir, url, 'index.html'))).digest('hex');
  return out;
}

/** The pages whose HTML is new or differs from `base` (a pageHashes result). */
export function changedPages(dir, base) {
  const now = pageHashes(dir);
  return Object.keys(now).filter((url) => now[url] !== base[url]).sort();
}

/**
 * The pages the browser checks visit, from BROWSER_PAGES: "all", "sample" (the
 * default), or "list" with BROWSER_PAGES_FILE naming a file of URLs, one per line.
 */
export function browserPages(env = process.env, dir = 'dist', pagesDir = 'src/pages') {
  const mode = env.BROWSER_PAGES || 'sample';
  if (mode === 'all') return sitePages(dir);
  if (mode === 'sample') return samplePages(dir, pagesDir);
  if (mode === 'list') {
    const built = new Set(sitePages(dir));
    return fs.readFileSync(env.BROWSER_PAGES_FILE, 'utf8').split('\n').map((l) => l.trim()).filter((u) => built.has(u));
  }
  throw new Error(`BROWSER_PAGES must be all, sample or list (found ${JSON.stringify(mode)})`);
}
