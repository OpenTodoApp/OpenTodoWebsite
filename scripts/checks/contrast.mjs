#!/usr/bin/env node
// Contrast measured from the bundle (OpenSpec website-accessibility "Contrast measured
// from the bundle"; design D2). Every text and background pair the stylesheet uses
// (src/lib/a11y-pairs.mjs) is resolved from the pinned bundle's tokens.css in light and
// dark and measured as WCAG 2.2 contrast: an unregistered pair below 7:1 fails, a pair
// in the exceptions register (src/lib/a11y-exceptions.json) below 4.5:1 fails, and a
// registered pair that now measures 7:1 in both themes fails as stale, so an exception a
// newer release has removed cannot stay in the statement. Runs in `prebuild`.
//
//   node scripts/checks/contrast.mjs [path/to/tokens.css]
import fs from 'node:fs';
import path from 'node:path';
import { PAIRS } from '../../src/lib/a11y-pairs.mjs';
import register from '../../src/lib/a11y-exceptions.json' with { type: 'json' };

export const TEXT_MIN = 7;
export const EXCEPTION_MIN = 4.5;

// ---- colours: hex, rgb(), oklch(), var() and color-mix() in oklab or oklch ----

const clamp = (v) => Math.min(1, Math.max(0, v));
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const fromLin = (c) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);

