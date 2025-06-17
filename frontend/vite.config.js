import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: process.env.PORT || 5173, // Use Render's PORT or default
    strictPort: true, // Exit if port is unavailable
  },
  preview: {
    host: '0.0.0.0' || thekingmarket-front.onrender.com, // Also for preview (production build)
    port: process.env.PORT || 4173,
    strictPort: true,
  },
})