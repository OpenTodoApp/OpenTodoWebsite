// The press kit lists the pinned bundle's brand files, and only those (press-kit D2).
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { pressKit } from '../../scripts/lib/presskit.mjs';

const BASIC = ['mark.svg', 'mark-mono.svg', 'mark-colour.svg', 'wordmark.svg', 'icon-512.png'];
const KIT = [
  'README.md',
  ...['mark-on-light', 'mark-on-dark', 'mark-black', 'mark-white', 'mark-colour', 'mark-colour-square', 'lockup-on-light', 'lockup-on-dark'].map((n) => `svg/${n}.svg`),
  ...[16, 32, 48, 64, 128, 180, 192, 256, 512, 1024].map((s) => `png/icon-${s}.png`),
  ...['on-light', 'on-dark', 'black', 'white'].flatMap((v) => [256, 512, 1024].map((s) => `png/mark-${v}-${s}.png`)),
  ...['on-light', 'on-dark'].flatMap((v) => [`png/lockup-${v}-852x192.png`, `png/lockup-${v}-1704x384.png`]),
  'png/avatar-512.png', 'png/github-social-preview-1280x640.png', 'png/og-default-1200x630.png',
];

/** A bundle folder holding brand/ with the given files (each a few bytes). */
function fakeBundle(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'presskit-'));
  for (const f of files) {
    fs.mkdirSync(path.dirname(path.join(dir, 'brand', f)), { recursive: true });
    fs.writeFileSync(path.join(dir, 'brand', f), 'x'.repeat(2048));
  }
  return dir;
}
const hrefs = (kit) => kit.groups.flatMap((g) => g.items.flatMap((i) => [i.preview, ...i.files.map((f) => f.href)].filter(Boolean)));

test('with the brand kit, every kit file is offered and every link names a bundle file', () => {
  const dir = fakeBundle([...BASIC, ...KIT.map((f) => `kit/${f}`)]);
  const kit = pressKit(dir);
  assert.equal(kit.full, true);
  assert.deepEqual(kit.groups.map((g) => g.id), ['lockup', 'mark', 'icon', 'social', 'readme']);
  const offered = new Set(kit.groups.flatMap((g) => g.items.flatMap((i) => i.files.map((f) => f.href))));
  for (const f of KIT) assert.ok(offered.has(`/brand/kit/${f}`), `${f} is offered`);
  for (const h of hrefs(kit)) assert.ok(fs.existsSync(path.join(dir, h.replace(/^\//, ''))), `${h} exists in the bundle`);
  const dark = kit.groups.find((g) => g.id === 'lockup').items.find((i) => i.id === 'lockup-on-dark');
  assert.equal(dark.background, 'dark');
  assert.deepEqual(dark.files.map((f) => f.label), ['SVG', 'PNG 852 × 192', 'PNG 1704 × 384']);
  assert.match(dark.files[0].size, /^2 KB$/);
});

test('with an older bundle, only the brand files it has are offered', () => {
  const dir = fakeBundle(BASIC);
  const kit = pressKit(dir);
  assert.equal(kit.full, false);
  const offered = kit.groups.flatMap((g) => g.items.flatMap((i) => i.files.map((f) => f.href))).sort();
  assert.deepEqual(offered, ['/brand/icon-512.png', '/brand/mark-colour.svg', '/brand/mark-mono.svg', '/brand/wordmark.svg']);
  for (const h of hrefs(kit)) assert.ok(fs.existsSync(path.join(dir, h.replace(/^\//, ''))), `${h} exists in the bundle`);
});

test('a bundle without brand/ fails the build naming the folder', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'presskit-'));
  assert.throws(() => pressKit(dir), /brand\//);
});

test('every preview has its own alt text', () => {
  for (const files of [BASIC, [...BASIC, ...KIT.map((f) => `kit/${f}`)]]) {
    for (const g of pressKit(fakeBundle(files)).groups) for (const i of g.items) {
      if (!i.preview) continue;
      assert.match(i.alt, /^(The |OpenTodo)/, `${i.id} has alt text`);
      assert.doesNotMatch(i.alt, /\bthe OpenTodo the\b/i, i.id);
    }
  }
});
