import gsap from 'gsap'
import { Draggable } from 'gsap/all'
import { Analytics } from '@vercel/analytics/react'
import { Welcome, Navbar, Dock, Home, AppEffects, ResumePrintPage, MobileShell } from '#components'
import { Terminal, Safari, Resume, Finder, Text, Image, Contact, Photos } from '#windows'
import { useRouterStore } from '#store'
import { isResumePrintPath } from '#lib/routes'
import { useIsMobile } from '#lib/useIsMobile'

gsap.registerPlugin(Draggable)

const App = () => {
    const { pathname } = useRouterStore()
    const isMobile = useIsMobile()

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

            {isMobile ? (
                <MobileShell />
            ) : (
                <>
                    <Navbar />
                    <Welcome />
                    <Dock />
                    <Home />
                </>
            )}

            <Terminal />
            <Safari />
            <Resume />
            <Finder />
            <Text />
            <Image />
            <Photos />
            <Contact />
            <Analytics />
        </main>
    )
}
export default App
