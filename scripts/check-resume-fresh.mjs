import { readFile } from 'node:fs/promises'
import { computeResumeHash, hashFile } from './resume-hash.mjs'

// export-resume-pdf.mjs runs the build to produce the very PDF this check guards,
// so it opts out to avoid a circular failure.
if (process.env.SKIP_RESUME_CHECK) {
    process.exit(0)
}

const fail = (reason) => {
    console.error(`\nResume PDF is out of date: ${reason}`)
    console.error('public/files/resume.pdf no longer matches src/constants/profile.ts.')
    console.error('Run `npm run export:resume-pdf` and commit the regenerated PDF.\n')
    process.exit(1)
}

const expected = await computeResumeHash()
const recorded = await readFile(hashFile, 'utf8').then((value) => value.trim(), () => null)

if (recorded === null) {
    fail('no resume.hash recorded yet')
}

if (recorded !== expected) {
    fail('resume source changed since the PDF was generated')
}

console.log('Resume PDF is up to date with profile.ts.')
