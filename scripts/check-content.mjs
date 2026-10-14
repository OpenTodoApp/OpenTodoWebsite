#!/usr/bin/env node
// Runs before every build: the claim-and-source lint over guides, toolkit,
// essays and templates (website-content-hub D3). Fails naming file and line.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, docExistsIn, resolveBundle } from './lib/bundle.mjs';
import { lint } from './lib/claim-lint.mjs';

const COLLECTIONS = ['guides', 'toolkit', 'essays', 'templates'];
const contentDir = path.join(ROOT, 'src/content');
const bundle = resolveBundle();
const slugs = (c) => fs.existsSync(path.join(contentDir, c)) ? fs.readdirSync(path.join(contentDir, c)).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3)) : [];
const pages = new Set(['/', '/vs/', '/self-host/', '/developers/', '/templates/', '/guides/', '/toolkit/', '/essays/', '/whats-new/', '/feed.xml']);
for (const c of [...COLLECTIONS, 'compare']) for (const s of slugs(c)) pages.add(`/${c === 'compare' ? 'vs' : c}/${s}/`);
for (const s of slugs('templates')) pages.add(`/templates/${s}.json`);
const pageExists = (href) => pages.has(href.split('#')[0]);

const problems = [];
for (const c of COLLECTIONS) {
  for (const s of slugs(c)) {
    const file = path.join('src/content', c, `${s}.md`);
    problems.push(...lint(fs.readFileSync(path.join(ROOT, file), 'utf8'), { docExists: (h) => docExistsIn(bundle.dir, h), pageExists, file }));
  }
}
if (problems.length) {
  console.error(`Content check failed:\n${problems.map((p) => `  ${p}`).join('\n')}`);
  process.exit(1);
}
console.log(`content check: ${COLLECTIONS.map((c) => `${slugs(c).length} ${c}`).join(', ')} ok`);
