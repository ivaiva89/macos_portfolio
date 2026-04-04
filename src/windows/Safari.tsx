import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import { ArrowLeft, ChevronLeft, ChevronRight, Copy, ExternalLink, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf } from 'lucide-react'
import { getAllBlogPosts, getBlogPostBySlug } from '#lib/blog'
import { BLOG_DESCRIPTION, BLOG_TITLE, SITE_URL } from '#lib/site'
import { BLOG_INDEX_PATH, getBlogPostPath, getBlogSlugFromPath, isBlogPath } from '#lib/routes'
import { useRouterStore, useWindowStore } from '#store'

const formatDate = (value: string) =>
    new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(value))

const Safari = () => {
    const { pathname, navigate } = useRouterStore()
    const { closeWindow } = useWindowStore()
    const posts = getAllBlogPosts()
    const slug = getBlogSlugFromPath(pathname)
    const activePost = slug ? getBlogPostBySlug(slug) : null
    const isInBlog = isBlogPath(pathname)
    const currentPath = isInBlog ? pathname : BLOG_INDEX_PATH
    const currentLocation = `${SITE_URL}${currentPath}`

    const handleArticleOpen = (nextSlug: string) => navigate(getBlogPostPath(nextSlug))

    const handleClose = () => {
        closeWindow('safari')
        if (isInBlog) {
            navigate('/')
        }
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(currentLocation)
    }

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: activePost?.title ?? BLOG_TITLE,
                text: activePost?.excerpt ?? BLOG_DESCRIPTION,
                url: currentLocation,
            })
            return
        }

        await handleCopy()
    }

    const handleOpenNewTab = () => {
        window.open(currentLocation, '_blank', 'noopener,noreferrer')
    }

    const showArticle = Boolean(activePost)
    const showMissingArticle = Boolean(slug && !activePost)

    return (
        <>
            <div id="window-header">
                <WindowControls target="safari" onClose={handleClose} />

                <PanelLeft className="ml-10 icon" />

                <div className="flex items-center gap-1 ml-5">
                    <button type="button" className="icon" aria-label="Back to articles" onClick={() => navigate(BLOG_INDEX_PATH)} disabled={!showArticle}>
                        <ChevronLeft />
                    </button>
                    <button type="button" className="icon" aria-label="Forward" disabled>
                        <ChevronRight />
                    </button>
                </div>

                <div className="flex-1 flex-center gap-3">
                    <ShieldHalf className="icon" />
                    <div className="search">
                        <Search className="icon" />

                        <input type="text" value={currentLocation} readOnly aria-label="Current page" className="flex-1" />
                    </div>
                </div>

                <div className={'flex items-center gap-5'}>
                    <button type="button" className="icon" aria-label="Share current article" onClick={() => void handleShare()}>
                        <Share />
                    </button>
                    <button type="button" className="icon" aria-label="Open in new tab" onClick={handleOpenNewTab}>
                        <Plus />
                    </button>
                    <button type="button" className="icon" aria-label="Copy article link" onClick={() => void handleCopy()}>
                        <Copy />
                    </button>
                </div>
            </div>

            <div className="blog">
                {showArticle && activePost ? (
                    <article className="article-view">
                        <button type="button" className="back-link" onClick={() => navigate(BLOG_INDEX_PATH)}>
                            <ArrowLeft size={16} /> All articles
                        </button>

                        <header className="article-header">
                            <p className="article-eyebrow">{BLOG_TITLE}</p>
                            <h1>{activePost.title}</h1>
                            <div className="article-meta">
                                <span>{formatDate(activePost.publishedAt)}</span>
                                <span>{activePost.readingTime}</span>
                                {activePost.updatedAt && activePost.updatedAt !== activePost.publishedAt ? <span>Updated {formatDate(activePost.updatedAt)}</span> : null}
                            </div>
                            <ul className="tag-list">
                                {activePost.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                            <p className="article-excerpt">{activePost.excerpt}</p>
                            <img src={activePost.coverImage} alt={activePost.title} className="article-cover" />
                        </header>

                        <div className="article-body" dangerouslySetInnerHTML={{ __html: activePost.html }} />
                    </article>
                ) : showMissingArticle ? (
                    <div className="blog-empty">
                        <h2>Article not found</h2>
                        <p>The article you requested does not exist or is currently unavailable.</p>
                        <button type="button" onClick={() => navigate(BLOG_INDEX_PATH)}>
                            Back to articles <ExternalLink size={16} />
                        </button>
                    </div>
                ) : isInBlog || pathname === '/' ? (
                    <>
                        <div className="blog-heading">
                            <p>{BLOG_TITLE}</p>
                            <h2>Notes on frontend systems, UX details, and shipping product work.</h2>
                            <span>{BLOG_DESCRIPTION}</span>
                        </div>

                        <div className="blog-list" role="list">
                            {posts.map((post) => (
                                <a
                                    key={post.slug}
                                    href={getBlogPostPath(post.slug)}
                                    className="blog-post"
                                    onClick={(event) => {
                                        event.preventDefault()
                                        handleArticleOpen(post.slug)
                                    }}
                                >
                                    <div className="thumb">
                                        <img src={post.coverImage} alt={post.title} />
                                    </div>
                                    <div className="content">
                                        <div className="meta">
                                            <span>{formatDate(post.publishedAt)}</span>
                                            <span>{post.readingTime}</span>
                                        </div>
                                        <h3>{post.title}</h3>
                                        <p>{post.excerpt}</p>
                                        <ul className="tag-list">
                                            {post.tags.map((tag) => (
                                                <li key={tag}>{tag}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="open-state">
                                        <span>Read article</span>
                                        <MoveRight />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="blog-empty">
                        <h2>{BLOG_TITLE}</h2>
                        <p>Select Safari from the dock to browse articles.</p>
                        <button type="button" onClick={() => navigate(BLOG_INDEX_PATH)}>
                            Open articles <ExternalLink size={16} />
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

const SafariWindow = WindowWrapper(Safari, 'safari')

export default SafariWindow
