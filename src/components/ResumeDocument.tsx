import type { CSSProperties } from 'react'
import { profile } from '#constants/profile'

const summaryText =
    'Frontend-led fullstack engineer with 5 years of experience and a co-founder credit. At GSG, top contributor by commit volume (~30%) on a 20-engineer team at a live EU logistics platform — 490+ commits, 200+ PRs — while also delivering backend services and CI/CD pipelines. At Skiper, sole frontend owner: migrated CRA to Vite (build time 52s → 3s), refactored a 280-file flat codebase into a 5-layer Feature-Sliced Design architecture, and built a 3-language i18n system. Stack spans React, TypeScript, TanStack Query, Java/Spring Boot, Node.js, and AWS.'

const skillRows = [
    {
        category: 'Frontend',
        text: 'React, TypeScript, Next.js, Redux Toolkit, TanStack Query, Material UI, shadcn/ui, Vite, Feature-Sliced Design (FSD)',
    },
    {
        category: 'Backend',
        text: 'Java 17/21, Spring Boot, Spring Security, JPA/Hibernate, PostgreSQL, Node.js, Prisma',
    },
    {
        category: 'Infra & DevOps',
        text: 'Kubernetes, Docker, Helm, AWS (Secrets Manager, STS, OIDC), Jenkins, SonarQube, JaCoCo, Trivy, Micrometer, Prometheus',
    },
    {
        category: 'Languages',
        text: 'Georgian (native) · English (professional) · Russian (professional)',
    },
]

const gsgSections = [
    {
        title: 'Frontend',
        items: [
            'Top frontend contributor: 490+ commits, 160+ tasks delivered, 200+ pull requests across 4 years.',
            'Built multi-view planning and scheduling interfaces (daily/weekly/historical) with dynamic filtering, forecasting, and scenario comparison — core operational tools across the logistics platform.',
            'Established frontend data-layer patterns using Redux Toolkit and TanStack Query, standardizing data fetching, cache invalidation, and domain state across a 25+ engineer codebase.',
            'Built and maintained a shared component library (forms, tables, dialogs, filters) adopted across the team to eliminate duplicated UI code and enforce consistent patterns.',
            'Implemented frontend RBAC with permission-driven rendering, gating UI elements and routes based on user roles.',
            'Led CRA → Vite and Moment.js → Day.js migrations, modernizing the build toolchain and reducing bundle size.',
            'Introduced Vitest-based unit and integration testing; led large-scale legacy code removal reducing codebase surface and maintenance overhead.',
        ],
    },
    {
        title: 'Backend',
        items: [
            'Designed and implemented REST APIs and domain services in Spring Boot, covering planning, scheduling, and data-processing workflows across distributed microservices.',
            'Built validation and rule engines enforcing data integrity and real-time operational constraints across distributed services.',
            'Bootstrapped a Spring Boot microservice from scratch: layered domain architecture, external API integrations, and secrets management via AWS Secrets Manager.',
            'Refactored batch-scheduled job workflows into on-demand REST APIs, eliminating timing dependencies and giving operators direct execution control.',
            'Implemented OIDC-based service-to-service authentication and integrated AWS Secrets Manager and STS for credential-free service configuration.',
            'Contributed 100+ commits across backend services, delivering 30+ production features.',
        ],
    },
    {
        title: 'DevOps & Infrastructure',
        items: [
            'Built and maintained CI/CD pipelines in Jenkins with integrated code quality gates (SonarQube) and container vulnerability scanning (Trivy).',
            'Managed Kubernetes deployments across dev and production clusters using Helm, including CronJob scheduling and per-environment service configuration.',
            'Hardened containerized services with non-root Docker images and Kubernetes security contexts.',
            'Instrumented services with Micrometer/Prometheus metrics and structured logging, enabling operational visibility across distributed deployments.',
        ],
    },
]

