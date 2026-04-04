import { useEffect } from 'react'
import { Download, Printer } from 'lucide-react'
import ResumeDocument from './ResumeDocument'
import { profile } from '#constants/profile'
import { applySeo } from '#lib/seo'
import { RESUME_PRINT_PATH } from '#lib/routes'
import { SITE_NAME } from '#lib/site'

const ResumePrintPage = () => {
    useEffect(() => {
        applySeo({
            title: `${profile.fullName} Resume | ${SITE_NAME}`,
            description: `${profile.fullName} resume optimized for print and PDF export.`,
            path: RESUME_PRINT_PATH,
            type: 'website',
        })
    }, [])

    return (
        <main className="min-h-screen bg-stone-200 print:bg-white print:min-h-0">
            <div className="mx-auto flex max-w-[230mm] flex-col gap-6 px-4 py-6 print:block print:max-w-none print:p-0">
                <header className="flex items-center justify-between rounded-2xl bg-white/90 px-5 py-3 shadow-lg backdrop-blur print:hidden">
                    <div>
                        <h1 className="text-base font-semibold text-stone-900">{profile.fullName} Resume</h1>
                        <p className="text-sm text-stone-500">Print-optimized export view</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href={profile.resume.pdfPath}
                            download={profile.resume.downloadName}
                            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:text-stone-900"
                        >
                            <Download size={16} />
                            Download PDF
                        </a>
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
                        >
                            <Printer size={16} />
                            Print / Save as PDF
                        </button>
                    </div>
                </header>

                <ResumeDocument printMode />
            </div>
        </main>
    )
}

export default ResumePrintPage
