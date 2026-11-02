#!/usr/bin/env node
// Link check over dist/ (website-platform D6.2): every internal link, image,
// stylesheet and script of every page, the site's and the docs', must resolve to
// a built file, and a #fragment must name an id on the target page. Offline:
// links to other sites are not fetched.
import fs from 'node:fs';
import path from 'node:path';
import { htmlFiles, load, report, urlOf } from './lib.mjs';

export function checkLinks(dir) {
  const problems = [];
  const files = htmlFiles(dir);
  const ids = new Map();
  const idsOf = (file) => {
    if (!ids.has(file)) ids.set(file, new Set(load(file).querySelectorAll('[id], a[name]').map((e) => e.getAttribute('id') ?? e.getAttribute('name'))));
    return ids.get(file);
  };
  const resolve = (pathname) => {
    const p = path.join(dir, decodeURIComponent(pathname));
    if (!p.startsWith(dir)) return null;
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
    if (fs.existsSync(path.join(p, 'index.html'))) return path.join(p, 'index.html');
    return null;
  };
  for (const file of files) {
    const page = urlOf(dir, file);
    const base = new URL(page, 'http://site.invalid');
    const root = load(file);
    const refs = [];
    for (const el of root.querySelectorAll('a[href], link[href], area[href]')) refs.push(el.getAttribute('href'));
    for (const el of root.querySelectorAll('img[src], script[src], source[src], iframe[src]')) refs.push(el.getAttribute('src'));
    for (const el of root.querySelectorAll('img[srcset], source[srcset]')) refs.push(...el.getAttribute('srcset').split(',').map((s) => s.trim().split(/\s+/)[0]));
    for (const ref of refs) {
      if (!ref || /^(mailto|tel|javascript|data):/i.test(ref)) continue;
      let url;
      try { url = new URL(ref, base); } catch { problems.push(`${page}: malformed link ${ref}`); continue; }
      if (url.origin !== base.origin) continue;
      const target = resolve(url.pathname);
      if (!target) { problems.push(`${page}: broken link ${ref}`); continue; }
      const frag = decodeURIComponent(url.hash.slice(1));
      if (frag && target.endsWith('.html') && !idsOf(target).has(frag)) problems.push(`${page}: ${ref} names #${frag}, which is not on ${urlOf(dir, target)}`);
    }
  }
  return { problems, pages: files.length };
}

// Broken links inside a released docs bundle, which this site serves as shipped and
// cannot change, accepted only while that exact version is pinned. Each entry names
// the app fix that removes it, so the list empties itself with the next pin.
export const KNOWN_BUNDLE_PROBLEMS = {
  // OpenTodoApp/OpenTodo#783: the docs build did not copy the theme format's schema.
  'v0.20.0': ['/docs/themes/: broken link /docs/themes/opentodo-theme.schema.json'],
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const dir = path.resolve(process.argv[2] ?? 'dist');
  const { version } = JSON.parse(fs.readFileSync(new URL('../../bundle.json', import.meta.url), 'utf8'));
  const known = new Set(KNOWN_BUNDLE_PROBLEMS[version] ?? []);
  const { problems, pages } = checkLinks(dir);
  const accepted = problems.filter((p) => known.has(p));
  if (accepted.length) console.log(`links: ${accepted.length} known problem(s) of the ${version} docs bundle accepted`);
  report('links', problems.filter((p) => !known.has(p)), `${pages} pages, no broken internal or docs links`);
}
