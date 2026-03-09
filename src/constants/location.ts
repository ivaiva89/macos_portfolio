export type FileType = 'txt' | 'url' | 'img' | 'fig' | 'pdf'

export interface BaseLocationItem {
    id: number
    name: string
    icon: string
    position?: string
}

export interface FileItem extends BaseLocationItem {
    kind: 'file'
    fileType: FileType
    description?: string[]
    href?: string
    imageUrl?: string
    subtitle?: string
    image?: string
}

export interface FolderItem extends BaseLocationItem {
    kind: 'folder'
    windowPosition?: string
    children: LocationItem[]
}

export type LocationItem = FileItem | FolderItem

export interface LocationRoot extends FolderItem {
    type: string
}

const WORK_LOCATION: LocationRoot = {
    id: 1,
    type: 'work',
    name: 'Work',
    icon: '/icons/work.svg',
    kind: 'folder',
    children: [
        // ▶ Project 1
        {
            id: 5,
            name: 'Test project 1',
            icon: '/images/folder.png',
            kind: 'folder',
            position: 'top-10 left-5', // icon position inside Finder
            windowPosition: 'top-[5vh] right-20', // optional: Finder window position
            children: [
                {
                    id: 1,
                    name: 'Test Project 1.txt',
                    icon: '/images/txt.png',
                    kind: 'file',
                    fileType: 'txt',
                    position: 'top-5 left-10',
                    description: [''],
                },
                {
                    id: 2,
                    name: 'tets url',
                    icon: '/images/safari.png',
                    kind: 'file',
                    fileType: 'url',
                    href: 'https://google.com',
                    position: 'top-10 right-20',
                },
                {
                    id: 4,
                    name: 'tes image.png',
                    icon: '/images/image.png',
                    kind: 'file',
                    fileType: 'img',
                    position: 'top-52 right-80',
                    imageUrl: '/images/project-1.png',
                },
                {
                    id: 5,
                    name: 'Design.fig',
                    icon: '/images/plain.png',
                    kind: 'file',
                    fileType: 'fig',
                    href: 'https://google.com',
                    position: 'top-60 right-20',
                },
            ],
        },

        // ▶ Project 2
        {
            id: 7,
            name: 'Test Project 2',
            icon: '/images/folder.png',
            kind: 'folder',
            position: 'top-10 left-80',
            windowPosition: 'top-[33vh] right-25',
            children: [
                {
                    id: 1,
                    name: 'Test Project 2.txt',
                    icon: '/images/txt.png',
                    kind: 'file',
                    fileType: 'txt',
                    position: 'top-5 left-10',
                    description: [''],
                },
                {
                    id: 2,
                    name: 'Test Project 2.com',
                    icon: '/images/safari.png',
                    kind: 'file',
                    fileType: 'url',
                    href: 'https://google.com',
                    position: 'top-10 right-20',
                },
                {
                    id: 4,
                    name: 'Test Project image.png',
                    icon: '/images/image.png',
                    kind: 'file',
                    fileType: 'img',
                    position: 'top-52 right-80',
                    imageUrl: '/images/project-3.png',
                },
                {
                    id: 5,
                    name: 'Design.fig',
                    icon: '/images/plain.png',
                    kind: 'file',
                    fileType: 'fig',
                    href: 'https://google.com',
                    position: 'top-60 right-20',
                },
            ],
        },
    ],
}

const ABOUT_LOCATION: LocationRoot = {
    id: 2,
    type: 'about',
    name: 'About me',
    icon: '/icons/info.svg',
    kind: 'folder',
    children: [
        {
            id: 1,
            name: 'about-me.txt',
            icon: '/images/txt.png',
            kind: 'file',
            fileType: 'txt',
            position: 'top-50 left-5',
            subtitle: 'Meet the Developer Behind the Code',
            image: '/images/iva.png',
            description: [
                'Hey! I’m Iva 👋 — a frontend engineer who loves building modern, high-performance web apps.',
                'My main stack is React, Next.js, and TypeScript, with a strong focus on scalable architecture and clean UI.',
                'I enjoy solving complex product problems and turning them into smooth, intuitive user experiences.',
                'When I’m not coding, I’m usually improving my dev setup, exploring new tools, or learning backend with Node.js.',
            ],
        },
    ],
}

const RESUME_LOCATION: LocationRoot = {
    id: 3,
    type: 'resume',
    name: 'Resume',
    icon: '/icons/file.svg',
    kind: 'folder',
    children: [
        {
            id: 1,
            name: 'Resume.pdf',
            icon: '/images/pdf.png',
            kind: 'file',
            fileType: 'pdf',
            // add `href` for hosted resume
            // href: "/your/resume/path.pdf",
        },
    ],
}

const TRASH_LOCATION: LocationRoot = {
    id: 4,
    type: 'trash',
    name: 'Trash',
    icon: '/icons/trash.svg',
    kind: 'folder',
    children: [
        {
            id: 1,
            name: 'trash1.png',
            icon: '/images/image.png',
            kind: 'file',
            fileType: 'img',
            position: 'top-10 left-10',
            imageUrl: '/images/trash-1.png',
        },
        {
            id: 2,
            name: 'trash2.png',
            icon: '/images/image.png',
            kind: 'file',
            fileType: 'img',
            position: 'top-40 left-80',
            imageUrl: '/images/trash-2.png',
        },
    ],
}

const locations: Record<string, LocationRoot> = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    trash: TRASH_LOCATION,
}

export { locations }
