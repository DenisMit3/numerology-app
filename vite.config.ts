import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@i18n': path.resolve(__dirname, './src/i18n'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@types': path.resolve(__dirname, './src/types'),
        },
    },
})
