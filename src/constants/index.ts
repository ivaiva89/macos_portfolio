const navLinks = [
    {
        id: 1,
        name: 'Projects',
        type: 'finder',
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

const techStack = [
    {
        category: 'Frontend',
        items: ['React.js', 'Next.js', 'TypeScript'],
    },
    {
        category: 'Mobile',
        items: ['React Native', 'Expo'],
    },
    {
        category: 'Styling',
        items: ['Tailwind CSS', 'CSS'],
    },
    {
        category: 'Backend',
        items: ['Node.js', 'Express'],
    },
    {
        category: 'Database',
        items: ['PostgreSQL'],
    },
    {
        category: 'Dev Tools',
        items: ['Git', 'GitHub', 'Docker'],
    },
]

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
    txtfile: {
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

const blogPosts = [
    {
        id: 1,
        date: 'Sep 2, 2025',
        title: 'Example title',
        image: '/images/blog1.png',
        link: '',
    },
]

export type WindowKey = keyof typeof WINDOW_CONFIG

export { navLinks, navIcons, techStack, dockApps, blogPosts, INITIAL_Z_INDEX, WINDOW_CONFIG }
