import { defineConfig } from '@playwright/test';

// The website checks that need a browser (website-platform D6.3 and D6.4): axe in
// light and dark at 360 and 1280 px, horizontal scroll, and the no-JavaScript pass.
// Run after `npm run build`; they test the built site in dist/.
export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  workers: process.env.CI ? 4 : undefined,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL: 'http://127.0.0.1:4322' },
  webServer: { command: 'node scripts/serve.mjs 4322', url: 'http://127.0.0.1:4322/', reuseExistingServer: !process.env.CI, timeout: 60_000 },
});
