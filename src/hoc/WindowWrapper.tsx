import gsap from 'gsap'
import { type ComponentType, useLayoutEffect } from 'react'
import { useRef } from 'react'
import useWindowStore from '#store/window'
import type { WindowKey } from '#constants'
import { useGSAP } from '@gsap/react'
import { Draggable } from 'gsap/all'

gsap.registerPlugin(useGSAP, Draggable)

const WindowWrapper = <P extends object>(Component: ComponentType<P>, windowKey: WindowKey) => {
    const Wrapped = (props: P) => {
        const { windows, focusWindow } = useWindowStore()
        const { isOpen, zIndex } = windows[windowKey]

        const ref = useRef<HTMLElement>(null)

        useGSAP(() => {
            const el = ref.current
            if (!el || !isOpen) return () => {}

            el.style.display = 'block'

            gsap.fromTo(el, { scale: 0.8, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })

            const [instance] = Draggable.create(el, {
                onPress: () => focusWindow(windowKey),
                bounds: 'body',
            })

            return () => {
                instance.kill()
            }
        }, [isOpen])

        useLayoutEffect(() => {
            const el = ref.current
            if (!el) return
            el.style.display = isOpen ? 'block' : 'none'
        }, [isOpen])

        return (
            <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
                <Component {...props} />
            </section>
        )
    }

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`

    return Wrapped
}
export default WindowWrapper
