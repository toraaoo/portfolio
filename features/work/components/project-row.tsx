import { ArrowRightIcon } from "@phosphor-icons/react/ssr"
import Link from "next/link"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/item"
import { StackTags } from "@/components/stack-tags"

import type { Project } from "@/lib/content"
import { routes } from "@/lib/routes"

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <Item
      render={<Link href={routes.project(project.slug)} />}
      className="group relative flex-nowrap items-start gap-4 rounded-none px-5 py-4 transition-colors hover:bg-accent sm:items-center"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-px origin-center scale-y-0 bg-brand transition-transform duration-200 ease-out group-hover:scale-y-100"
      />
      <ItemMedia className="relative grid size-5 place-items-center font-mono text-sm text-muted-foreground">
        <span className="transition-opacity duration-200 group-hover:opacity-0">
          {String(index).padStart(3, "0")}
        </span>
        <ArrowRightIcon className="absolute size-4 -translate-x-1 text-foreground opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
      </ItemMedia>
      <ItemContent className="min-w-0 gap-1 sm:flex-row sm:items-baseline sm:gap-x-3">
        <ItemTitle className="font-heading text-md font-semibold transition-transform duration-200 ease-out group-hover:translate-x-0.5">
          {project.name}
        </ItemTitle>
        <ItemDescription className="sm:truncate">
          {project.blurb}
        </ItemDescription>
      </ItemContent>
      <ItemActions className="shrink-0 gap-3">
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
