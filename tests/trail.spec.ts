// Every page below the top level shows the way back (OpenSpec website-accessibility
// "Location, link purpose and headings"): a navigation landmark named "You are here"
// whose steps are links, starting at the home page.
import { expect, test } from '@playwright/test';
import { sitePages } from './pages';

const deep = sitePages().filter((url) => url.split('/').filter(Boolean).length >= 2 && !/^\/[a-z]{2}\/[^/]+\/$/.test(url));
test.use({ viewport: { width: 360, height: 800 }, javaScriptEnabled: false });

for (const url of deep) {
  test(`${url} shows the trail without JavaScript`, async ({ page }) => {
    await page.goto(url, { waitUntil: 'load' });
    const nav = page.locator('nav[aria-label="You are here"]');
    await expect(nav, `${url} has the landmark`).toHaveCount(1);
    const links = nav.locator('li a');
    expect(await links.count(), `${url} has at least the home step`).toBeGreaterThanOrEqual(1);
    await expect(links.first()).toHaveAttribute('href', '/');
    for (const href of await links.evaluateAll((as) => as.map((a) => a.getAttribute('href')))) expect(href, `${url}: a step links somewhere`).toMatch(/^\//);
  });
}

test('the home page and the top-level pages show no trail', async ({ page }) => {
  for (const url of ['/', '/about/', '/cost/']) {
    await page.goto(url, { waitUntil: 'load' });
    await expect(page.locator('nav[aria-label="You are here"]'), url).toHaveCount(0);
  }
});
