import StatusBar from './StatusBar'
import MobileHome from './MobileHome'
import { useRouterStore, useWindowStore } from '#store'
import { isBlogPath } from '#lib/routes'
import type { WindowKey } from '#constants'

/**
 * iPhone shell: status bar + home screen + home indicator.
 * Open windows render themselves full-screen (see WindowWrapper) above the home screen.
 */
const MobileShell = () => {
    const { windows, closeWindow } = useWindowStore()
    const { pathname, navigate } = useRouterStore()

    const goHome = () => {
        ;(Object.keys(windows) as WindowKey[]).forEach((key) => {
            if (windows[key].isOpen) closeWindow(key)
        })
        if (isBlogPath(pathname)) {
            navigate('/')
        }
    }

    return (
        <>
            <StatusBar />
            <MobileHome />
            <button type="button" id="home-indicator" aria-label="Go to home screen" onClick={goHome}>
                <span />
            </button>
        </>
    )
}

export default MobileShell
