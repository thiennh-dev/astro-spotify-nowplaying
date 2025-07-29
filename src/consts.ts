import type { IconMap, Site, SocialLink } from "./types"

export const SITE: Site = {
  title: 'thiennh.icu',
  description:
    'Design engineer and cybersecurity enthusiast based in Los Angeles.',
  href: 'https://thiennh.icu',
  author: 'thiennh',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 4,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/about',
    label: 'about',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/thiennh-dev',
    label: 'GitHub',
  },
  {
    href: 'https://twitter.com/',
    label: 'Twitter',
  },
  {
    href: 'mailto:hello@thiennh.icu',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
