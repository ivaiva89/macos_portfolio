import { Search } from 'lucide-react'
import clsx from 'clsx'

import WindowWrapper from '#hoc/WindowWrapper'
import { WindowControls } from '#components'
import { type FolderItem, type LocationItem, locations } from '#constants/location'
import { useLocationStore, useWindowStore } from '#store'

const Finder = () => {
    const { openWindow } = useWindowStore()
    const { activeLocation, setActiveLocation } = useLocationStore()

    if (!activeLocation) return null

    const isFolder = (item: LocationItem): item is FolderItem => item.kind === 'folder'

    const openItem = (item: LocationItem) => {
        if (item.kind === 'folder') return setActiveLocation(item)
        if (item.fileType === 'txt') return openWindow('tstfile', item)
        if (item.fileType === 'pdf') return openWindow('resume')
        if (item.fileType === 'img') return openWindow('imgfile', item)
        if (['fig', 'url'].includes(item.fileType) && item.href) return window.open(item.href, '_blank', 'noopener,noreferrer')
    }

    const renderList = (name: string, items: FolderItem[]) => (
        <div>
            <h3>{name}</h3>
            <ul>
                {items.map((item) => (
                    <li key={item.id} className={clsx(item.id === activeLocation.id ? 'active' : 'not-active')} onClick={() => setActiveLocation(item)}>
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
                    {renderList('My Projects', locations.work.children.filter(isFolder))}
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
