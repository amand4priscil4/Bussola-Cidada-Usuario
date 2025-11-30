import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png', 'logo_nome.png', 'banner-onibus.jpg'],
      manifest: {
        name: 'Bússola Cidadã',
        short_name: 'Bússola Cidadã',
        description: 'Participe de pesquisas e descubra serviços públicos próximos',
        theme_color: '#FFD93D',
        background_color: '#f5f5f5',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/logo.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
