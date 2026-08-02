import { Container } from "@/components/container"
import { Kicker } from "@/components/kicker"
import { ProjectGallery } from "@/features/work/components"
import { profile, projects } from "@/lib/content"

function WorkPage() {
  return (
    <Container className="pt-16">
      <Kicker className="mb-4.5">
        {`// ${projects.length} projects · ${profile.years}`}
      </Kicker>
      <h1 className="font-heading text-4xl font-medium tracking-tighter">
        Work
      </h1>
      <p className="mt-4 max-w-140 text-md text-muted-foreground">
        Things I designed and built — mostly backend systems and the tools that
        make them usable.
      </p>

      <div className="mt-8">
        <ProjectGallery projects={projects} />
      </div>
    </Container>
  )
}

export { WorkPage }
