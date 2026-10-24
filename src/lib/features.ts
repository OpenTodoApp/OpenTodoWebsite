// Everything the app does, as listed on /features/ and in the home page's "Everything included"
// (website-features D1). Every entry names the docs page of the pinned release that says it, and
// `since` is the first release whose docs have that page: an entry newer than the pinned bundle is
// left out, and an entry the pinned bundle should have but doesn't fails the build, so a renamed
// docs page can't go unnoticed. Lines are restated from each page's summary; change them here
// when the docs change.
import { docExists, manifest } from './bundle';

export interface Feature { name: string; line: string; doc: string; since?: string }
export interface FeatureGroup { key: string; title: string; icon: string; items: Feature[] }

const GROUPS: FeatureGroup[] = [
  { key: 'plan', title: 'Plan', icon: 'sun', items: [
    { name: 'Today with the briefing', line: 'A sentence that names what is late, what is full and who replied.', doc: '/docs/briefing/', since: '0.11.0' },
    { name: 'Upcoming and the calendar', line: 'Day, Week and Month, with tasks placed at their time.', doc: '/docs/calendar-views/' },
    { name: 'Time blocking', line: 'Drag tasks into the day and see whether it fits.', doc: '/docs/time-blocking/' },
    { name: 'Repeat rules in plain words', line: '“every weekday”, “every 2nd tuesday”, “every week after completion”.', doc: '/docs/recurrence/' },
    { name: 'Deadlines and start dates', line: 'Separate from the day you plan to do it.', doc: '/docs/deadlines-and-start-dates/' },
    { name: 'Reminders', line: 'At a time or before the due time; they follow a repeat rule.', doc: '/docs/task-reminders/' },
    { name: 'Focus timer', line: 'Pomodoro, Flowtime or Countdown, logged to the task.', doc: '/docs/focus/' },
    { name: 'Time tracking', line: 'Start and stop, add past work, export as CSV.', doc: '/docs/time-tracking/' },
    { name: 'Weekly review', line: 'A guided review in seven steps, with live data.', doc: '/docs/review-and-statistics/' },
    { name: 'Statistics and a weekly digest', line: 'What you finished and where the time went.', doc: '/docs/statistics/' },
  ] },
  { key: 'capture', title: 'Capture', icon: 'inbox', items: [
    { name: 'Quick add in six languages', line: 'Dates, projects, labels, priority and estimate in one line.', doc: '/docs/quick-add/' },
    { name: 'Command bar', line: 'Every action and every task from one search box.', doc: '/docs/search/' },
    { name: 'Process the Inbox', line: 'Decide where each new task goes, one at a time.', doc: '/docs/process-the-inbox/' },
    { name: 'Email to task', line: 'Forward an email to your own address.', doc: '/docs/email/' },
    { name: 'Browser extension and share sheet', line: 'Save a page, a selection or a screenshot.', doc: '/docs/capture/' },
    { name: 'Dictation', line: 'Speak a task, transcribed on your own network.', doc: '/docs/self-hosting/speech-to-text/', since: '0.10.0' },
    { name: 'Project templates', line: 'Start a project from a ready-made list.', doc: '/docs/templates/' },
    { name: 'Import from other apps', line: 'Your export file becomes projects, sections and tasks.', doc: '/docs/import/' },
  ] },
  { key: 'projects', title: 'Projects and teams', icon: 'kanban', items: [
    { name: 'Sections and boards', line: 'The same project as a list or as columns.', doc: '/docs/sections-and-boards/' },
    { name: 'Timeline', line: 'A project’s tasks as bars, with deadlines and today.', doc: '/docs/project-timeline/' },
    { name: 'All projects at a glance', line: 'Health, progress and next due date in one table.', doc: '/docs/all-projects/', since: '0.11.0' },
    { name: 'Sub-projects and project notes', line: 'Nest projects and keep their notes beside them.', doc: '/docs/projects/' },
    { name: 'Custom fields', line: 'Typed columns such as a cost, a client or a stage.', doc: '/docs/custom-fields/' },
    { name: 'Saved views', line: 'Save a filter query and open it from the sidebar.', doc: '/docs/saved-views/' },
    { name: 'Sharing, roles and assignees', line: 'Viewers and editors; assign tasks to the people in a project.', doc: '/docs/roles-and-assignments/' },
    { name: 'Comments and activity', line: 'Talk about a task where the task is.', doc: '/docs/comments-and-activity/' },
    { name: 'Workspaces and groups', line: 'Keep work and home apart; share with a group.', doc: '/docs/workspaces/', since: '0.10.0' },
    { name: 'Public links', line: 'A list anyone with the link can see, no account needed.', doc: '/docs/public-links/' },
    { name: 'Automation rules', line: 'When something happens, change tasks for you.', doc: '/docs/automations/', since: '0.10.0' },
    { name: 'Locations and maps', line: 'An address on a task, on OpenStreetMap maps.', doc: '/docs/locations-and-places/', since: '0.10.0' },
    { name: 'Attachments and dependencies', line: 'Files on tasks; tasks that wait on others.', doc: '/docs/notes-and-subtasks/' },
  ] },
  { key: 'devices', title: 'Sync and devices', icon: 'monitor-smartphone', items: [
    { name: 'Offline on every device', line: 'Edit anywhere; changes merge field by field.', doc: '/docs/offline-and-sync/' },
    { name: 'Phone, desktop and browser', line: 'Install from the browser on any system.', doc: '/docs/install-app/' },
    { name: 'An Android app', line: 'Early, for people who want an app install.', doc: '/docs/android-app/', since: '0.10.0' },
    { name: 'Six languages', line: 'English, Deutsch, Français, Español, Italiano, Português.', doc: '/docs/language/' },
    { name: 'Keyboard first', line: 'Shortcuts for everything, shown where you need them.', doc: '/docs/keyboard/' },
    { name: 'History and undo', line: 'Every change kept; restore a value or a version.', doc: '/docs/task-history/' },
    { name: 'Command-line client', line: 'ot for scripts, with JSON output and dry runs.', doc: '/docs/cli/' },
    { name: 'Markdown vault', line: 'Two-way sync with a folder Obsidian Tasks can read.', doc: '/docs/vault/', since: '0.10.0' },
  ] },
  { key: 'integrations', title: 'Integrations', icon: 'webhook', items: [
    { name: 'CalDAV', line: 'Apple Reminders, Thunderbird and Android task apps.', doc: '/docs/caldav/' },
    { name: 'Calendar feeds', line: 'Your calendars in Day and Week; your tasks in theirs.', doc: '/docs/calendar-feeds/' },
    { name: 'GitHub and GitLab issues', line: 'Assigned issues become tasks and close with them.', doc: '/docs/issue-import/' },
    { name: 'Webhooks', line: 'Signed events for Home Assistant, n8n and Telegram.', doc: '/docs/webhooks/' },
    { name: 'ntfy, Pushover and Gotify', line: 'Reminders delivered where you already look.', doc: '/docs/notification-channels/', since: '0.11.0' },
    { name: 'HTTP API', line: 'Every route documented, with scoped tokens.', doc: '/docs/api/' },
    { name: 'MCP server', line: 'Your AI tools read and change tasks under an agent token.', doc: '/docs/mcp/' },
    { name: 'Claude Code plugin', line: 'Skills that teach Claude to plan your tasks safely.', doc: '/docs/claude/', since: '0.11.0' },
  ] },
  { key: 'admin', title: 'Privacy and admin', icon: 'shield-check', items: [
    { name: 'End-to-end encryption', line: 'Task text the server cannot read.', doc: '/docs/e2ee/' },
    { name: 'Passkeys and two-factor', line: 'Sign in without a password, or with a second step.', doc: '/docs/account-security/' },
    { name: 'Single sign-on', line: 'Any OpenID Connect provider, SSO-only if you like.', doc: '/docs/self-hosting/sso/' },
    { name: 'Scheduled backups', line: 'To a folder, S3 or WebDAV, encrypted, with retention.', doc: '/docs/backups/' },
    { name: 'Audit log', line: 'Sign-ins, tokens and settings; never task content.', doc: '/docs/settings-server/' },
    { name: 'Your name and logo', line: 'Brand the server for your home or company.', doc: '/docs/self-hosting/branding/', since: '0.10.0' },
    { name: 'No telemetry', line: 'The server only contacts what you configure.', doc: '/docs/architecture/' },
  ] },
];

