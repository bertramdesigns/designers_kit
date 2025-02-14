import path from "path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;


// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [solid()],
  resolve: {
    alias: {
      // SolidUI (Tailwind) additions to resolve `~` imports
      "~": path.resolve(__dirname, "./src")
    },
    // essential for vitest. Otherwise will fail with "Client-only API called on server side"
    conditions: ['development', 'browser'],
  },

  // Vitest
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ['node_modules/@testing-library/jest-dom/vitest'],
    isolate: false,
    coverage: {
      provider: "v8",
      reporter: ['text', 'html'],
    }
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
        protocol: "ws",
        host,
        port: 1421,
      }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
