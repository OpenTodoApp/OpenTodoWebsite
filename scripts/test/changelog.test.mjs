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

test('the footer and the release posts link the changelog', { skip: !built && 'no dist/ (run npm run build first)' }, () => {
  assert.ok(load(path.join(dist, 'index.html')).querySelector('footer a[href="/changelog/"]'), 'footer');
  const post = load(path.join(dist, 'blog/opentodo-0-22-0/index.html'));
  assert.ok(post.querySelector('a[href="/changelog/#v0-22-0"]'), 'release post');
});
