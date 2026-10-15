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

test('quick-add playground shows chips for a typed line', async ({ page }) => {
  await page.goto('/playground/');
  const input = page.getByLabel('Type a task the way you would in the app');
  await input.fill('Call Sam tomorrow at 3pm #work @call p2 +45m');
  const chips = page.locator('[data-qa-chips] .chip');
  await expect(chips).toHaveCount(5);
  await expect(chips.nth(1)).toHaveText('#Work');
  await expect(chips.nth(2)).toHaveText('@call');
  await expect(chips.nth(3)).toHaveText('P2');
  await expect(chips.nth(4)).toHaveText('45 min');
  await expect(page.locator('[data-qa-title] strong')).toHaveText('Call Sam');
  await input.fill('Watch "Next Friday" tomorrow');
  await expect(page.locator('[data-qa-title] strong')).toHaveText('Watch Next Friday');
  await expect(chips).toHaveCount(1);
});

test('filter playground narrows the sample list and reports errors', async ({ page }) => {
  await page.goto('/playground/');
  const input = page.getByLabel('Type a filter query');
  await input.fill('overdue & no project');
  await expect(page.locator('[data-fp-status] strong')).toHaveText('1 of 14 sample tasks match');
  await expect(page.locator('[data-fp-task]:visible')).toHaveCount(1);
  await expect(page.locator('[data-fp-task]:visible .t-title')).toHaveText('Renew passport');
  await input.fill('completed');
  await expect(page.locator('[data-fp-status] strong')).toHaveText('2 of 14 sample tasks match');
  await input.fill('@call &');
  await expect(page.locator('[data-fp-status] .play-error')).toContainText('Not a query yet');
  await expect(page.locator('[data-fp-task]:visible')).toHaveCount(2);
});

test('server planner rewrites the compose file from the answers', async ({ page }) => {
  await page.goto('/self-host/plan/');
  const compose = page.locator('[data-planner-compose]');
  await expect(compose).toContainText('OPENTODO_BASE_URL=https://todo.example.com');
  await expect(compose).toContainText('OPENTODO_BACKUP_DESTINATION=s3');
  await page.getByLabel('Domain', { exact: true }).fill('tasks.home.example');
  await page.getByLabel("Through Cloudflare's proxy (orange cloud) in front of my own proxy").check();
  await page.getByLabel('Calendar apps (CalDAV)').check();
  await expect(compose).toContainText('OPENTODO_BASE_URL=https://tasks.home.example');
  await expect(compose).toContainText('OPENTODO_TRUSTED_PROXIES=cloudflare');
  await expect(compose).toContainText('OPENTODO_CALDAV=true');
  await expect(page.locator('[data-planner-proxy]')).toContainText('tasks.home.example {');
  await page.getByLabel('A Raspberry Pi').check();
  await expect(compose).toContainText('./data:/data');
  await expect(page.locator('[data-planner-steps] li').first()).toContainText('chown 65532:65532');
});

test('islands load only where they are used', async ({ page }) => {
  await page.goto('/vs/things/');
  expect(await page.locator('script[type="module"]').count()).toBe(0);
});
