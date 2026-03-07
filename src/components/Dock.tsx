import { useRef } from 'react'
import { Tooltip } from 'react-tooltip'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { dockApps } from '#constants'

const Dock = () => {
    const dockRef = useRef<HTMLDivElement | null>(null)
    const activeTweensRef = useRef<gsap.core.Tween[]>([])

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

        const trackTween = (tween: gsap.core.Tween) => {
            activeTweensRef.current.push(tween)
            tween.eventCallback('onComplete', () => {
                activeTweensRef.current = activeTweensRef.current.filter((t) => t !== tween)
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
                trackTween(tween)
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
                trackTween(tween)
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
            activeTweensRef.current.forEach((tween) => tween.kill())
            activeTweensRef.current = []
        }
    }, [])

    const toggleApp = (app: { id: string; canOpen: boolean }) => {
        //TODO Implement app toggling logic
    }
    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div key={id} className="relative flex justify-center">
                        <button
                            type="button"
                            className="dock-icon"
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, canOpen })}
                        >
                            <img src={`/images/${icon}`} alt={name} loading="lazy" className={canOpen ? '' : 'opacity-60'} />
                        </button>
                    </div>
                ))}
                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    )
}
export default Dock
