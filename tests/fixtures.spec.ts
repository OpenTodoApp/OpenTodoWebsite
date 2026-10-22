// The audit's measurements on pages built to fail (OpenSpec website-accessibility
// "Automated AAA gate", "Pointer targets", "Focus is never obscured"): each pass names
// the broken element, so a green run of a11y.spec.ts means the checks ran, not that
// they are silent. The last test tabs backwards onto a link under the sticky header
// on the real home page and expects the page to have scrolled past the header.
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { STILL, TAGS, TARGETS, blocking, describe, obscuredFocus, smallTargets } from './lib/a11y';

const doc = (body: string, css = '') => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Fixture</title><style>body{margin:0;padding:40px;font:16px/1.5 sans-serif;background:#fff;color:#000}${css}</style></head><body><main><h1>Fixture</h1>${body}</main></body></html>`;

test('a 32 px control fails the pointer-target pass, named with its size', async ({ page }) => {
  await page.setContent(doc('<p>Before</p><button type="button" id="go" style="display:block;width:32px;height:32px;padding:0">Go</button><p>After</p>'));
  const small = await page.evaluate(smallTargets, TARGETS);
  expect(small).toEqual(['<button> "Go" 32×32: 22 px up, down, left, right misses']);
});

test('a 32 px control with an invisible 44 px hit area passes', async ({ page }) => {
  await page.setContent(doc('<p>Before</p><button type="button" id="go" style="display:block;width:32px;height:32px;padding:0">Go</button><p>After</p>', '#go{position:relative}#go::after{content:"";position:absolute;inset:min(0px,calc((100% - 44px)/2))}'));
  expect(await page.evaluate(smallTargets, TARGETS)).toEqual([]);
});

test('a caption at 5:1 that is not in the register fails the enhanced-contrast rule, naming the ratio', async ({ page }) => {
  // #707070 on white measures 4.95:1: over the AA 4.5:1, under the AAA 7:1, and no pair of the register.
  await page.setContent(doc('<p>Body text that passes.</p><figure><img alt="" width="10" height="10"><figcaption style="color:#707070">A caption in a grey no token uses.</figcaption></figure>'));
  const results = await new AxeBuilder({ page: page as unknown as ConstructorParameters<typeof AxeBuilder>[0]['page'] }).withTags(TAGS).analyze();
  const lines = describe(blocking(results.violations));
  expect(lines).toHaveLength(1);
  expect(lines[0]).toContain('color-contrast-enhanced');
  expect(lines[0]).toContain('not in the exceptions register');
  expect(lines[0]).toMatch(/figcaption 4\.9\d:1/);
});

test('a link under a fixed banner fails the focus pass, naming what covers it', async ({ page }) => {
  await page.setContent(doc('<div id="bar" style="position:fixed;top:0;left:0;right:0;height:120px;background:#eee;z-index:1">Banner</div><a id="under" href="#x" style="position:absolute;top:20px;left:40px">Covered link</a>'));
  await page.addStyleTag({ content: STILL });
  expect(await page.evaluate(obscuredFocus, TARGETS)).toEqual(['a "Covered link": under <div.>']);
});

test('tabbing backwards onto a link under the sticky header scrolls the page past the header', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });
  await page.addStyleTag({ content: STILL });
  // Put a link of the main content just under the header, then focus the link after it and go back.
  const ok = await page.evaluate(() => {
    const links = [...document.querySelectorAll<HTMLAnchorElement>('main a[href]')].filter((a) => a.getBoundingClientRect().width > 0);
    const target = links[Math.min(5, links.length - 2)]; const next = links[links.indexOf(target) + 1];
    const header = document.querySelector('header')!;
    window.scrollTo(0, scrollY + target.getBoundingClientRect().top - 10);
    next.focus({ preventScroll: true });
    return { under: target.getBoundingClientRect().top < header.getBoundingClientRect().bottom, text: target.textContent?.trim().slice(0, 30) };
  });
  expect(ok.under, `${ok.text} starts under the header`).toBe(true);
  await page.keyboard.press('Shift+Tab');
  const after = await page.evaluate(() => {
    const el = document.activeElement!; const r = el.getBoundingClientRect(); const header = document.querySelector('header')!.getBoundingClientRect();
    return { text: el.textContent?.trim().slice(0, 30), top: r.top, headerBottom: header.bottom, inside: r.bottom <= innerHeight };
  });
  expect(after.text).toBe(ok.text);
  expect(after.top, `${after.text} at ${after.top}px, header ends at ${after.headerBottom}px`).toBeGreaterThanOrEqual(after.headerBottom);
  expect(after.inside).toBe(true);
});
