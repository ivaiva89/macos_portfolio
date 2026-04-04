import gsap from 'gsap'
import { Draggable } from 'gsap/all'
import { Analytics } from '@vercel/analytics/react'
import { Welcome, Navbar, Dock, Home, AppEffects } from '#components'
import { Terminal, Safari, Resume, Finder, Text, Image, Contact, Photos } from '#windows'

gsap.registerPlugin(Draggable)

const App = () => {
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
