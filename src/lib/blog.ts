import { marked } from 'marked'

export interface BlogFrontmatter {
    title: string
    slug: string
    excerpt: string
    publishedAt: string
    updatedAt?: string
    tags: string[]
    coverImage: string
    draft?: boolean
    readingTime?: string
}

export interface BlogPost extends BlogFrontmatter {
    content: string
    html: string
}

const markdownFiles = import.meta.glob('../content/blog/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>

const parseScalarValue = (value: string) => {
    const normalized = value.trim()

    if (normalized === 'true') return true
    if (normalized === 'false') return false
    if ((normalized.startsWith('"') && normalized.endsWith('"')) || (normalized.startsWith("'") && normalized.endsWith("'"))) {
        return normalized.slice(1, -1)
    }

    return normalized
}

const parseFrontmatter = (source: string) => {
    const match = source.match(/^---\n([\s\S]*?)\n---\n?/)

    if (!match) {
        return {
            data: {} as Partial<BlogFrontmatter>,
            content: source,
        }
    }

    const data: Record<string, string | boolean | string[]> = {}
    let activeArrayKey: string | null = null

    match[1].split('\n').forEach((line) => {
        const trimmed = line.trim()

        if (!trimmed) return

        if (trimmed.startsWith('- ') && activeArrayKey) {
            const currentValue = data[activeArrayKey]
            const nextValue = trimmed.slice(2).trim()

            if (Array.isArray(currentValue)) {
                currentValue.push(nextValue)
            }
            return
        }

        const separatorIndex = line.indexOf(':')

        if (separatorIndex === -1) return

        const key = line.slice(0, separatorIndex).trim()
        const rawValue = line.slice(separatorIndex + 1).trim()

        if (!rawValue) {
            data[key] = []
            activeArrayKey = key
            return
        }

        data[key] = parseScalarValue(rawValue)
        activeArrayKey = null
    })

    return {
        data: data as Partial<BlogFrontmatter>,
        content: source.slice(match[0].length),
    }
}

marked.setOptions({
    gfm: true,
})

const countWords = (value: string) => value.trim().split(/\s+/).filter(Boolean).length

const formatReadingTime = (value: string) => `${Math.max(1, Math.ceil(countWords(value) / 200))} min read`

const parsePost = (source: string): BlogPost => {
    const { data: frontmatter, content } = parseFrontmatter(source)

    if (!frontmatter.title || !frontmatter.slug || !frontmatter.excerpt || !frontmatter.publishedAt || !frontmatter.coverImage) {
        throw new Error(`Invalid blog frontmatter for slug "${frontmatter.slug ?? 'unknown'}".`)
    }

    return {
        title: frontmatter.title,
        slug: frontmatter.slug,
        excerpt: frontmatter.excerpt,
        publishedAt: frontmatter.publishedAt,
        updatedAt: frontmatter.updatedAt ?? frontmatter.publishedAt,
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        coverImage: frontmatter.coverImage,
        draft: Boolean(frontmatter.draft),
        readingTime: frontmatter.readingTime ?? formatReadingTime(content),
        content,
        html: marked.parse(content) as string,
    }
}

const isVisiblePost = (post: BlogPost) => (import.meta.env.PROD ? !post.draft : true)

const posts = Object.values(markdownFiles)
    .map(parsePost)
    .filter(isVisiblePost)
    .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime())

export const getAllBlogPosts = () => posts

export const getBlogPostBySlug = (slug: string) => posts.find((post) => post.slug === slug) ?? null
