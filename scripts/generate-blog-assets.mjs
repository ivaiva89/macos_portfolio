/**
 * Prebuild content step (also runs before `npm run dev` via predev).
 *
 * Reads src/content/blog/*.md and emits:
 *   - src/generated/blog-posts.json — parsed posts with Shiki-highlighted HTML,
 *     consumed by src/lib/blog.ts at runtime and scripts/prerender-blog.mjs at postbuild.
 *     Markdown parsing and highlighting happen here, at build time, so neither
 *     marked nor shiki ships in the client bundle.
 *   - public/sitemap.xml, public/rss.xml (published posts only)
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { Marked } from 'marked'
import { codeToHtml } from 'shiki'

const rootDir = process.cwd()
const contentDir = path.join(rootDir, 'src/content/blog')
const publicDir = path.join(rootDir, 'public')
const generatedDir = path.join(rootDir, 'src/generated')
const siteUrl = 'https://ivakobalava.dev'

const SHIKI_THEME = 'github-dark'

const escapeXml = (value) =>
    value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;')

const parseScalarValue = (value) => {
    const normalized = value.trim()

    if (normalized === 'true') return true
    if (normalized === 'false') return false
    if ((normalized.startsWith('"') && normalized.endsWith('"')) || (normalized.startsWith("'") && normalized.endsWith("'"))) {
        return normalized.slice(1, -1)
    }

    return normalized
}

const parseFrontmatter = (source) => {
    const match = source.match(/^---\n([\s\S]*?)\n---\n?/)

    if (!match) {
        return { data: {}, content: source }
    }

    const data = {}
    let activeArrayKey = null

    for (const line of match[1].split('\n')) {
        const trimmed = line.trim()

        if (!trimmed) continue

        if (trimmed.startsWith('- ') && activeArrayKey) {
            data[activeArrayKey].push(trimmed.slice(2).trim())
            continue
        }

        const separatorIndex = line.indexOf(':')

        if (separatorIndex === -1) continue

        const key = line.slice(0, separatorIndex).trim()
        const rawValue = line.slice(separatorIndex + 1).trim()

        if (!rawValue) {
            data[key] = []
            activeArrayKey = key
            continue
        }

        data[key] = parseScalarValue(rawValue)
        activeArrayKey = null
    }

    return { data, content: source.slice(match[0].length) }
}

const countWords = (value) => value.trim().split(/\s+/).filter(Boolean).length

const formatReadingTime = (value) => `${Math.max(1, Math.ceil(countWords(value) / 200))} min read`

/** marked instance with Shiki code highlighting (async: highlight in walkTokens, look up in renderer). */
const createMarkdownRenderer = () => {
    const highlighted = new Map()

    const marked = new Marked({
        gfm: true,
        async: true,
        walkTokens: async (token) => {
            if (token.type !== 'code') return
            try {
                highlighted.set(token.text, await codeToHtml(token.text, { lang: token.lang || 'text', theme: SHIKI_THEME }))
            } catch {
                // Unknown language — let marked render a plain code block.
            }
        },
        renderer: {
            code({ text }) {
                return highlighted.get(text) ?? false
            },
        },
    })

    return (content) => marked.parse(content)
}

const readPosts = async () => {
    const renderMarkdown = createMarkdownRenderer()
    const filenames = await readdir(contentDir)
    const posts = await Promise.all(
        filenames
            .filter((filename) => filename.endsWith('.md'))
            .map(async (filename) => {
                const source = await readFile(path.join(contentDir, filename), 'utf8')
                const { data, content } = parseFrontmatter(source)

                if (!data.title || !data.slug || !data.excerpt || !data.publishedAt || !data.coverImage) {
                    throw new Error(`Invalid blog frontmatter in "${filename}" (slug: "${data.slug ?? 'unknown'}").`)
                }

                return {
                    title: data.title,
                    slug: data.slug,
                    excerpt: data.excerpt,
                    publishedAt: data.publishedAt,
                    updatedAt: data.updatedAt ?? data.publishedAt,
                    tags: Array.isArray(data.tags) ? data.tags : [],
                    coverImage: data.coverImage,
                    draft: Boolean(data.draft),
                    readingTime: data.readingTime ?? formatReadingTime(content),
                    html: await renderMarkdown(content),
                }
            }),
    )

    return posts.sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime())
}

const buildSitemap = (posts) => {
    const urls = [
        { loc: siteUrl, lastmod: new Date().toISOString() },
        { loc: `${siteUrl}/blog`, lastmod: new Date().toISOString() },
        ...posts.map((post) => ({
            loc: `${siteUrl}/blog/${post.slug}`,
            lastmod: new Date(post.updatedAt).toISOString(),
        })),
    ]

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map(
        (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
  </url>`,
    )
    .join('\n')}
</urlset>
`
}

const buildRss = (posts) => `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Iva Kobalava Articles</title>
    <link>${siteUrl}/blog</link>
    <description>Notes on frontend architecture, product delivery, and building polished developer experiences.</description>
    <language>en</language>
${posts
    .map(
        (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`,
    )
    .join('\n')}
  </channel>
</rss>
`

const main = async () => {
    const posts = await readPosts()
    const published = posts.filter((post) => !post.draft)

    await mkdir(generatedDir, { recursive: true })
    await writeFile(path.join(generatedDir, 'blog-posts.json'), JSON.stringify(posts, null, 2), 'utf8')

    await mkdir(publicDir, { recursive: true })
    await writeFile(path.join(publicDir, 'sitemap.xml'), buildSitemap(published), 'utf8')
    await writeFile(path.join(publicDir, 'rss.xml'), buildRss(published), 'utf8')

    console.log(`Generated ${posts.length} post(s) (${published.length} published) + sitemap + rss`)
}

await main()
