import { useSyncExternalStore } from 'react'

export const MOBILE_QUERY = '(max-width: 767px)'

const subscribe = (onChange: () => void) => {
    const mql = window.matchMedia(MOBILE_QUERY)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
}

const getSnapshot = () => window.matchMedia(MOBILE_QUERY).matches

const getServerSnapshot = () => false

export const useIsMobile = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
