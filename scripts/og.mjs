#!/usr/bin/env node
// Renders a social preview image for every page in dist/ (website-seo D2):
//   node scripts/og.mjs dist
// Runs as its own process so FONTCONFIG_FILE is read before sharp loads: the
// cards use the Inter files in scripts/og/fonts/ on every machine, with no
// system font package. Docs pages come from the bundle and are skipped.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const fontsDir = path.join(here, 'og', 'fonts');
const cacheDir = fs.mkdtempSync(path.join(os.tmpdir(), 'opentodo-og-'));
const conf = path.join(cacheDir, 'fonts.conf');
fs.writeFileSync(conf, `<?xml version="1.0"?>\n<!DOCTYPE fontconfig SYSTEM "fonts.dtd">\n<fontconfig><dir>${fontsDir}</dir><cachedir>${cacheDir}</cachedir></fontconfig>\n`);
process.env.FONTCONFIG_FILE = conf;

const { default: sharp } = await import('sharp');
const { parse } = await import('node-html-parser');
const { cardSvg, ogFileFor, sectionOf } = await import('./lib/og.mjs');

const dist = path.resolve(process.argv[2] ?? 'dist');
const pages = [];
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (path.relative(dist, p) !== 'docs' && path.relative(dist, p) !== 'og') walk(p); }
    else if (e.name === 'index.html') pages.push(p);
  }
};
walk(dist);

let n = 0;
for (const file of pages) {
  const url = '/' + path.relative(dist, path.dirname(file)).split(path.sep).join('/') + '/';
  const pathname = url === '//' ? '/' : url;
  const root = parse(fs.readFileSync(file, 'utf8'));
  // Only pages that point at their own card need one (a post with a cover keeps the cover).
  const og = root.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? '';
  if (!og.includes('/og/')) continue;
  const title = (root.querySelector('title')?.text ?? 'OpenTodo').replace(/\s*·\s*OpenTodo$/, '').replace(/^OpenTodo\s*·\s*/, '').trim();
  const description = root.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
  const out = ogFileFor(dist, pathname);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(cardSvg({ title, description, section: sectionOf(pathname) }))).png({ compressionLevel: 9 }).toFile(out);
  n++;
}
fs.rmSync(cacheDir, { recursive: true, force: true });
console.log(`social cards: ${n} rendered into ${path.relative(process.cwd(), path.join(dist, 'og'))}/`);
