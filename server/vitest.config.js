import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        hookTimeout: 120_000,
        testTimeout: 60_000,
        environment: 'node',
        setupFiles: './tests/setup.js', // Optional: if you have any setup files
    },
});