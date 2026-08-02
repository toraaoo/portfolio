"use client"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import { Separator } from "@workspace/ui/components/separator"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import { AnimatePresence, motion } from "motion/react"
import * as React from "react"

import { ProjectCard } from "@/features/work/components/project-card"
import { filterByStack, stacksOf } from "@/features/work/lib/stacks"
import type { Project } from "@/lib/content"
import { fadeUp, layoutMorph } from "@/lib/motion"

const ALL = "all"

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
        className="flex-wrap"
      >
        <ToggleGroupItem
          value={ALL}
          className="aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
        >
          All
        </ToggleGroupItem>
        {stacks.map((item) => (
          <ToggleGroupItem
            key={item}
            value={item}
            className="aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
          >
            {item}
          </ToggleGroupItem>
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
                <ProjectCard project={project} showRail />
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