const skiperItems = [
    'Led frontend development from initial commit to production: 414 commits, ~108,000 net lines across 1,172 files as the sole frontend owner.',
    'Owned end-to-end delivery across 10+ product domains in a React + TypeScript + TanStack Query SPA, from initial architecture through iterative feature releases.',
    'Migrated from Create React App to Vite, reducing production build times from 52 seconds to 3 seconds (94% faster).',
    'Refactored a 280-file flat codebase to a 5-layer Feature-Sliced Design architecture with 16 feature slices and ESLint-enforced import boundaries; codebase scaled to 559 files with zero cross-layer violations.',
    'Designed and maintained a full i18n system across 3 languages, covering every product surface from authentication to core workflows.',
    'Introduced regression and integration test suites covering multi-tenant context, API payload contracts, and authentication flows.',
]

const pageClassName = 'resume-print-sheet mx-auto w-full max-w-[210mm] bg-white px-[14mm] py-[12mm] text-[10pt] leading-[1.4] text-stone-900 shadow-[0_10px_30px_rgba(0,0,0,0.10)] print:max-w-none print:shadow-none'

const dividerClassName = 'my-[7px] border-0 border-t border-stone-300'
const sectionHeadingClassName = 'mb-[6px] text-[7.5pt] font-bold uppercase tracking-[0.09em] text-stone-500'
const bodyTextClassName = 'text-[8.6pt] leading-[1.42] text-stone-900'
const mutedTextClassName = 'text-[8.5pt] leading-[1.4] text-stone-600'
const stackTextClassName = 'mt-[4px] text-[8pt] leading-[1.35] text-stone-500'

