import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import Link from "next/link"

import { StackTags } from "@/components/stack-tags"
import { StatusBadge } from "@/components/status-badge"
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
          "h-full gap-5 transition-[border-color,box-shadow] [--card-spacing:--spacing(6)] group-hover:border-foreground/40 group-hover:shadow-md",
          showRail && project.featured && "border-l-2 border-l-foreground"
        )}
      >
        <CardHeader className="items-baseline">
          <CardDescription className="font-mono text-sm">
            {showMetric ? project.metric : project.year}
          </CardDescription>
          <CardAction>
            <StatusBadge status={project.status} />
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-2">
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
        <CardContent>
          <StackTags items={project.stack} />
        </CardContent>
      </Card>
    </Link>
  )
}

export { ProjectCard }
