import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative assets keep local dev/preview working and allow deployment under any GitHub Pages repository path.
  base: './',
  plugins: [react()],
})
