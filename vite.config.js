import { fileURLToPath, URL } from 'node:url'
import EnvironmentPlugin from 'vite-plugin-environment'
import { build, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    EnvironmentPlugin({
      build:'web'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
