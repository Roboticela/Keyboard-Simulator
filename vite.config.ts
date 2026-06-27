import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'

const GAME_SLUGS = [
  'typing-speed-test', 'word-sprint', 'typing-accuracy', 'home-row-hero',
  'paragraph-marathon', 'typing-race', 'typing-stars', 'key-memory',
  'symbol-smash', 'keyboard-quiz', 'shortcut-master', 'layout-quiz',
  'function-key-finder', 'modifier-mash', 'key-reaction-time',
  'key-location-trainer', 'n-key-rollover', 'number-pad-speed',
  'shift-challenge', 'backspace-blitz',
]

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Pin env files to this directory so variables load during `vite build` even if cwd differs (e.g. tooling wrappers).
  const envDir = __dirname
  const env = loadEnv(mode, envDir, '')
  const appUrl = env.VITE_APP_URL ?? env.APP_URL ?? ''
  const apiUrl = env.VITE_API_URL ?? env.API_URL ?? ''
  const siteUrl = (appUrl || 'https://keyboard-simulator.roboticela.com').replace(/\/$/, '')

  return {
    envDir,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'import.meta.env.VITE_APP_URL': JSON.stringify(appUrl),
      'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl),
    },
    plugins: [
      react(),
      tailwindcss(),
      Sitemap({
        hostname: siteUrl,
        generateRobotsTxt: true,
        dynamicRoutes: [
          '/games',
          ...GAME_SLUGS.map((slug) => `/games/${slug}`),
        ],
      }),
    ],

    // Tauri (Android / iOS dev) must reach the Vite process from the device/emulator (e.g. 10.8.0.2:5173).
    // The default (localhost only) will hang with "Waiting for your frontend dev server" on mobile.
    clearScreen: false,
    server: {
      port: 5173,
      strictPort: true,
      host: '0.0.0.0',
    },
  }
})
