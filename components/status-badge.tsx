import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"

import type { ProjectStatus } from "@/lib/content"

const dots: Partial<Record<ProjectStatus, string>> = {
  Shipped: "bg-success",
  WIP: "bg-warning",
}

function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus
  className?: string
}) {
  const dot = dots[status]

  return (
    <Badge
      variant="outline"
      className={cn("text-muted-foreground uppercase", className)}
    >
      {dot ? <span className={cn("size-1.5 rounded-full", dot)} /> : null}
      {status}
    </Badge>
  )
}

export { StatusBadge }
