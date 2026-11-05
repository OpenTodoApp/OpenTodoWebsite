// Renders changelog entries (Markdown from the app's CHANGELOG.md, carried in the
// bundle's changelog.json) to HTML. Only the inline subset the changelog uses:
// bold, italics, code, links and <kbd>. Links into the app's docs become site links.
import { SITE } from './site';
import fs from 'node:fs';
import path from 'node:path';
import { bundle, manifest } from './bundle';

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Old entries can name a heading the pinned docs no longer have; the link then goes to the page.
const ids = new Map<string, Set<string>>();
function hasAnchor(page: string, anchor: string): boolean {
  if (!ids.has(page)) {
    const file = path.join(bundle.dir, 'docs', page, 'index.html');
    ids.set(page, new Set(fs.existsSync(file) ? [...fs.readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]) : []));
  }
  return ids.get(page)!.has(anchor);
}

export function linkTarget(href: string): string {
  const m = /^(?:\.\.\/)*docs\/(.+?)\.md(#.*)?$/.exec(href);
  if (m) {
    const page = m[1] === 'README' ? '' : m[1] + '/';
    const frag = m[2] && hasAnchor(page, m[2].slice(1)) ? m[2] : '';
    return `/docs/${page}${frag}`;
  }
  if (/^[a-z]+:/i.test(href) || href.startsWith('#')) return href;
  return `${SITE.appRepo}/blob/${manifest.tag ?? 'main'}/${href}`;
}

export function inline(md: string): string {
  const code: string[] = [];
  let s = md.replace(/`([^`]+)`/g, (_, c) => `\u0000${code.push(c) - 1}\u0000`);
  s = escape(s).replace(/&lt;kbd&gt;(.*?)&lt;\/kbd&gt;/g, '<kbd>$1</kbd>');
  // Link text holds no brackets, so a literal "[" (as in <kbd>[</kbd>) never opens a link.
  s = s.replace(/\[([^\[\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => `<a href="${linkTarget(href.replace(/&amp;/g, '&'))}">${text}</a>`);
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${escape(code[Number(i)])}</code>`);
}

/** The id of a version on /changelog/: 0.22.0 -> v0-22-0. */
export const changelogAnchor = (version: string) => `v${version.replace(/^v/, '').replace(/\./g, '-')}`;
/** A version's place on /changelog/. */
export const changelogUrl = (version: string) => `/changelog/#${changelogAnchor(version)}`;
