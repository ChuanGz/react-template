import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './test/e2e',
  use: {
    baseURL: process.env.PREVIEW_URL ?? 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
  },
})
