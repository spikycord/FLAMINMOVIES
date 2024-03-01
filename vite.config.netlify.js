// vite.config.netlify.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.jsx',
        function: 'netlify/functions/render.cjs',
      },
    },
  },
})