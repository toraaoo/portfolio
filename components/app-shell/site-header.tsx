import { GithubLogoIcon } from "@phosphor-icons/react/ssr"

import { ButtonLink } from "@workspace/ui/components/button-link"
import { ScrollProgress } from "@workspace/ui/components/motion/scroll-progress"
import { ThemeToggle } from "@workspace/ui/components/theme-toggle"

import { Logo } from "@/components/app-shell/logo"
import { MainNav } from "@/components/app-shell/main-nav"
import { profile } from "@/lib/content"

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-15 w-full max-w-content items-center justify-between gap-4 px-7">
        <Logo />
        <div className="flex items-center gap-1">
          <MainNav />
          <ThemeToggle />
          <ButtonLink
            href={`https://${profile.github}`}
            external
            size="sm"
            className="ml-2"
          >
            <GithubLogoIcon data-icon="inline-start" />
            GitHub
          </ButtonLink>
        </div>
      </div>
      <ScrollProgress />
    </header>
  )
}

export { SiteHeader }