const ResumeDocument = ({ printMode = false }: { printMode?: boolean }) => {
    const containerClassName = printMode ? 'flex flex-col gap-6 print:block print:gap-0' : 'flex flex-col gap-4'
    const pageStyle = printMode ? ({ width: '210mm', height: '297mm' } satisfies CSSProperties) : undefined
    const firstPageStyle = printMode ? ({ ...pageStyle, breakAfter: 'page', pageBreakAfter: 'always' } satisfies CSSProperties) : undefined
    const lastPageStyle = printMode ? ({ ...pageStyle, breakAfter: 'auto', pageBreakAfter: 'auto' } satisfies CSSProperties) : undefined

    return (
        <div className={containerClassName}>
            <section className={pageClassName} style={firstPageStyle} aria-label="Resume page 1">
                <header className="mb-[11px]">
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
                            <a href={profile.contact.devapply} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline hover:underline">
                                devapply.app
                            </a>
                        </span>
                    </nav>
                </header>

                <hr className={dividerClassName} />

                <section aria-labelledby="resume-summary" className="mb-[8px]">
                    <h2 id="resume-summary" className={sectionHeadingClassName}>
                        Summary
                    </h2>
                    <p className="text-[8.7pt] leading-[1.48] text-stone-900">{summaryText}</p>
                </section>

                <hr className={dividerClassName} />

                <section aria-labelledby="resume-skills" className="mb-[8px]">
                    <h2 id="resume-skills" className={sectionHeadingClassName}>
                        Skills
                    </h2>
                    <div className="flex flex-col gap-[3px]">
                        {skillRows.map((row) => (
                            <p key={row.category} className={bodyTextClassName}>
                                <strong className="font-semibold text-stone-900">{row.category}:</strong> <span className="text-stone-600">{row.text}</span>
                            </p>
                        ))}
                    </div>
                </section>

                <hr className={dividerClassName} />

                <section aria-labelledby="resume-experience" className="mb-0">
                    <h2 id="resume-experience" className={sectionHeadingClassName}>
                        Experience
                    </h2>

                    <article className="resume-print-avoid mb-[9px]">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h3 className="text-[10pt] font-bold text-stone-900">
                                {profile.experience[0].role} — {profile.experience[0].company}
                            </h3>
                            <span className="shrink-0 whitespace-nowrap text-[8.2pt] text-stone-500">{profile.experience[0].period}</span>
                        </div>
                        <p className={`${mutedTextClassName} mt-[1px] mb-[4px]`}>{'EU e-commerce logistics platform for parcel routing optimization and truck line scheduling across Europe. Top contributor by commit volume (~30%) on a 20+ engineer team, working across frontend, backend microservices, and DevOps.'}</p>

                        {gsgSections.map((section) => (
                            <div key={section.title} className="resume-print-avoid">
                                <p className="mb-[2px] mt-[5px] text-[7.4pt] font-bold uppercase tracking-[0.07em] text-stone-500">{section.title}</p>
                                <ul className="list-disc pl-[14px]">
                                    {section.items.map((item) => (
                                        <li key={item} className={bodyTextClassName}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <p className={stackTextClassName}>
                            <strong className="font-semibold text-stone-600">Stack:</strong> React · TypeScript · Vite · Redux Toolkit · TanStack Query · MUI · Vitest · Java 17/21 · Spring Boot · JPA/Hibernate · PostgreSQL · Kubernetes · Docker · Helm · AWS · Jenkins
                        </p>
                    </article>
                </section>
            </section>

            <section className={`${pageClassName} resume-print-sheet-last`} style={lastPageStyle} aria-label="Resume page 2">
                <section aria-labelledby="resume-experience-cont" className="mb-[8px]">
                    <h2 id="resume-experience-cont" className={sectionHeadingClassName}>
                        Experience
                    </h2>

                    <article className="resume-print-avoid">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h3 className="text-[10pt] font-bold text-stone-900">
                                {profile.experience[1].role} — {profile.experience[1].company}
                            </h3>
                            <span className="shrink-0 whitespace-nowrap text-[8.2pt] text-stone-500">{profile.experience[1].period}</span>
                        </div>
                        <p className={`${mutedTextClassName} mt-[1px] mb-[4px]`}>One of three co-founders; sole owner of the entire frontend over 4+ years.</p>
                        <ul className="list-disc pl-[14px]">
                            {skiperItems.map((item) => (
                                <li key={item} className={bodyTextClassName}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className={stackTextClassName}>
                            <strong className="font-semibold text-stone-600">Stack:</strong> React · TypeScript · Vite · TanStack Query · shadcn/ui · Java Spring Boot · AWS
                        </p>
                    </article>
                </section>

                <hr className={dividerClassName} />

                <section aria-labelledby="resume-projects" className="resume-print-avoid mb-[8px]">
                    <h2 id="resume-projects" className={sectionHeadingClassName}>
                        Projects
                    </h2>
                    <article>
                        <div className="flex items-baseline justify-between gap-2">
                            <h3 className="text-[10pt] font-bold text-stone-900">
                                <a href={profile.projects[0].link} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline">
                                    {profile.projects[0].name}
                                </a>{' '}
                                · <span className="text-[9pt] font-normal">devapply.app</span>
                            </h3>
                            <span className="shrink-0 whitespace-nowrap text-[8.2pt] text-stone-500">
                                {profile.projects[0].period} · {profile.projects[0].role}
                            </span>
                        </div>
                        <p className="mb-[3px] mt-[1px] text-[8.6pt] leading-[1.42] text-stone-900">
                            Full-stack job application tracker for developers. Features a Kanban pipeline, resume version management, follow-up reminders, and career analytics.
                        </p>
                        <p className="text-[8pt] text-stone-500">
                            <strong className="font-semibold text-stone-600">Stack:</strong> Next.js · Prisma · Neon · Clerk · PostHog · Resend
                        </p>
                    </article>
                </section>

                <hr className={dividerClassName} />

                <section aria-labelledby="resume-education" className="resume-print-avoid">
                    <h2 id="resume-education" className={sectionHeadingClassName}>
                        Education
                    </h2>
                    <p className="text-[10pt] font-bold text-stone-900">{profile.education.institution}</p>
                    <p className="mt-[2px] text-[8.8pt] text-stone-600">{profile.education.degree}</p>
                </section>
            </section>
        </div>
    )
}

export default ResumeDocument
