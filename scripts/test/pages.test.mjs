// The browser checks visit one page per template on pull requests, every page on
// main, and the changed pages of a content-only pull request (ci-fast-checks D1, D2).
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { browserPages, changedPages, pageHashes, routeOf, routes, samplePages, sitePages } from '../../scripts/lib/pages.mjs';

/** A src/pages folder with the given templates and a dist/ with the given pages (url → HTML). */
function fakeSite(templates, pages) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'pages-'));
  for (const t of templates) {
    fs.mkdirSync(path.dirname(path.join(root, 'src/pages', t)), { recursive: true });
    fs.writeFileSync(path.join(root, 'src/pages', t), '---\n---\n');
  }
  for (const [url, html] of Object.entries(pages)) {
    fs.mkdirSync(path.join(root, 'dist', url), { recursive: true });
    fs.writeFileSync(path.join(root, 'dist', url, 'index.html'), html);
  }
  return { dist: path.join(root, 'dist'), src: path.join(root, 'src/pages') };
}

const TEMPLATES = ['index.astro', 'about.astro', '[lang]/index.astro', 'blog/index.astro', 'blog/[slug].astro', 'blog/page/[n].astro', 'guides/quiz/index.astro', 'guides/quiz/[...answers].astro', 'feed.xml.ts'];
const PAGES = {
  '/': 'home', '/it/': 'casa', '/de/': 'haus', '/about/': 'about',
  '/blog/': 'index', '/blog/short/': 'a', '/blog/long/': 'a much longer post', '/blog/page/2/': 'p2',
  '/guides/quiz/': 'start', '/guides/quiz/a/': 'a', '/guides/quiz/a/b/': 'ab', '/docs/x/': 'docs',
};

test('each URL belongs to its most specific template', () => {
  const { src } = fakeSite(TEMPLATES, {});
  const all = routes(src);
  assert.equal(routeOf('/', all).file, 'index.astro');
  assert.equal(routeOf('/about/', all).file, 'about.astro');
  assert.equal(routeOf('/it/', all).file, '[lang]/index.astro');
  assert.equal(routeOf('/blog/', all).file, 'blog/index.astro');
  assert.equal(routeOf('/blog/page/2/', all).file, 'blog/page/[n].astro');
  assert.equal(routeOf('/guides/quiz/', all).file, 'guides/quiz/index.astro');
  assert.equal(routeOf('/guides/quiz/a/b/', all).file, 'guides/quiz/[...answers].astro');
  assert.equal(routeOf('/nowhere/deep/', all), undefined);
});

test('the sample has the largest page of each template, every home page, and no docs', () => {
  const { dist, src } = fakeSite(TEMPLATES, PAGES);
  assert.deepEqual(samplePages(dist, src), ['/', '/about/', '/blog/', '/blog/long/', '/blog/page/2/', '/de/', '/guides/quiz/', '/guides/quiz/a/b/', '/it/']);
  assert.ok(!sitePages(dist).includes('/docs/x/'));
});

test('a new template joins the sample without a change to the checks', () => {
  const { dist, src } = fakeSite([...TEMPLATES, 'press/[kit].astro'], { ...PAGES, '/press/one/': 'x', '/press/two/': 'xy' });
  assert.ok(samplePages(dist, src).includes('/press/two/'));
});

test('a page no template accounts for is always in the sample', () => {
  const { dist, src } = fakeSite(TEMPLATES, { ...PAGES, '/stray/page/': 'x' });
  assert.ok(samplePages(dist, src).includes('/stray/page/'));
});

test('changed pages are the new ones and those whose HTML differs', () => {
  const { dist } = fakeSite(TEMPLATES, PAGES);
  const base = pageHashes(dist);
  fs.writeFileSync(path.join(dist, 'blog/short/index.html'), 'edited');
  fs.mkdirSync(path.join(dist, 'blog/new'));
  fs.writeFileSync(path.join(dist, 'blog/new/index.html'), 'new');
  assert.deepEqual(changedPages(dist, base), ['/blog/new/', '/blog/short/']);
});

test('BROWSER_PAGES picks all, the sample or a list of built pages', () => {
  const { dist, src } = fakeSite(TEMPLATES, PAGES);
  assert.equal(browserPages({ BROWSER_PAGES: 'all' }, dist, src).length, 11);
  assert.deepEqual(browserPages({}, dist, src), samplePages(dist, src));
  const list = path.join(path.dirname(dist), 'list.txt');
  fs.writeFileSync(list, '/blog/short/\n/gone/\n\n');
  assert.deepEqual(browserPages({ BROWSER_PAGES: 'list', BROWSER_PAGES_FILE: list }, dist, src), ['/blog/short/']);
  assert.throws(() => browserPages({ BROWSER_PAGES: 'some' }, dist, src), /all, sample or list/);
});
