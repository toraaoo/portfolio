import type { Metadata } from "next"
import { JetBrains_Mono, Space_Grotesk } from "next/font/google"

import "@workspace/ui/globals.css"

import { GithubLogoIcon } from "@phosphor-icons/react/ssr"
import { RouteTransition } from "@workspace/ui/components/app-shell/route-transition"
import { SiteFooter } from "@workspace/ui/components/app-shell/site-footer"
import { SiteHeader } from "@workspace/ui/components/app-shell/site-header"
import { ButtonLink } from "@workspace/ui/components/button-link"
import { MotionProvider } from "@workspace/ui/components/motion/motion-provider"
import { ThemeProvider } from "@workspace/ui/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"
import { navItems } from "@/lib/routes"
import { loadIdentity } from "@/lib/site-identity"

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export async function generateMetadata(): Promise<Metadata> {
  const { identity } = await loadIdentity()

  return {
    title: {
      default: identity.name,
      template: `%s — ${identity.name}`,
    },
    description: identity.tagline,
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { identity, elsewhere, github } = await loadIdentity()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "scroll-smooth font-sans antialiased",
        fontSans.variable,
        fontMono.variable
      )}
    >
      <body>
        <ThemeProvider>
          <MotionProvider>
            <div className="flex min-h-svh flex-col">
              <SiteHeader
                identity={identity}
                navItems={navItems}
                actions={
                  <ButtonLink
                    href={`https://${github}`}
                    external
                    size="sm"
                    className="ml-2"
                  >
                    <GithubLogoIcon data-icon="inline-start" />
                    GitHub
                  </ButtonLink>
                }
              />
              <main className="flex-1">
                <RouteTransition>{children}</RouteTransition>
              </main>
              <SiteFooter
                identity={identity}
                navItems={navItems}
                elsewhere={elsewhere}
              />
            </div>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
