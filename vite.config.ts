import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { existsSync } from 'node:fs'
import { execSync } from 'node:child_process'

const rootDir = dirname(fileURLToPath(import.meta.url))

// src/generated/blog-posts.json is gitignored and normally produced by the
// predev/prebuild hooks. Guard for tools that launch vite directly (IDE run
// configs) so a fresh checkout still boots.
if (!existsSync(resolve(rootDir, 'src/generated/blog-posts.json'))) {
    execSync('node scripts/generate-blog-assets.mjs', { cwd: rootDir, stdio: 'inherit' })
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '#components': resolve(rootDir, 'src/components'),
            '#constants': resolve(rootDir, 'src/constants'),
            '#lib': resolve(rootDir, 'src/lib'),
            '#store': resolve(rootDir, 'src/store'),
            '#hoc': resolve(rootDir, 'src/hoc'),
            '#windows': resolve(rootDir, 'src/windows'),
        },
    },
})
