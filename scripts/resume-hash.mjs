import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const rootDir = path.resolve(__dirname, '..')
export const hashFile = path.join(rootDir, 'public', 'files', 'resume.hash')

/**
 * Files that determine what the resume PDF contains. If any of them changes,
 * public/files/resume.pdf is stale until `npm run export:resume-pdf` runs again.
 */
const sourceFiles = ['src/constants/profile.ts', 'src/components/ResumeDocument.tsx']

export const computeResumeHash = async () => {
    const hash = createHash('sha256')

    for (const relativePath of sourceFiles) {
        hash.update(relativePath)
        hash.update(await readFile(path.join(rootDir, relativePath)))
    }

    return hash.digest('hex')
}
