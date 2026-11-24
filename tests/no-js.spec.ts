// Every page reads and navigates without JavaScript at 360 px (website-platform D6.4).
import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import { sitePages } from './pages';
import de from '../src/i18n/path/de.mjs';

// Four destinations, Get started and the star (website-restyle-chrome D1); Blog joins once a post is published (website-blog spec).
// Try the demo stays in the header bar, outside the menu.
const MENU = ['Features', 'Learn', 'Docs', ...(fs.existsSync('dist/blog/index.html') ? ['Blog'] : []), 'Get started', 'Star on GitHub'];

test.use({ javaScriptEnabled: false, viewport: { width: 360, height: 800 } });

for (const url of sitePages()) {
  test(`${url} without JavaScript`, async ({ page }) => {
    await page.goto(url);
    const main = page.locator('main');
    await expect(main.locator('h1')).toBeVisible();
    // Chinese is written without spaces, so two Han characters count as one word.
    const text = await main.innerText();
    const words = text.split(/\s+/).filter(Boolean).length + (text.match(/\p{Script=Han}/gu)?.length ?? 0) / 2;
    // The closing band is one title and one action now (website-restyle-cta), so short index pages hold fewer words.
    expect(words, 'main text is readable').toBeGreaterThan(40);
    // The phone menu is a <details>, so it opens without scripts.
    await page.locator('details.nav-menu > summary').click();
    const nav = page.locator('details.nav-menu .menu-panel');
    // German pages have a German header (german-pages D7).
    for (const label of MENU.map((l) => (url.startsWith('/de/') ? (de.chrome as Record<string, string>)[l] ?? l : l))) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible();
    }
    await expect(page.locator('.site-header a.header-demo')).toBeVisible();
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

// The footer on phones (website-restyle-chrome D3): the three groups are disclosures that open
// without JavaScript, so every footer link stays reachable while the footer stays short.
test('the phone footer opens every group without JavaScript', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/it/');
  const footer = page.locator('.site-footer');
  expect((await footer.boundingBox())!.height, 'footer height at 390px').toBeLessThanOrEqual(600);
  const wide = await footer.locator('.footer-group a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  for (const summary of await footer.locator('.footer-fold summary').all()) await summary.click();
  const folded = await footer.locator('.footer-fold a').evaluateAll((as) => as.filter((a) => (a as HTMLElement).offsetParent).map((a) => a.getAttribute('href')));
  expect(folded).toEqual(wide);
});

// The translated home pages tell the English page's story in the same order (website-home-languages).
test('a translated home page has the English sections in order', async ({ page }) => {
  const ids = async (url: string) => { await page.goto(url); return page.locator('main section[id]').evaluateAll((s) => s.map((e) => e.id)); };
  const en = await ids('/');
  expect(en.length).toBeGreaterThan(4);
  for (const lang of ['de', 'fr', 'it', 'es', 'pt', 'zh', 'nl']) expect(await ids(`/${lang}/`), lang).toEqual(en);
});

// The language switch (website-restyle-chrome D2) is a disclosure that opens without JavaScript.
test('the language switch opens without JavaScript and leads to a translation', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.locator('.header-lang > summary').click();
  await page.locator('.header-lang .lang-panel').getByRole('link', { name: 'Italiano' }).click();
  await expect(page).toHaveURL(/\/it\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'it');
});

// The home page ends with one quiet way to the support page (home-support-link).
test('the home page ends with the support link, in its language', async ({ page }) => {
  for (const [url, name] of [['/', 'Support OpenTodo'], ['/de/', 'OpenTodo unterstützen']]) {
    await page.goto(url);
    const link = page.locator('#blog a[data-support]');
    await expect(link, url).toHaveText(name);
    await expect(link, url).toHaveAttribute('href', '/support/');
    await expect(page.locator('main a[data-support]'), url).toHaveCount(1);
  }
});

// Without JavaScript the survey strip (survey-strip) stays, without its close button.
test('the survey strip reads without JavaScript', async ({ page }) => {
  test.skip(!fs.readFileSync('dist/index.html', 'utf8').includes('survey-strip'), 'survey strip ended');
  await page.goto('/');
  const strip = page.locator('.survey-strip');
  await expect(strip.getByRole('link', { name: 'Take the survey' })).toBeVisible();
  await expect(strip.locator('.survey-close')).toBeHidden();
  await page.goto('/de/');
  await expect(page.locator('.survey-strip')).toContainText('auf Englisch');
});

// The Microsoft To Do notice (ms-todo-home-notice) reads without JavaScript, in the page's language,
// until its end date. Delete this test with the component.
test('the Microsoft To Do notice reads without JavaScript', async ({ page }) => {
  test.skip(!fs.readFileSync('dist/index.html', 'utf8').includes('ms-todo-notice'), 'notice ended');
  await page.goto('/');
  await expect(page.locator('.ms-todo-notice').getByRole('link', { name: 'Here’s how to bring your tasks' })).toHaveAttribute('href', '/blog/leaving-microsoft-to-do/');
  await page.goto('/de/');
  const link = page.locator('.ms-todo-notice a');
  await expect(link).toContainText('auf Englisch');
  await expect(link).toHaveAttribute('hreflang', 'en');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
