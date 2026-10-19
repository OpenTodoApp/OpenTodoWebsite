// Every page reads and navigates without JavaScript at 360 px (website-platform D6.4).
import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import { sitePages } from './pages';

// The phone menu has two groups, Product and Resources (website-navigation-and-home);
// Guides and Templates join once published, Blog once a post is (website-blog spec).
const CONTENT = fs.existsSync('dist/guides/index.html') && fs.existsSync('dist/templates/index.html') ? ['Guides', 'Templates'] : [];
const BLOG = fs.existsSync('dist/blog/index.html') ? ['Blog'] : [];
// Open Loops joins once the pinned release ships the method (website-open-loops).
const METHOD = fs.existsSync('dist/open-loops/index.html') ? ['Open Loops'] : [];
const PRODUCT = ['Features', 'Compare', 'What it costs', 'Self-host', 'Docs'];
const RESOURCES = ['Help', ...CONTENT, ...METHOD, 'Switch from another app', 'Developers', ...BLOG, "What's new"];
const MENU = [...PRODUCT, ...RESOURCES];

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

test('the Resources menu opens by keyboard and works at 1280 px without JavaScript', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  const group = page.locator('.nav-desktop details.nav-group');
  await group.locator('> summary').focus();
  await page.keyboard.press('Enter');
  for (const label of RESOURCES) await expect(group.getByRole('link', { name: label, exact: true })).toBeVisible();
  await group.getByRole('link', { name: 'Help', exact: true }).click();
  await expect(page).toHaveURL(/\/help\/$/);
});

test('the header has one button and the source link as an icon', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await expect(page.locator('.site-header .btn:visible')).toHaveCount(1);
  await expect(page.locator('.site-header').getByRole('link', { name: 'OpenTodo on GitHub', exact: true })).toBeVisible();
});

test('the Compare link works from the phone menu without JavaScript', async ({ page }) => {
  await page.goto('/vs/todoist/');
  await page.locator('details.nav-menu > summary').click();
  await page.locator('details.nav-menu nav').getByRole('link', { name: 'Compare', exact: true }).click();
  await expect(page).toHaveURL(/\/vs\/$/);
  await expect(page.locator('h1')).toHaveText('How OpenTodo compares.');
});

// The sync illustration reads without JavaScript: both devices, the server, and the
// way to the interactive demo (website-section-system D4).
test('the sync illustration on the home page works without JavaScript', async ({ page }) => {
  await page.goto('/');
  const fig = page.locator('main .sync-illustration');
  await expect(fig).toBeVisible();
  for (const name of ['laptop', 'phone']) await expect(fig.getByRole('list', { name: `Tasks on the ${name}` }).getByRole('listitem')).toHaveCount(3);
  await expect(fig.getByText('Your server')).toBeVisible();
  await expect(fig.getByRole('link', { name: 'Try it yourself' })).toHaveAttribute('href', '/self-host/#sync');
});

// /about/ opens with the maintainer's note, and the figures beside the headline are
// durable ones from the bundle, each a link; no release date sits there
// (website-maintainer-and-proof "About and trust page").
test('about opens with the maintainer note and durable figures, without JavaScript', async ({ page }) => {
  await page.goto('/about/');
  const head = page.locator('main > section').first();
  await expect(head.locator('.maintainer-note blockquote')).toBeVisible();
  const figures = head.locator('.proof a');
  await expect(figures).toHaveCount(4);
  await expect(head).not.toContainText('October 2026');
  for (const caption of ['licence', 'published specifications', 'documentation pages', 'import formats']) await expect(head.locator('.proof')).toContainText(caption);
  await expect(page.locator('main')).toContainText('Every release is listed on');
});
