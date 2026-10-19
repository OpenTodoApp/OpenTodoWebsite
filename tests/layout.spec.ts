// Layout integrity (website-layout-integrity): defects that render without breaking
// any link or contrast rule, checked on every page of the built site at three widths.
// Light only: layout does not depend on theme.
import { expect, test } from '@playwright/test';
import { sitePages } from './pages';

const WIDTHS = [360, 768, 1280];

for (const width of WIDTHS) {
  test.describe(`at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const url of sitePages()) {
      test(`${url}`, async ({ page }) => {
        await page.goto(url, { waitUntil: 'load' });
        await page.evaluate(() => document.fonts.ready);
        const problems = await page.evaluate((w) => {
          const out: string[] = [];
          const name = (e: Element) => `${e.tagName.toLowerCase()} "${(e.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 60)}"`;
          const shown = (e: Element) => getComputedStyle(e).display !== 'none' && e.getClientRects().length > 0;

          // A checklist item reads as one paragraph: its text, links and emphasis stay
          // inline beside the icon. A flex or grid item turns each of them into a column.
          for (const li of document.querySelectorAll('.checks > li')) {
            for (const child of li.children) {
              if (child.matches('svg.icon:first-child')) continue;
              const d = getComputedStyle(child).display;
              if (!d.startsWith('inline') && d !== 'contents') out.push(`checklist item splits around ${name(child)} (display: ${d})`);
            }
          }

          // At the widest layout no card grid leaves one card alone on a last row below a full one.
          if (w >= 1280) {
            for (const grid of document.querySelectorAll('.grid, .post-grid')) {
              if (getComputedStyle(grid).display !== 'grid') continue;
              const rows = new Map<number, number>();
              for (const item of [...grid.children].filter(shown)) {
                const top = Math.round(item.getBoundingClientRect().top);
                rows.set(top, (rows.get(top) ?? 0) + 1);
              }
              const counts = [...rows.entries()].sort((a, b) => a[0] - b[0]).map(([, n]) => n);
              if (counts.length > 1 && counts[counts.length - 1] === 1 && counts[counts.length - 2] >= 3) {
                out.push(`grid ${name(grid).slice(0, 40)}… leaves one card alone on its last row (rows: ${counts.join('+')})`);
              }
            }
          }
          return out;
        }, width);
        expect(problems, `${url} at ${width}px:\n${problems.join('\n')}`).toEqual([]);
      });
    }
  });
}

// The brand and the first navigation link keep a visible gap wherever the desktop
// navigation shows, including the widths where the header buttons join it.
for (const width of [768, 1024, 1280, 1359, 1360, 1440, 1920]) {
  test(`header items apart at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const gaps = await page.evaluate(() => {
      const items = [document.querySelector('.site-header .brand'), ...document.querySelectorAll('.site-header .nav-desktop .nav-link, .site-header .header-cta')]
        .filter((e): e is Element => !!e && !e.closest('details:not([open]) > :not(summary)') && getComputedStyle(e).display !== 'none' && e.getClientRects().length > 0)
        .map((e) => {
          // Measure what is drawn: text can spill out of a box that flex has shrunk.
          const range = document.createRange();
          range.selectNodeContents(e);
          const box = e.getBoundingClientRect();
          const ink = range.getBoundingClientRect();
          return { text: (e.textContent ?? '').trim(), r: { left: Math.min(box.left, ink.left), right: Math.max(box.right, ink.right) } };
        })
        .sort((a, b) => a.r.left - b.r.left);
      const out: string[] = [];
      // Navigation links carry their own padding, so neighbouring links may touch; the
      // brand and the buttons must not touch anything.
      const brandGap = items.length > 1 ? items[1].r.left - items[0].r.right : 99;
      if (brandGap < 16) out.push(`brand and "${items[1].text}" are ${Math.round(brandGap)}px apart`);
      for (let i = 1; i < items.length; i++) if (items[i].r.left < items[i - 1].r.right - 0.5) out.push(`"${items[i - 1].text}" overlaps "${items[i].text}"`);
      return out;
    });
    expect(gaps, gaps.join('\n')).toEqual([]);
  });
}

