export const routes = {
  home: "/",
  work: "/work",
  project: (slug: string) => `/work/${slug}`,
  about: "/about",
} as const

export interface NavItem {
  readonly href: string
  readonly label: string
}

export const navItems: readonly NavItem[] = [
  { href: routes.work, label: "Work" },
  { href: routes.about, label: "About" },
]

export function isActive(pathname: string, item: NavItem) {
  return pathname.startsWith(item.href)
}
