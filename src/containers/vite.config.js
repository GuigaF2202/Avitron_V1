import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://avitronmultiverse.com',
        changeOrigin: true,
        secure: true
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg', '**/*.webp', '**/*.gif'],
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@containers': '/src/containers',
      '@contexts': '/src/contexts'
    }
  }
});