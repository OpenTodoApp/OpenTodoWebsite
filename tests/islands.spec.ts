// The interactive parts work, and load only on the pages that use them.
import { expect, test } from '@playwright/test';

test('hero demo: add and complete a task', async ({ page }) => {
  await page.goto('/');
  const input = page.getByLabel('Add a task to the demo');
  await input.fill('Buy stamps');
  await input.press('Enter');
  const list = page.locator('[data-demo-list]');
  await expect(list.getByText('Buy stamps')).toBeVisible();
  await list.getByRole('button', { name: 'Complete "Buy stamps"' }).click();
  await expect(list.getByText('Buy stamps')).toHaveCount(0, { timeout: 3000 });
});

test('feature tour: chapters switch screenshots', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('tab', { name: 'Organise' }).click();
  await expect(page.getByRole('tab', { name: 'Organise' })).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('button', { name: /^Boards/ }).click();
  await expect(page.locator('[data-tour-shot="organise-1"]')).toBeVisible();
  await expect(page.locator('[data-tour-shot="plan-0"]')).toBeHidden();
});

test('sync playground converges after a conflict', async ({ page }) => {
  await page.goto('/self-host/');
  await page.getByRole('button', { name: 'Play a conflict' }).click();
  await expect(page.locator('[data-sync-caption]')).toContainText('Converged', { timeout: 20000 });
  for (const device of ['laptop', 'phone']) {
    await expect(page.locator(`[data-device="${device}"] li`).nth(1)).toHaveClass(/done/);
    await expect(page.locator(`[data-device="${device}"] li .title`).nth(1)).toHaveText('Book flights to Lisbon, window seat');
  }
});

test('install tabs switch panels', async ({ page }) => {
  await page.goto('/self-host/');
  await page.getByRole('tab', { name: 'Coolify' }).click();
  await expect(page.locator('#panel-coolify')).toBeVisible();
  await expect(page.locator('#panel-docker')).toBeHidden();
});

test('islands load only where they are used', async ({ page }) => {
  await page.goto('/vs/things/');
  expect(await page.locator('script[type="module"]').count()).toBe(0);
});
