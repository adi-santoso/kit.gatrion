import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'codemirror': ['@codemirror/state', '@codemirror/view', '@uiw/react-codemirror'],
          'utils': ['crypto-js', 'diff', 'marked', 'dompurify', 'js-yaml']
        }
      }
    }
  },
})
