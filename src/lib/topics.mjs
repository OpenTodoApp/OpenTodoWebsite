// Topic pages (website-templates-and-methods D5): each topic collects guides,
// templates, how-tos and posts by tag. Plain ESM so the content check can read it.
export const TOPICS = [
  { slug: 'task-management', title: 'Task management', lede: 'Capturing everything, deciding what matters, and keeping the list trustworthy.', tags: ['task-management', 'prioritisation', 'procrastination'], icon: 'list-checks' },
  { slug: 'time-management', title: 'Time management', lede: 'Estimates, calendars and focus: seeing whether the day fits before it starts.', tags: ['time-management', 'focus'], icon: 'clock' },
  { slug: 'habits-and-routines', title: 'Habits and routines', lede: 'Things that come back: chores, reviews, maintenance, and the rules that move them forward.', tags: ['habits'], icon: 'repeat' },
  { slug: 'working-together', title: 'Working together', lede: 'Shared lists for a household or a small team: roles, assignments, boards and comments.', tags: ['teamwork', 'goals'], icon: 'users' },
  { slug: 'owning-your-data', title: 'Owning your data', lede: 'Your tasks on your server: exports, backups, encryption, and leaving whenever you like.', tags: ['ownership'], icon: 'door-open' },
];
