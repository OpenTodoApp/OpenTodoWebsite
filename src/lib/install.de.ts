// German twins of the install records, the deploy targets and the PikaPods note (german-pages D6).
// Every English record needs one; scripts/test/i18n.test.mjs fails otherwise. Links, icons, slugs
// and doc paths stay in the English records; only the text lives here.
export interface PlatformDe { name: string; short: string; browser: string; steps: string[]; after: string; reminders: string; share: string }

export const PLATFORMS_DE: Record<string, PlatformDe> = {
  'iphone-ipad': {
    name: 'iPhone und iPad',
    short: 'Safari, Zum Home-Bildschirm',
    browser: 'Safari',
    steps: [
      'Öffne deine OpenTodo-Adresse in Safari und melde dich einmal an.',
      'Tippe auf Teilen, das Quadrat mit dem Pfeil nach oben.',
      'Scrolle nach unten, tippe auf Zum Home-Bildschirm und dann auf Hinzufügen.',
    ],
    after: 'OpenTodo hat jetzt ein Symbol auf deinem Home-Bildschirm. Öffne es ab jetzt von dort. Neuere iOS-Versionen bieten Zum Home-Bildschirm auch in anderen Browsern an; wenn du es nicht siehst, nimm Safari.',
    reminders: 'Erinnerungen bei geschlossener App brauchen iOS oder iPadOS 16.4 oder neuer und funktionieren nur in der installierten App, nicht in einem Safari-Tab. Öffne sie vom Home-Bildschirm, schalte in der App unter Einstellungen → Benachrichtigungen die Benachrichtigungen ein und sende eine Testbenachrichtigung.',
    share: 'Safari bietet Web-Apps nicht im Teilen-Menü an. Um auf dem iPhone eine Seite als Aufgabe zu speichern, nimm das Bookmarklet aus Einstellungen → Erfassen.',
  },
  android: {
    name: 'Android',
    short: 'Chrome, Edge oder Samsung Internet',
    browser: 'Chrome (Edge und Samsung Internet funktionieren genauso)',
    steps: [
      'Öffne deine OpenTodo-Adresse in Chrome und melde dich einmal an.',
      'Öffne das Browsermenü (die drei Punkte).',
      'Tippe auf App installieren. In manchen Versionen heißt es Zum Startbildschirm hinzufügen.',
    ],
    after: 'Chrome zeigt manchmal von selbst einen Installationshinweis am unteren Bildschirmrand; ein Tipp darauf tut dasselbe.',
    reminders: 'Öffne in der App Einstellungen → Benachrichtigungen, schalte Benachrichtigungen auf diesem Gerät aktivieren ein, erlaube sie, wenn der Browser fragt, und sende eine Testbenachrichtigung. Kommt nichts an, prüfe, ob Android Benachrichtigungen für die App erlaubt und ob Energiesparen oder Fokusmodi sie zurückhalten.',
    share: 'Nach der Installation erscheint OpenTodo im Teilen-Menü von Android, sodass du einen Link oder etwas Text aus jeder App direkt in eine neue Aufgabe schicken kannst.',
  },
  windows: {
    name: 'Windows',
    short: 'Chrome oder Edge',
    browser: 'Chrome oder Edge',
    steps: [
      'Öffne deine OpenTodo-Adresse und melde dich einmal an.',
      'Klicke auf das Installationssymbol am rechten Ende der Adressleiste (ein kleiner Bildschirm mit einem Pfeil nach unten), oder öffne das Browsermenü und wähle OpenTodo installieren. In Edge: Apps → Diese Website als App installieren.',
      'Bestätige mit Installieren.',
    ],
    after: 'OpenTodo öffnet sich in einem eigenen Fenster und bekommt einen Eintrag im Startmenü. Hefte es wie jede andere App an die Taskleiste an. Firefox installiert keine Web-Apps, aber OpenTodo funktioniert in einem Firefox-Tab vollständig, auch offline.',
    reminders: 'Öffne in der App Einstellungen → Benachrichtigungen, schalte Benachrichtigungen für dieses Gerät ein und sende einen Test. Meldet der Test „angenommen“, aber nichts erscheint, prüfe in Windows unter Einstellungen → System → Benachrichtigungen deinen Browser und den Konzentrationsassistenten.',
    share: 'Die installierte App empfängt Inhalte von Apps, die den Teilen-Dialog von Windows nutzen. In jedem Browser speichert das Bookmarklet aus Einstellungen → Erfassen die Seite, die du gerade liest, als Aufgabe; außerdem gibt es eine Browser-Erweiterung.',
  },
  mac: {
    name: 'Mac',
    short: 'Chrome, Edge oder Safari',
    browser: 'Chrome, Edge oder Safari ab macOS Sonoma',
    steps: [
      'Öffne deine OpenTodo-Adresse und melde dich einmal an.',
      'Klicke in Chrome oder Edge auf das Installationssymbol am rechten Ende der Adressleiste, oder öffne das Browsermenü und wähle OpenTodo installieren. Wähle in Safari Ablage → Zum Dock hinzufügen.',
      'Bestätige mit Installieren (oder Hinzufügen).',
    ],
    after: 'OpenTodo öffnet sich in einem eigenen Fenster und bekommt einen Eintrag im Dock und im Launchpad. Firefox installiert keine Web-Apps, aber OpenTodo funktioniert in einem Firefox-Tab vollständig, auch offline.',
    reminders: 'Öffne in der App Einstellungen → Benachrichtigungen, schalte Benachrichtigungen für dieses Gerät ein und sende einen Test. Meldet der Test „angenommen“, aber nichts erscheint, prüfe unter Systemeinstellungen → Mitteilungen deinen Browser und die Fokus-Modi.',
    share: 'Ob die installierte App geteilte Inhalte empfangen kann, hängt von der macOS-Version ab. Das Bookmarklet aus Einstellungen → Erfassen und die Browser-Erweiterung funktionieren überall.',
  },
  linux: {
    name: 'Linux',
    short: 'Chrome, Chromium oder Edge',
    browser: 'Chrome, Chromium oder Edge',
    steps: [
      'Öffne deine OpenTodo-Adresse und melde dich einmal an.',
      'Klicke auf das Installationssymbol am rechten Ende der Adressleiste, oder öffne das Browsermenü und wähle OpenTodo installieren.',
      'Bestätige mit Installieren.',
    ],
    after: 'OpenTodo öffnet sich in einem eigenen Fenster und bekommt einen Eintrag in deinem App-Starter. Firefox installiert keine Web-Apps, aber OpenTodo funktioniert in einem Firefox-Tab vollständig, auch offline.',
    reminders: 'Öffne in der App Einstellungen → Benachrichtigungen, schalte Benachrichtigungen für dieses Gerät ein und sende einen Test. Die Zustellprüfung unter den Optionen listet alles, was Push auf diesem Gerät braucht, mit einer Lösung neben jedem Problem.',
    share: 'Das Bookmarklet aus Einstellungen → Erfassen speichert in jedem Browser die Seite, die du gerade liest, als Aufgabe; die Browser-Erweiterung macht dasselbe mit einer Schaltfläche in der Symbolleiste.',
  },
  chromeos: {
    name: 'ChromeOS',
    short: 'Chrome',
    browser: 'Chrome',
    steps: [
      'Öffne deine OpenTodo-Adresse und melde dich einmal an.',
      'Klicke auf das Installationssymbol am rechten Ende der Adressleiste, oder öffne das Browsermenü und wähle OpenTodo installieren.',
      'Bestätige mit Installieren.',
    ],
    after: 'OpenTodo öffnet sich in einem eigenen Fenster und erscheint wie jede andere App im Launcher und in der Ablage.',
    reminders: 'Öffne in der App Einstellungen → Benachrichtigungen, schalte Benachrichtigungen für dieses Gerät ein und sende eine Testbenachrichtigung. Die Zustellprüfung zeigt jeden Schritt, den Push braucht, mit einer Lösung neben jedem Problem.',
    share: 'Nach der Installation empfängt OpenTodo Inhalte von Apps, die den Teilen-Dialog des Systems nutzen, und das Bookmarklet funktioniert im Browser.',
  },
};

export const TARGETS_DE: Record<string, string> = {
  docker: 'docker run oder Compose',
  podman: 'Quadlet oder ein Pod',
  umbrel: 'App-Store',
  unraid: 'Community Applications',
  casaos: 'App-Store',
  truenas: 'Apps-Katalog',
  synology: 'Container Manager',
  runtipi: 'App-Store',
  cosmos: 'Market',
  portainer: 'Stack',
  coolify: 'Ein-Klick-Dienst',
  dokploy: 'Vorlage',
  caprover: 'Ein-Klick-App',
  easypanel: 'Vorlage',
  kubernetes: 'Helm-Chart',
  fly: 'fly.toml',
  render: 'Blueprint',
};

export const PIKAPODS_NOTE_DE = 'PikaPods gibt einen Teil seiner Einnahmen an das OpenTodo-Projekt weiter. Du bekommst dasselbe quelloffene OpenTodo und kannst deine Daten jederzeit exportieren und auf deinen eigenen Server umziehen.';
