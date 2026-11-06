// Italian (website-languages). Informal "tu", as the app's own Italian does.
// `home` has the shape of src/i18n/en.mjs (website-home-languages).
export default {
  common: {
    langNote: 'Questa pagina è in italiano, e anche l\'app lo è: la lingua si sceglie nelle sue impostazioni, e l\'inserimento rapido capisce date e orari in italiano. Il resto di questo sito e la documentazione sono in inglese.',
  },
  home: {
    title: 'OpenTodo · Una lista di cose da fare tranquilla, sul tuo server',
    description: 'OpenTodo è una lista di cose da fare libera e open source che fai girare sul tuo server: Oggi ti dice cosa conta, {count} funzioni senza piani a pagamento, offline su ogni dispositivo, condivisa con le persone con cui vivi e lavori, e l\'IA solo alle tue condizioni.',
    hero: {
      eyebrow: 'Libero e open source · {licence}',
      say: 'Oggi contano tre cose.',
      late: 'Due attività sono in ritardo,',
      soft: 'lunedì è già pieno e Mia ha risposto alla tua domanda sul viaggio.',
      caption: 'Così si apre Oggi in OpenTodo: una frase su ciò che conta, calcolata sul tuo dispositivo.',
      ledeStrong: 'OpenTodo è una lista di cose da fare tranquilla che gira sul tuo server.',
      lede: 'Pianifica la giornata, tieni in ordine i progetti e condividi le liste con le persone con cui vivi e lavori.',
      tryDemo: 'Prova la demo',
      getStarted: 'Inizia',
      note: 'Nessun account, niente da installare.',
      alt: 'La vista Oggi di OpenTodo: la frase sulla giornata sotto il titolo, poi le attività, una per riga, con date, progetti ed etichette in colonne allineate.',
    },
    day: {
      h2: 'La tua giornata, i tuoi progetti, una schermata tranquilla.',
      rows: [
        { title: 'Oggi ti dice cosa conta', text: 'Una frase sotto la data dice cosa è in ritardo, cosa è al completo e chi ha risposto, e ogni parte apre ciò che nomina. La calcola il tuo dispositivo, anche offline, senza IA.', prop: 'Oggi, In programma' },
        { title: 'Scrivilo come lo diresti', text: '«Chiamare l\'idraulico venerdì alle 10 #Casa p1» diventa un\'attività con data, progetto e priorità, in sei lingue.', prop: 'Ovunque' },
        { title: 'Progetti come elenco, bacheca o cronologia', text: 'Sezioni, scadenze e avanzamento a colpo d\'occhio. Condividi un progetto e assegna le attività alle persone che ne fanno parte.', prop: 'Progetti' },
      ],
      quickAlt: 'L\'aggiunta rapida che elenca la data, il progetto, l\'etichetta e la priorità che ha riconosciuto in una riga scritta.',
      quickCaption: 'L\'aggiunta rapida mostra cosa ha capito.',
      boardAlt: 'Un progetto condiviso come bacheca, con le colonne Backlog, This week e Review.',
      boardCaption: 'Un progetto condiviso come bacheca.',
    },
    features: {
      h2: 'Tutto incluso.',
      intro: '{count} funzioni in {groups} gruppi, e le integrazioni che usi già. Niente è riservato a un piano a pagamento.',
      pill: 'Nessun piano',
      noTiers: 'Ogni funzione, per tutti.',
      all: 'Tutte le funzioni, con la documentazione',
      more: 'e altre {count}',
      connects: 'Si collega a',
      imports: 'Importa da',
      groups: { plan: 'Pianificazione', capture: 'Raccolta', projects: 'Progetti e team', devices: 'Sincronizzazione e dispositivi', integrations: 'Integrazioni', admin: 'Privacy e amministrazione' },
    },
    yours: {
      h2: 'Tuo, per sempre.',
      intro: 'Nessun account OpenTodo e nessun cloud OpenTodo. Un solo server per tutte le persone con cui <a href="/docs/sharing/">condividi le liste</a>, e puoi <a href="/docs/import-export/">andartene con tutto</a> quando vuoi.',
      rows: [
        { title: 'Gratis, tutto quanto', text: 'Niente piani, niente posti, niente prova: ogni funzione per chiunque sia sul tuo server, tutta la famiglia compresa.', link: 'Quanto costa' },
        { title: 'Sul tuo server', text: 'Un container e una cartella di dati. Basta un Raspberry Pi o il più piccolo server a noleggio.', link: 'Installazione' },
        { title: 'Funziona offline', text: 'Ogni dispositivo tiene una copia completa. Modifica in treno; al ritorno le modifiche si uniscono campo per campo.', link: 'Offline e sincronizzazione' },
        { title: 'Cifrato, se vuoi', text: 'Con la cifratura end-to-end il testo delle attività viene cifrato sui tuoi dispositivi prima di arrivare al server.', link: 'Cifratura' },
        { title: 'L\'IA alle tue condizioni', text: 'Spenta finché non la accendi tu. Il tuo modello, anche in locale; l\'assistente propone modifiche che approvi tu, e ogni modifica si può annullare. I tuoi strumenti di IA si collegano tramite MCP o il plugin per Claude Code con un token da agente.', link: 'Come funziona' },
      ],
    },
    ways: {
      h2: 'Tre modi per entrare.',
      intro: 'OpenTodo non è offerto come servizio in hosting, quindi qui non c\'è niente a cui iscriversi. Più avanti puoi passare dall\'uno all\'altro; i tuoi dati vengono con te.',
      items: [
        { title: 'Prova la demo', text: 'Una sandbox privata nel browser con progetti di esempio, cancellata dopo due ore di inattività.', cta: 'Apri la demo', more: 'Come funziona la demo' },
        { title: 'Entra in un server', text: 'Qualcuno lo fa girare per la tua casa o il tuo team? Apri il link di invito che ti ha mandato, poi installa l\'app dal browser.', cta: 'Installa l\'app', more: 'Installare l\'app' },
        { title: 'Fallo girare tu', text: 'Docker, Umbrel, Unraid, TrueNAS, un Pi o un VPS, in circa venti minuti la prima volta.', cta: 'Installalo sul tuo server', more: 'Pianifica il tuo server' },
      ],
      switch: 'Arrivi da Todoist, Things, TickTick o Linear?',
      switchLink: 'Porta con te le tue attività',
    },
    community: {
      kicker: 'Community',
      h2: 'Passa a salutarci.',
      intro: 'OpenTodo nasce allo scoperto, e chi lo usa decide cosa viene dopo. Unisciti a noi su Discord: fai una domanda, mostra come organizzi le tue giornate o raccontaci cosa ti piacerebbe che facesse. Alle domande rispondono persone che lo usano sui propri server, e il maintainer.',
      button: 'Unisciti a noi su Discord',
    },
    end: {
      h2: 'Prima provalo, poi fallo tuo.',
      news: 'Novità, versioni e come è fatto',
      allPosts: 'Tutti gli articoli',
      star: 'Metti una stella a OpenTodo su GitHub',
    },
  },
};
