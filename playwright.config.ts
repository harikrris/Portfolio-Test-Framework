import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  
  reporter: [
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: true,
    }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

    // CI-specific settings
  ...(process.env.CI ? {
    workers: 2,
    timeout: 60000,
    expect: { timeout: 15000 },
  } : {}),

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',

  },

  projects: [
     {
      name: 'smoke',
      testMatch: '**/*.spec.ts',
      grep: /@smoke/,
      retries: 1
    },
    {
      name: 'regression', 
      testMatch: '**/*.spec.ts',
      grep: /@regression/,
      retries: 1
    },
  ],
});
