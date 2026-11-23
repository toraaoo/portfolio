import { GithubLogoIcon } from "@phosphor-icons/react/ssr"
import { MainNav } from "@/components/app-shell/main-nav"
import { MobileNav } from "@/components/app-shell/mobile-nav"
import { SiteLogo } from "@/components/app-shell/site-logo"
import { ButtonLink } from "@/components/button-link"
import { Container } from "@/components/container"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { profile } from "@/lib/content"
import { navItems, routes } from "@/lib/routes"

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md backdrop-saturate-150">
      <Container className="flex h-15 items-center justify-between gap-4">
        <SiteLogo handle={profile.handle} href={routes.home} />
        <div className="flex items-center gap-1">
          <div className="hidden sm:flex sm:items-center sm:gap-1">
            <MainNav items={navItems} />
          </div>
          <ThemeToggle />
          <div className="hidden sm:contents">
            <ButtonLink
              href={profile.github}
              external
              size="sm"
              className="ml-2"
            >
              <GithubLogoIcon data-icon="inline-start" />
              GitHub
            </ButtonLink>
          </div>
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
