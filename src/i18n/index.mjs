// Site languages (website-languages design D1). English is the site; the home
// page also exists in the other languages below. Plain ESM so the unit tests
// can check the dictionaries.
export const DEFAULT_LANG = 'en';

/** Native name, hreflang code and Open Graph locale per language. */
export const LANGS = {
  en: { name: 'English', hreflang: 'en', og: 'en_GB' },
  de: { name: 'Deutsch', hreflang: 'de', og: 'de_DE' },
  fr: { name: 'Français', hreflang: 'fr', og: 'fr_FR' },
  it: { name: 'Italiano', hreflang: 'it', og: 'it_IT' },
  es: { name: 'Español', hreflang: 'es', og: 'es_ES' },
  pt: { name: 'Português', hreflang: 'pt', og: 'pt_PT' },
  zh: { name: '简体中文', hreflang: 'zh-Hans', og: 'zh_CN' },
};
export const OTHER_LANGS = Object.keys(LANGS).filter((l) => l !== DEFAULT_LANG);

/** The English pages that exist in every language, by their English path. */
// Only the home page is translated.
export const TRANSLATED_PAGES = ['/'];

/** Splits a pathname into its language and the English path: /de/ -> ['de', '/'], /about/ -> ['en', '/about/']. */
export function splitLang(pathname) {
  const m = /^\/([a-z]{2})(\/.*)?$/.exec(pathname);
  if (m && OTHER_LANGS.includes(m[1])) return [m[1], m[2] || '/'];
  return [DEFAULT_LANG, pathname];
}

/** The path of an English page in a language: ('/', 'de') -> /de/; English stays unprefixed. */
export const localePath = (englishPath, lang) => (lang === DEFAULT_LANG ? englishPath : `/${lang}${englishPath === '/' ? '/' : englishPath}`);

/** Every language's version of a page, or null when the page is English only. */
export function alternatesFor(pathname) {
  const [, english] = splitLang(pathname);
  if (!TRANSLATED_PAGES.includes(english)) return null;
  return Object.keys(LANGS).map((lang) => ({ lang, href: localePath(english, lang), ...LANGS[lang] }));
}
