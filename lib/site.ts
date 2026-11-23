export const site = {
  blogUrl: process.env.NEXT_PUBLIC_BLOG_URL ?? "http://localhost:3001",
}

export function blogPostUrl(slug: string) {
  return `${site.blogUrl}/${slug}`
}

export interface SiteNavItem {
  href: string
  label: string
  match?: string[]
  external?: boolean
}

export interface SiteLink {
  label: string
  href: string
}

export interface SiteIdentity {
  handle: string
  name: string
  tagline: string
  location: string
  timezone: string
  homeHref: string
}
