// Blog series pages (website-blog-series task 1.4). Runs over dist/ after a build; skipped
// when there is no build. Each published part carries the series label linking to its
// series page, that page lists the parts in order, and no series page exists without one.
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load } from '../checks/lib.mjs';

const dist = path.resolve('dist');
const built = fs.existsSync(path.join(dist, 'blog/index.html'));
const series = JSON.parse(fs.readFileSync(path.resolve('src/content/series.json'), 'utf8'));

test('series labels, series pages and part order agree', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  const parts = {};
  for (const slug of fs.readdirSync(path.join(dist, 'blog'))) {
    const file = path.join(dist, 'blog', slug, 'index.html');
    if (['page', 'category', 'series'].includes(slug) || !fs.existsSync(file)) continue;
    const label = load(file).querySelector('.post-series a');
    if (!label) continue;
    const m = /^\/blog\/series\/([^/]+)\/$/.exec(label.getAttribute('href'));
    assert.ok(m && series[m[1]], `${slug}: the label links a known series page`);
    const n = Number(/· Part (\d+)$/.exec(label.text.trim())?.[1]);
    assert.ok(label.text.startsWith(series[m[1]].title) && n > 0, `${slug}: "${label.text}"`);
    (parts[m[1]] ??= []).push([n, `/blog/${slug}/`]);
  }
  const pages = fs.existsSync(path.join(dist, 'blog/series')) ? fs.readdirSync(path.join(dist, 'blog/series')) : [];
  assert.deepEqual(pages.sort(), Object.keys(parts).sort(), 'a series page exactly for each series with a published part');
  for (const [id, list] of Object.entries(parts)) {
    const root = load(path.join(dist, 'blog/series', id, 'index.html'));
    assert.equal(root.querySelector('h1').text.trim(), series[id].title);
    const rows = root.querySelectorAll('.post-row-title a').map((a) => a.getAttribute('href'));
    assert.deepEqual(rows, list.sort((a, b) => a[0] - b[0]).map(([, href]) => href), `${id}: parts in order`);
  }
});
