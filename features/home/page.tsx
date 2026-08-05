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
import { SplitSection } from "@workspace/ui/components/split-section"

import {
  ContactBand,
  HeroStats,
  ScrollCue,
  ToolboxGrid,
} from "@/features/home/components"
import { ProjectCard, ProjectRow } from "@/features/work/components"
import { PostRow } from "@/features/writing/components"
import { posts, profile, projects } from "@/lib/content"
import { routes } from "@/lib/routes"

function HomePage() {
  const featured = projects.filter((project) => project.featured)
  const rest = projects.filter((project) => !project.featured).slice(0, 4)

  return (
    <div>
      <Section className="min-h-[calc(100svh-3.75rem)] pt-16 pb-10">
        <AmbientGrid />
        <Container className="flex flex-1 flex-col justify-center">
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
        <Container className="mt-12">
          <ScrollCue label="Scroll" />
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <SplitSection
            index="01"
            title="Selected work"
            description="Six projects, mostly backend systems and the tooling around them. Two are worth a longer look."
            action={{ label: "All projects", href: routes.work }}
          >
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
          </SplitSection>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <SplitSection
            index="02"
            title="Toolbox"
            description="What I reach for. The list is short on purpose — depth beats breadth."
            action={{ label: "More about me", href: routes.about }}
          >
            <ToolboxGrid />
          </SplitSection>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <SplitSection
            index="03"
            title="Recent writing"
            description="Notes on databases, distributed systems and the tools I keep rebuilding."
            action={{
              label: "All posts",
              href: routes.writing,
              external: true,
            }}
          >
            <RevealGroup>
              <ItemGroup className="gap-0">
                {posts.slice(0, 3).map((post) => (
                  <RevealItem key={post.slug}>
                    <PostRow post={post} />
                  </RevealItem>
                ))}
              </ItemGroup>
            </RevealGroup>
          </SplitSection>

          <Reveal className="mt-16">
            <ContactBand />
          </Reveal>
        </Container>
      </Section>
    </div>
  )
}

export { HomePage }
