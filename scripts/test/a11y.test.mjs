// The exceptions register, the contrast check from the bundle and the high-contrast
// transform (OpenSpec website-accessibility; change website-accessibility-aaa tasks 1.1, 1.2, 2.1).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import register from '../../src/lib/a11y-exceptions.json' with { type: 'json' };
import { PAIRS } from '../../src/lib/a11y-pairs.mjs';
import { contrastProblems, EXCEPTION_MIN, exceptionFor, parseColor, ratio, TEXT_MIN, tokenContrast, unlistedPairs } from '../checks/contrast.mjs';
import { hasHighContrast, highContrastCss } from '../high-contrast.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');

test('every register entry carries every field, a WCAG criterion and measured values for both themes', () => {
  assert.ok(register.length > 0);
  for (const e of register) {
    for (const k of ['id', 'criterion', 'where', 'reason', 'route']) assert.match(String(e[k] ?? ''), /\S/, `${e.id}: ${k}`);
    assert.match(e.criterion, /^\d\.\d\.\d+ /, e.id);
    assert.match(e.id, /^[a-z][a-z0-9-]*$/);
    assert.match(e.measured?.light ?? '', /\S/, `${e.id}: measured.light`);
    assert.match(e.measured?.dark ?? '', /\S/, `${e.id}: measured.dark`);
    for (const p of e.pairs ?? []) assert.ok(PAIRS.some(([fg, bg]) => fg === p.fg && (p.bg === '*' || bg === p.bg)), `${e.id}: pair ${p.fg} on ${p.bg} is not measured by a11y-pairs.mjs`);
  }
  assert.equal(new Set(register.map((e) => e.id)).size, register.length, 'unique ids');
  assert.equal(exceptionFor('on-accent', 'accent').id, 'accent-label');
  assert.equal(exceptionFor('text', 'canvas'), undefined);
});

const tokens = (light, dark) => `:root, [data-theme="light"] {\n${Object.entries(light).map(([k, v]) => `  --ot-${k}: ${v};`).join('\n')}\n}\n:root[data-theme="dark"], [data-theme="dark"] {\n${Object.entries(dark).map(([k, v]) => `  --ot-${k}: ${v};`).join('\n')}\n}\n`;
const base = { canvas: '#ffffff', surface: '#ffffff', raised: '#ffffff', sunken: '#f1f5f9', text: '#000000', 'text-strong': '#000000', muted: '#000000', accent: '#047857', 'accent-hover': '#065f46', 'on-accent': '#ffffff', 'accent-text': '#047857', 'accent-soft': '#ecfdf5', 'accent-soft-text': '#064e3b', 'warning-soft': '#fffbeb', 'warning-soft-text': '#78350f', coffee: '#ffdd00', 'on-coffee': '#000000' };
const dark = { ...base, canvas: '#000000', surface: '#000000', raised: '#000000', sunken: '#111111', text: '#ffffff', 'text-strong': '#ffffff', muted: '#ffffff', 'accent-text': '#34d399', 'accent-soft': '#022c22', 'accent-soft-text': '#a7f3d0', 'warning-soft': '#2a1a00', 'warning-soft-text': '#fde68a' };

test('an unregistered pair below 7:1 fails naming the pair, theme and ratio', () => {
  const css = tokens({ ...base, text: '#777777' }, dark);
  const { problems } = contrastProblems(css, [['text', 'canvas']], []);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /^text on canvas in light: 4\.\d\d:1, needs 7:1/);
});

test('a registered pair passes at 4.5:1 and fails below it, naming the entry', () => {
  const entries = [{ id: 'muted-tone', pairs: [{ fg: 'muted', bg: 'canvas' }] }];
  const ok = contrastProblems(tokens({ ...base, muted: '#6b7280' }, dark), [['muted', 'canvas']], entries);
  assert.deepEqual(ok.problems, [], 'about 4.8:1 passes as registered');
  const bad = contrastProblems(tokens({ ...base, muted: '#9ca3af' }, dark), [['muted', 'canvas']], entries);
  assert.equal(bad.problems.length, 1);
  assert.match(bad.problems[0], /muted on canvas in light: 2\.\d\d:1, needs 4\.5:1 \(register entry "muted-tone"\)/);
});