function oklabToRgb(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b, m_ = L - 0.1055613458 * a - 0.0638541728 * b, s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return {
    r: clamp(fromLin(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)),
    g: clamp(fromLin(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s)),
    b: clamp(fromLin(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)),
  };
}
function rgbToOklab({ r, g, b }) {
  const lr = toLin(r), lg = toLin(g), lb = toLin(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return { L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s };
}

/** Splits a function's arguments at top-level commas. */
function args(inner) {
  const out = []; let depth = 0, cur = '';
  for (const ch of inner) {
    if (ch === '(') depth++; else if (ch === ')') depth--;
    if (ch === ',' && depth === 0) { out.push(cur.trim()); cur = ''; } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/**
 * Parses a colour value to { r, g, b, a } in 0–1; `lookup` resolves var(--x).
 * @param {string} value
 * @param {(name: string) => string | undefined} [lookup]
 * @param {number} [depth]
 * @returns {{ r: number, g: number, b: number, a: number }}
 */
export function parseColor(value, lookup = () => undefined, depth = 0) {
  if (depth > 20) throw new Error(`token loop in ${value}`);
  let v = value.trim();
  const varMatch = /^var\((--[\w-]+)(?:,\s*([\s\S]+))?\)$/.exec(v);
  if (varMatch) {
    const inner = lookup(varMatch[1]);
    if (inner === undefined) { if (varMatch[2]) return parseColor(varMatch[2], lookup, depth + 1); throw new Error(`unknown token ${varMatch[1]}`); }
    return parseColor(inner, lookup, depth + 1);
  }
  // Replace nested var() so the parsers below see literals.
  v = v.replace(/var\((--[\w-]+)(?:,\s*([^()]+))?\)/g, (_, name, fb) => lookup(name) ?? fb ?? (() => { throw new Error(`unknown token ${name}`); })());
  if (/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(v)) {
    const n = (i) => parseInt(v.slice(i, i + 2), 16) / 255;
    return { r: n(1), g: n(3), b: n(5), a: v.length === 9 ? n(7) : 1 };
  }
  if (/^#[0-9a-f]{3,4}$/i.test(v)) {
    const n = (i) => parseInt(v[i] + v[i], 16) / 255;
    return { r: n(1), g: n(2), b: n(3), a: v.length === 5 ? n(4) : 1 };
  }
  let m = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[/,]\s*([\d.]+%?))?\s*\)$/.exec(v);
  if (m) return { r: +m[1] / 255, g: +m[2] / 255, b: +m[3] / 255, a: m[4] === undefined ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : +m[4] };
  m = /^oklch\(\s*([\d.]+%?)\s+([\d.]+%?)\s+([\d.]+)(?:deg)?(?:\s*\/\s*([\d.]+%?))?\s*\)$/.exec(v);
  if (m) {
    const L = m[1].endsWith('%') ? parseFloat(m[1]) / 100 : +m[1];
    const C = m[2].endsWith('%') ? parseFloat(m[2]) / 100 * 0.4 : +m[2];
    const h = (+m[3] * Math.PI) / 180;
    const a = m[4] === undefined ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : +m[4];
    return { ...oklabToRgb(L, C * Math.cos(h), C * Math.sin(h)), a };
  }
  m = /^color-mix\(in (oklab|oklch|srgb)\s*,\s*([\s\S]+)\)$/.exec(v);
  if (m) {
    const [x, y] = args(m[2]).map((part) => {
      const pm = /^([\s\S]+?)\s+([\d.]+)%$/.exec(part);
      return { c: parseColor(pm ? pm[1] : part, lookup, depth + 1), p: pm ? parseFloat(pm[2]) / 100 : undefined };
    });
    const px = x.p ?? (y.p === undefined ? 0.5 : 1 - y.p), py = y.p ?? 1 - px;
    const t = py / (px + py);
    if (m[1] === 'srgb') return { r: x.c.r + (y.c.r - x.c.r) * t, g: x.c.g + (y.c.g - x.c.g) * t, b: x.c.b + (y.c.b - x.c.b) * t, a: x.c.a + (y.c.a - x.c.a) * t };
    const A = rgbToOklab(x.c), B = rgbToOklab(y.c);
    if (m[1] === 'oklch') {
      const lch = (o) => ({ L: o.L, C: Math.hypot(o.a, o.b), h: Math.atan2(o.b, o.a) });
      const la = lch(A), lb = lch(B);
      let dh = lb.h - la.h; if (dh > Math.PI) dh -= 2 * Math.PI; if (dh < -Math.PI) dh += 2 * Math.PI;
      const L = la.L + (lb.L - la.L) * t, C = la.C + (lb.C - la.C) * t, h = la.h + dh * t;
      return { ...oklabToRgb(L, C * Math.cos(h), C * Math.sin(h)), a: x.c.a + (y.c.a - x.c.a) * t };
    }
    return { ...oklabToRgb(A.L + (B.L - A.L) * t, A.a + (B.a - A.a) * t, A.b + (B.b - A.b) * t), a: x.c.a + (y.c.a - x.c.a) * t };
  }
  const named = { white: '#ffffff', black: '#000000', transparent: '#00000000' }[v.toLowerCase()];
  if (named) return parseColor(named, lookup, depth + 1);
  throw new Error(`cannot read colour "${value}"`);
}

const over = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
const luminance = ({ r, g, b }) => 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
export function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

// ---- the bundle's tokens ----

/** The declarations of the block that follows `selector` in a stylesheet, as { name: value } without the --ot- prefix. */
export function tokenBlock(css, selector) {
  const at = css.indexOf(selector);
  if (at < 0) throw new Error(`token block not found: ${selector}`);
  const open = css.indexOf('{', at);
  let depth = 0, end = -1;
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}' && --depth === 0) { end = i; break; }
  }
  return Object.fromEntries([...css.slice(open + 1, end).matchAll(/--ot-([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
}

/** Light and dark token maps of a bundle's tokens.css (the dark block by attribute, identical to the media one). */
export function themesOf(css) {
  return {
    light: tokenBlock(css, ':root, [data-theme="light"] {'),
    dark: tokenBlock(css, ':root[data-theme="dark"], [data-theme="dark"] {'),
  };
}

/** Whether a bundle's tokens.css carries the app's high-contrast override blocks. */
export const hasHighContrast = (css) => css.includes('[data-contrast="high"]');

/** Contrast of token `fg` over token `bg` in a token map; a translucent fg is composited over bg, bg over white. */
export function tokenContrast(tokens, fg, bg) {
  const lookup = (name) => tokens[name.replace(/^--ot-/, '')];
  // A pair may name a literal colour (a brand colour the site draws itself) instead of a token.
  const value = (name) => (name.startsWith('#') ? name : tokens[name]);
  let back = parseColor(value(bg), lookup);
  if (back.a < 1) back = over(back, { r: 1, g: 1, b: 1, a: 1 });
  let front = parseColor(value(fg), lookup);
  if (front.a < 1) front = over(front, back);
  return ratio(front, back);
}

// ---- the rules ----

export function exceptionFor(fg, bg, entries = register) {
  return entries.find((e) => e.pairs?.some((p) => p.fg === fg && (p.bg === '*' || p.bg === bg)));
}

/**
 * Problems of a bundle's tokens against the pairs and the register: unregistered pairs
 * under 7:1, registered pairs under 4.5:1, registered entries whose every pair is at
 * 7:1 in both themes (stale), and pairs naming tokens the bundle lacks.
 */
export function contrastProblems(css, pairs = PAIRS, entries = register) {
  const themes = themesOf(css);
  const out = [];
  const measured = new Map();
  for (const [fg, bg] of pairs) {
    for (const [theme, tokens] of Object.entries(themes)) {
      if ((!fg.startsWith('#') && !(fg in tokens)) || (!bg.startsWith('#') && !(bg in tokens))) { out.push(`${fg} on ${bg}: token missing from the bundle in ${theme}`); continue; }
      const r = tokenContrast(tokens, fg, bg);
      measured.set(`${theme}:${fg}:${bg}`, r);
      const e = exceptionFor(fg, bg, entries);
      const min = e ? EXCEPTION_MIN : TEXT_MIN;
      if (r + 1e-9 < min) out.push(`${fg} on ${bg} in ${theme}: ${r.toFixed(2)}:1, needs ${min}:1${e ? ` (register entry "${e.id}")` : ' (register it or change which token the stylesheet uses)'}`);
    }
  }
  for (const e of entries) {
    if (!e.pairs?.length) continue;
    const listed = e.pairs.filter((p) => p.bg !== '*' && pairs.some(([fg, bg]) => fg === p.fg && bg === p.bg));
    if (!listed.length) continue;
    const stale = listed.every((p) => ['light', 'dark'].every((t) => (measured.get(`${t}:${p.fg}:${p.bg}`) ?? 0) + 1e-9 >= TEXT_MIN));
    if (stale) out.push(`register entry "${e.id}" is stale: every pair it lists measures ${TEXT_MIN}:1 in light and dark; remove it from src/lib/a11y-exceptions.json`);
  }
  return { problems: out, measured };
}

/** Pairs a stylesheet uses by its aliases that the pair list does not measure (design D2's scan). */
export function unlistedPairs(siteCss, aliases, pairs = PAIRS) {
  const out = new Set();
  // Within each rule block, a text alias used as `color:` with a background alias in the same block.
  for (const block of siteCss.matchAll(/\{([^{}]*)\}/g)) {
    const body = block[1];
    const colors = [...body.matchAll(/(?:^|;|\s)color:\s*var\((--[\w-]+)\)/g)].map((m) => aliases[m[1]]).filter(Boolean);
    const bgs = [...body.matchAll(/background(?:-color)?:\s*var\((--[\w-]+)\)/g)].map((m) => aliases[m[1]]).filter(Boolean);
    for (const fg of colors) for (const bg of bgs) if (!pairs.some(([f, b]) => f === fg && b === bg)) out.add(`${fg} on ${bg}`);
  }
  return [...out];
}

const here = path.dirname(new URL(import.meta.url).pathname);
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const root = path.resolve(here, '../..');
  const file = process.argv[2] ?? (process.env.BUNDLE_DIR ? path.join(process.env.BUNDLE_DIR, 'tokens/tokens.css') : path.join(root, '.bundle/tokens/tokens.css'));
  const css = fs.readFileSync(file, 'utf8');
  const { ALIASES } = await import('../../src/lib/a11y-pairs.mjs');
  const { problems, measured } = contrastProblems(css);
  for (const p of unlistedPairs(fs.readFileSync(path.join(root, 'src/styles/site.css'), 'utf8'), ALIASES)) problems.push(`${p}: the stylesheet uses this pair but src/lib/a11y-pairs.mjs does not measure it`);
  if (process.env.DEBUG) for (const [k, v] of measured) console.log(`${k}: ${v.toFixed(2)}:1`);
  if (problems.length) {
    console.error(`contrast check: ${problems.length} problem(s)\n${problems.map((p) => `  ${p}`).join('\n')}`);
    process.exit(1);
  }
  console.log(`contrast check: ${PAIRS.length} pairs measured from ${path.relative(root, file)} in light and dark, ${register.length} register entries, high contrast ${hasHighContrast(css) ? 'available' : 'not yet in this bundle'}`);
}
