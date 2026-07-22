/**
 * Generates article cover images (1200x630, also used as OG images) plus the
 * site-default OG image, by rendering an HTML template with Playwright and
 * screenshotting it.
 *
 * Output:
 *   public/images/covers/<slug>.jpg   one per post in src/content/blog
 *   public/images/og-default.jpg      site-wide default OG image
 *
 * Run with `npm run generate:covers` after adding or renaming an article.
 * CHROMIUM_PATH lets CI/cloud environments point at a preinstalled browser.
 */
import { mkdir, readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const rootDir = process.cwd()
const contentDir = path.join(rootDir, 'src/content/blog')
const coversDir = path.join(rootDir, 'public/images/covers')
const ogDefaultPath = path.join(rootDir, 'public/images/og-default.jpg')

const parseFrontmatter = (source) => {
    const match = source.match(/^---\n([\s\S]*?)\n---\n?/)
    if (!match) return {}
    const data = {}
    for (const line of match[1].split('\n')) {
        const separatorIndex = line.indexOf(':')
        if (separatorIndex === -1) continue
        data[line.slice(0, separatorIndex).trim()] = line.slice(separatorIndex + 1).trim()
    }
    return data
}

const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

const template = ({ eyebrow, title, footerLeft, footerRight }) => `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Georama:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    font-family: 'Georama', sans-serif;
    color: #f8fafc;
    background:
      radial-gradient(1000px 520px at 12% -12%, rgba(147, 197, 253, 0.38), transparent 62%),
      radial-gradient(950px 640px at 108% 112%, rgba(37, 99, 235, 0.55), transparent 68%),
      linear-gradient(135deg, #0b1a38 0%, #123063 48%, #1d4ed8 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 72px 84px 64px;
    position: relative;
    overflow: hidden;
  }
  .streak {
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, transparent 44%, rgba(226, 240, 255, 0.16) 50%, transparent 56%);
  }
  .eyebrow {
    font-size: 26px;
    font-weight: 600;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #bfdbfe;
  }
  .title {
    font-size: 78px;
    line-height: 1.12;
    font-weight: 800;
    letter-spacing: -0.015em;
    max-width: 980px;
    text-wrap: balance;
  }
  .title.small { font-size: 64px; }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 28px;
    color: #dbeafe;
  }
  .footer .right { font-weight: 300; color: #93c5fd; }
</style>
</head>
<body>
  <div class="streak"></div>
  <div class="eyebrow">${escapeHtml(eyebrow)}</div>
  <div class="title${title.length > 48 ? ' small' : ''}">${escapeHtml(title)}</div>
  <div class="footer">
    <span>${escapeHtml(footerLeft)}</span>
    <span class="right">${escapeHtml(footerRight)}</span>
  </div>
</body>
</html>`

const main = async () => {
    await mkdir(coversDir, { recursive: true })

    const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })

    const shoot = async (html, outPath) => {
        await page.setContent(html, { waitUntil: 'networkidle' })
        await page.evaluate(() => document.fonts.ready)
        await page.screenshot({ path: outPath, type: 'jpeg', quality: 88 })
        console.log(`wrote ${path.relative(rootDir, outPath)}`)
    }

    const filenames = (await readdir(contentDir)).filter((name) => name.endsWith('.md'))

    for (const filename of filenames) {
        const source = await readFile(path.join(contentDir, filename), 'utf8')
        const data = parseFrontmatter(source)
        if (!data.slug || !data.title) continue

        await shoot(
            template({
                eyebrow: 'ivakobalava.dev · Articles',
                title: data.title,
                footerLeft: 'Iveri Kobalava',
                footerRight: 'Senior Frontend Engineer',
            }),
            path.join(coversDir, `${data.slug}.jpg`),
        )
    }

    await shoot(
        template({
            eyebrow: 'ivakobalava.dev',
            title: 'Iveri Kobalava',
            footerLeft: 'Senior Frontend Engineer',
            footerRight: 'React · TypeScript · Java',
        }),
        ogDefaultPath,
    )

    await browser.close()
}

await main()
