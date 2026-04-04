import gsap from 'gsap'
import { Draggable } from 'gsap/all'
import { Analytics } from '@vercel/analytics/react'
import { Welcome, Navbar, Dock, Home, AppEffects, ResumePrintPage } from '#components'
import { Terminal, Safari, Resume, Finder, Text, Image, Contact, Photos } from '#windows'
import { useRouterStore } from '#store'
import { isResumePrintPath } from '#lib/routes'

gsap.registerPlugin(Draggable)

const App = () => {
    const { pathname } = useRouterStore()

    if (isResumePrintPath(pathname)) {
        return (
            <>
                <AppEffects />
                <ResumePrintPage />
                <Analytics />
            </>
        )
    }

    return (
        <main>
            <AppEffects />
            <Navbar />
            <Welcome />
            <Dock />

            <Terminal />
            <Safari />
            <Resume />
            <Finder />
            <Text />
            <Image />
            <Photos />
            <Contact />
            <Home />
            <Analytics />
        </main>
    )
}
export default App
