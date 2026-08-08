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
    fullName: 'Iveri (Iva) Kobalava',
    shortName: 'Iveri',
    displayHandle: '@Iveri',
    role: 'Senior Frontend Engineer',
    location: 'Tbilisi, Georgia (UTC+4)',
    headline: 'I build product systems that stay clear under scale: frontend architecture, backend services, and delivery.',
    summary:
        'Frontend engineer with 5 years building operational software people use all day: planning and scheduling tools for an EU logistics platform, and a restaurant reservation product I own end to end as co-founder. I work at the architecture level. Recent work: production builds cut from 52s to 3s, a 280-file codebase restructured into a Feature-Sliced architecture now at 559 files with zero boundary violations, and a React Native app shipped solo to both app stores. Also ship Java/Spring Boot and Node when a feature needs the API written too.',
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
            items: ['React', 'TypeScript', 'Next.js', 'React Native / Expo', 'Redux Toolkit', 'TanStack Query', 'React Hook Form', 'Zod', 'Material UI', 'shadcn/ui', 'Tailwind', 'Vite', { name: 'Feature-Sliced Design', detail: 'FSD' }],
        },
        {
            category: 'Testing',
            items: ['Vitest', 'React Testing Library', 'MSW', 'Jest'],
        },
        {
            category: 'Backend',
            items: ['Java 17/21', 'Spring Boot', 'Spring Security', 'JPA/Hibernate', 'PostgreSQL', 'Node.js', 'Prisma'],
        },
        {
            category: 'Infra & DevOps',
            items: ['Kubernetes', 'Docker', 'Helm', { name: 'AWS', detail: 'Secrets Manager, STS, OIDC' }, 'Jenkins', 'SonarQube', 'Prometheus'],
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
                'EU e-commerce logistics platform for parcel routing and truck-line scheduling across Europe. Frontend lead in practice on a 20+ engineer team, also shipping backend services and CI/CD.',
            summaryShort: 'EU logistics platform for e-commerce parcel routing and truck-line scheduling, live and used by operators across Europe.',
            highlights: [
                {
                    text: 'Built the core planning and scheduling interfaces (daily, weekly and historical views with dynamic filtering, forecasting and scenario comparison) that operations staff run the business on.',
                    short: 'Built the multi-view planning and scheduling tools operators use every day.',
                    featured: true,
                },
                {
                    text: 'Set the frontend data-layer standard used across a 25+ engineer codebase: Redux Toolkit for UI state, TanStack Query for server state, plus a shared cache-invalidation policy that ended a recurring class of stale-data bugs.',
                    short: 'Set the frontend data-layer patterns the whole team builds on.',
                    featured: true,
                },
                {
                    text: 'Built and maintained the shared component library (forms, tables, dialogs, filters) every frontend team builds on, removing duplicated UI across the platform.',
                    short: 'Built and maintain the shared component library used across the team.',
                    featured: true,
                },
                {
                    text: 'Modernised the toolchain: led the CRA to Vite and Moment.js to Day.js migrations, and introduced Vitest unit and integration testing to a codebase that had none.',
                    short: 'Led the CRA to Vite migration and introduced testing to a codebase that had none.',
                    featured: true,
                },
                {
                    text: 'Ship beyond the frontend: Spring Boot REST services, a microservice built from scratch with OIDC auth and AWS Secrets Manager, Jenkins CI/CD with SonarQube gates, and Kubernetes via Helm.',
                    short: 'Ship beyond the frontend: Spring Boot services, Jenkins pipelines, Helm-managed Kubernetes.',
                    featured: true,
                },
            ],
            stack: ['React', 'TypeScript', 'Vite', 'Redux Toolkit', 'TanStack Query', 'Vitest', 'Java 17/21', 'Spring Boot', 'AWS'],
        },
        {
            company: 'Skiper Technologies GmbH',
            role: 'Co-founder & Frontend Lead',
            period: '2022 - Present',
            summary: 'B2B restaurant reservation platform. One of three co-founders and sole owner of the entire frontend across web, embeddable widget and mobile.',
            summaryShort: 'Restaurant reservation platform. One of three co-founders, and the only frontend engineer on the product.',
            highlights: [
                {
                    text: 'Own the entire frontend from first commit to production across 10+ product domains: the web portal, an embeddable booking widget, and the React Native app.',
                    short: 'Took the frontend from first commit to production solo, across 10+ product domains.',
                    featured: true,
                },
                {
                    text: 'Cut production builds from 52 seconds to 3 by migrating CRA to Vite, then restructured a 280-file flat codebase into a 5-layer Feature-Sliced architecture with ESLint-enforced boundaries. Now 559 files, zero cross-layer violations.',
                    short: 'Cut builds 52s to 3s, and rebuilt 280 flat files as Feature-Sliced Design with zero violations since.',
                    featured: true,
                },
                {
                    text: 'Shipped the React Native app solo to the App Store and Play Store: Expo, JWT in encrypted device storage with silent logout on token expiry, reCAPTCHA v3, and the full EAS release pipeline.',
                    short: 'Built and shipped the React Native app solo to both app stores.',
                    featured: true,
                },
                {
                    text: 'Migrated Material UI to a Tailwind design system: 37 primitives plus typed React Hook Form controllers reused across 37 routes.',
                    short: 'Migrated MUI to a Tailwind design system, 37 primitives reused across 37 routes.',
                    featured: true,
                },
                {
                    text: 'Shipped the product in 3 languages, with CI checks that fail the build on missing translation keys.',
                    short: 'Shipped the product in 3 languages, with CI that fails on missing translation keys.',
                    featured: true,
                },
            ],
            stack: ['React', 'TypeScript', 'React Native', 'Expo', 'Vite', 'TanStack Query', 'shadcn/ui', 'Tailwind', 'AWS'],
            link: 'https://reserve.skiper.io/en',
            imageUrl: '/images/skiper.webp',
        },
    ] satisfies ResumeExperience[],
    projects: [
        {
            name: 'StackForm',
            role: 'Creator & Maintainer',
            period: '2026 - Present',
            summary: 'Open-source headless form library for React: one component per field instead of 10-15 lines of boilerplate. 7 packages on npm, adapter-agnostic across React Hook Form, TanStack Form and native state.',
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
