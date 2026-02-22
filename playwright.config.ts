// @ts-check
import { defineConfig } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 1,

  timeout: 90000, // 🔥 CHANGED: was 31000 (too tight for Firefox + parallel + real site)

  expect: {
    timeout: 10000,
  },

  reporter: 'html',

  use: {
    navigationTimeout: 60000, // ➕ ADDED: fixes page.goto timing out too easily
    actionTimeout: 15000,     // ➕ ADDED: prevents infinite waiting on clicks/fills
  },

  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
      },
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
      },
    },

    {
      name: 'edge',
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
      },
    },

    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
      },
    },
  ],
});