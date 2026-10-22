// Automated accessibility audit of every page in light and dark at 360 and 1280 px
// (OpenSpec website-accessibility "Automated AAA gate", "Pointer targets", "Focus is
// never obscured"): the WCAG 2.2 A, AA and AAA rules, failing on serious or critical
// violations except an enhanced-contrast finding on a pair of the exceptions register;
// horizontal scroll; a 44 px hit area around every pointer target; and keyboard focus
// that is never partly outside the viewport or under the sticky header. The measurements
// live in tests/lib/a11y.ts; fixtures.spec.ts proves each one fails on a broken page.
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { sitePages } from './pages';
import { STILL, TAGS, TARGETS, blocking, describe, obscuredFocus, smallTargets } from './lib/a11y';

const pages = sitePages();

for (const scheme of ['light', 'dark'] as const) {
  for (const width of [360, 1280]) {
    test.describe(`${scheme} ${width}px`, () => {
      test.use({ colorScheme: scheme, viewport: { width, height: 900 } });
      for (const url of pages) {
        test(`${url}`, async ({ page }) => {
          await page.goto(url, { waitUntil: 'load' });
          // Reveal everything that is lazy so axe sees real colours and sizes.
          await page.emulateMedia({ reducedMotion: 'reduce' });
          // @axe-core/playwright is typed against its own playwright-core version.
          const results = await new AxeBuilder({ page: page as unknown as ConstructorParameters<typeof AxeBuilder>[0]['page'] }).withTags(TAGS).analyze();
          expect(describe(blocking(results.violations)), `${url} in ${scheme} at ${width}px`).toEqual([]);
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
          expect(overflow, `${url} scrolls sideways by ${overflow}px at ${width}px`).toBeLessThanOrEqual(0);

          const small = await page.evaluate(smallTargets, TARGETS);
          expect(small, `${url} at ${width}px: hit area under 44 px`).toEqual([]);

          await page.addStyleTag({ content: STILL });
          const hidden = await page.evaluate(obscuredFocus, TARGETS);
          expect(hidden, `${url} at ${width}px: focus obscured`).toEqual([]);
        });
      }
    });
  }
}
