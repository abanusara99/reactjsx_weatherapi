import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,  // Use Render's dynamic port or fallback to 3000 for local development
    host: '0.0.0.0',  // Listen on all network interfaces
    allowedHosts: [
      'reactjsx-weatherapi.onrender.com',  // Add your Render URL here
      'localhost', // Also allow localhost for local development
    ],
  },
})
