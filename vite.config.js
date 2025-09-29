import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Use relative base so the built site works when served from GitHub Pages
  base: './',
  plugins: [
    react({
      include: ['src/**/*.tsx', 'src/**/*.ts', 'src/**/*.jsx', 'src/**/*.js'],
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
