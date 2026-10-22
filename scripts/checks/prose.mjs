#!/usr/bin/env node
// Prose check over dist/ (OpenSpec website-accessibility "Location, link purpose and
// headings", "Abbreviations and reading level"): every page's links say where they go
// in their own words (no bare "here", "more", "Learn more", "click here", "read more"),
// heading levels never skip, the first use of a listed abbreviation on a page carries
// its expansion, and sentences over 25 words are reported for shortening (a report,
// not a failure). The docs under /docs/ are the app's and are checked there.
import fs from 'node:fs';
import path from 'node:path';
import { htmlFiles, isDocs, load, report, urlOf } from './lib.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
export const BARE = new Set(['here', 'more', 'learn more', 'click here', 'read more', 'link', 'this']);
export const MAX_SENTENCE_WORDS = 25;

/** The visible text of an element with code, scripts and styles removed. */
function textOf(el) {
  const clone = el.clone ? el.clone() : el;
  for (const c of clone.querySelectorAll('code, pre, kbd, script, style, svg, .visually-hidden, [aria-hidden="true"]')) c.remove();
  return clone.textContent.replace(/\s+/g, ' ').trim();
}

/** Problems of one built page; `abbreviations` maps a term to its expansion. */
/** Translated pages (/de/, /fr/ …): links and headings are checked, English expansions are not expected. */
export const isTranslated = (url) => /^\/(de|fr|it|es|pt)\//.test(url);

export function prosePage(root, url, abbreviations) {
  const problems = [];
  if (isTranslated(url)) abbreviations = {};
  const report = [];
  // Links: the whole text is a bare phrase.
  for (const a of root.querySelectorAll('a[href]')) {
    const text = textOf(a).toLowerCase().replace(/[.!…:]+$/, '');
    if (BARE.has(text) && !a.getAttribute('aria-label')) problems.push(`${url}: the link "${textOf(a)}" (${a.getAttribute('href')}) does not say where it goes`);
  }
  // Headings: one h1, no skipped levels.
  const hs = root.querySelectorAll('h1, h2, h3, h4, h5, h6').map((h) => Number(h.tagName[1]));
  if (hs.filter((d) => d === 1).length !== 1) problems.push(`${url}: has ${hs.filter((d) => d === 1).length} top-level headings; exactly one is required`);
  for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) problems.push(`${url}: a heading skips from h${hs[i - 1]} to h${hs[i]}`);
  // Abbreviations: the first use in the main content is explained on the page.
  const main = root.querySelector('main') ?? root;
  const body = textOf(main);
  for (const [term, expansion] of Object.entries(abbreviations)) {
    const re = new RegExp(`(?<![\\w-])${term}(?![\\w-])`);
    if (!re.test(body)) continue;
    const explained = main.querySelectorAll('abbr[title]').some((el) => textOf(el) === term)
      || body.toLowerCase().includes(expansion.toLowerCase()) || new RegExp(`${term}\\s*\\((?:the )?[^)]{3,80}\\)|\\((?:the )?[^()]{3,80}, ${term}\\)|[^.]{0,80}\\b(?:is|means|stands for|short for)\\b[^.]{0,80}${term}|${term}, (?:the|a|an) [^,.]{3,80}`, 'i').test(body);
    if (!explained) problems.push(`${url}: "${term}" is used without its expansion on the page (use <Abbr of="${term}" /> or spell it out on first use)`);
  }
  // Sentence length: a report for the author.
  for (const p of main.querySelectorAll('p, li')) {
    const words = textOf(p).split(/(?<=[.!?…])\s+/).map((s) => s.split(/\s+/).filter((w) => /\w/.test(w)).length);
    const longest = Math.max(0, ...words);
    if (longest > MAX_SENTENCE_WORDS) report.push(`${url}: a sentence of ${longest} words: "${textOf(p).slice(0, 70)}…"`);
  }
  return { problems, report };
}

export function checkProse(dir, abbreviations = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/lib/abbreviations.json'), 'utf8'))) {
  const problems = [];
  const reports = [];
  let pages = 0;
  for (const file of htmlFiles(dir)) {
    const url = urlOf(dir, file);
    if (isDocs(url) || url === '/404.html') continue;
    pages++;
    const r = prosePage(load(file), url, abbreviations);
    problems.push(...r.problems);
    reports.push(...r.report);
  }
  return { problems, reports, pages };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const dir = path.resolve(process.argv[2] ?? 'dist');
  const { problems, reports, pages } = checkProse(dir);
  if (reports.length) console.log(`prose check: ${reports.length} sentence(s) over ${MAX_SENTENCE_WORDS} words (reading level; shorten when you next edit the page)\n${reports.slice(0, 20).map((r) => `  ${r}`).join('\n')}${reports.length > 20 ? `\n  … and ${reports.length - 20} more` : ''}`);
  report('prose check', problems, `${pages} pages: links say where they go, headings in order, abbreviations explained`);
}
