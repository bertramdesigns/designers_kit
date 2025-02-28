import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), dts()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: '@designers-kit/ui',
      formats: ['es'],
      // the proper extensions will be added
      fileName: '@designers-kit/ui',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
    },
  },
})
