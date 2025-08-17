import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/book-front/',
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vuetify({
      autoImport: true,
      // 關鍵：禁用字體自動預載
      theme: {
        defaultTheme: 'light'
      }
    })
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
  },
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'vuetify-vendor': ['vuetify'],
          icons: ['@mdi/js']
        }
      }
    }
  }
})
