import { defineConfig, devices } from '@playwright/test';
import { execSync } from 'node:child_process';

// Local secrets (VERA_URL, VERA_API_KEY). Git-ignored; CI sets real env vars.
try {
  process.loadEnvFile('.env.e2e.local');
} catch {
  // File is optional: without it the VERA reporter just skips the upload.
}

const PORT = 3210;
const baseURL = process.env.BASE_URL ?? `http://127.0.0.1:${PORT}`;
const isCI = Boolean(process.env.CI);

const git = (args: string) => {
  try {
    return execSync(`git ${args}`, { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch {
    return '';
  }
};

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    [
      '@vera/playwright-reporter',
      {
        branch: process.env.VERA_BRANCH ?? git('rev-parse --abbrev-ref HEAD'),
        commitSha: process.env.VERA_COMMIT ?? git('rev-parse HEAD'),
        environment:
          process.env.VERA_ENVIRONMENT ??
          (process.env.BASE_URL ? 'production' : 'local'),
      },
    ],
  ],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
  ],
  // With BASE_URL set we test a deployed site and start nothing locally.
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: isCI
          ? `yarn build && yarn start -p ${PORT}`
          : `yarn dev -p ${PORT}`,
        url: baseURL,
        reuseExistingServer: !isCI,
        timeout: 180_000,
      },
});
