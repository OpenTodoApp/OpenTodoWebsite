// German twins of the feature catalogue (german-pages D6), keyed by the English group key and by
// each feature's `doc` path. Every English group and feature needs one; scripts/test/i18n.test.mjs
// fails otherwise. Change a German line in the same pull request as its English line.
export const GROUPS_DE: Record<string, string> = {
  plan: 'Planen',
  capture: 'Erfassen',
  projects: 'Projekte und Teams',
  devices: 'Sync und Geräte',
  integrations: 'Integrationen',
  admin: 'Datenschutz und Verwaltung',
};

export const FEATURES_DE: Record<string, { name: string; line: string }> = {
  // plan
  '/docs/briefing/': { name: 'Heute mit dem Tagesüberblick', line: 'Ein Satz, der nennt, was spät dran ist, was voll ist und wer geantwortet hat.' },
  '/docs/today-limit/': { name: 'Eine Grenze für Heute und Heute erledigt', line: 'Begrenze Heute auf wenige Aufgaben; sieh, was du erledigt hast, und halte einen Erfolg fest.' },
  '/docs/day-parts/': { name: 'Vormittag, Nachmittag und Heute Abend', line: 'Gruppiere Heute nach Tageszeit, für Aufgaben und Gewohnheiten.' },
  '/docs/upcoming-with-today/': { name: 'Demnächst, beginnend mit Heute', line: 'Eine Liste für jetzt und danach: die Gruppen von Heute, dann die folgenden Tage.' },
  '/docs/time-sectors/': { name: 'Zeitabschnitte', line: 'Plane eine Aufgabe für diese Woche, nächste Woche oder diesen Monat, ohne ausgedachtes Datum.' },
  '/docs/calendar-views/': { name: 'Demnächst und der Kalender', line: 'Tag, Woche und Monat, mit Aufgaben zu ihrer Uhrzeit.' },
  '/docs/time-blocking/': { name: 'Zeitblöcke', line: 'Zieh Aufgaben in den Tag und sieh, ob er aufgeht.' },
  '/docs/place-tasks-on-the-calendar/#see-whether-the-day-fits': { name: 'Termine in der Kapazität des Tages', line: 'Belegte Termine deiner Kalender zählen zu einem vollen Tag.' },
  '/docs/replan-the-day/': { name: 'Den Rest des Tages neu planen', line: 'Verpasste Blöcke wandern in die verbleibende freie Zeit, als Vorschau, die du übernimmst.' },
  '/docs/frames/': { name: 'Rahmen und Slots', line: 'Stunden, freigehalten für eine Art von Arbeit; ein Block für mehrere kleine Aufgaben.' },
  '/docs/calendar-add-and-colour/': { name: 'Im Kalender hinzufügen, färben und filtern', line: 'Doppelklick zum Hinzufügen, Farbe nach Projekt, Label oder Priorität, eingegrenzt mit einem Filter.' },
  '/docs/completed-on-the-calendar/': { name: 'Erledigte Aufgaben im Kalender', line: 'Erledigte Aufgaben zu ihrer Uhrzeit, durchgestrichen, wenn du sie sehen willst.' },
  '/docs/repeating-on-the-calendar/': { name: 'Wiederkehrende Aufgaben im Kalender', line: 'Kommende Termine im Voraus; ändere einen allein oder die Serie ab einem Datum.' },
  '/docs/tasks-that-span-days/': { name: 'Aufgaben über mehrere Tage', line: 'Eine Reise oder eine Konferenz als ein Balken vom Start bis zum Fälligkeitsdatum.' },
  '/docs/months-and-year/': { name: 'Mehrere Monate und das Jahr', line: 'Zwei, drei oder sechs Monate untereinander, oder das ganze Jahr auf einen Blick.' },
  '/docs/recurrence/': { name: 'Wiederholungsregeln in Alltagssprache', line: '„werktags“, „jeden zweiten Dienstag im Monat“, „wöchentlich nach Erledigung“.' },
  '/docs/deadlines-and-start-dates/': { name: 'Fristen und Startdaten', line: 'Getrennt von dem Tag, an dem du es erledigen willst.' },
  '/docs/task-reminders/': { name: 'Erinnerungen', line: 'Zu einer Uhrzeit oder vor der Fälligkeit; sie folgen einer Wiederholungsregel.' },
  '/docs/default-reminders/': { name: 'Standard-Erinnerungen', line: 'Eine Erinnerung für jede Aufgabe, die ein Datum oder eine Uhrzeit bekommt.' },
  '/docs/location-reminders/': { name: 'Ortserinnerungen', line: 'Unter Android eine Erinnerung, wenn du an einem Ort ankommst oder ihn verlässt.' },
  '/docs/method/set-up/#energy-levels': { name: 'Energiestufen', line: 'Tief, Mittel oder Niedrig an einer Aufgabe, und ein Filter für schnelle Erfolge.' },
  '/docs/method/rhythms/#bento': { name: 'Bento im Tagescheck', line: 'Der Fokus für heute als eine große, eine mittlere und eine kleine Aufgabe.' },
  '/docs/focus/': { name: 'Fokus-Timer', line: 'Pomodoro, Flowtime oder Countdown, von jeder Aufgabe aus gestartet und bei ihr erfasst.' },
  '/docs/time-tracking/': { name: 'Zeiterfassung', line: 'Starten und stoppen, vergangene Arbeit nachtragen, als CSV exportieren.' },
  '/docs/review-and-statistics/': { name: 'Wochenrückblick', line: 'Ein geführter Rückblick in sieben Schritten, mit aktuellen Daten.' },
  '/docs/review-intervals/': { name: 'Durchsicht und Wartung', line: 'Sieh jedes Projekt wöchentlich, monatlich, vierteljährlich oder gar nicht durch.' },
  '/docs/objectives/': { name: 'Ziele', line: 'Ein paar Zeilen für das Quartal und die Woche, oben im Plan und im Rückblick.' },
  '/docs/statistics/': { name: 'Statistiken und eine wöchentliche Zusammenfassung', line: 'Was du erledigt hast und wohin die Zeit ging.' },

  // capture
  '/docs/quick-add/': { name: 'Schnelleingabe in sechs Sprachen', line: 'Datum, Projekt, Labels, Priorität und Schätzung in einer Zeile.' },
  '/docs/quick-add/#paste-a-list': { name: 'Eine Liste einfügen', line: 'Eingefügte Zeilen werden je eine Aufgabe, mit einem Rückgängig wieder entfernt.' },
  '/docs/search/': { name: 'Befehlsleiste', line: 'Jede Aktion und jede Aufgabe aus einem Suchfeld.' },
  '/docs/process-the-inbox/': { name: 'Eingang abarbeiten', line: 'Entscheide für jede neue Aufgabe, wohin sie gehört, eine nach der anderen.' },
  '/docs/email/': { name: 'E-Mail zu Aufgabe', line: 'Leite eine E-Mail an deine eigene Adresse weiter.' },
  '/docs/capture/': { name: 'Browsererweiterung und Teilen-Menü', line: 'Speichere eine Seite, eine Auswahl oder einen Screenshot.' },
  '/docs/self-hosting/speech-to-text/': { name: 'Diktieren', line: 'Sprich eine Aufgabe, transkribiert in deinem eigenen Netzwerk.' },
  '/docs/assistant-capture/': { name: 'Eine Liste einsprechen oder fotografieren', line: 'Erzähl einfach los oder fotografiere ein Whiteboard; der Assistent schlägt die Aufgaben vor, die du prüfst.' },
  '/docs/assistant-suggest-after-add/': { name: 'Vorschläge nach dem Hinzufügen', line: 'Wenn du es einschaltest, schlägt der Assistent einen klareren Titel, ein Projekt und Unteraufgaben zum Prüfen vor.' },
  '/docs/templates/': { name: 'Projektvorlagen', line: 'Beginne ein Projekt mit einer fertigen Liste.' },
  '/docs/import/': { name: 'Import aus anderen Apps', line: 'Deine Exportdatei wird zu Projekten, Abschnitten und Aufgaben.' },
  '/docs/switch/README/#switching-from': { name: 'Umstieg von…', line: 'Wähle die App, die du jetzt nutzt: Ihre Exportschritte erscheinen, und das Format ist gesetzt.' },

  // projects
  '/docs/sections-and-boards/': { name: 'Abschnitte und Boards', line: 'Dasselbe Projekt als Liste oder als Spalten.' },
  '/docs/fold-columns/': { name: 'Spalten einklappen und Notizen auf Karten', line: 'Klapp eine geparkte Spalte zu einem Streifen ein; zeig die ersten Notizzeilen einer Karte.' },
  '/docs/project-flows/': { name: 'Projekte nacheinander und Bereiche', line: 'Ein Schritt nach dem anderen, oder eine laufende Liste, die nie fertig wird.' },
  '/docs/reusable-lists/': { name: 'Wiederverwendbare Listen', line: 'Einkauf oder Packliste: Ein Eintrag, der schon da ist, kommt zurück, sortiert nach Gängen.' },
  '/docs/project-timeline/': { name: 'Zeitleiste', line: 'Die Aufgaben eines Projekts als Balken, mit Fristen und heute.' },
  '/docs/calendar-filter/#a-project-as-a-calendar': { name: 'Ein Projekt als Kalender', line: 'Eine Kalenderansicht neben Liste, Board und Zeitleiste.' },
  '/docs/all-projects/': { name: 'Alle Projekte auf einen Blick', line: 'Zustand, Fortschritt und nächste Fälligkeit in einer Tabelle.' },
  '/docs/projects/': { name: 'Unterprojekte und Projektnotizen', line: 'Verschachtele Projekte und behalte ihre Notizen daneben.' },
  '/docs/notes/': { name: 'Notizen', line: 'Aufgaben-, Projekt- und eigenständige Notizen auf einer Seite, durchsucht auf deinem Gerät.' },
  '/docs/custom-fields/': { name: 'Eigene Felder', line: 'Typisierte Spalten wie Kosten, Kunde oder Phase.' },
  '/docs/group-and-order/#order-by': { name: 'Nach eigenen Feldern sortieren', line: 'Sortiere Listen, Label-Seiten und gespeicherte Ansichten nach einem Zahlen- oder Datumsfeld.' },
  '/docs/saved-views/': { name: 'Gespeicherte Ansichten', line: 'Speichere eine Filterabfrage und öffne sie aus der Seitenleiste.' },
  '/docs/roles-and-assignments/': { name: 'Teilen, Rollen und Zuständige', line: 'Betrachter und Bearbeiter; weise Aufgaben den Menschen in einem Projekt zu.' },
  '/docs/take-turns/': { name: 'Bei Aufgaben abwechseln', line: 'Eine wiederkehrende Aufgabe in einem geteilten Projekt geht jedes Mal an die nächste Person.' },
  '/docs/comments-and-activity/': { name: 'Kommentare und Aktivität', line: 'Sprich über eine Aufgabe dort, wo die Aufgabe ist.' },
  '/docs/workspaces/': { name: 'Arbeitsbereiche und Gruppen', line: 'Halte Arbeit und Zuhause getrennt; teile mit einer Gruppe.' },
  '/docs/public-links/': { name: 'Öffentliche Links', line: 'Eine Liste, die jeder mit dem Link sehen kann, ohne Konto.' },
  '/docs/routines/': { name: 'Routinen', line: 'Ein Auslöser und Schritte, die Aufgaben finden, ändern und anlegen; KI-Schritte warten auf deine Prüfung.' },
  '/docs/locations-and-places/': { name: 'Orte und Karten', line: 'Eine Adresse an einer Aufgabe, auf OpenStreetMap-Karten.' },
  '/docs/notes-and-subtasks/': { name: 'Anhänge und Abhängigkeiten', line: 'Dateien an Aufgaben; Aufgaben, die auf andere warten.' },

  // devices
  '/docs/offline-and-sync/': { name: 'Offline auf jedem Gerät', line: 'Bearbeite überall; Änderungen werden Feld für Feld zusammengeführt.' },
  '/docs/install-app/': { name: 'Smartphone, Computer und Browser', line: 'Aus dem Browser installieren, auf jedem System.' },
  '/docs/android-app/#install-the-app': { name: 'Eine Android-App', line: 'Als APK von GitHub erhältlich; Google Play und F-Droid folgen.' },
  '/docs/language/': { name: 'Acht Sprachen', line: 'English, Deutsch, Français, Español, Italiano, Português, 简体中文, Nederlands.' },
  '/docs/themes/': { name: 'Designs', line: 'Vierzehn Editor-Paletten, deine eigene im Editor oder aus einem VS-Code-Design.' },
  '/docs/app-icon-badge/': { name: 'Die Zahl für Heute auf dem App-Symbol', line: 'Das Symbol der installierten App zeigt, wie viele Aufgaben von heute offen sind.' },
  '/docs/custom-accent/': { name: 'Deine eigene Akzentfarbe', line: 'Jede Farbe, angepasst, bis sie hell und dunkel gut lesbar ist.' },
  '/docs/keyboard/': { name: 'Tastatur zuerst', line: 'Tastenkürzel für alles, angezeigt, wo du sie brauchst.' },
  '/docs/task-history/': { name: 'Verlauf und Rückgängig', line: 'Jede Änderung bleibt erhalten; stelle einen Wert oder eine Version wieder her.' },
  '/docs/performance/': { name: 'Schnell bei großen Konten', line: 'An schriftliche Vorgaben für ein Konto mit 10.000 Aufgaben gebunden, auch auf dem Smartphone.' },
  '/docs/cli/': { name: 'Kommandozeilen-Client', line: 'ot für Skripte, mit JSON-Ausgabe und Probeläufen.' },
  '/docs/vault/': { name: 'Markdown-Vault', line: 'Zwei-Wege-Sync mit einem Ordner, den Obsidian Tasks lesen kann.' },
  '/docs/obsidian/': { name: 'Obsidian-Plugin', line: 'Schick eine Zeile aus einer Notiz als Aufgabe und synchronisiere einen Ordner, auch auf dem Smartphone.' },

  // integrations
  '/docs/caldav/': { name: 'CalDAV', line: 'Apple Erinnerungen, Thunderbird und Aufgaben-Apps unter Android.' },
  '/docs/calendar-sync/': { name: 'Kalender-Synchronisation', line: 'Aufgaben mit Datum als Termine in Google, Outlook, Microsoft 365 oder jedem CalDAV-Kalender.' },
  '/docs/calendar-feeds/': { name: 'Kalender-Feeds', line: 'Deine Kalender in Tag und Woche; deine Aufgaben in ihren.' },
  '/docs/issue-import/': { name: 'Issues aus GitHub und GitLab', line: 'Zugewiesene Issues werden zu Aufgaben und schließen sich mit ihnen.' },
  '/docs/webhooks/': { name: 'Webhooks', line: 'Signierte Ereignisse für Home Assistant, n8n und Telegram.' },
  '/docs/notification-channels/': { name: 'ntfy, Pushover und Gotify', line: 'Erinnerungen dort, wo du ohnehin hinschaust.' },
  '/docs/api/': { name: 'HTTP-API', line: 'Jede Route dokumentiert, mit Tokens mit festem Umfang.' },
  '/docs/stability/': { name: 'Ein Stabilitätsversprechen', line: 'Seit 1.0 wachsen API, Sync, Export, MCP-Werkzeuge und CLI nur noch.' },
  '/docs/mcp/': { name: 'MCP-Server', line: 'Deine KI-Werkzeuge lesen und ändern Aufgaben mit einem Agenten-Token.' },
  '/docs/claude/': { name: 'Claude-Code-Plugin', line: 'Skills, die Claude beibringen, deine Aufgaben sicher zu planen.' },

  // admin
  '/docs/e2ee/': { name: 'Ende-zu-Ende-Verschlüsselung', line: 'Aufgabentext, den der Server nicht lesen kann.' },
  '/docs/account-security/': { name: 'Passkeys und Zwei-Faktor', line: 'Anmelden ohne Passwort oder mit einem zweiten Schritt.' },
  '/docs/self-hosting/sso/': { name: 'Single Sign-on', line: 'Jeder OpenID-Connect-Anbieter, auf Wunsch nur SSO.' },
  '/docs/backups/': { name: 'Geplante Sicherungen', line: 'In einen Ordner, nach S3 oder WebDAV, verschlüsselt, mit Aufbewahrung.' },
  '/docs/settings-server/': { name: 'Audit-Protokoll', line: 'Anmeldungen, Tokens und Einstellungen; nie Aufgabeninhalte.' },
  '/docs/self-hosting/branding/': { name: 'Dein Name und Logo', line: 'Gestalte den Server für dein Zuhause oder deine Firma.' },
  '/docs/architecture/': { name: 'Keine Telemetrie', line: 'Der Server kontaktiert nur, was du einrichtest.' },
};

// The integrations whose names are words, not product names (the home page's "Verbindet sich mit"
// row and /de/features/). Product names stay as they are.
export const INTEGRATIONS_DE: Record<string, string> = {
  'iCal feeds': 'iCal-Feeds', 'GitHub issues': 'GitHub-Issues', 'GitLab issues': 'GitLab-Issues', 'Email to task': 'E-Mail zu Aufgabe',
  'Browser extension': 'Browser-Erweiterung', 'ot command line': 'Kommandozeile ot',
};
