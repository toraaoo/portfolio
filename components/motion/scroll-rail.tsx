"use client"

import { motion, useScroll, useSpring } from "motion/react"
import * as React from "react"
import { cn } from "@/lib/utils"

function ScrollRail({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  })
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      <div aria-hidden className="absolute inset-y-0 left-0 w-px bg-border" />
      <motion.div
        aria-hidden
        style={{ scaleY }}
        className="absolute inset-y-0 left-0 w-px origin-top bg-brand"
      />
      {children}
    </div>
  )
}

export { ScrollRail }
