#!/usr/bin/env node
// Emoji and symbol icons (website-platform D6.5, the character classes of the
// app's ui-lint): no emoji or pictographic/arrow/dingbat character may stand in
// for an icon in navigation, buttons, summaries or icon slots, or open a list
// item or link like a marker. Code, kbd and pre are exempt. The docs come from
// the bundle and are the app's responsibility, so they are skipped.
import path from 'node:path';
import { htmlFiles, isDocs, load, report, urlOf } from './lib.mjs';

export const SYMBOL = /[\p{Extended_Pictographic}←-⇿⌀-⏿■-➿⤀-⥿⬀-⯿\u{1F000}-\u{1FAFF}]/u;
const SLOTS = 'nav, button, summary, [role="tab"], [role="button"], .card-icon, .icon, .chip, .btn';
const MARKERS = 'li, a, h1, h2, h3, h4, h5, h6, dt, dd, th';

const textOf = (el) => {
  const clone = el.clone();
  clone.querySelectorAll('code, kbd, pre, script, style').forEach((c) => c.remove());
  return clone.textContent.replace(/\s+/g, ' ').trim();
};

export function checkEmoji(dir) {
  const problems = [];
  const files = htmlFiles(dir).filter((f) => !isDocs(urlOf(dir, f)));
  for (const file of files) {
    const page = urlOf(dir, file);
    const root = load(file);
    const body = root.querySelector('body') ?? root;
    for (const el of body.querySelectorAll(SLOTS)) {
      const t = textOf(el);
      const m = SYMBOL.exec(t);
      if (m) problems.push(`${page}: "${m[0]}" used in <${el.tagName.toLowerCase()}> "${t.slice(0, 50)}"`);
    }
    for (const el of body.querySelectorAll(MARKERS)) {
      const t = textOf(el);
      if (SYMBOL.test(t.slice(0, 2))) problems.push(`${page}: <${el.tagName.toLowerCase()}> starts with symbol "${t.slice(0, 2)}" (${t.slice(0, 50)})`);
    }
  }
  return { problems: [...new Set(problems)], pages: files.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dir = path.resolve(process.argv[2] ?? 'dist');
  const { problems, pages } = checkEmoji(dir);
  report('emoji icons', problems, `${pages} pages, no emoji or symbol used as an icon`);
}
