import type { Metadata } from "next"
import { JetBrains_Mono, Space_Grotesk } from "next/font/google"

import "./globals.css"

import { GithubLogoIcon } from "@phosphor-icons/react/ssr"
import { RouteTransition } from "@/components/app-shell/route-transition"
import { SiteFooter } from "@/components/app-shell/site-footer"
import { SiteHeader } from "@/components/app-shell/site-header"
import { ButtonLink } from "@/components/button-link"
import { MotionProvider } from "@/components/motion/motion-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { navItems } from "@/lib/routes"
import { loadIdentity } from "@/lib/site-identity"
import { cn } from "@/lib/utils"

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
