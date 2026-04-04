import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const contentDir = path.join(rootDir, 'src/content/blog')
const publicDir = path.join(rootDir, 'public')
const siteUrl = 'https://ivakobalava.dev'

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

const readPosts = async () => {
    const filenames = await readdir(contentDir)
    const posts = await Promise.all(
        filenames
            .filter((filename) => filename.endsWith('.md'))
            .map(async (filename) => {
                const source = await readFile(path.join(contentDir, filename), 'utf8')
                const { data } = parseFrontmatter(source)

                return {
                    title: data.title,
                    slug: data.slug,
                    excerpt: data.excerpt,
                    publishedAt: data.publishedAt,
                    updatedAt: data.updatedAt ?? data.publishedAt,
                    draft: Boolean(data.draft),
                }
            }),
    )

    return posts
        .filter((post) => !post.draft)
        .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime())
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

    await mkdir(publicDir, { recursive: true })
    await writeFile(path.join(publicDir, 'sitemap.xml'), buildSitemap(posts), 'utf8')
    await writeFile(path.join(publicDir, 'rss.xml'), buildRss(posts), 'utf8')
}

await main()