test('a registered entry whose pairs reach 7:1 in both themes is stale and fails', () => {
  const entries = [{ id: 'muted-tone', pairs: [{ fg: 'muted', bg: 'canvas' }] }];
  const { problems } = contrastProblems(tokens(base, dark), [['muted', 'canvas']], entries);
  assert.deepEqual(problems, ['register entry "muted-tone" is stale: every pair it lists measures 7:1 in light and dark; remove it from src/lib/a11y-exceptions.json']);
});

test('the pinned bundle passes with the current register, and the stylesheet uses no unmeasured pair', () => {
  const css = fs.readFileSync(path.join(ROOT, '.bundle/tokens/tokens.css'), 'utf8');
  const { problems } = contrastProblems(css);
  assert.deepEqual(problems, []);
  const { ALIASES } = { ALIASES: { '--text': 'text', '--muted': 'muted', '--bg': 'canvas', '--surface': 'surface', '--accent-text': 'accent-text', '--accent-soft': 'accent-soft' } };
  assert.deepEqual(unlistedPairs(fs.readFileSync(path.join(ROOT, 'src/styles/site.css'), 'utf8'), ALIASES), []);
  assert.deepEqual(unlistedPairs('.x { color: var(--muted); background: var(--accent-soft); }', ALIASES), ['muted on accent-soft']);
});

test('the colour resolver reads hex, oklch, var() and color-mix, and measures like WCAG', () => {
  assert.equal(ratio(parseColor('#000000'), parseColor('#ffffff')), 21);
  const white = parseColor('oklch(1 0 0)');
  assert.ok(Math.abs(white.r - 1) < 0.01 && Math.abs(white.b - 1) < 0.01);
  const t = { accent: 'oklch(0.5081 0.1049 165.61)', surface: '#ffffff', soft: 'color-mix(in oklab, var(--ot-accent) 10%, var(--ot-surface))', link: 'var(--ot-accent)' };
  assert.ok(Math.abs(tokenContrast(t, 'link', 'surface') - 5.48) < 0.05, 'emerald on white is 5.5:1');
  assert.ok(tokenContrast(t, 'link', 'soft') < tokenContrast(t, 'link', 'surface'), 'the tint lowers the contrast');
  assert.ok(TEXT_MIN === 7 && EXCEPTION_MIN === 4.5);
});

test('the high-contrast transform wraps the bundle blocks under prefers-contrast, and writes a note without them', () => {
  const without = fs.readFileSync(path.join(ROOT, '.bundle/tokens/tokens.css'), 'utf8');
  assert.equal(hasHighContrast(without), false);
  assert.match(highContrastCss(without, 'v0.9.0'), /carries no high-contrast tokens/);
  const withBlocks = `${without}\nhtml:root[data-contrast="high"], html[data-contrast="high"] [data-theme="light"] {\n  --ot-canvas: oklch(1 0 0);\n  --ot-text: oklch(0 0 0);\n}\nhtml:root[data-contrast="high"][data-theme="dark"], html[data-contrast="high"] [data-theme="dark"] {\n  --ot-canvas: oklch(0 0 0);\n  --ot-text: oklch(1 0 0);\n}\n`;
  const out = highContrastCss(withBlocks, 'v1.0.0');
  assert.equal(hasHighContrast(withBlocks), true);
  assert.match(out, /@media \(prefers-contrast: more\) \{\n  :root, \[data-theme="light"\] \{\n    --ot-canvas: oklch\(1 0 0\);/);
  assert.match(out, /:root\[data-theme="dark"\], \[data-theme="dark"\] \{\n    --ot-canvas: oklch\(0 0 0\);/);
});
