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
