"use client"

import { AnimatePresence, motion } from "motion/react"
import * as React from "react"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/empty"
import { Separator } from "@/components/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/toggle-group"
import { ProjectCard } from "@/features/work/components/project-card"
import { filterByStack, stacksOf } from "@/features/work/lib/stacks"
import type { Project } from "@/lib/content"
import { fadeUp, layoutMorph } from "@/lib/motion"

const ALL = "all"

function FilterItem({
  value,
  active,
  children,
}: {
  value: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <ToggleGroupItem
      value={value}
      className="relative isolate border-transparent bg-transparent transition-colors aria-pressed:bg-transparent aria-pressed:text-background"
    >
      {active ? (
        <motion.span
          layoutId="stack-filter"
          transition={layoutMorph}
          className="absolute inset-0 -z-10 rounded-md bg-foreground"
        />
      ) : null}
      {children}
    </ToggleGroupItem>
  )
}

function ProjectGallery({ projects }: { projects: Project[] }) {
  const [stack, setStack] = React.useState<string | null>(null)
  const stacks = React.useMemo(() => stacksOf(projects), [projects])
  const visible = filterByStack(projects, stack)

  return (
    <div>
      <ToggleGroup
        value={[stack ?? ALL]}
        onValueChange={(next: string[]) => {
          const selected = next[0]
          setStack(!selected || selected === ALL ? null : selected)
        }}
        variant="outline"
        className="flex-wrap rounded-lg border border-border p-1"
      >
        <FilterItem value={ALL} active={stack === null}>
          All
        </FilterItem>
        {stacks.map((item) => (
          <FilterItem key={item} value={item} active={stack === item}>
            {item}
          </FilterItem>
        ))}
      </ToggleGroup>

      <Separator className="mt-7 mb-7" />

      {visible.length ? (
        <div className="grid gap-4.5 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.div
                key={project.slug}
                layout
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit="exit"
                transition={layoutMorph}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyTitle className="font-mono text-sm">
                No projects with {stack}
              </EmptyTitle>
              <EmptyDescription>
                Clear the filter to see everything.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </motion.div>
      )}
    </div>
  )
}

export { ProjectGallery }
