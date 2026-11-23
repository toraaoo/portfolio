"use client"

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react"
import * as React from "react"
import { EASE_OUT, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

function CountUp({
  value,
  duration = 1.1,
  pad = 0,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number
  duration?: number
  pad?: number
  suffix?: string
  prefix?: string
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, viewportOnce)
  const reduced = useReducedMotion()
  const count = useMotionValue(0)
  const label = useTransform(count, (latest) => {
    const rounded = Math.round(latest)
    return `${prefix}${String(rounded).padStart(pad, "0")}${suffix}`
  })

  React.useEffect(() => {
    if (!inView) return

    if (reduced) {
      count.set(value)
      return
    }

    const controls = animate(count, value, { duration, ease: EASE_OUT })

    return () => controls.stop()
  }, [count, duration, inView, reduced, value])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      <span className="sr-only">{`${prefix}${String(value).padStart(pad, "0")}${suffix}`}</span>
      <motion.span aria-hidden>{label}</motion.span>
    </span>
  )
}

export { CountUp }
