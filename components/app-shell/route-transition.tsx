"use client"

import { usePathname } from "next/navigation"
import type * as React from "react"
import { PageTransition } from "@/components/motion/page-transition"

function RouteTransition({ children }: { children: React.ReactNode }) {
  return <PageTransition routeKey={usePathname()}>{children}</PageTransition>
}

export { RouteTransition }
