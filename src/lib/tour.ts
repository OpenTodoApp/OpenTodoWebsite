// The screenshot tour of the home page: chapters of features, each with a real
// screenshot from the bundle (by manifest name) and a docs page that supports it.
export interface TourFeature { title: string; text: string; shot: string; alt: string; doc: string }
export interface TourChapter { id: string; label: string; features: TourFeature[] }

export const TOUR: TourChapter[] = [
  {
    id: 'plan', label: 'Plan',
    features: [
      { title: 'Today, with overdue first', text: 'Due times, estimates, labels and comment counts at a glance; priority is the colour of the circle.', shot: 'today', alt: "Today view: an Overdue group above today's tasks with times, estimates, labels and projects", doc: '/docs/views/' },
      { title: 'Type it like you say it', text: '<code>next Wed at 3pm #Work @call p1 30m</code> becomes a date, project, label, priority and estimate. Six languages, fully offline.', shot: 'quick-add', alt: 'Quick add turning a sentence into date, project, label and priority chips', doc: '/docs/quick-add/' },
      { title: 'Time blocking', text: 'Day and Week calendars turn timed tasks into blocks as long as their estimate, with planned hours per day.', shot: 'week', alt: 'Week calendar with tasks as time blocks sized by their estimates', doc: '/docs/time-blocking/' },
      { title: 'Upcoming, grouped by day', text: 'Tomorrow, the weekdays, then dates. Repeating rules such as <code>every 2nd tuesday</code> roll forward when you finish.', shot: 'upcoming', alt: 'Upcoming view grouped by day', doc: '/docs/recurrence/' },
      { title: 'Reminders and notifications', text: '"30 minutes before" or at a set time, snooze and dismiss offline, push notifications without a vendor account.', shot: 'reminders', alt: 'Task detail with two reminders: thirty minutes before, and at a set time', doc: '/docs/reminders/' },
    ],
  },
  {
    id: 'organise', label: 'Organise',
    features: [
      { title: 'Sections, subtasks, details', text: 'Sections with counts, nested subtasks with progress, notes, labels, estimates and reminders in one panel.', shot: 'project', alt: 'Project with sections, a task with subtasks and the detail panel open', doc: '/docs/tasks-and-projects/' },
      { title: 'Boards', text: 'Turn sections into columns and drag cards between them, by mouse, touch or keyboard.', shot: 'board', alt: 'Board with Backlog, This week and Review columns', doc: '/docs/sections-and-boards/' },
      { title: 'Filters that read like sentences', text: '<code>(@call | @errand) &amp; due &lt;= 7 days</code>, evaluated on your device, live and offline.', shot: 'filter', alt: 'Filter view with a query combining labels and a due date', doc: '/docs/filters/' },
      { title: 'Saved views and dashboards', text: 'Pin views to the sidebar with live counts, and put up to six side by side for a weekly review.', shot: 'dashboard', alt: 'Weekly review dashboard with saved views side by side', doc: '/docs/views/' },
      { title: 'History and trash', text: 'Every change to a task, old and new value, with "restore this value". Deleted tasks wait in the trash.', shot: 'history', alt: 'Task history listing each change with restore links', doc: '/docs/trash-and-history/' },
      { title: 'Keyboard everything', text: '<kbd>q</kbd> add, <kbd>j</kbd> and <kbd>k</kbd> move, <kbd>c</kbd> complete, <kbd>?</kbd> for the list. Vim mode if you want it.', shot: 'shortcuts', alt: 'Keyboard shortcuts overlay', doc: '/docs/keyboard/' },
    ],
  },
  {
    id: 'together', label: 'Together',
    features: [
      { title: 'Share projects with roles', text: 'Viewer, editor or admin for people on your server. Everyone works offline and ends up on the same list.', shot: 'share', alt: 'Share dialog listing members with owner, editor and viewer roles', doc: '/docs/sharing/' },
      { title: 'Comments and mentions', text: 'Threaded comments on every task, replies, and @mentions that notify the person.', shot: 'comments', alt: 'Task conversation with threaded comments, a reply and an @mention', doc: '/docs/sharing/' },
      { title: 'Assignees and notifications', text: 'Assign a task to someone; they see it in "Assigned to me" and in their notifications.', shot: 'notifications', alt: 'Notifications menu: mentioned in a comment and assigned a task', doc: '/docs/notifications/' },
      { title: 'Activity feed', text: 'Who completed, commented or rescheduled what, across every shared project.', shot: 'feed', alt: 'Activity feed of a shared project grouped by day', doc: '/docs/sharing/' },
    ],
  },
  {
    id: 'secure', label: 'Secure',
    features: [
      { title: 'Two-factor and passkeys', text: 'Authenticator codes with recovery codes, and passkeys when your server uses https.', shot: 'settings-security', alt: 'Two-factor setup with a QR code', doc: '/docs/account-security/' },
      { title: 'End-to-end encryption', text: 'Optional: titles, notes, names and comments are encrypted on your devices; the server keeps only ciphertext.', shot: 'settings-encryption', alt: 'End-to-end encryption settings explaining what is encrypted', doc: '/docs/e2ee/' },
      { title: 'Scheduled backups', text: 'To a folder, S3-compatible storage or WebDAV, with retention and optional encryption.', shot: 'settings-backups', alt: 'Backup settings with a daily schedule and the last successful run', doc: '/docs/backups/' },
    ],
  },
  {
    id: 'connect', label: 'Connect',
    features: [
      { title: 'Calendar apps (CalDAV)', text: 'Two-way sync with Apple Reminders, Thunderbird and Android task apps, with a password per device.', shot: 'settings-caldav', alt: 'Calendar apps settings with the CalDAV address and an app password', doc: '/docs/caldav/' },
      { title: 'AI assistant, your key', text: 'Ask about your tasks and review the changes it proposes. Your provider and your key, off until the owner turns it on.', shot: 'assistant', alt: 'The assistant panel proposing to move three overdue tasks to Friday, with Apply all and Discard buttons', doc: '/docs/assistant/' },
      { title: 'Email to task', text: 'Forward an email to your private address and it lands in the Inbox.', shot: 'settings-email', alt: 'Email to task settings with a personal secret address', doc: '/docs/email/' },
      { title: 'Webhooks', text: 'Signed events for Home Assistant, n8n or a chat relay, with retries and a delivery log.', shot: 'settings-webhooks', alt: 'Webhooks list with two endpoints and their events', doc: '/docs/webhooks/' },
    ],
  },
];
