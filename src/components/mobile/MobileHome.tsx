import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { mobileApps, mobileDockApps, type MobileApp, type WindowKey } from '#constants'
import { useRouterStore, useWindowStore } from '#store'
import { BLOG_INDEX_PATH } from '#lib/routes'
import { prefersReducedMotion } from '#lib/motion'

const AppIcon = ({ app, onOpen, showLabel = true }: { app: MobileApp; onOpen: (app: MobileApp) => void; showLabel?: boolean }) => (
    <button type="button" className="app-icon" aria-label={`Open ${app.name}`} onClick={() => onOpen(app)}>
        <img src={`/images/${app.icon}`} alt="" />
        {showLabel && <span>{app.name}</span>}
    </button>
)

const MobileHome = () => {
    const { openWindow } = useWindowStore()
    const { navigate } = useRouterStore()
    const gridRef = useRef<HTMLDivElement | null>(null)

    useGSAP(() => {
        if (prefersReducedMotion()) return
        gsap.fromTo(
            '#iphone-home .app-icon',
            { scale: 0.4, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.6)', stagger: 0.03 },
        )
    }, [])

    const handleOpen = (app: MobileApp) => {
        const windowKey = app.id as WindowKey
        if (windowKey === 'safari') {
            navigate(BLOG_INDEX_PATH)
        }
        openWindow(windowKey)
    }

    return (
        <section id="iphone-home" aria-label="Home screen">
            <div className="app-grid" ref={gridRef}>
                {mobileApps.map((app) => (
                    <AppIcon key={app.id} app={app} onOpen={handleOpen} />
                ))}
            </div>

            <div className="ios-dock">
                {mobileDockApps.map((app) => (
                    <AppIcon key={app.id} app={app} onOpen={handleOpen} showLabel={false} />
                ))}
            </div>
        </section>
    )
}

export default MobileHome
