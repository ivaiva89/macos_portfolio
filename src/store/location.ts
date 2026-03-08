import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { locations, type LocationRoot } from '#constants/location'

interface LocationState {
    activeLocation: LocationRoot | null
}

interface LocationActions {
    setActiveLocation: (location: LocationRoot | null) => void
    resetActiveLocation: () => void
}

type LocationStore = LocationState & LocationActions

const DEFAULT_LOCATION = locations.work

const useLocationStore = create<LocationStore>()(
    immer((set) => ({
        activeLocation: DEFAULT_LOCATION,

        setActiveLocation: (location = null) =>
            set((state) => {
                state.activeLocation = location
            }),
        resetActiveLocation: () =>
            set((state) => {
                state.activeLocation = DEFAULT_LOCATION
            }),
    })),
)

export default useLocationStore
