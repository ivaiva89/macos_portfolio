import { useRef } from 'react'
import { Tooltip } from 'react-tooltip'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { dockApps, type WindowKey } from '#constants'
import { useWindowStore } from '#store'

type DockApp = { id: WindowKey; name: string; icon: string; canOpen: true } | { id: string; name: string; icon: string; canOpen: false }

const Dock = () => {
    const { windows, openWindow, closeWindow } = useWindowStore()
    const dockRef = useRef<HTMLDivElement | null>(null)
    const activeTweensRef = useRef<Map<Element, gsap.core.Tween>>(new Map())

    useGSAP(() => {
        const dock = dockRef.current
        if (!dock) return () => {}

        const icons = dock.querySelectorAll('.dock-icon')

        let cachedDockLeft = 0
        const cachedIconCenters: number[] = []

        const computeIconCenters = () => {
            const { left } = dock.getBoundingClientRect()
            cachedDockLeft = left
            cachedIconCenters.length = 0
            icons.forEach((icon) => {
                const { left: iconLeft, width } = icon.getBoundingClientRect()
                cachedIconCenters.push(iconLeft - left + width / 2)
            })
        }

        const trackTween = (target: Element, tween: gsap.core.Tween) => {
            activeTweensRef.current.set(target, tween)
            tween.eventCallback('onComplete', () => {
                if (activeTweensRef.current.get(target) === tween) {
                    activeTweensRef.current.delete(target)
                }
            })
        }

        const animateIcons = (mouseX: number) => {
            icons.forEach((icon, index) => {
                const center = cachedIconCenters[index]
                const distance = Math.abs(mouseX - center)
                const intensity = Math.exp(-(distance ** 2.5) / 20000)

                gsap.killTweensOf(icon)
                const tween = gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: 'power1.out',
                })
                trackTween(icon, tween)
            })
        }

        const handleMouseMove = (e: MouseEvent) => {
            animateIcons(e.clientX - cachedDockLeft)
        }

        const resetIcons = () => {
            icons.forEach((icon) => {
                gsap.killTweensOf(icon)
                const tween = gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power1.out',
                })
                trackTween(icon, tween)
            })
        }

        computeIconCenters()
        dock.addEventListener('mousemove', handleMouseMove)
        dock.addEventListener('mouseleave', resetIcons)
        window.addEventListener('resize', computeIconCenters)

        return () => {
            dock.removeEventListener('mousemove', handleMouseMove)
            dock.removeEventListener('mouseleave', resetIcons)
            window.removeEventListener('resize', computeIconCenters)
            activeTweensRef.current.forEach((tween) => {
                tween.kill()
            })
            activeTweensRef.current.clear()
        }
    }, [])

    const toggleApp = (app: DockApp) => {
        if (!app.canOpen) return

        const windowKey = app.id as WindowKey
        const window = windows[windowKey]

        if (!window) {
            console.error(`Window not found for app ${app.id}`)
            return
        }

        if (window.isOpen) {
            closeWindow(windowKey)
        } else {
            openWindow(windowKey)
        }
    }
    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {(dockApps as DockApp[]).map((app) => (
                    <div key={app.id} className="relative flex justify-center">
                        <button
                            type="button"
                            className="dock-icon"
                            aria-label={app.name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={app.name}
                            data-tooltip-delay-show={150}
                            disabled={!app.canOpen}
                            onClick={() => toggleApp(app)}
                        >
                            <img src={`/images/${app.icon}`} alt={app.name} loading="lazy" className={app.canOpen ? '' : 'opacity-60'} />
                        </button>
                    </div>
                ))}
                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    )
}
export default Dock
