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
  
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium',
    headless: false,
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
