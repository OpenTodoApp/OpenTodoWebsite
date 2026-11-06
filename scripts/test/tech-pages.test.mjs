// The technical pages (website-security-page, website-under-the-hood): their groups of links,
// each to a built page or another site, and the footer links to them. Runs over dist/.
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load } from '../checks/lib.mjs';

const dist = path.resolve('dist');
const built = (p) => fs.existsSync(path.join(dist, p, 'index.html'));

test('the Security page has its four groups and the footer links it', { skip: !built('security') && 'no dist/ (run npm run build first)' }, () => {
  const root = load(path.join(dist, 'security/index.html'));
  for (const id of ['report', 'protect', 'verify', 'model']) assert.ok(root.querySelector(`#${id} .rows li`), `#${id}`);
  assert.ok(root.querySelector('#report a[href$="/security/advisories/new"]'), 'private reporting');
  assert.ok(root.querySelector('#verify a[href="/docs/self-hosting/docker/#verifying-the-image-and-downloads"]'), 'image verification');
  for (const href of ['/docs/security/threat-model/', '/docs/security/how-we-verify/', '/docs/security/limits/', '/docs/security/review-scope/']) {
    assert.ok(root.querySelector(`#model a[href="${href}"]`), href);
  }
  assert.ok(root.querySelector('#model a[href$="/SECURITY.md#what-to-expect"]'), 'disclosure policy');
  assert.ok(load(path.join(dist, 'index.html')).querySelector('footer a[href="/security/"]'), 'footer');
});

test('Under the hood links how it works, building on it, promises, security and releases', { skip: !built('under-the-hood') && 'no dist/ (run npm run build first)' }, () => {
  const root = load(path.join(dist, 'under-the-hood/index.html'));
  for (const [id, href] of [['how-it-works', '/docs/architecture/'], ['how-it-works', '/docs/sync/'], ['build', '/docs/api/'], ['build', '/docs/mcp/'], ['promises', '/docs/stability/'], ['promises', '/docs/performance/'], ['promises', '/changelog/'], ['security', '/security/'], ['releases', '/docs/self-hosting/docker/#verifying-the-image-and-downloads']]) {
    assert.ok(root.querySelector(`#${id} a[href="${href}"]`), `#${id} links ${href}`);
  }
  assert.ok(root.querySelector('#promises a[href$="/ROADMAP.md"]'), 'roadmap');
  assert.ok(load(path.join(dist, 'index.html')).querySelector('footer a[href="/under-the-hood/"]'), 'footer');
  assert.ok(!fs.existsSync(path.join(dist, 'developers/index.html')), '/developers/ is a redirect now');
});
