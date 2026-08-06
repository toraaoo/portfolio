import type { StatusTone } from "@workspace/ui/components/status-badge"
import { StatusBadge } from "@workspace/ui/components/status-badge"

import type { ProjectStatus } from "@/lib/content"
import { STATUS_LABELS } from "@/lib/content"

const tones: Record<ProjectStatus, StatusTone> = {
  shipped: "success",
  wip: "warning",
  open_source: "neutral",
  archived: "neutral",
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
      status={STATUS_LABELS[status]}
      tone={tones[status]}
      pulse={status === "wip"}
      className={className}
    />
  )
}

export { ProjectStatusBadge }
