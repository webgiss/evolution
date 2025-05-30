import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react'
// import commonjs from '@rollup/plugin-commonjs'


export default ({ mode }) => {

    const env = loadEnv(mode, process.cwd())
    const basePath = env.VITE_BASE_PATH || '/'

    return defineConfig({
        base: basePath,
        plugins: [react()],
        build: {
            outDir: 'dist',
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src', 'client'),
            },
        },
        server: {
            watch: {
                // Watch for changes in .jsx files
                ignored: [],
            },
        },
        define: {
            // By default, Vite doesn't include shims for NodeJS/
            // necessary for segment analytics lib to work
            global: {},
        },
    })
}