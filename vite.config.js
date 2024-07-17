import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://ecommerce-backend-7jzj.onrender.com',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
  
})

