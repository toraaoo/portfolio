"use client"

import { AnimatePresence, motion } from "motion/react"
import * as React from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/toggle-group"
import { layoutMorph } from "@/lib/motion"

const ALL = "all"

export type FilterOption = {
  readonly value: string
  readonly label: string
  readonly count: number
}

export type FilterItem = {
  readonly key: string
  readonly status: string
  readonly node: React.ReactNode
}

function ProjectFilter({
  options,
  items,
}: {
  options: readonly FilterOption[]
  items: readonly FilterItem[]
}) {
  const [active, setActive] = React.useState(ALL)
  const visible =
    active === ALL ? items : items.filter((item) => item.status === active)
  const choices = [
    { value: ALL, label: "All", count: items.length },
    ...options,
  ]

  return (
    <div>
      <ToggleGroup
        aria-label="Filter projects by status"
        variant="outline"
        size="sm"
        value={[active]}
        onValueChange={(next) => setActive(next[0] ?? ALL)}
        className="flex-wrap"
      >
        {choices.map((choice) => (
          <ToggleGroupItem
            key={choice.value}
            value={choice.value}
            className="gap-2 text-muted-foreground uppercase data-pressed:border-brand/50 data-pressed:bg-card data-pressed:text-foreground"
          >
            {choice.label}
            <span className="text-brand tabular-nums">
              {String(choice.count).padStart(2, "0")}
            </span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <motion.div layout className="mt-6 grid gap-4.5 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item) => (
            <motion.div
              key={item.key}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={layoutMorph}
              className="h-full"
            >
              {item.node}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export { ProjectFilter }
