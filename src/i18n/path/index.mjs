// The strings of the German visitor's path (german-pages D2), by language. `p(lang)` picks them;
// `href(lang)` turns a link to an English page into its translation where one exists.
import en from './en.mjs';
import de from './de.mjs';
import { localHref } from '../index.mjs';

export const PATH = { en, de };
/** @param {'en' | 'de'} lang */
export const p = (lang) => PATH[lang] ?? en;
/** @param {'en' | 'de'} lang */
export const href = (lang) => (to) => localHref(to, lang);
/** The header's and footer's label in a page's language: German on German pages, English elsewhere. */
export const chromeLabel = (lang) => (label) => (lang === 'de' ? de.chrome[label] ?? label : label);
