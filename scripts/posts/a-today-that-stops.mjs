// "A Today that stops" (in-practice series, part 3): an example day of errands, with a Today
// limit of 5 and day parts on. The tasks are invented for the post and shown as an example.
const TODAY = process.env.POST_DAY ?? new Date().toISOString().slice(0, 10);

export async function seed(api) {
  // Slots go first come, first served: these are created in this order, so the first five hold
  // the slots and the last four wait.
  const task = (title, extra = {}) => api('POST', '/api/v1/tasks', { title, due: { date: TODAY, ...(extra.time && { time: extra.time }) }, ...(extra.part && { day_part: extra.part }), ...(extra.evening && { evening: true }) });
  await task('Reply to the landlord', { part: 'morning' });
  await task('Pay the electricity bill');
  await task('Send the invoice to Jordan', { time: '14:00' });
  await task('Buy a birthday card', { part: 'afternoon' });
  await task('Book the dentist');
  await task('Call the bank', { part: 'morning' });
  await task('Water the plants', { evening: true });
  await task('Return the library books', { part: 'afternoon' });
  await task('Sort the photos from the weekend');
}

export async function scenes({ page, shot, video, base }) {
  // 1. The settings, as a person would set them: day parts on, Today holds 5.
  await page.goto(`${base}/settings/general/start`);
  await page.getByText('Today holds').first().waitFor();
  await page.keyboard.press('Escape').catch(() => {});
  await page.getByRole('switch', { name: /Group Today by part of the day/ }).click();
  await page.getByLabel('Today holds').selectOption('5');
  await page.waitForTimeout(800);
  await page.getByRole('heading', { name: 'Today limit' }).scrollIntoViewIfNeeded();
  await shot('settings');

  // 2. Today: 5 of 5, in its parts of the day, the rest folded under Waiting for a slot.
  await page.goto(`${base}/today`);
  await page.getByText(/Waiting for a slot/).first().waitFor();
  await page.mouse.move(1200, 790);
  await page.waitForTimeout(800);
  await shot('today');

  // 3. The waiting tasks, opened, each with Take a slot.
  await page.getByText(/Waiting for a slot/).first().click();
  await page.mouse.move(1200, 790);
  await page.waitForTimeout(800);
  await shot('waiting');

  // 4. The video: finish one task, and the first waiting task comes in.
  await video('finish-one', async (p) => {
    await p.goto(`${base}/today`);
    await p.getByText(/Waiting for a slot/).first().waitFor();
    await p.waitForTimeout(1500);
    await p.getByRole('button', { name: 'Complete Pay the electricity bill' }).click();
    await p.waitForTimeout(600);
    await p.mouse.click(900, 760);
    await p.waitForTimeout(4000);
  }, { trim: 1.2 });
}
