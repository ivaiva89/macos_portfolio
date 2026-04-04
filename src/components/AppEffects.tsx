import { useEffect } from 'react'
import { useWindowStore, useRouterStore } from '#store'
import { getBlogSlugFromPath, isBlogPath } from '#lib/routes'
import { getBlogPostBySlug } from '#lib/blog'
import { applyBlogIndexSeo, applyDefaultSeo, applySeo } from '#lib/seo'
import { SITE_NAME } from '#lib/site'

const AppEffects = () => {
    const { pathname, syncFromLocation } = useRouterStore()
    const { windows, openWindow } = useWindowStore()

    useEffect(() => {
        syncFromLocation()

        const handlePopState = () => syncFromLocation()

        window.addEventListener('popstate', handlePopState)

        return () => window.removeEventListener('popstate', handlePopState)
    }, [syncFromLocation])

    useEffect(() => {
        if (isBlogPath(pathname) && !windows.safari.isOpen) {
            openWindow('safari')
        }
    }, [openWindow, pathname, windows.safari.isOpen])

    useEffect(() => {
        if (!isBlogPath(pathname)) {
            applyDefaultSeo()
            return
        }

        const slug = getBlogSlugFromPath(pathname)

        if (!slug) {
            applyBlogIndexSeo()
            return
        }

        const post = getBlogPostBySlug(slug)

        if (!post) {
            applySeo({
                title: `Article Not Found | ${SITE_NAME}`,
                description: 'The requested article could not be found.',
                path: pathname,
                type: 'website',
            })
            return
        }

        applySeo({
            title: `${post.title} | ${SITE_NAME}`,
            description: post.excerpt,
            path: pathname,
            image: `${window.location.origin}${post.coverImage}`,
            type: 'article',
        })
    }, [pathname])

    return null
}

export default AppEffects
