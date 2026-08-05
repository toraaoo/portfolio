import { ArrowRightIcon, FileTextIcon } from "@phosphor-icons/react/ssr"
import { ButtonLink } from "@workspace/ui/components/button-link"
import { Container } from "@workspace/ui/components/container"
import { ItemGroup } from "@workspace/ui/components/item"
import { Kicker } from "@workspace/ui/components/kicker"
import { AmbientGrid } from "@workspace/ui/components/motion/ambient-grid"
import { MaskText } from "@workspace/ui/components/motion/mask-text"
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from "@workspace/ui/components/motion/reveal"
import { Typewriter } from "@workspace/ui/components/motion/typewriter"
import { Section } from "@workspace/ui/components/section"
import { SectionHeading } from "@workspace/ui/components/section-heading"
import { ContactBand, HeroStats, ToolboxBand } from "@/features/home/components"
import { ProjectCard, ProjectRow } from "@/features/work/components"
import { PostRow } from "@/features/writing/components"
import { posts, profile, projects } from "@/lib/content"
import { routes } from "@/lib/routes"

function HomePage() {
  const featured = projects.filter((project) => project.featured)
  const rest = projects.filter((project) => !project.featured).slice(0, 4)

  return (
    <div>
      <Section className="min-h-[calc(100svh-3.75rem)] pt-16 pb-24">
        <AmbientGrid />
        <Container>
          <RevealGroup>
            <RevealItem>
              <Kicker className="mb-5.5">
                <Typewriter text={`${profile.role} · ${profile.location}`} />
              </Kicker>
            </RevealItem>
            <h1 className="max-w-225 font-heading text-4xl leading-none font-medium tracking-tighter text-balance lg:text-5xl">
              <MaskText text={profile.headline} delay={0.15} />
            </h1>
            <RevealItem>
              <p className="mt-6.5 max-w-135 text-md leading-normal text-muted-foreground">
                {profile.intro}
              </p>
            </RevealItem>
            <RevealItem className="mt-7.5 flex flex-wrap gap-3">
              <ButtonLink href={routes.work} size="lg" className="group">
                View work
                <ArrowRightIcon
                  data-icon="inline-end"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                />
              </ButtonLink>
              <ButtonLink href={routes.about} size="lg" variant="outline">
                <FileTextIcon data-icon="inline-start" />
                About me
              </ButtonLink>
            </RevealItem>
            <RevealItem className="mt-14">
              <HeroStats />
            </RevealItem>
          </RevealGroup>
        </Container>
      </Section>

      <ToolboxBand />

      <Section>
        <Container>
          <SectionHeading
            index="01"
            title="Selected work"
            action={{ label: "All projects", href: routes.work }}
          />
          <RevealGroup className="grid gap-4.5 md:grid-cols-2">
            {featured.map((project) => (
              <RevealItem key={project.slug} className="h-full">
                <ProjectCard project={project} showMetric showRole />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal>
            <ItemGroup className="mt-4.5 gap-0 divide-y divide-border overflow-hidden rounded-xl border border-border">
              {rest.map((project, index) => (
                <ProjectRow
                  key={project.slug}
                  project={project}
                  index={index + featured.length + 1}
                />
              ))}
            </ItemGroup>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            index="02"
            title="Recent writing"
            action={{
              label: "All posts",
              href: routes.writing,
              external: true,
            }}
          />
          <RevealGroup>
            <ItemGroup className="gap-0">
              {posts.slice(0, 3).map((post) => (
                <RevealItem key={post.slug}>
                  <PostRow post={post} />
                </RevealItem>
              ))}
            </ItemGroup>
          </RevealGroup>

          <Reveal className="mt-10">
            <ContactBand />
          </Reveal>
        </Container>
      </Section>
    </div>
  )
}

export { HomePage }
