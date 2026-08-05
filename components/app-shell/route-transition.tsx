"use client"

import { PageTransition } from "@workspace/ui/components/motion/page-transition"
import { usePathname } from "next/navigation"
import type * as React from "react"

function RouteTransition({ children }: { children: React.ReactNode }) {
  return <PageTransition routeKey={usePathname()}>{children}</PageTransition>
}

export { RouteTransition }
