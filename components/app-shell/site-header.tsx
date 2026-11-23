import type * as React from "react"
import { MainNav } from "@/components/app-shell/main-nav"
import { MobileNav } from "@/components/app-shell/mobile-nav"
import { SiteLogo } from "@/components/app-shell/site-logo"
import { Container } from "@/components/container"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { ThemeToggle } from "@/components/theme-toggle"
import type { SiteIdentity, SiteNavItem } from "@/lib/site"

function SiteHeader({
  identity,
  navItems,
  actions,
}: {
  identity: SiteIdentity
  navItems: SiteNavItem[]
  actions?: React.ReactNode
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md backdrop-saturate-150">
      <Container className="flex h-15 items-center justify-between gap-4">
        <SiteLogo handle={identity.handle} href={identity.homeHref} />
        <div className="flex items-center gap-1">
          <div className="hidden sm:flex sm:items-center sm:gap-1">
            <MainNav items={navItems} />
          </div>
          <ThemeToggle />
          <div className="hidden sm:contents">{actions}</div>
          <div className="sm:hidden">
            <MobileNav items={navItems} />
          </div>
        </div>
      </Container>
      <ScrollProgress />
    </header>
  )
}

export { SiteHeader }
