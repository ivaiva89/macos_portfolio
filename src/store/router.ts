import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { normalizePath } from '#lib/routes'

interface NavigateOptions {
    replace?: boolean
}

interface RouterState {
    pathname: string
}

interface RouterActions {
    navigate: (pathname: string, options?: NavigateOptions) => void
    syncFromLocation: () => void
}

type RouterStore = RouterState & RouterActions

const getCurrentPath = () => {
    if (typeof window === 'undefined') return '/'

    return normalizePath(window.location.pathname)
}

const useRouterStore = create<RouterStore>()(
    immer((set) => ({
        pathname: getCurrentPath(),
        navigate: (pathname, options = {}) =>
            set((state) => {
                const nextPath = normalizePath(pathname)

                if (typeof window !== 'undefined' && nextPath !== state.pathname) {
                    const method = options.replace ? 'replaceState' : 'pushState'
                    window.history[method]({}, '', nextPath)
                }

                state.pathname = nextPath
            }),
        syncFromLocation: () =>
            set((state) => {
                state.pathname = getCurrentPath()
            }),
    })),
)

export default useRouterStore
