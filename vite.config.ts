/* eslint-disable immutable/no-mutation */
import react from '@vitejs/plugin-react'
// load .env files
import { config } from 'dotenv'
import path from 'path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

config()
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  root: path.join(__dirname, 'src'),
  build: {
    sourcemap: false,
    outDir: '../dist',
    emptyOutDir: true
  },
  publicDir: '../public',
  plugins: [tsconfigPaths(), react()]
})
