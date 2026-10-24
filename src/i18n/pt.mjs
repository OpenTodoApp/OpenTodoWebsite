// Portuguese (website-languages), European, as the app's own Portuguese examples are.
// `home` has the shape of src/i18n/en.mjs (website-home-languages).
export default {
  common: {
    langNote: 'Esta página está em português, e a aplicação também: a língua escolhe-se nas definições, e a introdução rápida percebe datas e horas em português. O resto deste site e a documentação estão em inglês.',
  },
  home: {
    title: 'OpenTodo · Uma lista de tarefas tranquila no teu próprio servidor',
    description: 'O OpenTodo é uma lista de tarefas livre e de código aberto que corres no teu próprio servidor: Hoje diz-te o que importa, {count} funcionalidades sem planos pagos, offline em todos os dispositivos, partilhada com as pessoas com quem vives e trabalhas, e IA só nos teus termos.',
    hero: {
      eyebrow: 'Livre e de código aberto · {licence}',
      say: 'Três coisas importam hoje.',
      late: 'Duas tarefas estão atrasadas,',
      soft: 'segunda-feira está cheia e a Mia respondeu.',
      ledeStrong: 'O OpenTodo é uma lista de tarefas tranquila que corre no teu próprio servidor.',
      lede: 'Planeia o dia, mantém os projetos em ordem e partilha listas com as pessoas com quem vives e trabalhas.',
      tryDemo: 'Experimentar a demo',
      getStarted: 'Começar',
      note: 'Sem conta, sem nada para instalar.',
      alt: 'A vista Hoje do OpenTodo: a frase sobre o dia por baixo do título e, a seguir, as tarefas numa linha cada, com as datas, os projetos e as etiquetas em colunas alinhadas.',
    },
    day: {
      h2: 'O teu dia, os teus projetos, um só ecrã tranquilo.',
      rows: [
        { title: 'Hoje diz o que importa', text: 'Uma frase por baixo da data diz o que está atrasado, o que está cheio e quem respondeu, e cada parte abre o que nomeia. É o teu dispositivo que a calcula, offline e sem IA.', prop: 'Hoje, Em breve' },
        { title: 'Escreve como o dirias', text: '«Ligar ao canalizador sexta às 10 #Casa p1» vira uma tarefa com data, projeto e prioridade, em seis línguas.', prop: 'Em todo o lado' },
        { title: 'Projetos em lista, quadro ou cronologia', text: 'Secções, prazos e progresso num relance. Partilha um projeto e atribui as tarefas às pessoas que fazem parte dele.', prop: 'Projetos' },
      ],
      quickAlt: 'A adição rápida mostra a data, o projeto, a etiqueta e a prioridade que reconheceu numa linha escrita.',
      quickCaption: 'A adição rápida mostra o que percebeu.',
      boardAlt: 'Um projeto partilhado como quadro, com as colunas Backlog, This week e Review.',
      boardCaption: 'Um projeto partilhado como quadro.',
    },
    features: {
      h2: 'Tudo incluído.',
      intro: '{count} funcionalidades em {groups} grupos, e as integrações que já usas. Nada fica guardado para um plano pago.',
      pill: 'Sem planos',
      noTiers: 'Todas as funcionalidades, para todos.',
      all: 'Todas as funcionalidades, com a documentação',
      more: 'e mais {count}',
      connects: 'Liga-se a',
      imports: 'Importa de',
      groups: { plan: 'Planear', capture: 'Capturar', projects: 'Projetos e equipas', devices: 'Sincronização e dispositivos', integrations: 'Integrações', admin: 'Privacidade e administração' },
    },
    yours: {
      h2: 'Teu, de vez.',
      intro: 'Sem conta OpenTodo e sem nuvem OpenTodo. Um só servidor para todas as pessoas com quem <a href="/docs/sharing/">partilhas listas</a>, e podes <a href="/docs/import-export/">sair com tudo</a> quando quiseres.',
      rows: [
        { title: 'Grátis, tudo', text: 'Sem planos, sem lugares, sem período de teste: todas as funcionalidades para todas as pessoas no teu servidor, a casa inteira incluída.', link: 'O que custa' },
        { title: 'No teu servidor', text: 'Um contentor e uma pasta de dados. Chega um Raspberry Pi ou o servidor alugado mais pequeno.', link: 'Alojar tu mesmo' },
        { title: 'Funciona offline', text: 'Cada dispositivo guarda uma cópia completa. Edita no comboio; quando voltas, as alterações juntam-se campo a campo.', link: 'Offline e sincronização' },
        { title: 'Cifrado, se quiseres', text: 'Com a cifragem ponta a ponta, o texto das tarefas é cifrado nos teus dispositivos antes de chegar ao servidor.', link: 'Cifragem' },
        { title: 'IA nos teus termos', text: 'Desligada até a ligares. O teu modelo, também local; o assistente propõe alterações que tu aprovas, e cada alteração pode ser desfeita. As tuas próprias ferramentas de IA ligam-se por MCP ou pelo plugin do Claude Code com um token de agente.', link: 'Como funciona' },
      ],
    },
    ways: {
      h2: 'Três formas de entrar.',
      intro: 'O OpenTodo não é oferecido como serviço alojado, por isso não há aqui nada em que te registares. Mais tarde podes passar de uma para outra; os teus dados vão contigo.',
      items: [
        { title: 'Experimentar a demo', text: 'Uma sandbox privada no browser com projetos de exemplo, apagada ao fim de duas horas sem atividade.', cta: 'Abrir a demo', more: 'Como funciona a demo' },
        { title: 'Entrar num servidor', text: 'Alguém o mantém para a tua casa ou equipa? Abre a ligação de convite que te enviaram e depois instala a aplicação a partir do browser.', cta: 'Instalar a aplicação', more: 'Instalar a aplicação' },
        { title: 'Corre o teu', text: 'Docker, Umbrel, Unraid, TrueNAS, um Pi ou um VPS, em cerca de vinte minutos da primeira vez.', cta: 'Alojar tu mesmo', more: 'Planear o teu servidor' },
      ],
      switch: 'Vens do Todoist, do Things, do TickTick ou do Linear?',
      switchLink: 'Traz as tuas tarefas',
    },
    community: {
      kicker: 'Comunidade',
      h2: 'Vem dizer olá.',
      intro: 'O OpenTodo é feito às claras, e quem o usa decide o que vem a seguir. Junta-te a nós no Discord: faz uma pergunta, mostra como organizas os teus dias ou conta-nos o que gostavas que ele fizesse. Às perguntas respondem pessoas que o têm a correr e o mantenedor.',
      button: 'Junta-te a nós no Discord',
    },
    end: {
      h2: 'Experimenta primeiro, depois torna-o teu.',
      news: 'Novidades, versões e como é feito',
      allPosts: 'Todos os artigos',
      star: 'Dá uma estrela ao OpenTodo no GitHub',
    },
  },
};
