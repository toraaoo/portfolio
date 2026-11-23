"use client"

import { motion, useReducedMotion } from "motion/react"
import { Badge } from "@/components/badge"
import { cn } from "@/lib/utils"

type StatusTone = "success" | "warning" | "danger" | "neutral"

const tones: Record<StatusTone, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-destructive",
  neutral: "bg-muted-foreground",
}

function StatusBadge({
  status,
  tone = "neutral",
  pulse = false,
  className,
}: {
  status: string
  tone?: StatusTone
  pulse?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  const dot = tone === "neutral" ? null : tones[tone]

  return (
    <Badge
      variant="outline"
      className={cn("text-muted-foreground uppercase", className)}
    >
      {dot ? (
        <span className="relative inline-flex size-1.5">
          <span className={cn("size-1.5 rounded-full", dot)} />
          {pulse && !reduced ? (
            <motion.span
              aria-hidden
              animate={{ scale: [1, 2.6], opacity: [0.55, 0] }}
              transition={{
                duration: 1.8,
                ease: "easeOut",
                repeat: Number.POSITIVE_INFINITY,
              }}
              className={cn("absolute inset-0 rounded-full", dot)}
            />
          ) : null}
        </span>
      ) : null}
      {status}
    </Badge>
  )
}

export type { StatusTone }
export { StatusBadge }
