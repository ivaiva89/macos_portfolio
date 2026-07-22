/**
 * Post-build prerender step.
 *
 * The site is a Vite SPA, so by default every route serves the same shell with the
 * homepage meta tags — social scrapers and crawlers never see article content.
 * This script writes a static HTML file per blog route into dist/:
 *
 *   dist/blog/index.html            — article index with blog meta
 *   dist/blog/<slug>/index.html     — per-article meta + full article HTML + JSON-LD
 *
 * Vercel serves matching static files before applying the SPA rewrite, so these
 * pages are what crawlers receive; the React app still takes over in the browser
 * (createRoot replaces the prerendered #root content on load).
 *
 * Posts come pre-parsed and pre-highlighted from src/generated/blog-posts.json
 * (written by scripts/generate-blog-assets.mjs during prebuild).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'dist')
const generatedPostsPath = path.join(rootDir, 'src/generated/blog-posts.json')
const siteUrl = 'https://ivakobalava.dev'
const siteName = 'Iveri Kobalava'
const blogTitle = 'Articles'
const blogDescription = 'Notes on frontend architecture, product delivery, and building polished developer experiences.'

const escapeHtml = (value) =>
    String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;')

/** Replace the shell's head meta with route-specific values. */
const applyMeta = (shell, { title, description, url, image, type }) => {
    let html = shell

    const replacements = [
        [/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`],
        [/<meta name="description"[^>]*\/?>/, `<meta name="description" content="${escapeHtml(description)}" />`],
        [/<meta property="og:title"[^>]*\/?>/, `<meta property="og:title" content="${escapeHtml(title)}" />`],
        [/<meta property="og:description"[^>]*\/?>/, `<meta property="og:description" content="${escapeHtml(description)}" />`],
        [/<meta property="og:type"[^>]*\/?>/, `<meta property="og:type" content="${type}" />`],
        [/<meta property="og:url"[^>]*\/?>/, `<meta property="og:url" content="${escapeHtml(url)}" />`],
        [/<meta property="og:image"[^>]*\/?>/, `<meta property="og:image" content="${escapeHtml(image)}" />`],
        [/<meta name="twitter:title"[^>]*\/?>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`],
        [/<meta name="twitter:description"[^>]*\/?>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`],
        [/<meta name="twitter:image"[^>]*\/?>/, `<meta name="twitter:image" content="${escapeHtml(image)}" />`],
        [/<link rel="canonical"[^>]*\/?>/, `<link rel="canonical" href="${escapeHtml(url)}" />`],
    ]

    for (const [pattern, replacement] of replacements) {
        html = html.replace(pattern, replacement)
    }

    return html
}

const articleJsonLd = (post) =>
    JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: `${siteUrl}${post.coverImage}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        url: `${siteUrl}/blog/${post.slug}`,
        keywords: post.tags.join(', '),
        author: { '@type': 'Person', name: siteName, url: siteUrl },
    })

/** Inject crawlable content into the #root div (React replaces it on hydration). */
const injectContent = (shell, content) => shell.replace('<div id="root"></div>', `<div id="root">${content}</div>`)

const injectJsonLd = (shell, jsonLd) => shell.replace('</head>', `    <script type="application/ld+json">${jsonLd}</script>\n  </head>`)

const main = async () => {
    const shell = await readFile(path.join(distDir, 'index.html'), 'utf8')
    const posts = JSON.parse(await readFile(generatedPostsPath, 'utf8')).filter((post) => !post.draft)

    // Blog index page.
    const indexHtml = applyMeta(shell, {
        title: `${blogTitle} | ${siteName}`,
        description: blogDescription,
        url: `${siteUrl}/blog`,
        image: `${siteUrl}/images/blog1.png`,
        type: 'website',
    })
    const indexContent = `<main><h1>${escapeHtml(blogTitle)}</h1><p>${escapeHtml(blogDescription)}</p><ul>${posts
        .map((post) => `<li><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a> — ${escapeHtml(post.excerpt)}</li>`)
        .join('')}</ul></main>`

    await mkdir(path.join(distDir, 'blog'), { recursive: true })
    await writeFile(path.join(distDir, 'blog/index.html'), injectContent(indexHtml, indexContent), 'utf8')

    // Per-article pages.
    for (const post of posts) {
        const url = `${siteUrl}/blog/${post.slug}`
        let html = applyMeta(shell, {
            title: `${post.title} | ${siteName}`,
            description: post.excerpt,
            url,
            image: `${siteUrl}${post.coverImage}`,
            type: 'article',
        })
        html = injectJsonLd(html, articleJsonLd(post))

        const articleContent = `<main><article><h1>${escapeHtml(post.title)}</h1><p>${escapeHtml(post.excerpt)}</p>${post.html}</article></main>`
        html = injectContent(html, articleContent)

        const dir = path.join(distDir, 'blog', post.slug)
        await mkdir(dir, { recursive: true })
        await writeFile(path.join(dir, 'index.html'), html, 'utf8')
    }

    console.log(`Prerendered ${posts.length + 1} blog page(s) into dist/blog/`)
}

await main()
