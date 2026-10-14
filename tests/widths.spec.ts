// No page scrolls sideways at tablet width, where the header carries the most
// links on one line (website-blog D7). Light only: layout does not depend on theme.
import { expect, test } from '@playwright/test';
import { sitePages } from './pages';

test.use({ viewport: { width: 768, height: 900 } });
for (const url of sitePages()) {
  test(`${url} at 768px`, async ({ page }) => {
    await page.goto(url, { waitUntil: 'load' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${url} scrolls sideways by ${overflow}px at 768px`).toBeLessThanOrEqual(0);
  });
}

// Every header link stays on one line wherever the desktop navigation shows,
// including the widths where the call-to-action buttons join it.
for (const width of [768, 1024, 1280, 1359, 1360, 1440]) {
  test(`header links on one line at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'load' });
    const tallest = await page.evaluate(() => Math.max(...[...document.querySelectorAll('.nav-desktop .nav-link, .site-header > .wrap > .header-cta')]
      .filter((e) => getComputedStyle(e).display !== 'none')
      .map((e) => e.getBoundingClientRect().height)));
    expect(tallest, `a header item wraps at ${width}px`).toBeLessThanOrEqual(44);
  });
}
