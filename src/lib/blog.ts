import postsData from '../generated/blog-posts.json'

export interface BlogPost {
    title: string
    slug: string
    excerpt: string
    publishedAt: string
    updatedAt: string
    tags: string[]
    coverImage: string
    draft: boolean
    readingTime: string
    html: string
}

// Markdown is parsed and highlighted at build time (scripts/generate-blog-assets.mjs);
// the client only ships the finished HTML. Drafts stay visible in dev builds.
const posts = (postsData as BlogPost[]).filter((post) => (import.meta.env.PROD ? !post.draft : true))

export const getAllBlogPosts = () => posts

export const getBlogPostBySlug = (slug: string) => posts.find((post) => post.slug === slug) ?? null
