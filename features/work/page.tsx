import { Container } from "@/components/container"
import { Kicker } from "@/components/kicker"
import { MaskText } from "@/components/motion/mask-text"
import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Typewriter } from "@/components/motion/typewriter"

import { ProjectGallery } from "@/features/work/components"
import { loadProfile, loadProjects } from "@/lib/content"

async function WorkPage() {
  const [profile, projects] = await Promise.all([loadProfile(), loadProjects()])

  return (
    <Container className="pt-16">
      <RevealGroup>
        <RevealItem>
          <Kicker className="mb-4.5">
            <Typewriter
              text={`// ${projects.length} projects · ${profile.years}`}
            />
          </Kicker>
        </RevealItem>
        <h1 className="font-heading text-4xl font-medium tracking-tighter">
          <MaskText text="Work" delay={0.1} />
        </h1>
        <RevealItem>
          <p className="mt-4 max-w-140 text-md text-muted-foreground">
            Things I designed and built — mostly backend systems and the tools
            that make them usable.
          </p>
        </RevealItem>
      </RevealGroup>

      <div className="mt-8">
        <ProjectGallery projects={projects} />
      </div>
    </Container>
  )
}

export { WorkPage }
