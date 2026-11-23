"use client"

import { motion } from "motion/react"
import { ruleDraw, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** A hairline that draws in from the left on scroll, led by an accent tick. */
function DrawnRule({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn("relative block h-px", className)}
    >
      <motion.span
        variants={ruleDraw}
        className="absolute inset-0 origin-left bg-border"
      />
      <span className="absolute top-1/2 left-0 h-0.5 w-5 -translate-y-1/2 bg-brand" />
    </motion.span>
  )
}

export { DrawnRule }
