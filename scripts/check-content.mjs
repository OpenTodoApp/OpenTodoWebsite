#!/usr/bin/env node
// Runs before every build: the claim-and-source lint over guides, toolkit,
// templates (website-content-hub D3) and blog posts (website-blog D5).
// Fails naming file and line.
import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import { ROOT, docExistsIn, resolveBundle } from './lib/bundle.mjs';
import { lint } from './lib/claim-lint.mjs';
import { isPublished } from '../src/lib/blog-core.mjs';
import { BLOG_CATEGORIES } from '../src/content/schemas.mjs';

const COLLECTIONS = ['guides', 'toolkit', 'templates'];
const contentDir = path.join(ROOT, 'src/content');
const bundle = resolveBundle();
const slugs = (c) => fs.existsSync(path.join(contentDir, c)) ? fs.readdirSync(path.join(contentDir, c)).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3)) : [];
const frontMatter = (text) => {
  const m = /^---\n([\s\S]*?)\n---/.exec(text);
  return m ? parseYaml(m[1]) ?? {} : {};
};

// Blog posts: one folder per post, src/content/blog/<slug>/index.md.
const blogDir = path.join(contentDir, 'blog');
const posts = (fs.existsSync(blogDir) ? fs.readdirSync(blogDir, { withFileTypes: true }) : [])
  .filter((e) => e.isDirectory() && fs.existsSync(path.join(blogDir, e.name, 'index.md')))
  .map((e) => {
    const file = path.join('src/content/blog', e.name, 'index.md');
    const text = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const fm = frontMatter(text);
    const live = fm.publishedAt ? isPublished({ data: { draft: !!fm.draft, publishedAt: new Date(fm.publishedAt) } }) : false;
    return { slug: e.name, file, text, inDevelopment: fm.inDevelopment === true, live };
  });

const pages = new Set(['/', '/about/', '/cost/', '/vs/', '/self-host/', '/developers/', '/templates/', '/guides/', '/toolkit/', '/whats-new/', '/feed.xml', '/blog/', '/blog/feed.xml']);
for (const c of [...COLLECTIONS, 'compare']) for (const s of slugs(c)) pages.add(`/${c === 'compare' ? 'vs' : c}/${s}/`);
for (const s of slugs('templates')) pages.add(`/templates/${s}.json`);
for (const c of BLOG_CATEGORIES) pages.add(`/blog/category/${c}/`);
for (const p of posts) if (p.live) pages.add(`/blog/${p.slug}/`);
const pageExists = (href) => pages.has(href.split('#')[0]);
const docExists = (h) => docExistsIn(bundle.dir, h);

const problems = [];
for (const c of COLLECTIONS) {
  for (const s of slugs(c)) {
    const file = path.join('src/content', c, `${s}.md`);
    problems.push(...lint(fs.readFileSync(path.join(ROOT, file), 'utf8'), { docExists, pageExists, file }));
  }
}
// Posts about unreleased work describe things not in the docs yet: their links are
// still checked, the feature-keyword rule is not (website-blog spec "Sourced claims").
for (const p of posts) problems.push(...lint(p.text, { docExists, pageExists, file: p.file, claims: !p.inDevelopment }));

if (problems.length) {
  console.error(`Content check failed:\n${problems.map((p) => `  ${p}`).join('\n')}`);
  process.exit(1);
}
console.log(`content check: ${COLLECTIONS.map((c) => `${slugs(c).length} ${c}`).join(', ')}, ${posts.length} blog posts ok`);
