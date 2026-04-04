export const BLOG_INDEX_PATH = '/blog'

const trimTrailingSlash = (value: string) => {
    if (value.length > 1 && value.endsWith('/')) {
        return value.slice(0, -1)
    }

    return value
}

export const normalizePath = (value: string) => {
    if (!value) return '/'

    return trimTrailingSlash(value.startsWith('/') ? value : `/${value}`)
}

export const isBlogPath = (pathname: string) => normalizePath(pathname).startsWith(BLOG_INDEX_PATH)

export const getBlogPostPath = (slug: string) => `${BLOG_INDEX_PATH}/${slug}`

export const getBlogSlugFromPath = (pathname: string) => {
    const normalized = normalizePath(pathname)

    if (normalized === BLOG_INDEX_PATH) return null
    if (!normalized.startsWith(`${BLOG_INDEX_PATH}/`)) return null

    return normalized.slice(BLOG_INDEX_PATH.length + 1) || null
}
