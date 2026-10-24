// Site-wide constants that are not facts about the app (those come from the bundle).
export const SITE = {
  name: 'OpenTodo',
  url: 'https://open-todo.app',
  demo: 'https://demo.open-todo.app',
  appRepo: 'https://github.com/pixari/opentodo',
  siteRepo: 'https://github.com/pixari/OpenTodoWebsite',
  // Optional support for the maintainer; nothing in the app is behind it.
  coffee: 'https://buymeacoffee.com/pixari',
  // The community chat (website-discord-link): a plain link, nothing is loaded from Discord.
  discord: 'https://discord.gg/Jmj7WuRQ',
  analytics: { src: 'https://analytics.pixari.dev/script.js', websiteId: 'c7bcfbcc-b1cc-4168-b49b-8a4bb5e47f92' },
};

// Where the header and footer send people (website-shell-v2 D2). Each later change of the
// redesign repoints one target here: /features/, /learn/ and /start/.
export const NAV = {
  features: '/#features',
  learn: '/help/',
  start: '/#get-it',
};

export const specUrl = (capability: string) => `${SITE.appRepo}/tree/main/openspec/specs/${capability}`;
