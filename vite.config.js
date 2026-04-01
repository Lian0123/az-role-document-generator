import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const repoBase = '/az-role-document-generator/';

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['robots.txt', 'apple-touch-icon.svg', 'pwa-icon.svg', 'mask-icon.svg'],
      manifest: {
        name: 'Azure Intake Studio',
        short_name: 'Azure Intake',
        description: 'Generate Azure service, RBAC, and platform request forms from a guided questionnaire.',
        theme_color: '#16324f',
        background_color: '#f5f8fc',
        display: 'standalone',
        orientation: 'portrait',
        start_url: command === 'build' ? repoBase : '/',
        scope: command === 'build' ? repoBase : '/',
        lang: 'zh-TW',
        icons: [
          {
            src: 'pwa-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'mask-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webmanifest}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallbackDenylist: [/^\/az-role-document-generator\/?$/]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  base: command === 'build' ? repoBase : '/',
  test: {
    environment: 'node'
  }
}));