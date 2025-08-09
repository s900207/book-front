// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import path from 'path'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

function removePreloadFonts() {
  return {
    name: 'remove-preload-fonts',
    generateBundle(options, bundle) {
      // 處理 HTML 文件
      for (const fileName in bundle) {
        const file = bundle[fileName]
        if (fileName.includes('.html') || file.type === 'chunk') {
          if (file.source && typeof file.source === 'string') {
            // 移除 MDI 字體的預載入標籤
            file.source = file.source.replace(
              /<link[^>]*rel=["']preload["'][^>]*materialdesignicons[^>]*>/gi,
              ''
            )
          }
        }
      }
    },
    transformIndexHtml(html) {
      // 移除 HTML 中的預載入標籤
      return html.replace(
        /<link[^>]*rel=["']preload["'][^>]*materialdesignicons[^>]*>/gi,
        ''
      )
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/book-front/', 
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    vuetify({
      autoImport: true
    }),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
          defer: true
        }]
      }
    })
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue'
    ]
  },
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('vue')) return 'vue-vendor'
            if (id.includes('vuetify')) return 'vuetify-vendor'
            if (id.includes('@mdi/font')) return 'mdi-vendor'
            return 'vendor'
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && /\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return 'fonts/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    },
    target: 'es2015',
    assetsInlineLimit: 0 
  }
})
