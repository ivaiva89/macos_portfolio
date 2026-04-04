export interface ResumeSkillGroup {
    category: string
    items: string[]
}

export interface ResumeExperience {
    company: string
    role: string
    period: string
    summary: string
    highlights: string[]
    stack: string[]
    link?: string
    imageUrl?: string
}

export interface ResumeProject {
    name: string
    role: string
    period: string
    summary: string
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
    headline: 'Senior Frontend Engineer building resilient product systems across frontend, backend, and delivery.',
    summary:
        'Frontend-led fullstack engineer with 5 years of experience and a co-founder credit. At GSG, top contributor by commit volume on a live EU logistics platform while also delivering backend services and CI/CD pipelines. At Skiper, sole frontend owner, leading architecture, platform migrations, and multilingual product delivery across a growing SaaS product.',
    aboutTitle: 'Frontend-led fullstack engineer with product and platform depth',
    aboutParagraphs: [
        'I build product systems that stay clear under scale, from frontend architecture and state management to backend services and delivery workflows.',
        'At Georgian Service Group, I work across frontend, backend microservices, and DevOps for a live EU logistics platform, shipping planning interfaces, shared UI systems, and production services used by operators across Europe.',
        'At Skiper, I am a co-founder and the sole frontend owner, responsible for architecture, feature delivery, migration work, and multilingual product foundations across the reservation platform.',
        'My working stack spans React, TypeScript, TanStack Query, Java/Spring Boot, Node.js, PostgreSQL, and AWS.',
    ],
    skills: [
        {
            category: 'Frontend',
            items: ['React', 'TypeScript', 'Next.js', 'Redux Toolkit', 'TanStack Query', 'Material UI', 'shadcn/ui', 'Vite', 'Feature-Sliced Design'],
        },
        {
            category: 'Backend',
            items: ['Java 17/21', 'Spring Boot', 'Spring Security', 'JPA/Hibernate', 'PostgreSQL', 'Node.js', 'Prisma'],
        },
        {
            category: 'Infra & DevOps',
            items: ['Kubernetes', 'Docker', 'Helm', 'AWS', 'Jenkins', 'SonarQube', 'JaCoCo', 'Trivy', 'Micrometer', 'Prometheus'],
        },
        {
            category: 'Languages',
            items: ['Georgian (native)', 'English (professional)', 'Russian (professional)'],
        },
    ] satisfies ResumeSkillGroup[],
    experience: [
        {
            company: 'Georgian Service Group',
            role: 'Senior Software Engineer',
            period: 'June 2021 - Present',
            summary:
                'EU e-commerce logistics platform for parcel routing optimization and truck line scheduling across Europe. Top contributor by commit volume on a 20+ engineer team, working across frontend, backend microservices, and DevOps.',
            highlights: [
                'Built multi-view planning and scheduling interfaces with dynamic filtering, forecasting, and scenario comparison for core logistics workflows.',
                'Established frontend data-layer patterns with Redux Toolkit and TanStack Query, and maintained a shared component library used across the team.',
                'Designed Spring Boot services and REST APIs, then supported delivery with Jenkins pipelines, Helm-managed Kubernetes deployments, and observability tooling.',
            ],
            stack: ['React', 'TypeScript', 'Vite', 'Redux Toolkit', 'TanStack Query', 'Vitest', 'Java 17/21', 'Spring Boot', 'PostgreSQL', 'Kubernetes', 'Docker', 'Helm', 'AWS', 'Jenkins'],
            imageUrl: '/images/blog1.png',
        },
        {
            company: 'Skiper Technologies GmbH',
            role: 'Co-founder & Frontend Lead',
            period: '2022 - Present',
            summary: 'One of three co-founders and sole frontend owner across the Skiper reservation platform.',
            highlights: [
                'Led frontend development from initial commit to production across 10+ product domains in a React and TypeScript SPA.',
                'Migrated the app from Create React App to Vite and refactored a flat codebase into a 5-layer Feature-Sliced Design architecture.',
                'Built the multilingual product foundation and introduced regression and integration tests for multi-tenant and authentication flows.',
            ],
            stack: ['React', 'TypeScript', 'Vite', 'TanStack Query', 'shadcn/ui', 'Java Spring Boot', 'AWS'],
            link: 'https://reserve.skiper.io/en',
            imageUrl: '/images/skiper.png',
        },
    ] satisfies ResumeExperience[],
    projects: [
        {
            name: 'DevApply',
            role: 'Solo-built',
            period: 'April 2026',
            summary: 'Full-stack job application tracker for developers with a Kanban pipeline, resume version management, follow-up reminders, and career analytics.',
            stack: ['Next.js', 'Prisma', 'Neon', 'Clerk', 'PostHog', 'Resend'],
            link: 'https://devapply.app',
            imageUrl: '/images/plain.png',
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
        htmlPath: '/Iveri_Kobalava_Resume.html',
        pdfPath: '/files/resume.pdf',
        downloadName: 'Iveri_Kobalava_Resume.pdf',
    },
}

export const primaryTechnologies = ['React', 'TypeScript', 'TanStack Query', 'Java/Spring Boot', 'Node.js', 'AWS']
