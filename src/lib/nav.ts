// The site's navigation in one place (website-navigation-and-home D1): the header,
// the phone menu and the footer all render from these groups, so they cannot drift.
// Links that depend on content (Guides, Templates, Blog) appear once it is published.
import { SITE } from './site';
import { method } from './bundle';

/**
 * The Open Loops page in `lang`, or null when the pinned release does not ship the
 * method or that language (website-open-loops D2): every link to the page goes
 * through this, so none can point at a page that was not built.
 */
export function methodPage(lang = 'en'): string | null {
  if (!method || !method.languages.includes(lang)) return null;
  return lang === 'en' ? '/open-loops/' : `/${lang}/open-loops/`;
}

export interface NavLink { href: string; label: string; match: string | null }
export interface NavFlags { content: boolean; blog: boolean }

/** Pages translated into only some languages, for alternatesFor (website-open-loops D2). */
export const pageLanguages = (): Record<string, string[]> => (method ? { '/open-loops/': method.languages } : {});

/** The header's top-level links, in order; Resources is the menu between Self-host and Docs. */
export function headerLinks() {
  const before: NavLink[] = [
    { href: '/#features', label: 'Features', match: null },
    { href: '/vs/', label: 'Compare', match: '/vs/' },
    { href: '/cost/', label: 'What it costs', match: '/cost/' },
    { href: '/self-host/', label: 'Self-host', match: '/self-host/' },
  ];
  const after: NavLink[] = [{ href: '/docs/', label: 'Docs', match: null }];
  return { before, after };
}

/** The Resources menu: where to learn, get help and follow the project. */
export function resourceLinks({ content, blog }: NavFlags): NavLink[] {
  return [
    { href: '/help/', label: 'Help', match: '/help/' },
    ...(content ? [{ href: '/guides/', label: 'Guides', match: '/guides/' }, { href: '/templates/', label: 'Templates', match: '/templates/' }] : []),
    ...(methodPage() ? [{ href: '/open-loops/', label: 'Open Loops', match: '/open-loops/' }] : []),
    { href: '/switch/', label: 'Switch from another app', match: '/switch/' },
    { href: '/developers/', label: 'Developers', match: '/developers/' },
    ...(blog ? [{ href: '/blog/', label: 'Blog', match: '/blog/' }] : []),
    { href: '/whats-new/', label: "What's new", match: '/whats-new/' },
  ];
}

/** The footer's four columns, at most eight links each. */
export function footerColumns({ content, blog }: NavFlags): { title: string; links: NavLink[] }[] {
  const l = (href: string, label: string): NavLink => ({ href, label, match: null });
  return [
    { title: 'Product', links: [l('/#features', 'Features'), l('/vs/', 'Compare'), l('/cost/', 'What it costs'), l('/install/', 'Install the app'), l('/capture/', 'Browser extension and share sheet'), l('/playground/', 'Try quick add and filters'), l('/switch/', 'Moving from another app')] },
    { title: 'Resources', links: [l('/help/', 'Help'), l('/how-to/', 'How-tos'), ...(content ? [l('/guides/', 'Guides'), l('/templates/', 'Templates')] : []), ...(methodPage() ? [l('/open-loops/', 'Open Loops')] : []), l('/topics/', 'Topics'), ...(blog ? [l('/blog/', 'Blog')] : []), l('/whats-new/', "What's new")] },
    { title: 'Self-hosting', links: [l('/self-host/', 'Self-host'), l('/self-host/plan/', 'Plan your server'), l('/toolkit/', 'Toolkit'), l('/developers/', 'Developers'), l('/docs/', 'Docs'), l('/status/', 'Demo status')] },
    { title: 'Project', links: [l('/about/', 'About and trust'), l('/faq/', 'FAQ'), l('/accessibility/', 'Accessibility'), l(SITE.appRepo, 'App on GitHub'), l(`${SITE.appRepo}/tree/main/openspec/specs`, 'App specifications'), l(SITE.siteRepo, 'This website on GitHub'), l(`${SITE.siteRepo}/tree/main/openspec`, 'Website specifications'), l('/feed.xml', 'RSS feed')] },
  ];
}
