import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DICT, fill, leafPaths } from '../../src/i18n/dict.mjs';
import { LANGS, OTHER_LANGS, TRANSLATED_PAGES, alternatesFor, localePath, splitLang } from '../../src/i18n/index.mjs';

test('every language has the same strings as German', () => {
  const ref = leafPaths(DICT.de);
  for (const lang of OTHER_LANGS) {
    assert.deepEqual(leafPaths(DICT[lang]), ref, `${lang} differs from de`);
    for (const p of ref) {
      const v = p.split('.').reduce((o, k) => o[k], DICT[lang]);
      assert.ok(typeof v === 'string' && v.trim().length > 0, `${lang}.${p} is empty`);
    }
  }
  assert.ok(OTHER_LANGS.length + 1 <= 10, 'at most ten languages');
});

test('links in the answers stay on this site or the docs, and placeholders are known', () => {
  const known = new Set(['licence', 'version', 'demo', 'minimum', 'memory']);
  for (const lang of OTHER_LANGS) {
    for (const p of leafPaths(DICT[lang])) {
      const v = p.split('.').reduce((o, k) => o[k], DICT[lang]);
      for (const m of v.matchAll(/\{(\w+)\}/g)) assert.ok(known.has(m[1]), `${lang}.${p}: unknown placeholder {${m[1]}}`);
      for (const m of v.matchAll(/href="([^"]+)"/g)) assert.ok(m[1].startsWith('/') || m[1] === '{demo}', `${lang}.${p}: external link ${m[1]}`);
    }
  }
  assert.equal(fill('v {version} on {demo}', { version: '1', demo: 'd' }), 'v 1 on d');
});

test('paths split and join by language', () => {
  assert.deepEqual(splitLang('/de/cost/'), ['de', '/cost/']);
  assert.deepEqual(splitLang('/de/'), ['de', '/']);
  assert.deepEqual(splitLang('/about/'), ['en', '/about/']);
  assert.deepEqual(splitLang('/docs/x/'), ['en', '/docs/x/']);
  assert.equal(localePath('/cost/', 'fr'), '/fr/cost/');
  assert.equal(localePath('/', 'fr'), '/fr/');
  assert.equal(localePath('/cost/', 'en'), '/cost/');
  assert.equal(alternatesFor('/about/'), null);
  const alts = alternatesFor('/it/faq/');
  assert.equal(alts.length, Object.keys(LANGS).length);
  assert.equal(alts[0].href, '/faq/');
  assert.ok(TRANSLATED_PAGES.includes('/'));
});
