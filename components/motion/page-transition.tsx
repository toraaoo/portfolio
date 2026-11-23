"use client"

import { motion } from "motion/react"
import type * as React from "react"
import { duration, EASE_OUT } from "@/lib/motion"

function PageTransition({
  routeKey,
  children,
}: {
  routeKey: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      key={routeKey}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.slower, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

export { PageTransition }
