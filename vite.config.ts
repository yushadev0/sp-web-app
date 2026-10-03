import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Uygulama yusa.app/sp-web-app/ alt dizininde yayınlanıyor
  base: '/sp-web-app/',
  plugins: [react(), tailwindcss()],
})
