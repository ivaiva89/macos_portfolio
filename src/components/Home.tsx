import { locations, type FolderItem, type LocationItem } from '#constants/location.ts'
import clsx from 'clsx'
import { useGSAP } from '@gsap/react'
import { Draggable } from 'gsap/all'
import { useLocationStore, useWindowStore } from '#store'

const projects: FolderItem[] = locations.work.children.filter((item: LocationItem): item is FolderItem => item.kind === 'folder')

const Home = () => {
    const { setActiveLocation } = useLocationStore()
    const { openWindow } = useWindowStore()

    const handleOpenProjectFinder = (project: FolderItem) => {
        setActiveLocation(project)
        openWindow('finder')
    }

    useGSAP(() => {
        Draggable.create('.folder')
    })

    return (
        <section id="home">
            <ul>
                {projects.map((project) => (
                    <li key={project.id} className={clsx('group folder', project.windowPosition)} onClick={() => handleOpenProjectFinder(project)}>
                        <img src="/images/folder.png" alt={project.name} />
                        <p>{project.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}
export default Home
