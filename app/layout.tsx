import type { Metadata } from "next"
import { JetBrains_Mono, Space_Grotesk } from "next/font/google"

import "@workspace/ui/globals.css"
import { MotionProvider } from "@workspace/ui/components/motion/motion-provider"
import { ThemeProvider } from "@workspace/ui/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"

import { RouteTransition } from "@/components/app-shell/route-transition"
import { SiteFooter } from "@/components/app-shell/site-footer"
import { SiteHeader } from "@/components/app-shell/site-header"
import { profile } from "@/lib/content"

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
              <SiteHeader />
              <main className="flex-1">
                <RouteTransition>{children}</RouteTransition>
              </main>
              <SiteFooter />
            </div>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
