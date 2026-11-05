// The catalog (website-catalog): Features and Learn share one layout and one search index.
// Runs over dist/ after a build; skipped when there is no build.
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load } from '../checks/lib.mjs';

const dist = path.resolve('dist');
const built = fs.existsSync(path.join(dist, 'search.json'));

test('Features and Learn use the same catalog layout and search box', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  for (const page of ['features/index.html', 'features/plan/index.html', 'learn/index.html', 'learn/how-tos/index.html', 'learn/topic/task-management/index.html']) {
    const root = load(path.join(dist, page));
    assert.ok(root.querySelector('.catalog-rail'), `${page}: rail`);
    assert.ok(root.querySelector('#catalog-q'), `${page}: search`);
    assert.ok(root.querySelector('.catalog-rows li a'), `${page}: rows`);
  }
  const overview = load(path.join(dist, 'features/index.html'));
  assert.ok(overview.querySelector('#plan a.catalog-more[href="/features/plan/"]'), 'overview links each group');
});

test('the search index holds features, Learn entries and docs pages, each with an address on this site', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  const index = JSON.parse(fs.readFileSync(path.join(dist, 'search.json'), 'utf8'));
  const kinds = new Set(index.map((e) => e.k.split(' · ')[0]));
  for (const k of ['Feature', 'How-to', 'Template', 'Docs']) assert.ok(kinds.has(k), `has ${k}`);
  for (const e of index) {
    assert.ok(e.t && e.u.startsWith('/'), `${e.t}: title and site address`);
    const file = path.join(dist, e.u.split('#')[0], 'index.html');
    assert.ok(fs.existsSync(file), `${e.u} is built`);
  }
  assert.ok(fs.statSync(path.join(dist, 'search.json')).size < 120_000, 'index stays small');
});
