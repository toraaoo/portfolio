"use client"

import { motion, useScroll, useTransform } from "motion/react"
import * as React from "react"
import { cn } from "@/lib/utils"

const DEFAULT_FADE =
  "radial-gradient(58% 46% at 50% 38%, black, transparent 100%)"

function AmbientGrid({
  className,
  fade = DEFAULT_FADE,
}: {
  className?: string
  fade?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <motion.div
        style={{ y, opacity, maskImage: fade, WebkitMaskImage: fade }}
        className="dot-grid absolute inset-x-0 -top-1/4 h-[150%] text-grid"
      />
    </div>
  )
}

export { AmbientGrid }
