#!/usr/bin/env node
// Hero promise length (website-navigation-and-home D6): the promise under a home
// page's headline (marked data-hero-promise) has at most 25 words, in every language.
import path from 'node:path';
import { htmlFiles, isDocs, load, report, urlOf } from './lib.mjs';

export const MAX_WORDS = 25;

export function checkHero(dir) {
  const problems = [];
  let promises = 0;
  for (const file of htmlFiles(dir).filter((f) => !isDocs(urlOf(dir, f)))) {
    for (const el of load(file).querySelectorAll('[data-hero-promise]')) {
      promises++;
      const words = el.textContent.trim().split(/\s+/).filter(Boolean).length;
      if (words > MAX_WORDS) problems.push(`${urlOf(dir, file)}: the hero promise has ${words} words (at most ${MAX_WORDS})`);
    }
  }
  return { problems, promises };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dir = path.resolve(process.argv[2] ?? 'dist');
  const { problems, promises } = checkHero(dir);
  report('hero', problems, `${promises} hero promises, each at most ${MAX_WORDS} words`);
}
