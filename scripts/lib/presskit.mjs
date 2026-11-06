// The press kit's brand assets (press-kit D2): what the pinned bundle's brand/ folder holds,
// as groups the page renders. Links point at /brand/, where bundleBrand() serves that folder,
// and only files the bundle has are listed: the whole kit when it carries brand/kit/, the
// basic brand files of an older bundle otherwise.
import fs from 'node:fs';
import path from 'node:path';

const MARK_SIZES = [256, 512, 1024];
const ICON_SIZES = [16, 32, 48, 64, 128, 180, 192, 256, 512, 1024];

export function pressKit(bundleDir) {
  const brand = path.join(bundleDir, 'brand');
  if (!fs.existsSync(brand)) throw new Error('The site bundle has no brand/ folder: the press kit offers its files.');
  const has = (rel) => fs.existsSync(path.join(brand, rel));
  const kb = (rel) => `${Math.max(1, Math.round(fs.statSync(path.join(brand, rel)).size / 1024))} KB`;
  /** Download links for the files the bundle has, in the order given. */
  const files = (list) => list.filter(([rel]) => has(rel)).map(([rel, label]) => ({ label, href: `/brand/${rel}`, size: kb(rel) }));
  const item = (id, title, alt, background, preview, list) => ({ id, title, alt, background, preview: preview && has(preview) ? `/brand/${preview}` : undefined, files: files(list) });
  const keep = (groups) => groups.map((g) => ({ ...g, items: g.items.filter((i) => i.files.length) })).filter((g) => g.items.length);

  if (!has('kit/README.md')) {
    return {
      full: false,
      groups: keep([
        { id: 'mark', title: 'The mark', use: 'The OpenTodo mark of this release.', items: [
          item('mark-colour', 'App icon', 'The OpenTodo app icon', 'light', 'mark-colour.svg', [['mark-colour.svg', 'SVG']]),
          item('mark-mono', 'One colour', 'The OpenTodo mark in one colour', 'light', 'mark-mono.svg', [['mark-mono.svg', 'SVG']]),
          item('icon-512', 'App icon, 512 px', 'The OpenTodo app icon, 512 pixels', 'light', 'icon-512.png', [['icon-512.png', 'PNG 512 px']]),
        ] },
        { id: 'wordmark', title: 'The name', use: 'The name as text in Inter SemiBold.', items: [
          item('wordmark', 'Wordmark', 'The name OpenTodo', 'light', 'wordmark.svg', [['wordmark.svg', 'SVG']]),
        ] },
      ]),
    };
  }

  const k = (rel) => `kit/${rel}`;
  const lockup = (v, bg, title) => item(`lockup-${v}`, title, `The OpenTodo logo with its name, ${title.toLowerCase()}`, bg, k(`svg/lockup-${v}.svg`),
    [[k(`svg/lockup-${v}.svg`), 'SVG'], [k(`png/lockup-${v}-852x192.png`), 'PNG 852 × 192'], [k(`png/lockup-${v}-1704x384.png`), 'PNG 1704 × 384']]);
  const mark = (v, bg, title) => item(`mark-${v}`, title, `The OpenTodo mark, ${title.toLowerCase()}`, bg, k(`svg/mark-${v}.svg`),
    [[k(`svg/mark-${v}.svg`), 'SVG'], ...MARK_SIZES.map((s) => [k(`png/mark-${v}-${s}.png`), `PNG ${s} px`])]);
  return {
    full: true,
    groups: keep([
      { id: 'lockup', title: 'Logo with name', use: 'For headers, slides, articles and a README: the mark with "OpenTodo" beside it.', items: [
        lockup('on-light', 'light', 'On a light background'),
        lockup('on-dark', 'dark', 'On a dark background'),
      ] },
      { id: 'mark', title: 'The mark', use: 'Where the name is already written, or space is tight.', items: [
        mark('on-light', 'light', 'On a light background'),
        mark('on-dark', 'dark', 'On a dark background'),
        mark('black', 'light', 'Black, one colour'),
        mark('white', 'dark', 'White, one colour'),
      ] },
      { id: 'icon', title: 'App icon and avatar', use: 'The icon of the installed app; the square version is for avatars a platform rounds itself.', items: [
        item('icon', 'App icon', 'The OpenTodo app icon', 'light', k('svg/mark-colour.svg'), [[k('svg/mark-colour.svg'), 'SVG'], ...ICON_SIZES.map((s) => [k(`png/icon-${s}.png`), `PNG ${s} px`])]),
        item('avatar', 'Square, for avatars', 'The OpenTodo app icon as a square, for avatars', 'light', k('svg/mark-colour-square.svg'), [[k('svg/mark-colour-square.svg'), 'SVG'], [k('png/avatar-512.png'), 'PNG 512 px']]),
      ] },
      { id: 'social', title: 'Social images', use: 'Ready-made images for a repository preview or a shared link.', items: [
        item('github-social-preview', 'Repository preview', 'OpenTodo\'s repository preview image', 'light', k('png/github-social-preview-1280x640.png'), [[k('png/github-social-preview-1280x640.png'), 'PNG 1280 × 640']]),
        item('og-default', 'Link preview', 'OpenTodo\'s link preview image', 'light', k('png/og-default-1200x630.png'), [[k('png/og-default-1200x630.png'), 'PNG 1200 × 630']]),
      ] },
      { id: 'readme', title: 'Notes', use: 'Every file with its use, the colours and the licence.', items: [
        item('readme', 'README', '', 'light', undefined, [[k('README.md'), 'Markdown']]),
      ] },
    ]),
  };
}
