import gsap from 'gsap'
import { Draggable } from 'gsap/all'

import { Welcome, Navbar, Dock } from '#components'
import { Terminal, Safari, Resume, Finder } from '#windows'

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
        </main>
    )
}
export default App
