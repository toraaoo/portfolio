import { Container } from "@/components/container"
import { Kicker } from "@/components/kicker"
import { AmbientGlow } from "@/components/motion/ambient-glow"
import { MaskText } from "@/components/motion/mask-text"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Typewriter } from "@/components/motion/typewriter"
import { StatRow } from "@/components/stat-row"

import { ProjectGallery } from "@/features/work/components"
import {
  PROJECT_STATUSES,
  pages,
  profile,
  projects,
  STATUS_LABELS,
} from "@/lib/content"

function WorkPage() {
  const stats = [
    { label: "Projects", value: projects.length },
    ...PROJECT_STATUSES.map((status) => ({
      label: STATUS_LABELS[status],
      value: projects.filter((project) => project.status === status).length,
    })).filter((stat) => stat.value > 0),
  ]

  return (
    <div className="relative isolate">
      <AmbientGlow />
      <Container className="pt-16 pb-24">
        <RevealGroup>
          <RevealItem>
            <Kicker className="mb-4.5">
              <Typewriter
                text={`// ${projects.length} projects · ${profile.years}`}
              />
            </Kicker>
          </RevealItem>
          <h1 className="font-heading text-4xl font-medium tracking-tighter">
            <MaskText text={pages.work.title} delay={0.1} />
          </h1>
          <RevealItem>
            <p className="mt-4 max-w-140 text-md text-muted-foreground">
              {pages.work.description}
            </p>
          </RevealItem>
          <RevealItem className="mt-10">
            <StatRow stats={stats} />
          </RevealItem>
        </RevealGroup>

        <Reveal className="mt-14">
          <ProjectGallery projects={projects} />
        </Reveal>
      </Container>
    </div>
  )
}

export { WorkPage }
