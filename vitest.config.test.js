import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src', 'client'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        css: true,
        include: ['src/client/**/*.{test,spec}.{js,jsx}'],
        setupFiles: ['./src/client/test/setup.js'],
    },
})