// Automated accessibility audit of every page in light and dark at 360 and 1280
// px, failing on serious or critical axe violations, on horizontal scroll, and on anything
// the page writes to the console as an error: a script that throws, a file that does not load,
// or something the Content-Security-Policy of nginx.conf refuses (site-polish D4).
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { sitePages } from './pages';

const pages = sitePages();
for (const scheme of ['light', 'dark'] as const) {
  for (const width of [360, 1280]) {
    test.describe(`${scheme} ${width}px`, () => {
      test.use({ colorScheme: scheme, viewport: { width, height: 900 } });
      for (const url of pages) {
        test(`${url}`, async ({ page }) => {
          // The audit of the longest pages takes 18 s on a normal CI runner and over 30 s on a slow one.
          test.setTimeout(90_000);
          const errors: string[] = [];
          page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
          page.on('pageerror', (e) => errors.push(String(e)));
          // The analytics script is answered here: a check is not a visit, and needs no network.
          await page.route('https://analytics.pixari.dev/**', (r) => r.fulfill({ status: 200, contentType: 'text/javascript', body: '' }));
          await page.goto(url, { waitUntil: 'load' });
          // Reveal everything that is lazy so axe sees real colours and sizes.
          await page.emulateMedia({ reducedMotion: 'reduce' });
          // @axe-core/playwright is typed against its own playwright-core version.
          const results = await new AxeBuilder({ page: page as unknown as ConstructorParameters<typeof AxeBuilder>[0]['page'] }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
          const bad = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
          const summary = bad.map((v) => `${v.id} (${v.impact}): ${v.help}\n${v.nodes.slice(0, 5).map((n) => `    ${n.target.join(' ')}: ${n.failureSummary?.split('\n').slice(0, 2).join(' ')}`).join('\n')}`);
          expect(summary, `${url} in ${scheme} at ${width}px`).toEqual([]);
          expect(errors, `${url} logs errors in ${scheme} at ${width}px`).toEqual([]);
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
          expect(overflow, `${url} scrolls sideways by ${overflow}px at ${width}px`).toBeLessThanOrEqual(0);
        });
      }
    });
  }
}
