import { profile, primaryTechnologies } from '#constants/profile'

export const SITE_URL = 'https://ivakobalava.dev'
export const SITE_NAME = profile.fullName
export const SITE_TITLE = `${profile.fullName} | ${profile.role}`
export const SITE_DESCRIPTION = `${profile.role} in ${profile.location}. Frontend-led fullstack engineer shipping product systems with ${primaryTechnologies.join(', ')}.`
export const BLOG_TITLE = 'Articles'
export const BLOG_DESCRIPTION = 'Notes on frontend architecture, product delivery, and building polished developer experiences.'
