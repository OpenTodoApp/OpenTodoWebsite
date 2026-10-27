// Site-wide constants that are not facts about the app (those come from the bundle).
export const SITE = {
  name: 'OpenTodo',
  url: 'https://open-todo.app',
  demo: 'https://demo.open-todo.app',
  appRepo: 'https://github.com/OpenTodoApp/OpenTodo',
  siteRepo: 'https://github.com/OpenTodoApp/OpenTodoWebsite',
  // Optional support for the maintainer; nothing in the app is behind it.
  coffee: 'https://buymeacoffee.com/pixari',
  sponsor: 'https://github.com/sponsors/pixari',
  // The community chat (website-discord-link): a plain link, nothing is loaded from Discord.
  discord: 'https://discord.gg/Jmj7WuRQ',
  analytics: { src: 'https://analytics.pixari.dev/script.js', websiteId: 'c7bcfbcc-b1cc-4168-b49b-8a4bb5e47f92' },
};

// Where the header and footer send people (website-shell-v2 D2). Each later change of the
// redesign repoints one target here: /features/, /learn/ and /start/.
export const NAV = {
  features: '/features/',
  learn: '/learn/',
  start: '/start/',
};

/** A release's notes on GitHub (website-retire-whats-new): the full list of changes of every version. */
export const releaseUrl = (version: string) => `${SITE.appRepo}/releases/tag/v${version.replace(/^v/, '')}`;
export const RELEASES_URL = `${SITE.appRepo}/releases`;

export const specUrl = (capability: string) => `${SITE.appRepo}/tree/main/openspec/specs/${capability}`;
