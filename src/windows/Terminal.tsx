import WindowWrapper from '#hoc/WindowWrapper'
import { techStack } from '#constants'
import { Check, Flag } from 'lucide-react'
import { WindowControls } from '#components'
import { profile } from '#constants/profile'

const Terminal = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="terminal" />
                <h2>Tech Stack</h2>
            </div>

            <div className="techstack">
                <p>
                    <span className="font-bold">{profile.displayHandle} %</span> show tech stack
                </p>

                <div className="label">
                    <p className="w-32">Category</p>
                    <p>Technologies</p>
                </div>

                <ul className="content">
                    {techStack.map(({ category, items }) => (
                        <li key={category} className="stack-row">
                            <Check className="check" size={20} />
                            <h3>{category}</h3>
                            <ul>
                                {items.map((item, i) => (
                                    <li key={item}>
                                        {item}
                                        {i < items.length - 1 ? ',' : ''}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                <div className="footnote">
                    <p>
                        <Check size={20} /> {techStack.length} of {techStack.length} stacks loaded successfully (100%)
                    </p>

                    <p>
                        <Flag size={15} fill="black" />
                        Resume-backed stack map
                    </p>
                </div>
            </div>
        </>
    )
}

const TerminalWindow = WindowWrapper(Terminal, 'terminal')

export default TerminalWindow
