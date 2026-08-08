import type { CSSProperties } from 'react'
import { groupedHighlights, profile, skillGroupLine } from '#constants/profile'

const pageClassName =
    'resume-print-sheet resume-print-sheet-last mx-auto w-full max-w-[210mm] bg-white px-[14mm] pt-[10mm] pb-[8mm] text-[10pt] leading-[1.4] text-stone-900 shadow-[0_10px_30px_rgba(0,0,0,0.10)] print:max-w-none print:shadow-none'

const dividerClassName = 'my-[3px] border-0 border-t border-stone-300'
const sectionHeadingClassName = 'mb-[4px] text-[7.5pt] font-bold uppercase tracking-[0.09em] text-stone-500'
const bodyTextClassName = 'text-[8.6pt] leading-[1.42] text-stone-900'
const mutedTextClassName = 'text-[8.5pt] leading-[1.4] text-stone-600'
const stackTextClassName = 'mt-[3px] text-[8pt] leading-[1.35] text-stone-500'

const ExperienceEntry = ({ entry }: { entry: (typeof profile.experience)[number] }) => (
    <article className="resume-print-avoid mb-[9px] last:mb-0">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-[10pt] font-bold text-stone-900">
                {entry.role} · {entry.company}
            </h3>
            <span className="shrink-0 whitespace-nowrap text-[8.2pt] text-stone-500">{entry.period}</span>
        </div>
        <p className={`${mutedTextClassName} mt-[1px] mb-[4px]`}>{entry.summary}</p>

        {groupedHighlights(entry.highlights).map((section) => (
            <div key={section.title ?? 'ungrouped'} className="resume-print-avoid">
                {section.title ? <p className="mb-[2px] mt-[5px] text-[7.4pt] font-bold uppercase tracking-[0.07em] text-stone-500">{section.title}</p> : null}
                <ul className="list-disc pl-[14px]">
                    {section.items.map((highlight) => (
                        <li key={highlight.text} className={bodyTextClassName}>
                            {highlight.text}
                        </li>
                    ))}
                </ul>
            </div>
        ))}

        <p className={stackTextClassName}>
            <strong className="font-semibold text-stone-600">Stack:</strong> {entry.stack.join(' · ')}
        </p>
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
                <header className="mb-[5px]">
                    <h1 className="text-[22pt] font-bold leading-[1.05] tracking-[-0.5px] text-stone-950">{profile.fullName}</h1>
                    <p className="mt-[3px] text-[10.5pt] font-medium text-stone-600">
                        {profile.role} · {profile.location}
                    </p>
                    <nav className="mt-[6px] flex flex-wrap gap-x-[18px] gap-y-[4px] text-[8.5pt] text-stone-600" aria-label="Contact links">
                        <span>ivakobalava.dev</span>
                        <span>
                            <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline hover:underline">
                                linkedin.com/in/iveri-kobalava
                            </a>
                        </span>
                        <span>
                            <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline hover:underline">
                                github.com/ivaiva89
                            </a>
                        </span>
                        <span>{profile.contact.email}</span>
                    </nav>
                </header>

                <hr className={dividerClassName} />

                <section aria-labelledby="resume-summary" className="mb-[5px]">
                    <h2 id="resume-summary" className={sectionHeadingClassName}>
                        Summary
                    </h2>
                    <p className="text-[8.7pt] leading-[1.48] text-stone-900">{profile.summary}</p>
                </section>

                <hr className={dividerClassName} />

                <section aria-labelledby="resume-skills" className="mb-[5px]">
                    <h2 id="resume-skills" className={sectionHeadingClassName}>
                        Skills
                    </h2>
                    <div className="flex flex-col gap-[3px]">
                        {profile.skills.map((group) => (
                            <p key={group.category} className={bodyTextClassName}>
                                <strong className="font-semibold text-stone-900">{group.category}:</strong> <span className="text-stone-600">{skillGroupLine(group)}</span>
                            </p>
                        ))}
                    </div>
                </section>

                <hr className={dividerClassName} />

                <section aria-labelledby="resume-experience" className="mb-[5px]">
                    <h2 id="resume-experience" className={sectionHeadingClassName}>
                        Experience
                    </h2>
                    {profile.experience.map((entry) => (
                        <ExperienceEntry key={entry.company} entry={entry} />
                    ))}
                </section>

                <hr className={dividerClassName} />

                <section aria-labelledby="resume-projects" className="resume-print-avoid mb-[5px]">
                    <h2 id="resume-projects" className={sectionHeadingClassName}>
                        Projects
                    </h2>
                    {profile.projects.map((project, index) => (
                        <article key={project.name} className={index < profile.projects.length - 1 ? 'mb-[7px]' : ''}>
                            <div className="flex items-baseline justify-between gap-2">
                                <h3 className="text-[10pt] font-bold text-stone-900">
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline">
                                        {project.name}
                                    </a>{' '}
                                    · <span className="text-[9pt] font-normal">{project.link.replace(/^https?:\/\//, '')}</span>
                                </h3>
                                <span className="shrink-0 whitespace-nowrap text-[8.2pt] text-stone-500">
                                    {project.period} · {project.role}
                                </span>
                            </div>
                            <p className="mb-[3px] mt-[1px] text-[8.6pt] leading-[1.42] text-stone-900">{project.summary}</p>
                            <p className="text-[8pt] text-stone-500">
                                <strong className="font-semibold text-stone-600">Stack:</strong> {project.stack.join(' · ')}
                            </p>
                        </article>
                    ))}
                </section>

                <hr className={dividerClassName} />

                <section aria-labelledby="resume-education" className="resume-print-avoid">
                    <h2 id="resume-education" className={sectionHeadingClassName}>
                        Education
                    </h2>
                    <p className="text-[9.4pt] text-stone-900">
                        <strong className="font-bold">{profile.education.institution}</strong> <span className="text-stone-600">· {profile.education.degree}</span>
                    </p>
                </section>
            </section>
        </div>
    )
}

export default ResumeDocument