// The integrations named in one line, each with the docs page that must exist for it to show.
const INTEGRATIONS: [string, string][] = [
  ['CalDAV', '/docs/caldav/'], ['iCal feeds', '/docs/calendar-feeds/'], ['GitHub issues', '/docs/issue-import/'], ['GitLab issues', '/docs/issue-import/'],
  ['Email to task', '/docs/email/'], ['Webhooks', '/docs/webhooks/'], ['ntfy', '/docs/notification-channels/'], ['Pushover', '/docs/notification-channels/'],
  ['Gotify', '/docs/notification-channels/'], ['Home Assistant', '/docs/webhooks/'], ['MCP', '/docs/mcp/'], ['Claude Code', '/docs/claude/'],
  ['Browser extension', '/docs/capture/'], ['Android', '/docs/android-app/'], ['ot command line', '/docs/cli/'], ['Obsidian vault', '/docs/vault/'],
];

// Apps behind the manifest's import formats (website-features D3); formats not listed here are generic.
const IMPORT_APPS: [string, string][] = [
  ['todoist-csv', 'Todoist'], ['things-db', 'Things'], ['ticktick-csv', 'TickTick'], ['linear-csv', 'Linear'], ['asana-csv', 'Asana'],
  ['trello-json', 'Trello'], ['microsoft-todo-json', 'Microsoft To Do'], ['google-tasks-json', 'Google Tasks'],
  ['apple-reminders-json', 'Apple Reminders'], ['anydo-json', 'Any.do'], ['csv', 'CSV'], ['json-generic', 'JSON'],
];

const parts = (v: string) => v.replace(/^v/, '').split(/[.-]/).slice(0, 3).map((n) => Number.parseInt(n, 10) || 0);
/** True when the pinned release is `since` or newer. */
export function shipped(since: string | undefined, version = manifest.version): boolean {
  if (!since) return true;
  const [a, b] = [parts(version), parts(since)];
  for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return a[i] > b[i];
  return true;
}

/** The groups as the pinned release has them; throws when a shipped entry's docs page is missing. */
export function featureGroups(): FeatureGroup[] {
  return GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((f) => {
      if (!shipped(f.since)) return false;
      if (!docExists(f.doc)) throw new Error(`features: "${f.name}" links ${f.doc}, which the pinned bundle (${manifest.version}) does not have; fix the slug or its "since"`);
      return true;
    }),
  })).filter((g) => g.items.length > 0);
}

export const featureCount = () => featureGroups().reduce((n, g) => n + g.items.length, 0);
export const integrations = () => INTEGRATIONS.filter(([, doc]) => docExists(doc)).map(([name]) => name);
export const importApps = () => IMPORT_APPS.filter(([format]) => manifest.importFormats.includes(format)).map(([, name]) => name);
