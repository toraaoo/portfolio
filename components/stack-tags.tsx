"use client"

import { motion } from "motion/react"
import { Badge } from "@/components/badge"
import { group, softSpring, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

const item = {
  hidden: { opacity: 0, y: 4, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
}

function StackTags({
  items,
  className,
  variant = "outline",
  animated = false,
}: {
  items: string[]
  className?: string
  variant?: "outline" | "secondary"
  animated?: boolean
}) {
  if (!animated) {
    return (
      <div className={cn("flex flex-wrap gap-1.5", className)}>
        {items.map((entry) => (
          <Badge
            key={entry}
            variant={variant}
            className="text-muted-foreground"
          >
            {entry}
          </Badge>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn("flex flex-wrap gap-1.5", className)}
    >
      {items.map((entry) => (
        <motion.div
          key={entry}
          variants={item}
          transition={softSpring}
          whileHover={{ y: -2 }}
        >
          <Badge
            variant={variant}
            className="text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
          >
            {entry}
          </Badge>
        </motion.div>
      ))}
    </motion.div>
  )
}

export { StackTags }