// Composition of marketing pages (website-section-system): every section is one of
// five types, cards only in Catalogue sections, no two Catalogues side by side and
// at most two, a kicker only on pages with three sections or more, and product shots
// in Showcase and Split sections shown large enough to read (or cropped).
const TYPES = ['showcase', 'statement', 'split', 'catalogue', 'close'];
const marketing = sitePages().filter((u) => /^\/((de|fr|it|es|pt)\/)?(open-loops\/)?$|^\/((de|fr|it|es|pt)\/)?cost\/$|^\/(self-host|developers|about|capture)\/$|^\/vs\/[^/]+\/$/.test(u));
test.describe('composition at 1280px', () => {
  test.use({ viewport: { width: 1280, height: 900 } });
  for (const url of marketing) {
    test(url, async ({ page }) => {
      await page.goto(url, { waitUntil: 'load' });
      const problems = await page.evaluate((types) => {
        const out: string[] = [];
        const sections = [...document.querySelectorAll('main > section')];
        const kinds = sections.map((s) => s.getAttribute('data-section-type') ?? '');
        sections.forEach((s, i) => { if (!types.includes(kinds[i])) out.push(`section ${i + 1} (#${s.id || '?'}) has no section type`); });
        kinds.forEach((k, i) => { if (k === 'catalogue' && kinds[i + 1] === 'catalogue') out.push(`sections ${i + 1} and ${i + 2} are both Catalogue`); });
        const catalogues = kinds.filter((k) => k === 'catalogue').length;
        if (catalogues > 2) out.push(`${catalogues} Catalogue sections (at most two)`);
        for (const c of document.querySelectorAll('main .card')) if (!c.closest('[data-section-type="catalogue"]')) out.push(`a card outside a Catalogue: "${(c.textContent ?? '').trim().slice(0, 50)}"`);
        if (sections.length < 3 && document.querySelector('main .kicker')) out.push(`a kicker on a page with ${sections.length} sections`);
        for (const img of document.querySelectorAll('main [data-section-type="showcase"] .frame:not(.frame-phone) img, main [data-section-type="split"] .frame:not(.frame-phone) img')) {
          const w = img.getBoundingClientRect().width;
          if (w > 0 && w < 640 && !img.closest('.crop')) out.push(`screenshot "${img.getAttribute('alt')?.slice(0, 50)}" is ${Math.round(w)}px wide (at least 640, or crop it)`);
        }
        return out;
      }, TYPES);
      expect(problems, `${url}:\n${problems.join('\n')}`).toEqual([]);
    });
  }
});

// A post without a cover shows its title as the cover, never an icon (website-blog "Blog index").
test('blog cards without a cover show a title cover', async ({ page }) => {
  await page.goto('/blog/', { waitUntil: 'load' });
  const cards = await page.evaluate(() => [...document.querySelectorAll('.post-card')].map((c) => ({
    title: c.querySelector('.post-card-title')?.textContent?.trim(),
    img: !!c.querySelector('.post-cover img'),
    cover: c.querySelector('.post-cover-title')?.textContent?.trim(),
    icon: !!c.querySelector('.post-cover svg'),
  })));
  expect(cards.length).toBeGreaterThan(0);
  for (const c of cards) {
    expect(c.icon, `${c.title}: icon in the cover`).toBe(false);
    if (!c.img) expect(c.cover, `${c.title}: no title cover`).toBe(c.title);
  }
});

// Help is the one entry point for doing something (website-help "Help landing"):
// every how-to, toolkit, topic and install page and the FAQ are linked from it.
test('help links every how-to, toolkit, topic and install page and the FAQ', async ({ page }) => {
  await page.goto('/help/', { waitUntil: 'load' });
  const links = new Set(await page.evaluate(() => [...document.querySelectorAll('main a[href]')].map((a) => new URL((a as HTMLAnchorElement).href).pathname)));
  const wanted = sitePages().filter((u) => /^\/(how-to|toolkit|topics|install)\/[^/]+\/$/.test(u)).concat('/faq/');
  expect(wanted.filter((u) => !links.has(u))).toEqual([]);
});

// The home page asks for the demo twice outside the header: the hero and the close
// (website-navigation-and-home "Outcome-first home page").
test('home: "Try the demo" twice outside the header, one button in the hero', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });
  await expect(page.locator('main a', { hasText: 'Try the demo' })).toHaveCount(2);
  await expect(page.locator('main .hero .btn')).toHaveCount(1);
});

// The latest post is one line above the close and follows the blog (website-blog).
test('home: the latest post above the close', async ({ page }) => {
  await page.goto('/blog/', { waitUntil: 'load' });
  const newest = await page.locator('.post-card-featured .post-card-title').textContent();
  await page.goto('/', { waitUntil: 'load' });
  const line = page.locator('main .latest-post');
  await expect(line).toContainText(newest!.trim());
  expect(await line.evaluate((el) => el.nextElementSibling?.getAttribute('data-section-type'))).toBe('close');
});

// Four footer columns of at most eight links, the languages on one line at 1280 px.
for (const width of [360, 1280]) {
  test(`footer at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'load' });
    const cols = page.locator('.site-footer .footer-grid > nav');
    await expect(cols).toHaveCount(4);
    for (const n of await cols.locator('ul').evaluateAll((uls) => uls.map((u) => u.children.length))) expect(n).toBeLessThanOrEqual(8);
    const tops = await page.locator('.site-footer .footer-langs li').evaluateAll((lis) => [...new Set(lis.map((l) => Math.round(l.getBoundingClientRect().top)))]);
    if (width >= 1280) expect(tops.length, 'languages on one line').toBe(1);
  });
}
