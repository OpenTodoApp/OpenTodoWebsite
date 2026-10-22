// Abbreviations explained on first use (OpenSpec website-accessibility "Abbreviations
// and reading level", WCAG 3.1.4): after the build, the first use of each listed
// abbreviation in a page's main content becomes <abbr title="…">TERM</abbr> with the
// expansion in visually hidden text, so pages whose words come from the bundle (the
// release notes, the help index) explain their terms like hand-written ones. Uses inside
// links, code, headings, existing abbreviations and hidden text are left alone, and a
// page that already explains a term (the full phrase, or an <abbr>) is not touched for it.
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

/** The translated pages' folders: their words are not English, so English expansions stay off them. */
const LANG_DIRS = new Set(['de', 'fr', 'it', 'es', 'pt']);
const SKIP = new Set(['a', 'abbr', 'code', 'pre', 'kbd', 'script', 'style', 'svg', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'label', 'option', 'title', 'noscript']);
const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Whether a text node sits where the full expansion cannot be added: hidden text, code, scripts. */
function hidden(node) {
  for (let n = node.parentNode; n; n = n.parentNode) {
    const tag = n.tagName?.toLowerCase();
    if (tag && ['code', 'pre', 'kbd', 'script', 'style', 'svg', 'title', 'noscript', 'abbr'].includes(tag)) return true;
    if (n.getAttribute && (n.getAttribute('aria-hidden') === 'true' || /\bvisually-hidden\b/.test(n.getAttribute('class') ?? ''))) return true;
  }
  return false;
}

/** Whether a text node is prose (not a heading, an inline link, a button or a label), where the hidden expansion can follow. */
function skipped(node) {
  if (hidden(node)) return true;
  for (let n = node.parentNode; n; n = n.parentNode) {
    const tag = n.tagName?.toLowerCase();
    // A card that is one link holds paragraphs: its prose is explained like any other. An inline link is not.
    if (tag === 'a') { if (!n.querySelector('p, li, h2, h3, h4')) return true; continue; }
    if (tag && SKIP.has(tag)) return true;
  }
  return false;
}

/** The HTML with each listed abbreviation explained on its first prose use inside <main>; unchanged when nothing applies. */
export function explainAbbreviations(html, abbreviations) {
  const root = parse(html, { comment: true, blockTextElements: { script: true, style: true, pre: true } });
  const main = root.querySelector('main');
  if (!main) return html;
  const nodes = [];
  const walk = (n) => { for (const c of n.childNodes) { if (c.nodeType === 3) nodes.push(c); else if (c.nodeType === 1) walk(c); } };
  walk(main);
  // The page's visible words: hidden text and code do not count as a use.
  const text = nodes.filter((n) => !hidden(n)).map((n) => n.rawText).join(' ');
  let changed = false;
  for (const [term, expansion] of Object.entries(abbreviations)) {
    const re = new RegExp(`(?<![\\w-])${term}(?![\\w-])`);
    if (!re.test(text)) continue;
    if (text.toLowerCase().includes(expansion.toLowerCase()) || main.querySelectorAll('abbr[title]').some((a) => a.textContent.trim() === term)) continue;
    // Prose first: the abbreviation with its expansion in hidden text. When the term only
    // appears in headings, links or buttons, the <abbr> alone carries the expansion, so a
    // link's or heading's name stays what it reads.
    const prose = nodes.find((n) => !skipped(n) && re.test(n.rawText));
    const target = prose ?? nodes.find((n) => !hidden(n) && re.test(n.rawText));
    if (!target) continue;
    const raw = target.rawText;
    const m = re.exec(raw);
    const tail = prose ? `<span class="visually-hidden"> (${escape(expansion)})</span>` : '';
    target.rawText = `${raw.slice(0, m.index)}<abbr title="${escape(expansion)}">${term}</abbr>${tail}${raw.slice(m.index + term.length)}`;
    changed = true;
  }
  return changed ? root.toString() : html;
}

/** Rewrites every built page of the site except the docs and the translated pages. */
export function explainSite(dir, abbreviations) {
  let changed = 0;
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { if (!(d === dir && (e.name === 'docs' || LANG_DIRS.has(e.name)))) walk(p); }
      else if (e.name === 'index.html') {
        const html = fs.readFileSync(p, 'utf8');
        const out = explainAbbreviations(html, abbreviations);
        if (out !== html) { fs.writeFileSync(p, out); changed++; }
      }
    }
  };
  walk(dir);
  return changed;
}

/** The Astro integration: runs after the build over dist/. */
export function abbreviations(file = new URL('../../src/lib/abbreviations.json', import.meta.url)) {
  return {
    name: 'opentodo:abbreviations',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const list = JSON.parse(fs.readFileSync(file, 'utf8'));
        const n = explainSite(new URL(dir).pathname, list);
        logger.info(`abbreviations explained on first use on ${n} page(s)`);
      },
    },
  };
}
