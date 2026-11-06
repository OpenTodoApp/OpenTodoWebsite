// German (website-languages). Informal "du", as the app's own German does.
// `home` has the shape of src/i18n/en.mjs (website-home-languages).
export default {
  common: {
    langNote: 'Diese Seite ist auf Deutsch, und die App ist es auch: Die Sprache stellst du in ihren Einstellungen ein, und die Schnelleingabe versteht Daten und Zeiten auf Deutsch. Der Rest dieser Website und die Dokumentation sind auf Englisch.',
  },
  home: {
    title: 'OpenTodo · Eine ruhige Aufgabenliste auf deinem eigenen Server',
    description: 'OpenTodo ist eine freie, quelloffene Aufgabenliste, die du auf deinem eigenen Server betreibst: Heute sagt dir, was zählt, {count} Funktionen ohne Bezahlstufe, offline auf jedem Gerät, geteilt mit den Menschen, mit denen du lebst und arbeitest, und KI nur zu deinen Bedingungen.',
    hero: {
      eyebrow: 'Frei und quelloffen · {licence}',
      say: 'Drei Dinge zählen heute.',
      late: 'Zwei Aufgaben sind spät dran,',
      soft: 'Montag ist schon voll, und Mia hat auf deine Frage zur Reise geantwortet.',
      caption: 'So beginnt Heute in OpenTodo: ein Satz darüber, was auffällt, berechnet auf deinem Gerät.',
      ledeStrong: 'OpenTodo ist eine ruhige Aufgabenliste, die auf deinem eigenen Server läuft.',
      lede: 'Plane deinen Tag, halte Projekte in Ordnung und teile Listen mit den Menschen, mit denen du lebst und arbeitest.',
      tryDemo: 'Demo ausprobieren',
      getStarted: 'Loslegen',
      note: 'Kein Konto, nichts zu installieren.',
      alt: 'Die Ansicht Heute in OpenTodo: der Satz über den Tag unter dem Titel, darunter die Aufgaben in je einer Zeile, mit Datum, Projekt und Labels in bündigen Spalten.',
    },
    day: {
      h2: 'Dein Tag, deine Projekte, ein ruhiger Bildschirm.',
      rows: [
        { title: 'Heute sagt, was zählt', text: 'Ein Satz unter dem Datum nennt, was spät dran ist, was voll ist und wer geantwortet hat, und jeder Teil öffnet, was er nennt. Dein Gerät ermittelt das selbst, offline und ohne KI.', prop: 'Heute, Demnächst' },
        { title: 'Tipp es, wie du es sagst', text: '„Klempner anrufen Freitag 10 Uhr #Zuhause p1“ wird eine Aufgabe mit Datum, Projekt und Priorität, in sechs Sprachen.', prop: 'Überall' },
        { title: 'Projekte als Liste, Board oder Zeitleiste', text: 'Abschnitte, Fristen und Fortschritt auf einen Blick. Teile ein Projekt und weise seine Aufgaben den Menschen darin zu.', prop: 'Projekte' },
      ],
      quickAlt: 'Die Schnelleingabe zeigt Datum, Projekt, Label und Priorität, die sie in einer getippten Zeile erkannt hat.',
      quickCaption: 'Die Schnelleingabe zeigt, was sie verstanden hat.',
      boardAlt: 'Ein geteiltes Projekt als Board mit den Spalten Backlog, This week und Review.',
      boardCaption: 'Ein geteiltes Projekt als Board.',
    },
    features: {
      h2: 'Alles inklusive.',
      intro: '{count} Funktionen in {groups} Gruppen, dazu die Integrationen, die du schon nutzt. Nichts wird für einen Bezahltarif zurückgehalten.',
      pill: 'Keine Stufen',
      noTiers: 'Jede Funktion, für alle.',
      all: 'Alle Funktionen, mit ihrer Doku',
      more: 'und {count} weitere',
      connects: 'Verbindet sich mit',
      imports: 'Importiert aus',
      groups: { plan: 'Planen', capture: 'Erfassen', projects: 'Projekte und Teams', devices: 'Sync und Geräte', integrations: 'Integrationen', admin: 'Datenschutz und Verwaltung' },
    },
    yours: {
      h2: 'Deins, auf Dauer.',
      intro: 'Kein OpenTodo-Konto und keine OpenTodo-Cloud. Ein Server für alle, mit denen du <a href="/docs/sharing/">Listen teilst</a>, und du kannst jederzeit <a href="/docs/import-export/">mit allem gehen</a>.',
      rows: [
        { title: 'Kostenlos, alles davon', text: 'Keine Stufen, keine Plätze, keine Testphase: jede Funktion für alle auf deinem Server, der ganze Haushalt eingeschlossen.', link: 'Was es kostet' },
        { title: 'Auf deinem Server', text: 'Ein Container und ein Datenordner. Ein Raspberry Pi oder der kleinste Mietserver reicht.', link: 'Selbst betreiben' },
        { title: 'Funktioniert offline', text: 'Jedes Gerät hat eine vollständige Kopie. Bearbeite im Zug; zurück im Netz werden die Änderungen Feld für Feld zusammengeführt.', link: 'Offline und Sync' },
        { title: 'Verschlüsselt, wenn du willst', text: 'Mit Ende-zu-Ende-Verschlüsselung wird der Text deiner Aufgaben auf deinen Geräten verschlüsselt, bevor er den Server erreicht.', link: 'Verschlüsselung' },
        { title: 'KI zu deinen Bedingungen', text: 'Aus, bis du sie einschaltest. Dein Modell, auch ein lokales; der Assistent schlägt Änderungen vor, die du bestätigst, und jede Änderung lässt sich rückgängig machen. Deine eigenen KI-Werkzeuge verbinden sich über MCP oder das Claude-Code-Plugin mit einem Agenten-Token.', link: 'So funktioniert es' },
      ],
    },
    ways: {
      h2: 'Drei Wege hinein.',
      intro: 'OpenTodo wird nicht als gehosteter Dienst angeboten, hier gibt es also nichts, wofür du dich anmelden müsstest. Du kannst später zwischen den dreien wechseln; deine Daten kommen mit.',
      items: [
        { title: 'Demo ausprobieren', text: 'Eine private Sandbox im Browser mit Beispielprojekten, gelöscht nach zwei Stunden ohne Aktivität.', cta: 'Demo öffnen', more: 'So funktioniert die Demo' },
        { title: 'Einem Server beitreten', text: 'Jemand betreibt es für deinen Haushalt oder dein Team? Öffne den Einladungslink, den du bekommen hast, und installiere die App dann aus dem Browser.', cta: 'App installieren', more: 'Die App installieren' },
        { title: 'Selbst betreiben', text: 'Docker, Umbrel, Unraid, TrueNAS, ein Pi oder ein VPS, beim ersten Mal in etwa zwanzig Minuten.', cta: 'Selbst hosten', more: 'Deinen Server planen' },
      ],
      switch: 'Du kommst von Todoist, Things, TickTick oder Linear?',
      switchLink: 'Aufgaben mitnehmen',
    },
    community: {
      kicker: 'Community',
      h2: 'Komm vorbei und sag Hallo.',
      intro: 'OpenTodo entsteht offen, und die Menschen, die es nutzen, bestimmen mit, was als Nächstes kommt. Komm zu uns auf Discord: Stell eine Frage, zeig, wie du deine Tage organisierst, oder erzähl uns, was du dir wünschst. Fragen beantworten Menschen, die es selbst betreiben, und der Maintainer.',
      button: 'Komm zu uns auf Discord',
    },
    end: {
      h2: 'Erst ausprobieren, dann zu deinem machen.',
      news: 'Neuigkeiten, Releases und wie es entsteht',
      allPosts: 'Alle Beiträge',
      star: 'OpenTodo auf GitHub einen Stern geben',
    },
  },
};
