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
  for (const id of ['report', 'protect', 'verify', 'coming']) assert.ok(root.querySelector(`#${id} .rows li`), `#${id}`);
  assert.ok(root.querySelector('#report a[href$="/security/advisories/new"]'), 'private reporting');
  assert.ok(root.querySelector('#verify a[href="/docs/self-hosting/docker/#verifying-the-image-and-downloads"]'), 'image verification');
  assert.ok(load(path.join(dist, 'index.html')).querySelector('footer a[href="/security/"]'), 'footer');
});
