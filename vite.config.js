import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { splitVendorChunkPlugin } from 'vite'
import pluginRewriteAll from 'vite-plugin-rewrite-all'

export default defineConfig({
  plugins: [
    vue(),
    pluginRewriteAll(),
    // splits build into app.js and vendor.js
    // TODO - chunk vendor further
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    open: false,
    proxy: {
      // rewrite netlify functions to local netlify-lambda server
      '/.netlify': {
        target: 'http://localhost:9000',
        rewrite: path => path.replace('^/.netlify/functions', '')
      }
    }
  }
})
