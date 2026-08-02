import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"
import Link from "next/link"

import { StackTags } from "@/components/stack-tags"
import type { Project } from "@/lib/content"
import { routes } from "@/lib/routes"

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <Item
      render={<Link href={routes.project(project.slug)} />}
      className="gap-4 rounded-none px-5 py-4"
    >
      <ItemMedia className="font-mono text-sm text-muted-foreground">
        {String(index).padStart(3, "0")}
      </ItemMedia>
      <ItemContent className="flex-row flex-wrap items-baseline gap-x-3 gap-y-1">
        <ItemTitle className="font-heading text-md font-semibold">
          {project.name}
        </ItemTitle>
        <ItemDescription className="truncate">{project.blurb}</ItemDescription>
      </ItemContent>
      <ItemActions className="gap-3">
        <StackTags
          items={project.stack.slice(0, 2)}
          className="max-sm:hidden"
        />
        <span className="font-mono text-sm text-muted-foreground">
          {project.year}
        </span>
      </ItemActions>
    </Item>
  )
}

export { ProjectRow }
