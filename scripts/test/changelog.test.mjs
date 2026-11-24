// The changelog page (website-changelog): one section per released version of the pinned
// bundle's changelog.json, each with its anchor, date and summary; release posts and the
// footer link it. Runs over dist/ after a build; skipped when there is no build.
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load } from '../checks/lib.mjs';
import { normalizeChangelog, resolveBundle } from '../lib/bundle.mjs';

const dist = path.resolve('dist');
const built = fs.existsSync(path.join(dist, 'changelog/index.html'));
const anchor = (v) => `v${v.replace(/\./g, '-')}`;

test('every released version has its section with an anchor, date and summary', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  const releases = normalizeChangelog(JSON.parse(fs.readFileSync(path.join(resolveBundle().dir, 'changelog.json'), 'utf8')));
  const root = load(path.join(dist, 'changelog/index.html'));
  const sections = root.querySelectorAll('section.release');
  assert.equal(sections.length, releases.length);
  releases.forEach((r, i) => {
    assert.equal(sections[i].getAttribute('id'), anchor(r.version), `${r.version}: anchor and order`);
    assert.equal(sections[i].querySelector('time').getAttribute('datetime'), r.date, `${r.version}: date`);
    if (r.summary) assert.ok(sections[i].querySelector('.release-summary'), `${r.version}: summary`);
  });
  assert.ok(sections[0].querySelector('details[open]'), 'the latest release is open');
});

test('every older release links its own page, which holds every change', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  const releases = normalizeChangelog(JSON.parse(fs.readFileSync(path.join(resolveBundle().dir, 'changelog.json'), 'utf8')));
  const sections = load(path.join(dist, 'changelog/index.html')).querySelectorAll('section.release');
  releases.forEach((r, i) => {
    if (!r.sections.length) return;
    const count = r.sections.reduce((n, s) => n + s.items.length, 0);
    const file = path.join(dist, 'changelog', anchor(r.version), 'index.html');
    assert.ok(fs.existsSync(file), `${r.version}: its page is built`);
    const page = load(file);
    assert.equal(page.querySelectorAll('.release-changes li').length, count, `${r.version}: every change on its page`);
    assert.equal(page.querySelectorAll('.release-changes h3').length, r.sections.length, `${r.version}: every section on its page`);
    if (i > 0) {
      assert.ok(sections[i].querySelector(`a[href="/changelog/${anchor(r.version)}/"]`), `${r.version}: linked from the changelog`);
      assert.equal(sections[i].querySelector('details'), null, `${r.version}: no list inline`);
    }
  });
  assert.ok(fs.statSync(path.join(dist, 'changelog/index.html')).size < 250_000, 'the changelog stays under 250 KB');
});

test('the footer and the release posts link the changelog', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  assert.ok(load(path.join(dist, 'index.html')).querySelector('footer a[href="/changelog/"]'), 'footer');
  const post = load(path.join(dist, 'blog/opentodo-0-22-0/index.html'));
  assert.ok(post.querySelector('a[href="/changelog/#v0-22-0"]'), 'release post');
});
