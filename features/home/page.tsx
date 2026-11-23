import { ArrowRightIcon, FileTextIcon } from "@phosphor-icons/react/ssr"
import { ButtonLink } from "@/components/button-link"
import { Container } from "@/components/container"
import { ItemGroup } from "@/components/item"
import { Kicker } from "@/components/kicker"
import { AmbientGlow } from "@/components/motion/ambient-glow"
import { HeroContours } from "@/components/motion/hero-contours"
import { MaskText } from "@/components/motion/mask-text"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Typewriter } from "@/components/motion/typewriter"
import { Section } from "@/components/section"
import { SplitSection } from "@/components/split-section"

import {
  ContactBand,
  HeroStats,
  ScrollCue,
  ToolboxGrid,
} from "@/features/home/components"
import { ProjectCard, ProjectRow } from "@/features/work/components"
import { pages, profile, projects } from "@/lib/content"
import { routes } from "@/lib/routes"

function HomePage() {
  const copy = pages.home
  const featured = projects.filter((project) => project.featured)
  const rest = projects.filter((project) => !project.featured).slice(0, 4)

  return (
    <div>
      <Section className="min-h-[calc(100svh-3.75rem)] pt-16 pb-10 short:pt-8 short:pb-6">
        <HeroContours seed="home" />
        <AmbientGlow />
        <Container className="flex flex-1 flex-col justify-center">
          <RevealGroup>
            <RevealItem>
              <Kicker className="mb-5.5">
                <Typewriter text={`${profile.role} · ${profile.location}`} />
              </Kicker>
            </RevealItem>
            <h1 className="max-w-225 font-heading text-3xl leading-none font-medium tracking-tighter text-balance sm:text-4xl lg:text-5xl">
              <MaskText text={profile.headline} delay={0.15} />
            </h1>
            <RevealItem>
              <p className="mt-6.5 max-w-135 text-md short:mt-4 leading-normal text-muted-foreground">
                {profile.intro}
              </p>
            </RevealItem>
            <RevealItem className="mt-7.5 flex flex-wrap gap-3 short:mt-5">
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
            <RevealItem className="mt-14 short:mt-8">
              <HeroStats profile={profile} />
            </RevealItem>
          </RevealGroup>
        </Container>
        <Container className="mt-12 max-sm:hidden short:hidden">
          <ScrollCue label="Scroll" />
        </Container>
      </Section>

      <Section tone="tint" className="border-t border-border">
        <Container>
          <SplitSection
            index="01"
            title={copy.work.title}
            description={copy.work.description}
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
            title={copy.toolbox.title}
            description={copy.toolbox.description}
            action={{ label: "More about me", href: routes.about }}
          >
            <ToolboxGrid groups={profile.toolbox} />
          </SplitSection>
        </Container>
      </Section>

      <Section tone="tint" className="border-t border-border">
        <Container>
          <Reveal>
            <ContactBand profile={profile} heading={copy.contact.heading} />
          </Reveal>
        </Container>
      </Section>
    </div>
  )
}

export { HomePage }
