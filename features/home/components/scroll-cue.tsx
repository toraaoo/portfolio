"use client"

import { CaretDownIcon } from "@phosphor-icons/react"
import { motion, useReducedMotion } from "motion/react"

import { EASE_IN_OUT } from "@workspace/ui/lib/motion"

function ScrollCue({ label }: { label: string }) {
  const reduced = useReducedMotion()

  return (
    <div className="flex items-center gap-2.5 font-mono text-xs tracking-widest text-muted-foreground uppercase">
      {label}
      <motion.span
        aria-hidden
        animate={reduced ? undefined : { y: [0, 4, 0] }}
        transition={{
          duration: 1.8,
          ease: EASE_IN_OUT,
          repeat: Number.POSITIVE_INFINITY,
        }}
        className="inline-flex"
      >
        <CaretDownIcon className="size-3.5" />
      </motion.span>
    </div>
  )
}

export { ScrollCue }
