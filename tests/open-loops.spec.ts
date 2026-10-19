// The Open Loops page (website-open-loops): the method's words from the pinned bundle's
// method.json, the loop chosen by keyboard, the list without JavaScript, and the
// loop's script on no other page. Skipped when the pinned release does not ship the
// method, because then the page is not built.
import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { sitePages } from './pages';
import { resolveBundle } from '../scripts/lib/bundle.mjs';

const built = sitePages().includes('/open-loops/');
const methodFile = path.join(resolveBundle().dir, 'method.json');
if (built && !fs.existsSync(methodFile)) throw new Error(`dist/ has /open-loops/ but ${methodFile} does not exist: run the tests with the same bundle (BUNDLE_DIR) as the build`);
const method = built ? JSON.parse(fs.readFileSync(methodFile, 'utf8')) : null;
test.skip(!built, 'the pinned release does not ship Open Loops');

test('the moves in method.json order, with its words', async ({ page }) => {
  await page.goto('/open-loops/');
  await expect(page.locator('.loop-move .loop-name')).toHaveText(method.moves.map((m: { name: { en: string } }) => m.name.en));
  await expect(page.locator('main')).toContainText(method.moves[2].description.en);
  for (const p of method.principles) await expect(page.locator('.principles')).toContainText(p.name.en);
});

test('choosing a move by keyboard shows it in the centre', async ({ page }) => {
  await page.goto('/open-loops/');
  const clarify = page.locator('.loop-move[data-move="clarify"]');
  await clarify.focus();
  await page.keyboard.press('Enter');
  await expect(clarify).toHaveAttribute('aria-current', 'true');
  await expect(page.locator('.loop-move[data-move="catch"]')).not.toHaveAttribute('aria-current', 'true');
  await expect(page.locator('[data-detail="clarify"]')).toBeVisible();
  await expect(page.locator('[data-detail="clarify"]')).toContainText(method.moves[1].description.en);
  await expect(page.locator('.loop-centre')).toHaveAttribute('aria-live', 'polite');
});

test.describe('without JavaScript at 360 px', () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 360, height: 800 } });
  test('the moves read as a list with every detail', async ({ page }) => {
    await page.goto('/open-loops/');
    const items = page.locator('.loop-list > li');
    await expect(items).toHaveCount(5);
    for (const m of method.moves) await expect(page.locator(`#move-${m.id}`)).toContainText(m.description.en);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test('the move names in Italian come from method.json', async ({ page }) => {
  test.skip(!method.languages.includes('it'));
  await page.goto('/it/open-loops/');
  await expect(page.locator('.loop-move .loop-name')).toHaveText(method.moves.map((m: { name: { it: string } }) => m.name.it));
});

test('the loop script ships only on the Open Loops pages', async ({ page, request }) => {
  await page.goto('/');
  const srcs = await page.evaluate(() => [...document.querySelectorAll('script[src]')].map((s) => (s as HTMLScriptElement).src).filter((u) => u.startsWith(location.origin)));
  for (const src of srcs) expect(await (await request.get(src)).text(), src).not.toContain('data-loop');
  const inline = await page.evaluate(() => [...document.querySelectorAll('script:not([src])')].map((s) => s.textContent ?? '').join('\n'));
  expect(inline).not.toContain('data-loop');
  expect(await page.locator('[data-loop]').count()).toBe(0);
});
