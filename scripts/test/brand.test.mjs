// The site's mark comes from the pinned bundle (brand-from-bundle).
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { brandIcons, touchIconPng } from '../../scripts/lib/brand.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/** A bundle folder holding only a brand/mark-colour.svg. */
function fakeBundle(svg) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'brand-test-'));
  fs.mkdirSync(path.join(dir, 'brand'));
  fs.writeFileSync(path.join(dir, 'brand', 'mark-colour.svg'), svg);
  return dir;
}
const MARK = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0f172a"/><path d="M8 32h48" stroke="#34d399" stroke-width="6"/></svg>';

test('the favicon is the bundle\'s colour mark byte for byte', () => {
  const { favicon, touchSvg } = brandIcons(fakeBundle(MARK));
  assert.equal(favicon.toString(), MARK);
  assert.doesNotMatch(touchSvg, / rx="/, 'the touch icon fills its square; iOS rounds it');
  assert.match(touchSvg, /width="180" height="180"/);
});

test('a bundle without the mark fails the build naming the file', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'brand-test-'));
  assert.throws(() => brandIcons(dir), /brand\/mark-colour\.svg/);
});

test('the touch icon is an opaque 180 px PNG whose corner is the slate square', async () => {
  const sharp = (await import('sharp')).default;
  const png = await touchIconPng(brandIcons(fakeBundle(MARK)).touchSvg);
  const meta = await sharp(png).metadata();
  assert.deepEqual([meta.width, meta.height, meta.hasAlpha], [180, 180, false]);
  const { data } = await sharp(png).raw().toBuffer({ resolveWithObject: true });
  assert.deepEqual([...data.subarray(0, 3)], [0x0f, 0x17, 0x2a]);
});

test('the site keeps no copy of the mark of its own', () => {
  const copies = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/^(favicon|apple-touch-icon|pwa-\d+|og|mark[-\w]*|icon-\d+)\.(svg|png|ico)$/.test(e.name)) copies.push(path.relative(root, p));
    }
  };
  walk(path.join(root, 'public'));
  assert.deepEqual(copies, [], `the mark comes from the bundle's brand/ folder; remove ${copies.join(', ')}`);
});

test('pages refer to the mark through URLs versioned by its hash', { skip: !fs.existsSync(path.resolve('dist/index.html')) && 'no dist/ (run npm run build first)' }, async () => {
  const { brandVersion } = await import('../lib/brand.mjs');
  const { resolveBundle } = await import('../lib/bundle.mjs');
  const v = brandVersion(resolveBundle().dir);
  const html = fs.readFileSync(path.resolve('dist/index.html'), 'utf8');
  assert.ok(html.includes(`rel="icon" href="/assets/favicon.svg?v=${v}"`), 'favicon link');
  assert.ok(html.includes(`rel="apple-touch-icon" href="/assets/apple-touch-icon.png?v=${v}"`), 'touch icon link');
  assert.ok(!/(src|href)="\/assets\/(favicon\.svg|apple-touch-icon\.png)"/.test(html), 'no unversioned reference');
});
