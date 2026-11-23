"use client"

import { motion, useScroll, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.25,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-brand",
        className
      )}
    />
  )
}

export { ScrollProgress }
