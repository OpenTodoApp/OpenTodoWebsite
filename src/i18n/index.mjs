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

// The German visitor's path (german-pages D1): these pages exist in English and German only.
// The feature group and platform paths follow the keys in src/lib/features.ts and the slugs in
// src/lib/install.ts; scripts/test/i18n.test.mjs fails when they drift apart.
export const GERMAN_PAGES = [
  '/features/', '/features/plan/', '/features/capture/', '/features/projects/', '/features/devices/', '/features/integrations/', '/features/admin/',
  '/start/',
  '/install/', '/install/iphone-ipad/', '/install/android/', '/install/windows/', '/install/mac/', '/install/linux/', '/install/chromeos/',
  '/self-host/',
  '/switch/', '/switch/todoist/', '/switch/microsoft-todo/', '/switch/things/',
];

/** The translated pages, by English path, and the languages besides English each exists in. */
// The home page and the phone apps page (phone-apps-page) exist in every language.
export const TRANSLATED_PAGES = {
  '/': OTHER_LANGS,
  '/apps/': OTHER_LANGS,
  ...Object.fromEntries(GERMAN_PAGES.map((p) => [p, ['de']])),
};

/** Splits a pathname into its language and the English path: /de/ -> ['de', '/'], /about/ -> ['en', '/about/']. */
export function splitLang(pathname) {
  const m = /^\/([a-z]{2})(\/.*)?$/.exec(pathname);
  if (m && OTHER_LANGS.includes(m[1])) return [m[1], m[2] || '/'];
  return [DEFAULT_LANG, pathname];
}

/** The path of an English page in a language: ('/', 'de') -> /de/; English stays unprefixed. */
export const localePath = (englishPath, lang) => (lang === DEFAULT_LANG ? englishPath : `/${lang}${englishPath === '/' ? '/' : englishPath}`);

/** The page's versions: English and each language it is translated into, or null when the page is English only. */
export function alternatesFor(pathname) {
  const [lang, english] = splitLang(pathname);
  const langs = TRANSLATED_PAGES[english];
  if (!langs || (lang !== DEFAULT_LANG && !langs.includes(lang))) return null;
  return Object.keys(LANGS)
    .filter((l) => l === DEFAULT_LANG || langs.includes(l))
    .map((l) => ({ lang: l, href: localePath(english, l), ...LANGS[l] }));
}

/** Where a link to an English page leads from a page in `lang`: its translation when it has one, else the English page. */
export function localHref(href, lang) {
  if (lang === DEFAULT_LANG || !href.startsWith('/')) return href;
  const [path, hash] = href.split('#');
  if (!TRANSLATED_PAGES[path]?.includes(lang)) return href;
  return localePath(path, lang) + (hash === undefined ? '' : `#${hash}`);
}
