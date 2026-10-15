// The install pages (website-help-and-howtos D3): one record per platform, every
// line with the docs section of the pinned release it comes from. Restated from
// /docs/install-app/, /docs/notifications/ and /docs/capture/; change those here
// when the docs change.
export interface Platform {
  slug: string;
  name: string;
  short: string;
  icon: string;
  browser: string;
  /** Where the steps come from. */
  source: string;
  steps: string[];
  after: string;
  reminders: { text: string; doc: string };
  share: { text: string; doc: string };
}

export const INSTALL_DOC = '/docs/install-app/';
export const NO_INSTALL_DOC = '/docs/troubleshooting/#i-cant-install-the-app-or-add-a-passkey';

export const PLATFORMS: Platform[] = [
  {
    slug: 'iphone-ipad',
    name: 'iPhone and iPad',
    short: 'Safari, Add to Home Screen',
    icon: 'smartphone',
    browser: 'Safari',
    source: '/docs/install-app/#iphone-and-ipad',
    steps: [
      'Open your OpenTodo address in Safari and sign in once.',
      'Tap the Share button, the square with an arrow pointing up.',
      'Scroll down, tap Add to Home Screen, then Add.',
    ],
    after: 'OpenTodo now has an icon on your home screen. Open it from there from now on. Recent iOS versions also offer Add to Home Screen from other browsers; if you do not see it, use Safari.',
    reminders: {
      text: 'Reminders while the app is closed need iOS or iPadOS 16.4 or later and work only in the installed app, not in a Safari tab. Open it from the home screen, then turn on notifications in Settings → Notifications inside the app and send a test notification.',
      doc: '/docs/notifications/#on-iphone-and-ipad',
    },
    share: {
      text: 'Safari does not offer web apps in its share sheet. To save a page as a task on an iPhone, use the bookmarklet from Settings → Capture.',
      doc: '/docs/capture/#share-sheet-installed-app',
    },
  },
  {
    slug: 'android',
    name: 'Android',
    short: 'Chrome, Edge or Samsung Internet',
    icon: 'smartphone',
    browser: 'Chrome (Edge and Samsung Internet work the same way)',
    source: '/docs/install-app/#android',
    steps: [
      'Open your OpenTodo address in Chrome and sign in once.',
      'Open the browser menu (the three dots).',
      'Tap Install app. On some versions it is called Add to Home screen.',
    ],
    after: 'Chrome sometimes shows an install banner at the bottom of the screen on its own; tapping it does the same thing.',
    reminders: {
      text: 'Open Settings → Notifications in the app, turn on Enable notifications on this device, allow them when the browser asks, and send a test notification. If nothing arrives, check that Android allows notifications for the app and that battery saving or focus modes are not holding them back.',
      doc: '/docs/notifications/#get-reminders-when-the-app-is-closed',
    },
    share: {
      text: 'Once installed, OpenTodo appears in Android\'s share menu, so you can send a link or some text from any app straight into a new task.',
      doc: '/docs/capture/#share-sheet-installed-app',
    },
  },
  {
    slug: 'windows',
    name: 'Windows',
    short: 'Chrome or Edge',
    icon: 'laptop',
    browser: 'Chrome or Edge',
    source: '/docs/install-app/#windows-macos-linux-and-chromeos',
    steps: [
      'Open your OpenTodo address and sign in once.',
      'Click the install icon at the right end of the address bar (a small screen with a down arrow), or open the browser menu and choose Install OpenTodo. In Edge: Apps → Install this site as an app.',
      'Confirm with Install.',
    ],
    after: 'OpenTodo opens in its own window and gets an entry in your Start menu. Pin it to the taskbar like any other app. Firefox does not install web apps, but OpenTodo works fully in a Firefox tab, offline included.',
    reminders: {
      text: 'Open Settings → Notifications in the app, turn on notifications for this device and send a test. If the test says accepted but nothing shows, check Settings → System → Notifications in Windows for your browser, and focus assist.',
      doc: '/docs/notifications/#when-notifications-dont-arrive',
    },
    share: {
      text: 'The installed app receives shares from apps that use the Windows share dialog. In any browser, the bookmarklet from Settings → Capture saves the page you are reading as a task; there is also a browser extension.',
      doc: '/docs/capture/#share-sheet-installed-app',
    },
  },
  {
    slug: 'mac',
    name: 'Mac',
    short: 'Chrome, Edge or Safari',
    icon: 'laptop',
    browser: 'Chrome, Edge, or Safari on macOS Sonoma or later',
    source: '/docs/install-app/#windows-macos-linux-and-chromeos',
    steps: [
      'Open your OpenTodo address and sign in once.',
      'In Chrome or Edge, click the install icon at the right end of the address bar, or open the browser menu and choose Install OpenTodo. In Safari, choose File → Add to Dock.',
      'Confirm with Install (or Add).',
    ],
    after: 'OpenTodo opens in its own window and gets an entry in your Dock and Launchpad. Firefox does not install web apps, but OpenTodo works fully in a Firefox tab, offline included.',
    reminders: {
      text: 'Open Settings → Notifications in the app, turn on notifications for this device and send a test. If the test says accepted but nothing shows, check System Settings → Notifications for your browser, and Focus modes.',
      doc: '/docs/notifications/#when-notifications-dont-arrive',
    },
    share: {
      text: 'Support for receiving shares in the installed app varies by macOS version. The bookmarklet from Settings → Capture and the browser extension work everywhere.',
      doc: '/docs/capture/#share-sheet-installed-app',
    },
  },
  {
    slug: 'linux',
    name: 'Linux',
    short: 'Chrome, Chromium or Edge',
    icon: 'laptop',
    browser: 'Chrome, Chromium or Edge',
    source: '/docs/install-app/#windows-macos-linux-and-chromeos',
    steps: [
      'Open your OpenTodo address and sign in once.',
      'Click the install icon at the right end of the address bar, or open the browser menu and choose Install OpenTodo.',
      'Confirm with Install.',
    ],
    after: 'OpenTodo opens in its own window and gets an entry in your app launcher. Firefox does not install web apps, but OpenTodo works fully in a Firefox tab, offline included.',
    reminders: {
      text: 'Open Settings → Notifications in the app, turn on notifications for this device and send a test. The Delivery check under the options lists everything push needs on this device, with a fix next to each problem.',
      doc: '/docs/notifications/#check-that-it-works',
    },
    share: {
      text: 'The bookmarklet from Settings → Capture saves the page you are reading as a task from any browser; the browser extension does the same with a toolbar button.',
      doc: '/docs/capture/#bookmarklet',
    },
  },
  {
    slug: 'chromeos',
    name: 'ChromeOS',
    short: 'Chrome',
    icon: 'laptop',
    browser: 'Chrome',
    source: '/docs/install-app/#windows-macos-linux-and-chromeos',
    steps: [
      'Open your OpenTodo address and sign in once.',
      'Click the install icon at the right end of the address bar, or open the browser menu and choose Install OpenTodo.',
      'Confirm with Install.',
    ],
    after: 'OpenTodo opens in its own window and appears in the launcher and on the shelf like any other app.',
    reminders: {
      text: 'Open Settings → Notifications in the app, turn on notifications for this device and send a test notification. The Delivery check shows each step push needs, with a fix next to any problem.',
      doc: '/docs/notifications/#check-that-it-works',
    },
    share: {
      text: 'Once installed, OpenTodo receives shares from apps that use the system share dialog, and the bookmarklet works in the browser.',
      doc: '/docs/capture/#share-sheet-installed-app',
    },
  },
];
