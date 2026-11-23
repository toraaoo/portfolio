import Link from "next/link"
import { SiteLogo } from "@/components/app-shell/site-logo"
import { Container } from "@/components/container"
import { Kicker } from "@/components/kicker"
import { Separator } from "@/components/separator"
import type { SiteIdentity, SiteLink, SiteNavItem } from "@/lib/site"

function SiteFooter({
  identity,
  navItems,
  elsewhere,
}: {
  identity: SiteIdentity
  navItems: SiteNavItem[]
  elsewhere: SiteLink[]
}) {
  return (
    <footer className="dark mt-24 border-t border-border bg-background text-foreground">
      <Container className="pt-14 pb-10">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="max-w-85">
            <SiteLogo handle={identity.handle} href={identity.homeHref} />
            <p className="mt-3.5 text-sm text-muted-foreground">
              {identity.tagline}
            </p>
          </div>
          <div className="flex gap-14">
            <div>
              <Kicker className="mb-3.5">Pages</Kicker>
              <ul className="grid gap-2.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Kicker className="mb-3.5">Elsewhere</Kicker>
              <ul className="grid gap-2.5">
                {elsewhere.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="mt-12 mb-5.5" />

        <div className="flex flex-wrap justify-between gap-3 font-mono text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {identity.name}
          </span>
          <span>
            {identity.location} · {identity.timezone}
          </span>
        </div>
      </Container>
    </footer>
  )
}

export { SiteFooter }
