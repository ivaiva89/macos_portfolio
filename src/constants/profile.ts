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
            summary: 'EU logistics platform for e-commerce parcel routing and truck-line scheduling, live and used by operators across Europe.',
            highlights: [
                '490+ commits and 200+ PRs over 4 years, top contributor on a 20+ engineer team.',
                'Built the multi-view planning and scheduling tools operators use every day.',
                'Set the frontend data-layer patterns and maintain the shared component library the whole team builds on.',
                'Ship beyond the frontend: Spring Boot services, Jenkins pipelines, Helm-managed Kubernetes.',
            ],
            stack: ['React', 'TypeScript', 'Vite', 'Redux Toolkit', 'TanStack Query', 'Vitest', 'Java 17/21', 'Spring Boot', 'PostgreSQL', 'Kubernetes', 'Docker', 'Helm', 'AWS', 'Jenkins'],
        },
        {
            company: 'Skiper Technologies GmbH',
            role: 'Co-founder & Frontend Lead',
            period: '2022 - Present',
            summary: 'Restaurant reservation platform. One of three co-founders, and the only frontend engineer on the product.',
            highlights: [
                'Took the frontend from first commit to production solo: 414 commits, ~108k lines, 10+ product domains.',
                'Cut production builds from 52s to 3s by migrating CRA to Vite.',
                'Rebuilt a 280-file flat codebase as 5-layer Feature-Sliced Design, with zero cross-layer violations since.',
                'Shipped the product in 3 languages, from authentication to core booking flows.',
            ],
            stack: ['React', 'TypeScript', 'Vite', 'TanStack Query', 'shadcn/ui', 'Java Spring Boot', 'AWS'],
            link: 'https://reserve.skiper.io/en',
            imageUrl: '/images/skiper.webp',
        },
    ] satisfies ResumeExperience[],
    projects: [
        {
            name: 'DevApply',
            role: 'Solo-built',
            period: 'April 2026',
            summary: 'Job application tracker for developers: Kanban pipeline, resume version management, follow-up reminders, and career analytics.',
            highlights: ['Designed, built, and shipped solo in a month.', 'Live at devapply.app, free to use.'],
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
