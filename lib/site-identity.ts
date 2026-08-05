import type { SiteIdentity, SiteLink } from "@workspace/ui/lib/site"

import { profile } from "@/lib/content"
import { routes } from "@/lib/routes"
import { site } from "@/lib/site"

export const identity: SiteIdentity = {
  handle: profile.handle,
  name: profile.name,
  tagline: profile.tagline,
  location: profile.location,
  timezone: profile.timezone,
  homeHref: routes.home,
}

export const elsewhere: SiteLink[] = [
  { label: "GitHub", href: `https://${profile.github}` },
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "Blog", href: site.blogUrl },
]
