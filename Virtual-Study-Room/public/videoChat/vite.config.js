import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/video/', // 👈 this tells Vite your app will be served from /video
  server: {
    host: true,
    port: process.env.PORT || 5173,
    strictPort: true
  },
  preview: {
    port: process.env.PORT || 5173
  }
})