// Every page reads and navigates without JavaScript at 360 px (website-platform D6.4).
import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import { sitePages } from './pages';

// Five destinations and the two actions (website-shell-v2); Blog joins once a post is published (website-blog spec).
const MENU = ['Features', 'Learn', 'Compare', 'Docs', ...(fs.existsSync('dist/blog/index.html') ? ['Blog'] : []), 'Get started', 'Try the demo'];

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
    const nav = page.locator('details.nav-menu .menu-panel');
    for (const label of MENU) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible();
    }
    // Every link in the main content is a real link.
    const hrefs = await main.locator('a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs.filter((h) => !h || h === '#'), 'links without a target').toEqual([]);
  });
}

test('Learn opens the Learn page from the phone menu without JavaScript', async ({ page }) => {
  await page.goto('/');
  await page.locator('details.nav-menu > summary').click();
  await page.locator('details.nav-menu nav').getByRole('link', { name: 'Learn', exact: true }).click();
  await expect(page.locator('main h1')).toBeVisible();
  // The menu is closed on the new page; the Learn link in it is marked current.
  await expect(page.locator('details.nav-menu a.nav-link', { hasText: /^Learn$/ })).toHaveAttribute('aria-current', 'page');
});

test('the Compare link works from the phone menu without JavaScript', async ({ page }) => {
  await page.goto('/vs/todoist/');
  await page.locator('details.nav-menu > summary').click();
  await page.locator('details.nav-menu nav').getByRole('link', { name: 'Compare', exact: true }).click();
  await expect(page).toHaveURL(/\/vs\/$/);
  await expect(page.locator('h1')).toHaveText('How OpenTodo compares.');
});

// The footer on phones (website-home-languages D3): the four groups are disclosures that open
// without JavaScript, so every footer link stays reachable while the footer stays short.
test('the phone footer opens every group without JavaScript', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/it/');
  const footer = page.locator('.site-footer');
  expect((await footer.boundingBox())!.height, 'footer height at 390px').toBeLessThanOrEqual(600);
  const wide = await footer.locator('.footer-grid > nav a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  for (const summary of await footer.locator('.footer-fold summary').all()) await summary.click();
  const folded = await footer.locator('.footer-fold a').evaluateAll((as) => as.filter((a) => (a as HTMLElement).offsetParent).map((a) => a.getAttribute('href')));
  expect(folded).toEqual(wide);
});

// The translated home pages tell the English page's story in the same order (website-home-languages).
test('a translated home page has the English sections in order', async ({ page }) => {
  const ids = async (url: string) => { await page.goto(url); return page.locator('main section[id]').evaluateAll((s) => s.map((e) => e.id)); };
  const en = await ids('/');
  expect(en.length).toBeGreaterThan(4);
  for (const lang of ['de', 'fr', 'it', 'es', 'pt']) expect(await ids(`/${lang}/`), lang).toEqual(en);
});
