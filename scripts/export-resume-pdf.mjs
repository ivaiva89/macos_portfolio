import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'
import { computeResumeHash, hashFile } from './resume-hash.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const publicFilesDir = path.join(rootDir, 'public', 'files')
const publicOutputFile = path.join(publicFilesDir, 'resume.pdf')
const viteBin = path.join(rootDir, 'node_modules', '.bin', process.platform === 'win32' ? 'vite.cmd' : 'vite')
const previewPort = '4173'
const previewUrl = `http://127.0.0.1:${previewPort}/resume/print`

const waitForServer = (child) =>
    new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error('Timed out waiting for Vite preview server.'))
        }, 15000)

        child.stdout.on('data', (chunk) => {
            if (chunk.toString().includes(`http://127.0.0.1:${previewPort}/`)) {
                clearTimeout(timeout)
                resolve()
            }
        })

        child.stderr.on('data', (chunk) => {
            const message = chunk.toString()

            if (message.trim()) {
                reject(new Error(message))
            }
        })

        child.on('exit', (code) => {
            clearTimeout(timeout)
            reject(new Error(`Vite preview exited early with code ${code ?? 'unknown'}.`))
        })
    })

const preview = spawn(viteBin, ['preview', '--host', '127.0.0.1', '--port', previewPort], {
    cwd: rootDir,
    stdio: ['ignore', 'pipe', 'pipe'],
})

try {
    await waitForServer(preview)
    await mkdir(publicFilesDir, { recursive: true })

    // CHROMIUM_PATH lets CI/cloud environments point at a preinstalled browser.
    const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
    const page = await browser.newPage()

    await page.goto(previewUrl, { waitUntil: 'networkidle' })
    await page.emulateMedia({ media: 'print' })
    await page.pdf({
        path: publicOutputFile,
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })

    await browser.close()
    await writeFile(hashFile, `${await computeResumeHash()}\n`)

    console.log(`Resume PDF generated at ${publicOutputFile}`)
    console.log(`Freshness hash written to ${hashFile}`)
} finally {
    preview.kill('SIGTERM')
}
