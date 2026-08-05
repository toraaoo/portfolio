import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Spotlight } from "@workspace/ui/components/motion/spotlight"
import { StackTags } from "@workspace/ui/components/stack-tags"
import { cn } from "@workspace/ui/lib/utils"
import Link from "next/link"

import { ProjectStatusBadge } from "@/features/work/components/project-status"
import type { Project } from "@/lib/content"
import { routes } from "@/lib/routes"

function ProjectCard({
  project,
  showMetric = false,
  showRail = false,
  showRole = false,
}: {
  project: Project
  showMetric?: boolean
  showRail?: boolean
  showRole?: boolean
}) {
  return (
    <Link href={routes.project(project.slug)} className="group block h-full">
      <Card
        className={cn(
          "relative isolate h-full gap-5 overflow-hidden [--card-spacing:--spacing(6)]",
          "transition-[border-color,box-shadow,transform] duration-200 ease-out",
          "group-hover:-translate-y-0.5 group-hover:border-foreground/40 group-hover:shadow-md",
          showRail && project.featured && "border-l-2 border-l-foreground"
        )}
      >
        <Spotlight />
        <CardHeader className="relative items-baseline">
          <CardDescription className="font-mono text-sm">
            {showMetric ? project.metric : project.year}
          </CardDescription>
          <CardAction className="flex items-center gap-2">
            <ProjectStatusBadge status={project.status} />
            <ArrowUpRightIcon className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:text-foreground group-hover:opacity-100" />
          </CardAction>
        </CardHeader>
        <CardContent className="relative flex flex-1 flex-col gap-2">
          <CardTitle className="text-xl font-semibold tracking-tight">
            {project.name}
          </CardTitle>
          <p className="text-sm leading-normal text-muted-foreground">
            {project.blurb}
          </p>
          {showRole ? (
            <p className="mt-2 border-t border-border pt-3 font-mono text-xs text-muted-foreground">
              {project.role}
            </p>
          ) : null}
        </CardContent>
        <CardContent className="relative">
          <StackTags items={project.stack} />
        </CardContent>
      </Card>
    </Link>
  )
}

export { ProjectCard }
