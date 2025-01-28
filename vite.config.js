import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3001,  // Use Render's dynamic port or default to 3000 locally
    host: '0.0.0.0',  // Listen on all network interfaces
  },
})
