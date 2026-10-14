// Site-wide constants that are not facts about the app (those come from the bundle).
export const SITE = {
  name: 'OpenTodo',
  url: 'https://open-todo.app',
  demo: 'https://demo.open-todo.app',
  appRepo: 'https://github.com/pixari/opentodo',
  siteRepo: 'https://github.com/pixari/OpenTodoWebsite',
  analytics: { src: 'https://analytics.pixari.dev/script.js', websiteId: 'c7bcfbcc-b1cc-4168-b49b-8a4bb5e47f92' },
};

export const specUrl = (capability: string) => `${SITE.appRepo}/tree/main/openspec/specs/${capability}`;
