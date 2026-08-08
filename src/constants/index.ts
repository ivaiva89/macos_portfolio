import { profile, skillName } from './profile'

const navLinks = [
    {
        id: 1,
        name: 'Projects',
        type: 'finder',
    },
    {
        id: 2,
        name: 'Articles',
        type: 'safari',
    },
    {
        id: 3,
        name: 'Contact',
        type: 'contact',
    },
    {
        id: 4,
        name: 'Resume',
        type: 'resume',
    },
]

const navIcons = [
    {
        id: 1,
        img: '/icons/wifi.svg',
    },
    {
        id: 2,
        img: '/icons/search.svg',
    },
    {
        id: 3,
        img: '/icons/user.svg',
    },
    {
        id: 4,
        img: '/icons/mode.svg',
    },
]

// Portfolio surface: plain skill names, parenthetical details dropped. See profile.ts.
const techStack = profile.skills.map((group) => ({ category: group.category, items: group.items.map(skillName) }))

const dockApps = [
    {
        id: 'finder',
        name: 'Portfolio', // was "Finder"
        icon: 'finder.png',
        canOpen: true,
    },
    {
        id: 'safari',
        name: 'Articles', // was "Safari"
        icon: 'safari.png',
        canOpen: true,
    },
    {
        id: 'photos',
        name: 'Gallery', // was "Photos"
        icon: 'photos.png',
        canOpen: true,
    },
    {
        id: 'contact',
        name: 'Contact', // or "Get in touch"
        icon: 'contact.png',
        canOpen: true,
    },
    {
        id: 'terminal',
        name: 'Skills', // was "Terminal"
        icon: 'terminal.png',
        canOpen: true,
    },
    {
        id: 'trash',
        name: 'Archive', // was "Trash"
        icon: 'trash.png',
        canOpen: false,
    },
]

export interface MobileApp {
    id: string
    name: string
    icon: string
}

/** Home-screen grid on the iPhone shell. */
const mobileApps: MobileApp[] = [
    { id: 'finder', name: 'Portfolio', icon: 'finder.png' },
    { id: 'safari', name: 'Articles', icon: 'safari.png' },
    { id: 'photos', name: 'Gallery', icon: 'photos.png' },
    { id: 'terminal', name: 'Skills', icon: 'terminal.png' },
    { id: 'resume', name: 'Resume', icon: 'pdf.png' },
    { id: 'contact', name: 'Contact', icon: 'contact.png' },
]

/** Bottom dock on the iPhone shell. */
const mobileDockApps: MobileApp[] = [
    { id: 'finder', name: 'Portfolio', icon: 'finder.png' },
    { id: 'safari', name: 'Articles', icon: 'safari.png' },
    { id: 'contact', name: 'Contact', icon: 'contact.png' },
    { id: 'resume', name: 'Resume', icon: 'pdf.png' },
]

const INITIAL_Z_INDEX = 1000

const WINDOW_CONFIG = {
    finder: {
        title: 'Portfolio',
        isOpen: false,
        zIndex: INITIAL_Z_INDEX,
        data: null,
    },
    safari: {
        title: 'Articles',
        isOpen: false,
        zIndex: INITIAL_Z_INDEX,
        data: null,
    },
    photos: {
        title: 'Gallery',
        isOpen: false,
        zIndex: INITIAL_Z_INDEX,
        data: null,
    },
    contact: {
        title: 'Contact',
        isOpen: false,
        zIndex: INITIAL_Z_INDEX,
        data: null,
    },
    terminal: {
        title: 'Skills',
        isOpen: false,
        zIndex: INITIAL_Z_INDEX,
        data: null,
    },
    resume: {
        title: 'Resume',
        isOpen: false,
        zIndex: INITIAL_Z_INDEX,
        data: null,
    },
    tstfile: {
        title: 'Text File',
        isOpen: false,
        zIndex: INITIAL_Z_INDEX,
        data: null,
    },
    imgfile: {
        title: 'Image File',
        isOpen: false,
        zIndex: INITIAL_Z_INDEX,
        data: null,
    },
}

export type WindowKey = keyof typeof WINDOW_CONFIG

export { navLinks, navIcons, techStack, dockApps, mobileApps, mobileDockApps, INITIAL_Z_INDEX, WINDOW_CONFIG }
