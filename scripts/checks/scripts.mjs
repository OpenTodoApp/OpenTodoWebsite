#!/usr/bin/env node
// Third-party scripts (website-platform D6.6): every <script src> on every page,
// the docs included, must come from this site or the self-hosted analytics.
import path from 'node:path';
import { htmlFiles, load, report, urlOf } from './lib.mjs';

export const ALLOWED_ORIGINS = ['https://analytics.pixari.dev'];

export function checkScripts(dir, allowed = ALLOWED_ORIGINS) {
  const problems = [];
  const files = htmlFiles(dir);
  for (const file of files) {
    const page = urlOf(dir, file);
    for (const el of load(file).querySelectorAll('script[src]')) {
      const src = el.getAttribute('src');
      const url = new URL(src, `https://site.invalid${page}`);
      if (url.origin === 'https://site.invalid' || allowed.includes(url.origin)) continue;
      problems.push(`${page}: third-party script ${src}`);
    }
  }
  return { problems, pages: files.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dir = path.resolve(process.argv[2] ?? 'dist');
  const { problems, pages } = checkScripts(dir);
  report('third-party scripts', problems, `${pages} pages, scripts only from the site and ${ALLOWED_ORIGINS.join(', ')}`);
}
