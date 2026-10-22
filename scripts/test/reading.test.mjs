// Reading blocks and hit areas in the stylesheet (OpenSpec website-accessibility
// "Reading blocks", "Pointer targets"; change website-accessibility-aaa tasks 3.1, 4.1).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const css = fs.readFileSync(path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../src/styles/site.css'), 'utf8');
const rule = (selector) => {
  const i = css.lastIndexOf(selector);
  assert.ok(i >= 0, selector);
  return css.slice(i, css.indexOf('}', i));
};

test('prose: line height at least 1.5, paragraphs 2em apart, at most 80 characters a line, never justified', () => {
  assert.match(rule('.prose p, .prose li {'), /line-height: 1\.[5-9]/);
  assert.match(rule('.prose p, .prose li {'), /max-inline-size: 80ch/);
  assert.match(rule('.prose p {'), /margin: 0 0 2em/);
  assert.match(rule('.prose {'), /text-align: start/);
  assert.match(css, /\.lede \{[^}]*line-height: 1\.5/);
  assert.doesNotMatch(css, /text-align:\s*justify|text-justify/);
  // The later prose rules win over the earlier list margins.
  assert.ok(css.lastIndexOf('.prose ul, .prose ol { margin: 0 0 2em; }') > css.indexOf('.prose ul, .prose ol { padding-left'));
});

test('hit areas: the hit class grows a control to 44 px without moving it, and the header brand link is 44 px tall', () => {
  assert.match(rule('.hit::after {'), /inset: min\(0px, calc\(\(100% - 44px\) \/ 2\)\)/);
  assert.match(rule('.hit {'), /position: relative/);
  assert.match(rule('.brand {'), /min-height: 44px/);
  assert.match(rule('.trail a {'), /min-height: 44px/);
});

test('focus is never under the sticky header: the page scrolls past it', () => {
  assert.match(css, /html \{[^}]*scroll-padding-top: calc\(var\(--header-h\)/);
});
