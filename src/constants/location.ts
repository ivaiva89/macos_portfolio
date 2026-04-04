import { profile } from './profile'

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
    name: 'Selected Work',
    icon: '/icons/work.svg',
    kind: 'folder',
    children: [
        {
            id: 5,
            name: 'Georgian Service Group',
            icon: '/images/folder.png',
            kind: 'folder',
            position: 'top-10 left-5', // icon position inside Finder
            windowPosition: 'top-[5vh] right-20', // optional: Finder window position
            children: [
                {
                    id: 1,
                    name: 'Georgian Service Group.txt',
                    icon: '/images/txt.png',
                    kind: 'file',
                    fileType: 'txt',
                    position: 'top-5 left-10',
                    subtitle: `${profile.experience[0].role} · ${profile.experience[0].period}`,
                    image: profile.experience[0].imageUrl,
                    description: [profile.experience[0].summary, ...profile.experience[0].highlights],
                },
                {
                    id: 2,
                    name: 'Experience stack.txt',
                    icon: '/images/txt.png',
                    kind: 'file',
                    fileType: 'txt',
                    position: 'top-10 right-20',
                    subtitle: 'Core technologies',
                    description: [profile.experience[0].stack.join(' · ')],
                },
            ],
        },
        {
            id: 7,
            name: 'Skiper Technologies',
            icon: '/images/folder.png',
            kind: 'folder',
            position: 'top-10 left-80',
            windowPosition: 'top-[33vh] right-25',
            children: [
                {
                    id: 1,
                    name: 'Skiper Technologies.txt',
                    icon: '/images/txt.png',
                    kind: 'file',
                    fileType: 'txt',
                    position: 'top-5 left-10',
                    subtitle: `${profile.experience[1].role} · ${profile.experience[1].period}`,
                    image: profile.experience[1].imageUrl,
                    description: [profile.experience[1].summary, ...profile.experience[1].highlights],
                },
                {
                    id: 2,
                    name: 'Visit Reserve Skiper',
                    icon: '/images/safari.png',
                    kind: 'file',
                    fileType: 'url',
                    href: profile.experience[1].link,
                    position: 'top-10 right-20',
                },
                {
                    id: 4,
                    name: 'Skiper landing.png',
                    icon: '/images/image.png',
                    kind: 'file',
                    fileType: 'img',
                    position: 'top-52 right-80',
                    imageUrl: '/images/skiper.png',
                },
                {
                    id: 5,
                    name: 'Frontend stack.txt',
                    icon: '/images/txt.png',
                    kind: 'file',
                    fileType: 'txt',
                    position: 'top-60 right-20',
                    subtitle: 'Core technologies',
                    description: [profile.experience[1].stack.join(' · ')],
                },
            ],
        },
        {
            id: 9,
            name: 'DevApply',
            icon: '/images/folder.png',
            kind: 'folder',
            position: 'top-40 left-40',
            windowPosition: 'top-[24vh] right-40',
            children: [
                {
                    id: 1,
                    name: 'DevApply.txt',
                    icon: '/images/txt.png',
                    kind: 'file',
                    fileType: 'txt',
                    position: 'top-5 left-10',
                    subtitle: `${profile.projects[0].role} · ${profile.projects[0].period}`,
                    image: profile.projects[0].imageUrl,
                    description: [profile.projects[0].summary, `Stack: ${profile.projects[0].stack.join(' · ')}`],
                },
                {
                    id: 2,
                    name: 'Open DevApply',
                    icon: '/images/safari.png',
                    kind: 'file',
                    fileType: 'url',
                    href: profile.projects[0].link,
                    position: 'top-10 right-20',
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
            subtitle: profile.aboutTitle,
            image: '/images/iva.png',
            description: [...profile.aboutParagraphs, `${profile.education.institution} · ${profile.education.degree}`],
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
