import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { ProjectCard } from "@/features/work/components/project-card"
import type { Project } from "@/lib/content"

function ProjectGallery({ projects }: { projects: readonly Project[] }) {
  return (
    <RevealGroup className="grid gap-4.5 md:grid-cols-2">
      {projects.map((project) => (
        <RevealItem key={project.slug} className="h-full">
          <ProjectCard project={project} />
        </RevealItem>
      ))}
    </RevealGroup>
  )
}

export { ProjectGallery }
