"use client"

import { motion, useReducedMotion } from "motion/react"
import { EASE_IN_OUT } from "@/lib/motion"
import { cn } from "@/lib/utils"

function VisualSlot({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  const reduced = useReducedMotion()

  return (
    <div
      className={cn(
        "dark group relative isolate overflow-hidden rounded-xl bg-background",
        className
      )}
    >
      <div aria-hidden className="dot-grid absolute inset-0 text-grid" />

      {reduced ? null : (
        <motion.div
          aria-hidden
          initial={{ x: "-60%" }}
          animate={{ x: "160%" }}
          transition={{
            duration: 9,
            ease: EASE_IN_OUT,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1.5,
          }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[var(--sheen)] to-transparent"
        />
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-sm text-muted-foreground"
        >
          {label}
        </motion.span>
      </div>

      <div
        aria-hidden
        className="absolute inset-0 rounded-xl ring-1 ring-border ring-inset"
      />
    </div>
  )
}

export { VisualSlot }
