import WindowControls from '#components/WindowControls'
import { Search } from 'lucide-react'
import WindowWrapper from '#hoc/WindowWrapper'
import { type LocationItem, type LocationRoot, locations } from '#constants/location'
import useLocationStore from '#store/location'
import clsx from 'clsx'
import useWindowStore from '#store/window'

const Finder = () => {
    const { openWindow } = useWindowStore()
    const { activeLocation, setActiveLocation } = useLocationStore()

    if (!activeLocation) return null

    const openItem = (item: LocationItem) => {
        if (item.kind === 'file') {
            if (item.fileType === 'pdf') return openWindow('resume')
            if (['fig', 'url'].includes(item.fileType) && item.href) return window.open(item.href, '_blank')
        }

        if (item.kind === 'folder') return setActiveLocation(item as LocationRoot)
    }

    const renderList = (name: string, items: LocationItem[]) => (
        <div>
            <h3>{name}</h3>
            <ul>
                {items.map((item) => (
                    <li key={item.id} className={clsx(item.id === activeLocation.id ? 'active' : 'not-active')} onClick={() => setActiveLocation(item as LocationRoot)}>
                        <img src={item.icon} className="w-4" alt={item.name} />
                        <p className="text-sm font-medium truncate">{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )

    return (
        <>
            <div id="window-header">
                <WindowControls target="finder" />
                <Search className="icon" />
            </div>

            <div className="bg-white flex h-full">
                <div className="sidebar">
                    {renderList('Favorites', Object.values(locations))}
                    {renderList('My Projects', locations.work.children)}
                </div>

                <ul className="content">
                    {activeLocation.children.map((item: LocationItem) => (
                        <li key={item.id} className={item.position} onClick={() => openItem(item)}>
                            <img src={item.icon} alt={item.name} />
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

const FinderWindow = WindowWrapper(Finder, 'finder')

export default FinderWindow
