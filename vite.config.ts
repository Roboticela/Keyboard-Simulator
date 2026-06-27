import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv, type Plugin } from 'vite'
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

const SITE_NAME = 'Keyboard Simulator'

const GAMES_INDEX_SEO = {
  title: `Keyboard Games — ${SITE_NAME}`,
  description:
    'Play 20 keyboard games including typing speed test, word sprint, key memory, and more. Improve your typing skills with fun challenges.',
  path: '/games',
}

interface RouteSeo {
  title: string
  description: string
  path: string
}

function escapeAttr(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

function patchRouteHtml(html: string, seo: RouteSeo, siteUrl: string) {
  const url = `${siteUrl}${seo.path}`
  const ogImage = `${siteUrl}/apple-touch-icon.png`

  let out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${seo.title}</title>`)
  out = out.replace(
    /<meta name="description"[\s\S]*?\/?>/,
    `<meta name="description" content="${escapeAttr(seo.description)}" />`,
  )
  out = out.replace(/<link rel="canonical"[^>]*\/?>/g, '')
  out = out.replace(/<meta property="og:[^"]*"[^>]*\/?>/g, '')
  out = out.replace(/<meta name="twitter:[^"]*"[^>]*\/?>/g, '')

  const seoTags = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${escapeAttr(seo.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(seo.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
  ].join('\n  ')

  return out.replace('</head>', `  ${seoTags}\n</head>`)
}

function spaIndexFallback(siteUrl: string): Plugin {
  return {
    name: 'spa-index-fallback',
    apply: 'build',
    async closeBundle() {
      const { GAMES } = await import('./src/lib/games')

      const distDir = path.resolve(__dirname, 'dist')
      const indexPath = path.join(distDir, 'index.html')
      if (!fs.existsSync(indexPath)) return

      const baseHtml = fs.readFileSync(indexPath, 'utf-8')
      const routes: RouteSeo[] = [
        GAMES_INDEX_SEO,
        ...GAMES.map((game) => ({
          title: `${game.title} — ${SITE_NAME}`,
          description: game.description,
          path: `/games/${game.slug}`,
        })),
      ]

      for (const seo of routes) {
        const html = patchRouteHtml(baseHtml, seo, siteUrl)
        const dir = path.join(distDir, ...seo.path.split('/').filter(Boolean))
        fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(path.join(dir, 'index.html'), html)
      }
    },
  }
}

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
        dynamicRoutes: ['/games', ...GAME_SLUGS.map((slug) => `/games/${slug}`)],
      }),
      spaIndexFallback(siteUrl),
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
