import { ProjectCard } from "@/features/work/components/project-card"
import { ProjectFilter } from "@/features/work/components/project-filter"
import type { Project } from "@/lib/content"
import { PROJECT_STATUSES, STATUS_LABELS } from "@/lib/content"

function ProjectGallery({ projects }: { projects: readonly Project[] }) {
  const options = PROJECT_STATUSES.map((status) => ({
    value: status,
    label: STATUS_LABELS[status],
    count: projects.filter((project) => project.status === status).length,
  })).filter((option) => option.count > 0)

  return (
    <ProjectFilter
      options={options}
      items={projects.map((project) => ({
        key: project.slug,
        status: project.status,
        node: <ProjectCard project={project} />,
      }))}
    />
  )
}

export { ProjectGallery }
