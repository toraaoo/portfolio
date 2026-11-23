"use client"

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react"
import * as React from "react"
import { duration, EASE_OUT } from "@/lib/motion"
import { cn } from "@/lib/utils"

function Spotlight({
  size = 260,
  className,
}: {
  size?: number
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [active, setActive] = React.useState(false)

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, var(--spotlight), transparent 72%)`

  React.useEffect(() => {
    const host = ref.current?.parentElement
    if (!host || reduced) return

    function move(event: PointerEvent) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
      x.set(event.clientX - rect.left)
      y.set(event.clientY - rect.top)
    }

    function enter() {
      setActive(true)
    }

    function leave() {
      setActive(false)
    }

    host.addEventListener("pointermove", move)
    host.addEventListener("pointerenter", enter)
    host.addEventListener("pointerleave", leave)

    return () => {
      host.removeEventListener("pointermove", move)
      host.removeEventListener("pointerenter", enter)
      host.removeEventListener("pointerleave", leave)
    }
  }, [reduced, x, y])

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{ background }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: duration.slower, ease: EASE_OUT }}
      className={cn(
        "pointer-events-none absolute inset-0 z-0 opacity-0",
        className
      )}
    />
  )
}

export { Spotlight }
