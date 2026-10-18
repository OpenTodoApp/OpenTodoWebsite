// Proof figures come from the manifest only (website-maintainer-and-proof D1).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { proofFigures } from '../../src/lib/proof.mjs';

const repo = 'https://github.com/pixari/opentodo';
const keys = ['license', 'specCount', 'docsPages', 'importFormatCount'];

test('the four figures of the 0.7.0 manifest, each with where to check it', () => {
  const f = proofFigures({ license: 'AGPL-3.0', specCount: 78, docsPages: 115, importFormatCount: 10 }, keys, repo);
  assert.deepEqual(f.map((x) => `${x.value} ${x.caption}`), ['AGPL-3.0 licence', '78 published specifications', '115 documentation pages', '10 import formats']);
  assert.equal(f[1].href, `${repo}/tree/main/openspec/specs`);
  assert.equal(f[3].href, '/docs/import/');
});

test('a figure the manifest lacks is left out', () => {
  const f = proofFigures({ license: 'AGPL-3.0', docsPages: 115 }, keys, repo);
  assert.deepEqual(f.map((x) => x.key), ['license', 'docsPages']);
});

test('the pinned bundle carries the figures the strip shows', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const { resolveBundle, normalizeManifest } = await import('../lib/bundle.mjs');
  const dir = resolveBundle().dir;
  const facts = normalizeManifest(JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'))).facts;
  // A renamed manifest field would make every figure disappear without a build error.
  assert.ok(proofFigures(facts, keys, repo).length > 1, `the pinned manifest has none of ${keys.join(', ')}`);
});
