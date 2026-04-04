import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '#constants'
import type { FileItem } from '#constants/location'

export type WindowData = FileItem

export interface WindowState {
    title: string
    isOpen: boolean
    zIndex: number
    data: WindowData | null
}

export type WindowKey = keyof typeof WINDOW_CONFIG

interface WindowStoreState {
    windows: Record<WindowKey, WindowState>
    nextZindex: number
}

interface WindowStoreActions {
    openWindow: (windowKey: WindowKey, data?: WindowData) => void
    closeWindow: (windowKey: WindowKey) => void
    focusWindow: (windowKey: WindowKey) => void
}

type WindowStore = WindowStoreState & WindowStoreActions

const useWindowStore = create<WindowStore>()(
    immer((set) => ({
        windows: WINDOW_CONFIG as Record<WindowKey, WindowState>,
        nextZindex: INITIAL_Z_INDEX + 1,

        openWindow: (windowKey, data) =>
            set((state) => {
                const win = state.windows[windowKey]
                if (!win) return
                win.isOpen = true
                win.zIndex = state.nextZindex
                if (data !== undefined) {
                    win.data = data
                }
                state.nextZindex++
            }),
        closeWindow: (windowKey) =>
            set((state) => {
                const win = state.windows[windowKey]
                if (!win) return
                win.isOpen = false
                win.zIndex = INITIAL_Z_INDEX
                win.data = null
            }),
        focusWindow: (windowKey) =>
            set((state) => {
                const win = state.windows[windowKey]
                win.zIndex = state.nextZindex++
            }),
    })),
)

export default useWindowStore
