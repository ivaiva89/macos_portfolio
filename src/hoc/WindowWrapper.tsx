import { type ComponentType, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'

import { useWindowStore } from '#store'
import type { WindowKey } from '#constants'
import { useIsMobile } from '#lib/useIsMobile'
import { prefersReducedMotion } from '#lib/motion'

gsap.registerPlugin(useGSAP, Draggable)

const WindowWrapper = <P extends object>(Component: ComponentType<P>, windowKey: WindowKey) => {
    const Wrapped = (props: P) => {
        const { windows, focusWindow } = useWindowStore()
        const { isOpen, zIndex } = windows[windowKey]
        const isMobile = useIsMobile()

        const ref = useRef<HTMLElement>(null)

        useGSAP(() => {
            const el = ref.current
            if (!el || !isOpen) return () => {}

            el.style.display = isMobile ? 'flex' : 'block'
            const reduced = prefersReducedMotion()

            if (isMobile) {
                // iOS-style sheet: slide up from the bottom, no dragging.
                // x/scale reset also clears desktop transforms (e.g. -translate-x-1/2) that would shift the sheet off-screen.
                gsap.fromTo(
                    el,
                    { x: 0, scale: 1, opacity: 1, y: reduced ? 0 : '100%' },
                    { x: 0, scale: 1, opacity: 1, y: 0, duration: reduced ? 0 : 0.35, ease: 'power3.out' },
                )
                return () => {}
            }

            const dragHandle = el.querySelector<HTMLElement>('#window-header') ?? el

            gsap.fromTo(el, { scale: 0.8, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: reduced ? 0 : 0.4, ease: 'power3.out' })

            const [instance] = Draggable.create(el, {
                trigger: dragHandle,
                onPress: () => focusWindow(windowKey),
                bounds: 'body',
            })

            return () => {
                instance.kill()
            }
        }, [isOpen, isMobile])

        useLayoutEffect(() => {
            const el = ref.current
            if (!el) return
            el.style.display = isOpen ? (isMobile ? 'flex' : 'block') : 'none'
        }, [isOpen, isMobile])

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex }}
                className={clsx('absolute', isMobile && 'mobile-app')}
                onMouseDown={() => focusWindow(windowKey)}
            >
                <Component {...props} />
            </section>
        )
    }

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`

    return Wrapped
}
export default WindowWrapper
