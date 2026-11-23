"use client"

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react"
import * as React from "react"
import { CHAR_STEP } from "@/lib/motion"
import { cn } from "@/lib/utils"

function Typewriter({
  text,
  delay = 0,
  caret = true,
  className,
}: {
  text: string
  delay?: number
  caret?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  const count = useMotionValue(0)
  const typed = useTransform(count, (latest) =>
    text.slice(0, Math.round(latest))
  )

  React.useEffect(() => {
    if (reduced) {
      count.set(text.length)
      return
    }

    count.set(0)

    const controls = animate(count, text.length, {
      duration: text.length * CHAR_STEP,
      ease: "linear",
      delay,
    })

    return () => controls.stop()
  }, [count, delay, reduced, text])

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="sr-only">{text}</span>
      <motion.span aria-hidden>{typed}</motion.span>
      {caret ? (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.1em] bg-current animate-caret"
        />
      ) : null}
    </span>
  )
}

export { Typewriter }
