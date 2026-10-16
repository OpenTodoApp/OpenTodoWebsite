// Renders changelog entries (Markdown from the app's CHANGELOG.md, carried in the
// bundle's changelog.json) to HTML. Only the inline subset the changelog uses:
// bold, italics, code, links and <kbd>. Links into the app's docs become site links.
import { SITE } from './site';
import { manifest } from './bundle';

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function linkTarget(href: string): string {
  const m = /^(?:\.\.\/)*docs\/(.+?)\.md(#.*)?$/.exec(href);
  if (m) return `/docs/${m[1] === 'README' ? '' : m[1] + '/'}${m[2] ?? ''}`;
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
