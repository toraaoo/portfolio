import { GithubLogoIcon } from "@phosphor-icons/react/ssr"

import { Logo } from "@/components/app-shell/logo"
import { MainNav } from "@/components/app-shell/main-nav"
import { ThemeToggle } from "@/components/app-shell/theme-toggle"
import { ButtonLink } from "@/components/button-link"
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
    </header>
  )
}

export { SiteHeader }
