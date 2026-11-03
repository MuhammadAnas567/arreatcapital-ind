import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const LISTINGS_UPSTREAM = process.env.VITE_LISTINGS_PROXY_TARGET || 'https://arreat.capital'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Same-origin /api during local dev → live listings (avoids CORS + empty local credentials)
      '/api': {
        target: LISTINGS_UPSTREAM,
        changeOrigin: true,
        secure: true,
      },
      '/health': {
        target: LISTINGS_UPSTREAM,
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
