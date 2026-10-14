// Every page reads and navigates without JavaScript at 360 px (website-platform D6.4).
import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import { sitePages } from './pages';

// Blog joins the menu once a post is published (website-blog spec).
const MENU = ['Features', 'Compare', 'Self-host', 'Developers', 'Docs', ...(fs.existsSync('dist/blog/index.html') ? ['Blog'] : [])];

test.use({ javaScriptEnabled: false, viewport: { width: 360, height: 800 } });

for (const url of sitePages()) {
  test(`${url} without JavaScript`, async ({ page }) => {
    await page.goto(url);
    const main = page.locator('main');
    await expect(main.locator('h1')).toBeVisible();
    const words = (await main.innerText()).split(/\s+/).filter(Boolean).length;
    expect(words, 'main text is readable').toBeGreaterThan(60);
    // The phone menu is a <details>, so it opens without scripts.
    await page.locator('details.nav-menu > summary').click();
    const nav = page.locator('details.nav-menu nav');
    for (const label of MENU) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible();
    }
    // Every link in the main content is a real link.
    const hrefs = await main.locator('a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs.filter((h) => !h || h === '#'), 'links without a target').toEqual([]);
  });
}

test('the Compare link works from the phone menu without JavaScript', async ({ page }) => {
  await page.goto('/vs/todoist/');
  await page.locator('details.nav-menu > summary').click();
  await page.locator('details.nav-menu nav').getByRole('link', { name: 'Compare', exact: true }).click();
  await expect(page).toHaveURL(/\/vs\/$/);
  await expect(page.locator('h1')).toHaveText('How OpenTodo compares.');
});
