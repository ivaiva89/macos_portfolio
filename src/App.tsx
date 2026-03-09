import gsap from 'gsap'
import { Draggable } from 'gsap/all'
import { Analytics } from '@vercel/analytics/react'
import { Welcome, Navbar, Dock, Home } from '#components'
import { Terminal, Safari, Resume, Finder, Text, Image, Contact } from '#windows'

gsap.registerPlugin(Draggable)

const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />

            <Terminal />
            <Safari />
            <Resume />
            <Finder />
            <Text />
            <Image />
            <Contact />
            <Home />
            <Analytics />
        </main>
    )
}
export default App
