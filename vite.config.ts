import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'admin-index-route',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/admin' || req.url === '/admin/') {
            req.url = '/admin/index.html'
          }
          next()
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '8443'),
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '8443'),
  },
})
