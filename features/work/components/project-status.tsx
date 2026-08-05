import { StatusBadge } from "@workspace/ui/components/status-badge"
import type { StatusTone } from "@workspace/ui/components/status-badge"

import type { ProjectStatus } from "@/lib/content"

const tones: Record<ProjectStatus, StatusTone> = {
  Shipped: "success",
  WIP: "warning",
  "Open source": "neutral",
  Archived: "neutral",
}

function ProjectStatusBadge({
  status,
  className,
}: {
  status: ProjectStatus
  className?: string
}) {
  return (
    <StatusBadge
      status={status}
      tone={tones[status]}
      pulse={status === "WIP"}
      className={className}
    />
  )
}

export { ProjectStatusBadge }
