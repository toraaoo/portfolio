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
import * as React from "react"

import { ProjectCard } from "@/features/work/components/project-card"
import { filterByStack, stacksOf } from "@/features/work/lib/stacks"
import type { Project } from "@/lib/content"

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
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} showRail />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  )
}

export { ProjectGallery }
