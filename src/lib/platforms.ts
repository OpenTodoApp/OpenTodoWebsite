// The install platforms in a language (german-pages D6). Kept apart from install.ts and
// install.de.ts so the tests can read those two plain data files directly.
import { PLATFORMS, type Platform } from './install';
import { PLATFORMS_DE } from './install.de';

/** The platforms in a language (german-pages D6): the German text over the English record, links kept. */
export function platforms(lang: 'en' | 'de' = 'en'): Platform[] {
  if (lang === 'en') return PLATFORMS;
  return PLATFORMS.map((p) => {
    const de = PLATFORMS_DE[p.slug];
    if (!de || de.steps.length !== p.steps.length) throw new Error(`install: platform "${p.slug}" has no complete German twin in src/lib/install.de.ts`);
    return { ...p, name: de.name, short: de.short, browser: de.browser, steps: de.steps, after: de.after, reminders: { ...p.reminders, text: de.reminders }, share: { ...p.share, text: de.share } };
  });
}
