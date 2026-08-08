/**
 * Single source of truth for resume content.
 *
 * Every fact lives here exactly once. Two surfaces consume it:
 *   - the printable resume (ResumeDocument.tsx -> public/files/resume.pdf), which renders the full form
 *   - the portfolio UI (location.ts, constants/index.ts), which renders the condensed form
 *
 * Where the two surfaces need different phrasing, the short variant sits next to the
 * full one on the same object (`summaryShort`, `highlights[].short`). Never add a fact
 * to one surface only; add it here and let both render it.
 */

/** A skill. `detail` is appended in parentheses on the resume and dropped in the portfolio UI. */
export type SkillEntry = string | { name: string; detail: string }

export const skillName = (skill: SkillEntry): string => (typeof skill === 'string' ? skill : skill.name)

export const skillLabel = (skill: SkillEntry): string => (typeof skill === 'string' ? skill : `${skill.name} (${skill.detail})`)

export interface ResumeSkillGroup {
    category: string
    items: SkillEntry[]
    /** Separator used when the group is rendered as one line on the resume. Defaults to ', '. */
    separator?: string
}

export const skillGroupLine = (group: ResumeSkillGroup): string => group.items.map(skillLabel).join(group.separator ?? ', ')

export interface ResumeHighlight {
    /** Full, resume-grade phrasing. Always rendered on the printable resume. */
    text: string
    /** Condensed phrasing for portfolio surfaces. Falls back to `text`. */
    short?: string
    /** Optional sub-heading on the resume, e.g. 'Frontend'. Ungrouped items render with no heading. */
    group?: string
    /** Surface this highlight in the portfolio UI. The resume renders every highlight regardless. */
    featured?: boolean
}

export const highlightShort = (highlight: ResumeHighlight): string => highlight.short ?? highlight.text

export const featuredHighlights = (highlights: ResumeHighlight[]): string[] => highlights.filter((highlight) => highlight.featured).map(highlightShort)

/** Groups highlights by `group`, preserving declaration order. Ungrouped items get a `null` title. */
export const groupedHighlights = (highlights: ResumeHighlight[]): { title: string | null; items: ResumeHighlight[] }[] =>
    highlights.reduce<{ title: string | null; items: ResumeHighlight[] }[]>((groups, highlight) => {
        const title = highlight.group ?? null
        const current = groups.at(-1)

        if (current && current.title === title) {
            current.items.push(highlight)

            return groups
        }

        return [...groups, { title, items: [highlight] }]
    }, [])

export interface ResumeExperience {
    company: string
    role: string
    period: string
    /** Full phrasing, rendered on the resume. */
    summary: string
    /** Condensed phrasing for the portfolio UI. Falls back to `summary`. */
    summaryShort?: string
    highlights: ResumeHighlight[]
    stack: string[]
    link?: string
    imageUrl?: string
}

export interface ResumeProject {
    name: string
    role: string
    period: string
    summary: string
    highlights?: string[]
    stack: string[]
    link: string
    imageUrl?: string
}

export interface ResumeEducation {
    institution: string
    degree: string
}

export interface ProfileLink {
    text: string
    href: string
    icon: string
    bg: string
}

