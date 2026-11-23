"use client"

import { motion } from "motion/react"
import { Item, ItemContent, ItemDescription } from "@/components/item"
import { Kicker } from "@/components/kicker"
import { fadeUp, group, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

function SpecGrid({
  specs,
  className,
}: {
  specs: { label: string; value: string }[]
  className?: string
}) {
  return (
    <motion.div
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        "grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3",
        className
      )}
    >
      {specs.map((spec) => (
        <motion.div key={spec.label} variants={fadeUp}>
          <Item className="h-full items-start rounded-none bg-card px-5 py-4.5 transition-colors hover:bg-accent">
            <ItemContent className="gap-2">
              <Kicker>{spec.label}</Kicker>
              <ItemDescription className="text-sm leading-snug text-foreground">
                {spec.value}
              </ItemDescription>
            </ItemContent>
          </Item>
        </motion.div>
      ))}
    </motion.div>
  )
}

export { SpecGrid }
