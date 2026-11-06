// Simplified Chinese (zh-Hans). The pinned release's language docs do not list it,
// so the note under the hero does not say the app speaks it.
// `home` has the shape of src/i18n/en.mjs (website-home-languages).
export default {
  common: {
    langNote: '本页是简体中文。本网站的其余页面和文档是英文。应用目前的语言是英语、德语、法语、西班牙语、意大利语和葡萄牙语：在设置中选择，快速添加会按所选语言理解日期和时间。',
  },
  home: {
    title: 'OpenTodo · 运行在你自己的服务器上的宁静待办事项列表',
    description: 'OpenTodo 是一个免费、开源的待办事项列表，运行在你自己的服务器上：“今天”视图告诉你什么最重要，{count} 项功能且无付费限制，在所有设备上均可离线使用，可以与生活和工作中的伙伴共享，且 AI 的使用完全由你掌控。',
    hero: {
      eyebrow: '免费且开源 · {licence}',
      say: '今天有三件事很重要。',
      late: '有两项任务已逾期，',
      soft: '周一的日程已经排满，Mia 回复了你关于旅行的问题。',
      caption: '这就是 OpenTodo 中“今天”的开始方式：用一句话总结最重要的事情，并且完全在你的设备上本地计算生成。',
      ledeStrong: 'OpenTodo 是一个运行在你自己的服务器上的宁静的待办事项列表。',
      lede: '规划你的一天，让项目井井有条，并与你生活和工作中的伙伴共享列表。',
      tryDemo: '体验演示',
      getStarted: '开始使用',
      note: '无需账号，无需安装。',
      alt: 'OpenTodo 的“今天”视图：标题下方是对今天的一句话总结，接着是每行一个的任务，它们的日期、项目和标签在列中整齐排列。',
    },
    day: {
      h2: '你的一天，你的项目，全在一个清爽的屏幕上。',
      rows: [
        { title: '“今天”告诉你什么最重要', text: '日期下方的一句话会指出哪些任务逾期了，哪些日程排满了，以及谁回复了你，点击每个部分即可打开对应的内容。这一切都在你的设备上离线计算得出，不依赖 AI。', prop: '今天、即将到来' },
        { title: '像说话一样输入', text: '输入“周五上午 10 点预约水管工 #Home p1”，它就会变成一个带有日期、项目和优先级的任务，支持六种语言。', prop: '无处不在' },
        { title: '项目可以表现为列表、看板或时间线', text: '区块、截止日期和进度一目了然。共享项目并将其中的任务分配给参与的人员。', prop: '项目' },
      ],
      quickAlt: '快速添加功能，列出它从输入的一行文字中识别出的日期、项目、标签和优先级。',
      quickCaption: '快速添加会显示它所理解的内容。',
      boardAlt: '一个以看板形式展示的共享项目，包含“待办事项”、“本周”和“回顾”列。',
      boardCaption: '以看板形式展示的共享项目。',
    },
    features: {
      h2: '包含所有功能。',
      intro: '分为 {groups} 组的 {count} 项功能，以及你已经在使用的集成服务。没有任何功能因需要付费而被限制。',
      pill: '无分级付费',
      noTiers: '所有功能都对所有人开放。',
      all: '所有功能及其文档',
      more: '以及其他 {count} 项功能',
      connects: '连接到',
      imports: '从以下应用导入',
      groups: { plan: '计划', capture: '收集', projects: '项目和团队', devices: '同步和设备', integrations: '集成', admin: '隐私和管理' },
    },
    yours: {
      h2: '永远属于你。',
      intro: '没有 OpenTodo 账号，也没有 OpenTodo 云。一台服务器即可满足你和所有<a href="/docs/sharing/">共享列表</a>的人的需求，而且你可以随时<a href="/docs/import-export/">带上所有数据离开</a>。',
      rows: [
        { title: '完全免费', text: '无付费分级、无席位限制、无试用期：你服务器上的所有人都能享受每一个功能，包括你的整个家庭。', link: '费用说明' },
        { title: '在你的服务器上运行', text: '只需一个容器和一个数据文件夹。一台树莓派或最低配置的出租服务器就足够了。', link: '自托管' },
        { title: '支持离线使用', text: '每台设备都保留了一份完整的副本。即使在火车上也能编辑；当你重新上线时，所有更改会逐个字段进行合并。', link: '离线与同步' },
        { title: '可选加密', text: '借助端到端加密，任务文本在到达服务器之前就会在你的设备上完成加密。', link: '加密功能' },
        { title: '完全受控的 AI', text: '默认关闭，除非你主动开启。你可以使用自己的模型，包括本地模型；AI 助手提出修改建议，由你来批准，且每一次更改都可以撤销。你自己的 AI 工具可以通过 MCP 或 Claude Code 插件使用 Agent 令牌进行连接。', link: '工作原理' },
      ],
    },
    ways: {
      h2: '三种使用方式。',
      intro: 'OpenTodo 不提供托管服务，因此在这里不需要注册任何内容。以后你可以随时在这三种方式之间切换；你的数据会一直跟着你。',
      items: [
        { title: '体验演示', text: '在浏览器中的私人沙盒，包含示例项目，在无活动两小时后会自动删除。', cta: '打开演示', more: '演示版的工作原理' },
        { title: '加入一台服务器', text: '有人为你的家庭或团队搭建了它？打开他们发送的邀请链接，然后从浏览器安装应用。', cta: '安装应用', more: '应用安装说明' },
        { title: '自己运行', text: '支持 Docker、Umbrel、Unraid、TrueNAS、树莓派或 VPS，初次部署大约只需二十分钟。', cta: '自托管部署', more: '规划你的服务器' },
      ],
      switch: '准备从 Todoist、Things、TickTick 或 Linear 迁移？',
      switchLink: '导入你的任务',
    },
    community: {
      kicker: '社区',
      h2: '来打个招呼吧。',
      intro: 'OpenTodo 的开发过程是完全开放的，而使用它的人将决定它的未来。加入我们的 Discord：你可以提问、展示你是如何安排日常的，或者告诉我们你希望它拥有什么功能。解答问题的会是其他在运行它的用户以及项目维护者。',
      button: '加入我们的 Discord',
    },
    end: {
      h2: '先体验，然后把它变成你的专属。',
      news: '新闻、发布说明以及它是如何构建的',
      allPosts: '所有文章',
      star: '在 GitHub 上为 OpenTodo 点亮星标',
    },
  },
};