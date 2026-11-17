// "Chores that come back" (in-practice series): an example household list of repeating chores.
// The example is invented for the post and shown as an example, never as a real person's list.
let home;

export async function seed(api) {
  ({ id: home } = await api('POST', '/api/v1/projects', { name: 'Home', color: '#14b8a6' }));
  const chore = (title, date, recurrence) => api('POST', '/api/v1/tasks', { title, project_id: home, due: { date }, recurrence });
  await chore('Put the bins out', '2026-11-17', 'every tuesday');
  await chore('Water the plants', '2026-11-17', 'every 3 days after completion');
  await chore('Change the beds', '2026-11-21', 'every 2 weeks on saturday');
  await chore('Descale the kettle', '2026-11-28', 'every 2 months after completion');
  await chore('Pay the rent', '2026-12-01', 'every 1st');
}

export async function scenes({ page, shot, video, base }) {
  const open = async (p) => {
    await p.goto(`${base}/project/${home}`);
    await p.getByText('Pay the rent').waitFor();
    await p.waitForTimeout(600);
  };

  // 1. The list: every chore with its ↻ and its next date.
  await open(page);
  await shot('list');

  // 2. The rule of one chore, with the next three dates and Skip.
  await page.getByText('Water the plants').click();
  await page.keyboard.press('Shift+Enter');
  await page.getByText(/every 3 days after/).click();
  await page.getByText(/^Next:/).waitFor();
  await page.waitForTimeout(400);
  await shot('repeat');

  // 3. The video: add a chore with its rule in quick add, then tick the bins and watch them
  // move to next Tuesday.
  await video('add-and-complete', async (p) => {
    await open(p);
    await p.waitForTimeout(800);
    await p.getByPlaceholder(/Add a task to Home/).click();
    await p.keyboard.type('Clean the bathroom every saturday', { delay: 70 });
    await p.waitForTimeout(900);
    await p.keyboard.press('Enter');
    await p.getByText('Clean the bathroom').first().waitFor();
    await p.keyboard.press('Escape');
    await p.waitForTimeout(1500);
    await p.getByRole('button', { name: 'Complete Put the bins out' }).click();
    await p.waitForTimeout(600);
    await p.mouse.click(900, 700);
    await p.waitForTimeout(4000);
  }, { trim: 1.2 });
}
