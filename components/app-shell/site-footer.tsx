import Link from "next/link"
import { SiteLogo } from "@/components/app-shell/site-logo"
import { Container } from "@/components/container"
import { Kicker } from "@/components/kicker"
import { Separator } from "@/components/separator"
import { profile } from "@/lib/content"
import { navItems, routes } from "@/lib/routes"

const elsewhere = [
  { label: "GitHub", href: profile.github },
  { label: "Email", href: `mailto:${profile.email}` },
]

function SiteFooter() {
  return (
    <footer className="dark mt-24 border-t border-border bg-background text-foreground">
      <Container className="pt-14 pb-10">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="max-w-85">
            <SiteLogo handle={profile.handle} href={routes.home} />
            <p className="mt-3.5 text-sm text-muted-foreground">
              {profile.tagline}
            </p>
          </div>
          <div className="flex gap-14">
            <div>
              <Kicker className="mb-3.5">Pages</Kicker>
              <ul className="grid gap-2.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
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
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>
            {profile.location} · {profile.timeZoneLabel}
          </span>
        </div>
      </Container>
    </footer>
  )
}

export { SiteFooter }
