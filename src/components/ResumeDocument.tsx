import type { CSSProperties, ReactNode } from 'react'
import { groupedHighlights, profile, skillGroupLine } from '#constants/profile'

const pageClassName =
    'resume-print-sheet resume-print-sheet-last mx-auto flex w-full max-w-[210mm] flex-col gap-[8px] bg-white px-[46px] py-[40px] font-source-sans text-[11.5px] leading-[1.37] text-[#1a1a1a] shadow-[0_10px_30px_rgba(0,0,0,0.10)] max-md:px-[20px] print:max-w-none print:shadow-none'

const sectionClassName = 'flex flex-col gap-[4px]'
const sectionHeadingClassName = 'font-source-serif text-[11.5px] leading-[1.3] font-bold uppercase tracking-[0.1em] text-[#1f3a5f]'
const entryHeaderClassName = 'flex flex-wrap items-baseline justify-between gap-x-3'
const entryTitleClassName = 'font-source-serif text-[13.5px] leading-[1.3] font-bold text-[#111111]'
const entryDetailClassName = 'font-source-sans font-normal text-[#4a4a4a]'
const metaTextClassName = 'shrink-0 whitespace-nowrap text-[11px] tabular-nums text-[#4a4a4a]'
const mutedTextClassName = 'text-[#4a4a4a]'
const stackTextClassName = 'text-[10.8px] text-[#5c5c5c]'

const SectionHeading = ({ id, children }: { id: string; children: ReactNode }) => (
    <div className="flex items-center gap-[10px]">
        <h2 id={id} className={sectionHeadingClassName}>
            {children}
        </h2>
        <span className="h-px flex-1 bg-[#bdbdbd]" aria-hidden="true" />
    </div>
)

const ExperienceEntry = ({ entry }: { entry: (typeof profile.experience)[number] }) => (
    <article className="resume-print-avoid flex flex-col gap-[2px]">
        <div className={entryHeaderClassName}>
            <h3 className={entryTitleClassName}>
                {entry.role} <span className={entryDetailClassName}>· {entry.company}</span>
            </h3>
            <span className={metaTextClassName}>{entry.period}</span>
        </div>
        <p className={`${mutedTextClassName} italic`}>{entry.summary}</p>

        {groupedHighlights(entry.highlights).map((section) => (
            <div key={section.title ?? 'ungrouped'} className="resume-print-avoid">
                {section.title ? <p className="mb-[2px] mt-[3px] text-[10px] font-bold uppercase tracking-[0.07em] text-[#5c5c5c]">{section.title}</p> : null}
                <ul className="flex list-disc flex-col gap-[1px] pl-[14px] marker:text-[#6b6b6b]">
                    {section.items.map((highlight) => (
                        <li key={highlight.text}>{highlight.text}</li>
                    ))}
                </ul>
            </div>
        ))}

        <p className={stackTextClassName}>{entry.stack.join(' · ')}</p>
    </article>
)

/**
 * Single flowing document. Page breaks are left to the print engine rather than
 * hardcoded, so the resume stays one page while it fits and paginates cleanly if
 * it ever grows. `resume-print-avoid` keeps individual entries from splitting.
 */
const ResumeDocument = ({ printMode = false }: { printMode?: boolean }) => {
    const containerClassName = printMode ? 'print:block' : 'flex flex-col gap-4'
    const pageStyle = printMode ? ({ width: '210mm', minHeight: '297mm' } satisfies CSSProperties) : undefined

    return (
        <div className={containerClassName}>
            <section className={pageClassName} style={pageStyle} aria-label="Resume">
                <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                    <div className="flex flex-col gap-[3px]">
                        <h1 className="font-source-serif text-[30px] leading-[1.05] font-bold tracking-[-0.3px] text-[#111111]">{profile.fullName}</h1>
                        <p className={`${mutedTextClassName} text-[13.5px] leading-[1.3]`}>
                            {profile.role} · {profile.location}
                        </p>
                    </div>
                    {/* An address, not a nav: the global `nav` base style would add padding, a background and select-none. */}
                    <address
                        className={`${mutedTextClassName} grid w-[340px] max-w-full grid-cols-2 gap-x-4 gap-y-[2px] text-right text-[11px] leading-[1.35] not-italic max-md:text-left`}
                        aria-label="Contact links"
                    >
                        <span>ivakobalava.dev</span>
                        <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline hover:underline">
                            linkedin.com/in/iveri-kobalava
                        </a>
                        <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline hover:underline">
                            github.com/ivaiva89
                        </a>
                        <span>{profile.contact.email}</span>
                    </address>
                </header>

                <div className="h-[2px] bg-[#1f3a5f]" aria-hidden="true" />

                <section aria-labelledby="resume-summary" className={sectionClassName}>
                    <SectionHeading id="resume-summary">Summary</SectionHeading>
                    <p className="text-pretty">{profile.summary}</p>
                </section>

                <section aria-labelledby="resume-skills" className={sectionClassName}>
                    <SectionHeading id="resume-skills">Skills</SectionHeading>
                    <div className="flex flex-col gap-[1px]">
                        {profile.skills.map((group) => (
                            <p key={group.category}>
                                <strong className="font-semibold">{group.category}:</strong> <span className={mutedTextClassName}>{skillGroupLine(group)}</span>
                            </p>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="resume-experience" className={sectionClassName}>
                    <SectionHeading id="resume-experience">Experience</SectionHeading>
                    <div className="flex flex-col gap-[9px]">
                        {profile.experience.map((entry) => (
                            <ExperienceEntry key={entry.company} entry={entry} />
                        ))}
                    </div>
                </section>

                <section aria-labelledby="resume-projects" className={`resume-print-avoid ${sectionClassName}`}>
                    <SectionHeading id="resume-projects">Projects</SectionHeading>
                    <div className="flex flex-col gap-[8px]">
                        {profile.projects.map((project) => (
                            <article key={project.name} className="flex flex-col gap-[1px]">
                                <div className={entryHeaderClassName}>
                                    <h3 className={entryTitleClassName}>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline">
                                            {project.name}
                                        </a>{' '}
                                        <span className={`${entryDetailClassName} text-[11.5px]`}>· {project.link.replace(/^https?:\/\//, '')}</span>
                                    </h3>
                                    <span className={metaTextClassName}>
                                        {project.period} · {project.role}
                                    </span>
                                </div>
                                <p>{project.summary}</p>
                                <p className={stackTextClassName}>{project.stack.join(' · ')}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="resume-education" className={`resume-print-avoid ${sectionClassName}`}>
                    <SectionHeading id="resume-education">Education</SectionHeading>
                    <p>
                        <strong className="font-semibold">{profile.education.institution}</strong> <span className={mutedTextClassName}>· {profile.education.degree}</span>
                    </p>
                </section>
            </section>
        </div>
    )
}

export default ResumeDocument
