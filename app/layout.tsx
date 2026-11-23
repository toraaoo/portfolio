import type { Metadata } from "next"
import { JetBrains_Mono, Space_Grotesk } from "next/font/google"

import "./globals.css"

import { RouteTransition } from "@/components/app-shell/route-transition"
import { SiteFooter } from "@/components/app-shell/site-footer"
import { SiteHeader } from "@/components/app-shell/site-header"
import { MotionProvider } from "@/components/motion/motion-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { profile } from "@/lib/content"
import { cn } from "@/lib/utils"

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
    default: profile.name,
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
      data-scroll-behavior="smooth"
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
