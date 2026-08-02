import { site } from "@/lib/site"

export const routes = {
  home: "/",
  work: "/work",
  project: (slug: string) => `/work/${slug}`,
  about: "/about",
  writing: site.blogUrl,
} as const

export const navItems = [
  { href: routes.work, label: "Work", match: ["/work"], external: false },
  { href: routes.about, label: "About", match: ["/about"], external: false },
  { href: routes.writing, label: "Writing", match: [], external: true },
]
