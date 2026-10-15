// Social preview images (website-seo design D2): one PNG per built page, drawn
// from the page's own <title> and description with the app's typeface, so every
// link shared from the site carries its page's name rather than one generic card.
// Pure helpers here (unit-tested); scripts/og.mjs renders with sharp.
import path from 'node:path';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** The image path a page's social card is served at: / -> /og/index.png, /vs/things/ -> /og/vs/things.png. */
export function ogPathFor(pathname) {
  const clean = pathname.replace(/index\.html$/, '').replace(/\/+$/, '');
  return clean === '' ? '/og/index.png' : `/og${clean}.png`;
}

/** The dist file for a page's card. */
export const ogFileFor = (dist, pathname) => path.join(dist, ...ogPathFor(pathname).split('/').filter(Boolean));

/** Greedy word wrap for the title: at most `max` characters per line, at most `lines` lines (the last gets an ellipsis). */
export function wrap(text, max = 26, lines = 3) {
  const words = text.trim().split(/\s+/);
  const out = [];
  let cur = '';
  for (const w of words) {
    if (!cur) cur = w;
    else if ((cur + ' ' + w).length <= max) cur += ' ' + w;
    else { out.push(cur); cur = w; }
  }
  if (cur) out.push(cur);
  if (out.length > lines) {
    const kept = out.slice(0, lines);
    kept[lines - 1] = kept[lines - 1].replace(/[\s.,;:]+$/, '') + '…';
    return kept;
  }
  return out;
}

/** The section word under the title, from the first path segment. */
export function sectionOf(pathname) {
  const seg = pathname.split('/').filter(Boolean)[0] ?? '';
  const names = {
    '': 'open-todo.app', vs: 'Compare', templates: 'Templates', guides: 'Guides', toolkit: 'Toolkit', blog: 'Blog',
    'how-to': 'How-to', install: 'Install the app', switch: 'Moving from another app', topics: 'Topics',
    'whats-new': "What's new", help: 'Help', faq: 'FAQ', cost: 'What it costs', about: 'About', 'self-host': 'Self-host', developers: 'Developers',
  };
  return names[seg] ?? 'open-todo.app';
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The card as SVG. Colours are the app's slate and emerald (the bundle's tokens, light theme). */
export function cardSvg({ title, description, section }) {
  const lines = wrap(title);
  const size = lines.length >= 3 ? 56 : lines.length === 2 ? 64 : 72;
  const lineHeight = size * 1.15;
  const top = 250 - ((lines.length - 1) * lineHeight) / 2;
  const descLines = description ? wrap(description, 64, 2) : [];
  const descTop = top + lines.length * lineHeight + 18;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="#f8fafc"/>
  <rect x="0" y="0" width="${OG_WIDTH}" height="10" fill="#059669"/>
  <g transform="translate(80 76)">
    <rect width="44" height="44" rx="10" fill="#059669"/>
    <path d="M12 23 l8 8 l13 -15" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="60" y="31" font-family="Inter" font-weight="600" font-size="28" fill="#0f172a">OpenTodo</text>
    <text x="206" y="31" font-family="Inter" font-size="24" fill="#64748b">· ${esc(section)}</text>
  </g>
  ${lines.map((l, i) => `<text x="80" y="${(top + i * lineHeight).toFixed(1)}" font-family="Inter" font-weight="600" font-size="${size}" letter-spacing="-1" fill="#0f172a">${esc(l)}</text>`).join('\n  ')}
  ${descLines.map((l, i) => `<text x="80" y="${(descTop + i * 38).toFixed(1)}" font-family="Inter" font-size="27" fill="#475569">${esc(l)}</text>`).join('\n  ')}
  <text x="80" y="574" font-family="Inter" font-size="24" fill="#64748b">open-todo.app · free, open source, on your own server</text>
</svg>`;
}
