import { defineConfig } from '@playwright/test'
export default defineConfig({ testDir: '.', testMatch: 'homepage.spec.js', use: { channel: 'msedge', headless: true }, reporter: 'list' })
