import { BLOG_DESCRIPTION, BLOG_TITLE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from './site'

interface SeoInput {
    title: string
    description: string
    path: string
    image?: string
    type?: 'website' | 'article'
}

const ensureMeta = (selector: string, attributes: Record<string, string>) => {
    let element = document.head.querySelector(selector) as HTMLMetaElement | null

    if (!element) {
        element = document.createElement('meta')
        document.head.appendChild(element)
    }

    Object.entries(attributes).forEach(([key, value]) => {
        element?.setAttribute(key, value)
    })
}

const ensureLink = (selector: string, rel: string, href: string) => {
    let element = document.head.querySelector(selector) as HTMLLinkElement | null

    if (!element) {
        element = document.createElement('link')
        document.head.appendChild(element)
    }

    element.setAttribute('rel', rel)
    element.setAttribute('href', href)
}

export const applySeo = ({ title, description, path, image = `${SITE_URL}/images/blog1.png`, type = 'website' }: SeoInput) => {
    const canonicalUrl = `${SITE_URL}${path}`

    document.title = title

    ensureMeta('meta[name="description"]', { name: 'description', content: description })
    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    ensureMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    ensureMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    ensureMeta('meta[property="og:image"]', { property: 'og:image', content: image })
    ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })
    ensureMeta('meta[name="twitter:creator"]', { name: 'twitter:creator', content: '@ikobalava' })
    ensureLink('link[rel="canonical"]', 'canonical', canonicalUrl)
}

export const applyDefaultSeo = () =>
    applySeo({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        path: '/',
        type: 'website',
    })

export const applyBlogIndexSeo = () =>
    applySeo({
        title: `${BLOG_TITLE} | ${SITE_NAME}`,
        description: BLOG_DESCRIPTION,
        path: '/blog',
        type: 'website',
    })
