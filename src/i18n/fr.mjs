// French (website-languages). "Vous", as the app's own French does.
// `home` has the shape of src/i18n/en.mjs (website-home-languages).
export default {
  common: {
    langNote: 'Cette page est en français, et l\'application aussi : la langue se choisit dans ses réglages, et la saisie rapide comprend les dates et les heures en français. Le reste de ce site et la documentation sont en anglais.',
  },
  home: {
    title: 'OpenTodo · Une liste de tâches sereine, sur votre propre serveur',
    description: 'OpenTodo est une liste de tâches libre et open source que vous faites tourner sur votre propre serveur : Aujourd\'hui vous dit ce qui compte, {count} fonctionnalités sans offre payante, hors ligne sur chaque appareil, partagée avec les personnes avec qui vous vivez et travaillez, et l\'IA seulement à vos conditions.',
    hero: {
      eyebrow: 'Libre et open source · {licence}',
      say: 'Trois choses comptent aujourd’hui.',
      late: 'Deux tâches sont en retard,',
      soft: 'lundi est complet et Mia a répondu.',
      ledeStrong: 'OpenTodo est une liste de tâches sereine qui tourne sur votre propre serveur.',
      lede: 'Planifiez votre journée, gardez vos projets en ordre et partagez des listes avec les personnes avec qui vous vivez et travaillez.',
      tryDemo: 'Essayer la démo',
      getStarted: 'Commencer',
      note: 'Pas de compte, rien à installer.',
      alt: 'La vue Aujourd’hui d’OpenTodo : la phrase sur la journée sous le titre, puis les tâches, une par ligne, avec leurs dates, projets et étiquettes en colonnes alignées.',
    },
    day: {
      h2: 'Votre journée, vos projets, un seul écran calme.',
      rows: [
        { title: 'Aujourd’hui dit ce qui compte', text: 'Une phrase sous la date nomme ce qui est en retard, ce qui est complet et qui a répondu, et chaque partie ouvre ce qu’elle nomme. Votre appareil la calcule lui-même, hors ligne, sans IA.', prop: 'Aujourd’hui, À venir' },
        { title: 'Tapez-le comme vous le dites', text: '« Appeler le plombier vendredi à 10h #Maison p1 » devient une tâche avec sa date, son projet et sa priorité, en six langues.', prop: 'Partout' },
        { title: 'Des projets en liste, en tableau ou en chronologie', text: 'Sections, échéances et avancement d’un coup d’œil. Partagez un projet et assignez ses tâches aux personnes qui en font partie.', prop: 'Projets' },
      ],
      quickAlt: 'L’ajout rapide affiche la date, le projet, l’étiquette et la priorité qu’il a reconnus dans une ligne saisie.',
      quickCaption: 'L’ajout rapide montre ce qu’il a compris.',
      boardAlt: 'Un projet partagé en tableau, avec les colonnes Backlog, This week et Review.',
      boardCaption: 'Un projet partagé en tableau.',
    },
    features: {
      h2: 'Tout est inclus.',
      intro: '{count} fonctionnalités en {groups} groupes, et les intégrations que vous utilisez déjà. Rien n’est réservé à une offre payante.',
      pill: 'Pas de paliers',
      noTiers: 'Chaque fonctionnalité, pour tout le monde.',
      all: 'Toutes les fonctionnalités, avec leur documentation',
      more: 'et {count} de plus',
      connects: 'Se connecte à',
      imports: 'Importe depuis',
      groups: { plan: 'Planifier', capture: 'Capturer', projects: 'Projets et équipes', devices: 'Synchronisation et appareils', integrations: 'Intégrations', admin: 'Confidentialité et administration' },
    },
    yours: {
      h2: 'À vous, pour de bon.',
      intro: 'Pas de compte OpenTodo ni de cloud OpenTodo. Un seul serveur pour toutes les personnes avec qui vous <a href="/docs/sharing/">partagez des listes</a>, et vous pouvez <a href="/docs/import-export/">partir avec tout</a> quand vous le souhaitez.',
      rows: [
        { title: 'Gratuit, en entier', text: 'Pas de paliers, pas de sièges, pas d’essai : chaque fonctionnalité pour toutes les personnes de votre serveur, toute la maison comprise.', link: 'Ce que ça coûte' },
        { title: 'Sur votre serveur', text: 'Un conteneur et un dossier de données. Un Raspberry Pi ou le plus petit serveur loué suffit.', link: 'Auto-hébergement' },
        { title: 'Fonctionne hors ligne', text: 'Chaque appareil garde une copie complète. Modifiez dans le train ; au retour, les changements se fusionnent champ par champ.', link: 'Hors ligne et synchronisation' },
        { title: 'Chiffré si vous le voulez', text: 'Avec le chiffrement de bout en bout, le texte des tâches est chiffré sur vos appareils avant d’atteindre le serveur.', link: 'Chiffrement' },
        { title: 'L’IA à vos conditions', text: 'Désactivée tant que vous ne l’activez pas. Votre modèle, local aussi ; l’assistant propose des changements que vous approuvez, et chaque changement peut être annulé. Vos propres outils d’IA se connectent via MCP ou le plugin Claude Code avec un jeton d’agent.', link: 'Comment ça marche' },
      ],
    },
    ways: {
      h2: 'Trois façons d’entrer.',
      intro: 'OpenTodo n’est pas proposé comme service hébergé : il n’y a donc rien à quoi s’inscrire ici. Vous pourrez passer de l’une à l’autre plus tard ; vos données vous suivent.',
      items: [
        { title: 'Essayer la démo', text: 'Un bac à sable privé dans votre navigateur avec des projets d’exemple, supprimé après deux heures sans activité.', cta: 'Ouvrir la démo', more: 'Comment fonctionne la démo' },
        { title: 'Rejoindre un serveur', text: 'Quelqu’un le fait tourner pour votre foyer ou votre équipe ? Ouvrez le lien d’invitation reçu, puis installez l’application depuis le navigateur.', cta: 'Installer l’application', more: 'Installer l’application' },
        { title: 'Faire tourner le vôtre', text: 'Docker, Umbrel, Unraid, TrueNAS, un Pi ou un VPS, en une vingtaine de minutes la première fois.', cta: 'Auto-héberger', more: 'Prévoir votre serveur' },
      ],
      switch: 'Vous venez de Todoist, Things, TickTick ou Linear ?',
      switchLink: 'Emporter vos tâches',
    },
    community: {
      kicker: 'Communauté',
      h2: 'Venez dire bonjour.',
      intro: 'OpenTodo se construit au grand jour, et les personnes qui l’utilisent décident de la suite. Rejoignez-nous sur Discord : posez une question, montrez comment vous organisez vos journées ou dites-nous ce qui vous manque. Les questions trouvent réponse auprès de personnes qui l’hébergent et du mainteneur.',
      button: 'Rejoignez-nous sur Discord',
    },
    end: {
      h2: 'Essayez d’abord, puis faites-en le vôtre.',
      news: 'Nouvelles, versions et coulisses',
      allPosts: 'Tous les articles',
      star: 'Mettre une étoile à OpenTodo sur GitHub',
    },
  },
};
