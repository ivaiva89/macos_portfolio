import gsap from 'gsap'
import { Draggable } from 'gsap/all'

import { Welcome, Navbar, Dock } from '#components'
import Terminal from '#windows/terminal'

gsap.registerPlugin(Draggable)

const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />

            <Terminal />
        </main>
    )
}
export default App
