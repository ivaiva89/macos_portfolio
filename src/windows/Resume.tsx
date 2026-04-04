import { Download } from 'lucide-react'

import WindowWrapper from '#hoc/WindowWrapper'
import { ResumeDocument, WindowControls } from '#components'
import { profile } from '#constants/profile'

const Resume = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="resume" />
                <h2>{profile.resume.downloadName}</h2>

                <a href={profile.resume.pdfPath} download={profile.resume.downloadName} className="cursor-pointer" title="Download Resume">
                    <Download className="icon" />
                </a>
            </div>
            <div className="resume-scroll">
                <ResumeDocument />
            </div>
        </>
    )
}

const ResumeWindow = WindowWrapper(Resume, 'resume')

export default ResumeWindow