export const profile = {
    fullName: 'Iveri Kobalava',
    shortName: 'Iveri',
    displayHandle: '@Iveri',
    role: 'Senior Frontend Engineer',
    location: 'Georgia (Remote)',
    headline: 'I build product systems that stay clear under scale: frontend architecture, backend services, and delivery.',
    summary:
        'Frontend-led fullstack engineer with 5 years of experience and a co-founder credit. At GSG, top contributor by commit volume (~30%) on a 20-engineer team at a live EU logistics platform (490+ commits, 200+ PRs), while also delivering backend services and CI/CD pipelines. At Skiper, sole frontend owner: migrated CRA to Vite (build time 52s → 3s), refactored a 280-file flat codebase into a 5-layer Feature-Sliced Design architecture, and built a 3-language i18n system. Maintainer of StackForm, an open-source React form library (7 packages on npm). Stack spans React, TypeScript, TanStack Query, Java/Spring Boot, Node.js, and AWS.',
    summaryShort:
        'Frontend-led fullstack engineer with 5 years of experience and a co-founder credit. At GSG, top contributor by commit volume on a live EU logistics platform while also delivering backend services and CI/CD pipelines. At Skiper, sole frontend owner, leading architecture, platform migrations, and multilingual product delivery across a growing SaaS product.',
    aboutTitle: 'Frontend-led fullstack engineer with product and platform depth',
    about: {
        intro: 'Frontend-led fullstack engineer with 5 years of experience and a co-founder credit. I build product systems that stay clear under scale.',
        currently: [
            'Georgian Service Group: senior engineer on a live EU logistics platform, working across frontend, backend microservices, and DevOps.',
            'Skiper: co-founder and sole frontend owner of the reservation platform.',
        ],
        stackLine: 'React · TypeScript · TanStack Query · Java/Spring Boot · Node.js · PostgreSQL · AWS',
    },
    skills: [
        {
            category: 'Frontend',
            items: ['React', 'TypeScript', 'Next.js', 'Redux Toolkit', 'TanStack Query', 'Material UI', 'shadcn/ui', 'Vite', { name: 'Feature-Sliced Design', detail: 'FSD' }],
        },
        {
            category: 'Backend',
            items: ['Java 17/21', 'Spring Boot', 'Spring Security', 'JPA/Hibernate', 'PostgreSQL', 'Node.js', 'Prisma'],
        },
        {
            category: 'Infra & DevOps',
            items: ['Kubernetes', 'Docker', 'Helm', { name: 'AWS', detail: 'Secrets Manager, STS, OIDC' }, 'Jenkins', 'SonarQube', 'JaCoCo', 'Trivy', 'Micrometer', 'Prometheus'],
        },
        {
            category: 'Languages',
            items: ['Georgian (native)', 'English (professional)', 'Russian (professional)'],
            separator: ' · ',
        },
    ] satisfies ResumeSkillGroup[],
    experience: [
        {
            company: 'Georgian Service Group',
            role: 'Senior Software Engineer',
            period: 'June 2021 - Present',
            summary:
                'EU e-commerce logistics platform for parcel routing optimization and truck line scheduling across Europe. Top contributor by commit volume (~30%) on a 20+ engineer team, working across frontend, backend microservices, and DevOps.',
            summaryShort: 'EU logistics platform for e-commerce parcel routing and truck-line scheduling, live and used by operators across Europe.',
            highlights: [
                {
                    group: 'Frontend',
                    text: 'Top frontend contributor: 490+ commits, 160+ tasks delivered, 200+ pull requests across 4 years.',
                    short: '490+ commits and 200+ PRs over 4 years, top contributor on a 20+ engineer team.',
                    featured: true,
                },
                {
                    group: 'Frontend',
                    text: 'Built multi-view planning and scheduling interfaces (daily/weekly/historical) with dynamic filtering, forecasting, and scenario comparison, the core operational tools of the logistics platform.',
                    short: 'Built the multi-view planning and scheduling tools operators use every day.',
                    featured: true,
                },
                {
                    group: 'Frontend',
                    text: 'Established frontend data-layer patterns using Redux Toolkit and TanStack Query, standardizing data fetching, cache invalidation, and domain state across a 25+ engineer codebase.',
                    short: 'Set the frontend data-layer patterns and maintain the shared component library the whole team builds on.',
                    featured: true,
                },
                {
                    group: 'Frontend',
                    text: 'Built and maintained a shared component library (forms, tables, dialogs, filters) adopted across the team to eliminate duplicated UI code and enforce consistent patterns.',
                },
                {
                    group: 'Frontend',
                    text: 'Implemented frontend RBAC with permission-driven rendering, gating UI elements and routes based on user roles.',
                },
                {
                    group: 'Frontend',
                    text: 'Led CRA → Vite and Moment.js → Day.js migrations, modernizing the build toolchain and reducing bundle size.',
                },
                {
                    group: 'Frontend',
                    text: 'Introduced Vitest-based unit and integration testing; led large-scale legacy code removal reducing codebase surface and maintenance overhead.',
                },
                {
                    group: 'Backend',
                    text: 'Designed and implemented REST APIs and domain services in Spring Boot, covering planning, scheduling, and data-processing workflows across distributed microservices.',
                    short: 'Ship beyond the frontend: Spring Boot services, Jenkins pipelines, Helm-managed Kubernetes.',
                    featured: true,
                },
                {
                    group: 'Backend',
                    text: 'Built validation and rule engines enforcing data integrity and real-time operational constraints across distributed services.',
                },
                {
                    group: 'Backend',
                    text: 'Bootstrapped a Spring Boot microservice from scratch: layered domain architecture, external API integrations, and secrets management via AWS Secrets Manager.',
                },
                {
                    group: 'Backend',
                    text: 'Refactored batch-scheduled job workflows into on-demand REST APIs, eliminating timing dependencies and giving operators direct execution control.',
                },
                {
                    group: 'Backend',
                    text: 'Implemented OIDC-based service-to-service authentication and integrated AWS Secrets Manager and STS for credential-free service configuration.',
                },
                {
                    group: 'Backend',
                    text: 'Contributed 100+ commits across backend services, delivering 30+ production features.',
                },
                {
                    group: 'DevOps & Infrastructure',
                    text: 'Built and maintained CI/CD pipelines in Jenkins with integrated code quality gates (SonarQube) and container vulnerability scanning (Trivy).',
                },
                {
                    group: 'DevOps & Infrastructure',
                    text: 'Managed Kubernetes deployments across dev and production clusters using Helm, including CronJob scheduling and per-environment service configuration.',
                },
                {
                    group: 'DevOps & Infrastructure',
                    text: 'Hardened containerized services with non-root Docker images and Kubernetes security contexts.',
                },
                {
                    group: 'DevOps & Infrastructure',
                    text: 'Instrumented services with Micrometer/Prometheus metrics and structured logging, enabling operational visibility across distributed deployments.',
                },
            ],
            stack: [
                'React',
                'TypeScript',
                'Vite',
                'Redux Toolkit',
                'TanStack Query',
                'MUI',
                'Vitest',
                'Java 17/21',
                'Spring Boot',
                'JPA/Hibernate',
                'PostgreSQL',
                'Kubernetes',
                'Docker',
                'Helm',
                'AWS',
                'Jenkins',
            ],
        },
        {
            company: 'Skiper Technologies GmbH',
            role: 'Co-founder & Frontend Lead',
            period: '2022 - Present',
            summary: 'One of three co-founders; sole owner of the entire frontend over 4+ years.',
            summaryShort: 'Restaurant reservation platform. One of three co-founders, and the only frontend engineer on the product.',
            highlights: [
                {
                    text: 'Led frontend development from initial commit to production: 414 commits, ~108,000 net lines across 1,172 files as the sole frontend owner.',
                    short: 'Took the frontend from first commit to production solo: 414 commits, ~108k lines, 10+ product domains.',
                    featured: true,
                },
                {
                    text: 'Owned end-to-end delivery across 10+ product domains in a React + TypeScript + TanStack Query SPA, from initial architecture through iterative feature releases.',
                },
                {
                    text: 'Migrated from Create React App to Vite, reducing production build times from 52 seconds to 3 seconds (94% faster).',
                    short: 'Cut production builds from 52s to 3s by migrating CRA to Vite.',
                    featured: true,
                },
                {
                    text: 'Refactored a 280-file flat codebase to a 5-layer Feature-Sliced Design architecture with 16 feature slices and ESLint-enforced import boundaries; codebase scaled to 559 files with zero cross-layer violations.',
                    short: 'Rebuilt a 280-file flat codebase as 5-layer Feature-Sliced Design, with zero cross-layer violations since.',
                    featured: true,
                },
                {
                    text: 'Designed and maintained a full i18n system across 3 languages, covering every product surface from authentication to core workflows.',
                    short: 'Shipped the product in 3 languages, from authentication to core booking flows.',
                    featured: true,
                },
                {
                    text: 'Introduced regression and integration test suites covering multi-tenant context, API payload contracts, and authentication flows.',
                },
            ],
            stack: ['React', 'TypeScript', 'Vite', 'TanStack Query', 'shadcn/ui', 'Java Spring Boot', 'AWS'],
            link: 'https://reserve.skiper.io/en',
            imageUrl: '/images/skiper.webp',
        },
    ] satisfies ResumeExperience[],
    projects: [
        {
            name: 'StackForm',
            role: 'Creator & Maintainer',
            period: '2026 - Present',
            summary: 'Open-source headless form library for React: one component per field instead of 10-15 lines of shadcn/ui + React Hook Form boilerplate.',
            highlights: [
                '7 packages on npm (@stackform/core plus adapters), v1.1.0 stable.',
                'Adapter-agnostic: the same field API drives React Hook Form, TanStack Form, or native React state.',
                'Released via Changesets and npm Trusted Publishing (OIDC), no static tokens.',
                'Dogfooded on DevApply before the stable release.',
            ],
            stack: ['TypeScript', 'React', 'pnpm workspaces', 'tsup', 'Vitest', 'shadcn/ui'],
            link: 'https://stack-form-docs.vercel.app',
            imageUrl: '/images/products/stackform.jpg',
        },
        {
            name: 'DevApply',
            role: 'Solo-built',
            period: 'April 2026',
            summary: 'Job application tracker for developers: Kanban pipeline, resume version management, follow-up reminders, and career analytics.',
            highlights: ['Designed, built, and shipped solo in a month.', 'Live at devapply.app, free to use.'],
            stack: ['Next.js', 'Prisma', 'Neon', 'Clerk', 'PostHog', 'Resend'],
            link: 'https://devapply.app',
            imageUrl: '/images/products/devapply.jpg',
        },
    ] satisfies ResumeProject[],
    education: {
        institution: 'Tbilisi State Technical University',
        degree: 'Computer Science',
    } satisfies ResumeEducation,
    contact: {
        website: 'https://ivakobalava.dev/',
        linkedin: 'https://www.linkedin.com/in/iveri-kobalava/',
        devapply: 'https://devapply.app',
        github: 'https://github.com/ivaiva89',
        x: 'https://x.com/ikobalava',
        email: 'ivakobalava@gmail.com',
    },
    socialLinks: [
        {
            text: 'Website',
            href: 'https://ivakobalava.dev/',
            icon: '/icons/atom.svg',
            bg: '#4bcb63',
        },
        {
            text: 'LinkedIn',
            href: 'https://www.linkedin.com/in/iveri-kobalava/',
            icon: '/icons/linkedin.svg',
            bg: '#05b6f6',
        },
        {
            text: 'DevApply',
            href: 'https://devapply.app',
            icon: '/icons/share.svg',
            bg: '#f59e0b',
        },
        {
            text: 'GitHub',
            href: 'https://github.com/ivaiva89',
            icon: '/icons/github.svg',
            bg: '#f4656b',
        },
    ] satisfies ProfileLink[],
    resume: {
        pdfPath: '/files/resume.pdf',
        downloadName: 'Iveri_Kobalava_Resume.pdf',
    },
}

export const primaryTechnologies = ['React', 'TypeScript', 'TanStack Query', 'Java/Spring Boot', 'Node.js', 'AWS']
