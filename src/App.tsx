import gsap from 'gsap'
import { Draggable } from 'gsap/all'

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
        </main>
    )
}
export default App
