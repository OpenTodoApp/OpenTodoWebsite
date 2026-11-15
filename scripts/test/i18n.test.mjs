import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DICT, fill, leafPaths } from '../../src/i18n/dict.mjs';
import en from '../../src/i18n/en.mjs';
import { GERMAN_PAGES, LANGS, OTHER_LANGS, TRANSLATED_PAGES, alternatesFor, localHref, localePath, splitLang } from '../../src/i18n/index.mjs';

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

// The translated home pages render the English page's component (website-home-languages D1),
// so each language's home strings have exactly the English shape.
test('every home page has the English home strings', () => {
  const ref = leafPaths(en.home);
  for (const lang of OTHER_LANGS) assert.deepEqual(leafPaths(DICT[lang].home), ref, `${lang}.home differs from en.home`);
});

// The phone apps page renders one component in every language (phone-apps-page D1).
test('every phone apps page has the English apps strings', () => {
  const ref = leafPaths(en.apps);
  for (const lang of OTHER_LANGS) assert.deepEqual(leafPaths(DICT[lang].apps), ref, `${lang}.apps differs from en.apps`);
});

test('links in the answers stay on this site or the docs, and placeholders are known', () => {
  const known = new Set(['licence', 'version', 'demo', 'minimum', 'memory', 'count', 'groups']);
  for (const [lang, dict] of [...OTHER_LANGS.map((l) => [l, DICT[l]]), ['en', en]]) {
    for (const p of leafPaths(dict)) {
      const v = p.split('.').reduce((o, k) => o[k], dict);
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
  const alts = alternatesFor('/it/');
  assert.equal(alts.length, Object.keys(LANGS).length);
  assert.equal(alts[0].href, '/');
  assert.deepEqual(TRANSLATED_PAGES['/'], OTHER_LANGS);
  assert.deepEqual(TRANSLATED_PAGES['/apps/'], OTHER_LANGS);
  assert.equal(alternatesFor('/de/apps/').find((a) => a.lang === 'fr').href, '/fr/apps/');
  assert.equal(alternatesFor('/it/faq/'), null);
});

// german-pages D1: a page may exist in English and German only.
test('pages in English and German only have alternates for those two', () => {
  for (const p of ['/self-host/', '/de/self-host/']) {
    assert.deepEqual(alternatesFor(p).map((a) => a.lang), ['en', 'de'], p);
  }
  assert.equal(alternatesFor('/fr/self-host/'), null);
  assert.equal(alternatesFor('/').length, Object.keys(LANGS).length);
  for (const p of GERMAN_PAGES) assert.deepEqual(TRANSLATED_PAGES[p], ['de'], p);
});

test('links from a German page lead to German pages where they exist', () => {
  assert.equal(localHref('/install/', 'de'), '/de/install/');
  assert.equal(localHref('/start/#run', 'de'), '/de/start/#run');
  assert.equal(localHref('/about/', 'de'), '/about/');
  assert.equal(localHref('/docs/import/', 'de'), '/docs/import/');
  assert.equal(localHref('/install/', 'fr'), '/install/');
  assert.equal(localHref('/install/', 'en'), '/install/');
  assert.equal(localHref('https://example.org/', 'de'), 'https://example.org/');
});

test('the German path lists every feature group and platform', async () => {
  const fs = await import('node:fs');
  const groups = [...fs.readFileSync(new URL('../../src/lib/features.ts', import.meta.url), 'utf8').matchAll(/\{ key: '([a-z-]+)', title:/g)].map((m) => m[1]);
  const { PLATFORMS } = await import('../../src/lib/install.ts');
  assert.ok(groups.length > 0 && PLATFORMS.length > 0);
  for (const k of groups) assert.ok(GERMAN_PAGES.includes(`/features/${k}/`), `GERMAN_PAGES lacks /features/${k}/`);
  for (const p of PLATFORMS) assert.ok(GERMAN_PAGES.includes(`/install/${p.slug}/`), `GERMAN_PAGES lacks /install/${p.slug}/`);
});

// german-pages: the German path's strings, data twins and switch guides.
test('the German path strings have the English shape and safe links', async () => {
  const { PATH } = await import('../../src/i18n/path/index.mjs');
  assert.deepEqual(leafPaths(PATH.de), leafPaths(PATH.en), 'src/i18n/path/de.mjs differs from en.mjs');
  for (const [lang, dict] of Object.entries(PATH)) {
    for (const p of leafPaths(dict)) {
      const v = p.split('.').reduce((o, k) => o[k], dict);
      assert.ok(typeof v === 'string' && v.trim().length > 0, `path ${lang}.${p} is empty`);
      for (const m of v.matchAll(/href="([^"]+)"/g)) {
        const to = m[1];
        assert.ok(to.startsWith('/') || to.startsWith('{') || to.startsWith('https://github.com/OpenTodoApp/'), `path ${lang}.${p}: external link ${to}`);
        // A German string links a page's German version when it has one.
        if (lang === 'de' && TRANSLATED_PAGES[to.split('#')[0]]?.includes('de')) assert.fail(`path de.${p}: links ${to}; use ${localHref(to, 'de')}`);
      }
    }
  }
});

test('every feature, group, platform and deploy target has a German twin', async () => {
  const fs = await import('node:fs');
  const src = fs.readFileSync(new URL('../../src/lib/features.ts', import.meta.url), 'utf8');
  const { FEATURES_DE, GROUPS_DE } = await import('../../src/lib/features.de.ts');
  for (const [, doc] of src.matchAll(/doc: '([^']+)'/g)) assert.ok(FEATURES_DE[doc], `feature ${doc} has no German twin in src/lib/features.de.ts`);
  for (const [, key] of src.matchAll(/\{ key: '([a-z-]+)', title:/g)) assert.ok(GROUPS_DE[key], `feature group ${key} has no German title`);
  const { PLATFORMS } = await import('../../src/lib/install.ts');
  const { PLATFORMS_DE, TARGETS_DE } = await import('../../src/lib/install.de.ts');
  for (const p of PLATFORMS) {
    assert.ok(PLATFORMS_DE[p.slug], `platform ${p.slug} has no German twin in src/lib/install.de.ts`);
    assert.equal(PLATFORMS_DE[p.slug].steps.length, p.steps.length, `platform ${p.slug}: the German steps differ in number`);
  }
  const start = fs.readFileSync(new URL('../../src/lib/start.ts', import.meta.url), 'utf8');
  for (const [, slug] of start.matchAll(/\['[^']+', '([a-z0-9-]+)', '[^']+'\]/g)) assert.ok(TARGETS_DE[slug], `deploy target ${slug} has no German text`);
});

test('every German switch guide states the facts of its English guide', async () => {
  const fs = await import('node:fs');
  const { parse } = await import('yaml');
  const dir = new URL('../../src/content/switch/', import.meta.url);
  const fm = (f) => parse(fs.readFileSync(new URL(f, dir), 'utf8').split('---')[1]);
  const german = fs.readdirSync(new URL('de/', dir)).filter((f) => f.endsWith('.md'));
  assert.deepEqual(german.sort(), ['microsoft-todo.md', 'things.md', 'todoist.md']);
  for (const f of german) {
    const en = fm(f), de = fm(`de/${f}`);
    assert.equal(de.lang, 'de', `de/${f}: lang`);
    for (const k of ['app', 'checkedOn', 'importFormat', 'order']) assert.equal(String(de[k]), String(en[k]), `de/${f}: ${k} differs from the English guide`);
    assert.deepEqual(de.sources, en.sources, `de/${f}: sources differ from the English guide`);
    for (const k of ['keeps', 'drops', 'terms']) assert.equal(de[k].length, en[k].length, `de/${f}: ${k} has ${de[k].length} items, the English guide ${en[k].length}`);
    assert.ok(GERMAN_PAGES.includes(`/switch/${f.replace('.md', '')}/`), `de/${f} is not in GERMAN_PAGES`);
  }
});
