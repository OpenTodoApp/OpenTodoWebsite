// The English home page's strings (website-home-languages D1): the reference shape every
// translated home page follows. Placeholders: {licence}, {count}, {groups}. A string with
// inline links carries them as HTML, links within this site only.
export default {
  home: {
    title: 'OpenTodo · A calm task list that runs on your own server',
    description: 'OpenTodo is a free, open-source task list you run on your own server: Today tells you what matters, {count} features with no paid tier, offline on every device, shared with the people you live and work with, and AI only on your terms.',
    hero: {
      eyebrow: 'Free and open source · {licence}',
      say: 'Three things matter today.',
      late: 'Two tasks are late,',
      soft: 'Monday is full and Mia replied.',
      ledeStrong: 'OpenTodo is a calm task list that runs on your own server.',
      lede: 'Plan your day, keep projects in order and share lists with the people you live and work with.',
      tryDemo: 'Try the demo',
      getStarted: 'Get started',
      note: 'No account, nothing to install.',
      alt: 'OpenTodo\'s Today: the sentence about the day under the title, then the tasks in one line each with their dates, projects and labels in aligned columns.',
    },
    day: {
      h2: 'Your day, your projects, one quiet screen.',
      rows: [
        { title: 'Today says what matters', text: 'One sentence under the date names what is late, what is full and who replied, and each part opens what it names. Your device works it out, offline, with no AI.', prop: 'Today, Upcoming' },
        { title: 'Type it the way you say it', text: '“Book the plumber friday 10am #Home p1” becomes a task with its date, project and priority, in six languages.', prop: 'Everywhere' },
        { title: 'Projects as a list, a board or a timeline', text: 'Sections, deadlines and progress at a glance. Share a project and assign its tasks to the people in it.', prop: 'Projects' },
      ],
      quickAlt: 'Quick add listing the date, project, label and priority it understood in a typed line.',
      quickCaption: 'Quick add shows what it understood.',
      boardAlt: 'A shared project as a board with Backlog, This week and Review columns.',
      boardCaption: 'A shared project as a board.',
    },
    features: {
      h2: 'Everything included.',
      intro: '{count} features in {groups} groups, and the integrations you already use. Nothing is held back for a paid plan.',
      pill: 'No tiers',
      noTiers: 'Every feature, for everyone.',
      all: 'All features, with their docs',
      more: 'and {count} more',
      connects: 'Connects to',
      imports: 'Imports from',
      groups: { plan: 'Plan', capture: 'Capture', projects: 'Projects and teams', devices: 'Sync and devices', integrations: 'Integrations', admin: 'Privacy and admin' },
    },
    yours: {
      h2: 'Yours, for good.',
      intro: 'No OpenTodo account and no OpenTodo cloud. One server for everyone you <a href="/docs/sharing/">share lists with</a>, and you can <a href="/docs/import-export/">leave with everything</a> whenever you like.',
      rows: [
        { title: 'Free, all of it', text: 'No tiers, no seats, no trial: every feature for everyone on your server, the whole household included.', link: 'What it costs' },
        { title: 'On your server', text: 'One container and one folder of data. A Raspberry Pi or the smallest rented server is enough.', link: 'Self-hosting' },
        { title: 'Works offline', text: 'Every device keeps a full copy. Edit on the train; changes merge field by field when you are back.', link: 'Offline and sync' },
        { title: 'Encrypted if you want', text: 'With end-to-end encryption, task text is encrypted on your devices before it reaches the server.', link: 'Encryption' },
        { title: 'AI on your terms', text: 'Off unless you turn it on. Your model, local ones too; the assistant proposes changes you approve, and every change can be undone. Your own AI tools connect through MCP or the Claude Code plugin under an agent token.', link: 'How it works' },
      ],
    },
    ways: {
      h2: 'Three ways in.',
      intro: 'OpenTodo is not offered as a hosted service, so there is nothing to sign up for here. Move between the three later; your data comes with you.',
      items: [
        { title: 'Try the demo', text: 'A private sandbox in your browser with sample projects, deleted after two hours without activity.', cta: 'Open the demo', more: 'How the demo works' },
        { title: 'Join a server', text: 'Someone runs it for your home or team? Open the invitation link they sent, then install the app from the browser.', cta: 'Install the app', more: 'Installing the app' },
        { title: 'Run your own', text: 'Docker, Umbrel, Unraid, TrueNAS, a Pi or a VPS, in about twenty minutes the first time.', cta: 'Self-host', more: 'Plan your server' },
      ],
      switch: 'Moving from Todoist, Things, TickTick or Linear?',
      switchLink: 'Bring your tasks',
    },
    community: {
      kicker: 'Community',
      h2: 'Come and say hello.',
      intro: 'OpenTodo is made in the open, and the people who use it shape what comes next. Join us on Discord: ask a question, show how you organise your days, or tell us what you wish it did. Questions are answered by people who run it and by the maintainer.',
      button: 'Join us on Discord',
    },
    end: {
      h2: 'Try it first, then make it yours.',
      news: 'News, releases and how it\'s built',
      allPosts: 'All posts',
      star: 'Star OpenTodo on GitHub',
    },
  },
};
