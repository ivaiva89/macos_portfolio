import { profile } from './profile'

const socials = profile.socialLinks.map((item, index) => ({
    id: index + 1,
    text: item.text,
    icon: item.icon,
    bg: item.bg,
    link: item.href,
}))

export { socials }
