import { loadProfile } from "@/lib/content"
import { routes } from "@/lib/routes"
import type { SiteIdentity, SiteLink } from "@/lib/site"
import { site } from "@/lib/site"

export async function loadIdentity(): Promise<{
  identity: SiteIdentity
  elsewhere: SiteLink[]
  github: string
}> {
  const profile = await loadProfile()

  return {
    identity: {
      handle: profile.handle,
      name: profile.name,
      tagline: profile.tagline,
      location: profile.location,
      timezone: profile.timezone,
      homeHref: routes.home,
    },
    elsewhere: [
      { label: "GitHub", href: `https://${profile.github}` },
      { label: "Email", href: `mailto:${profile.email}` },
      { label: "Blog", href: site.blogUrl },
    ],
    github: profile.github,
  }
}
