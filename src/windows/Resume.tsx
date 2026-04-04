import { Download } from 'lucide-react'

import WindowWrapper from '#hoc/WindowWrapper'
import { WindowControls } from '#components'
import { profile } from '#constants/profile'

import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

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
            <Document file={profile.resume.pdfPath} className="pdf-viewer">
                <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
            </Document>
        </>
    )
}

const ResumeWindow = WindowWrapper(Resume, 'resume')

export default ResumeWindow
