import { ArrowRightIcon, FileTextIcon } from "@phosphor-icons/react/ssr"
import { ItemGroup } from "@workspace/ui/components/item"

import { ButtonLink } from "@/components/button-link"
import { Container } from "@/components/container"
import { Kicker } from "@/components/kicker"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Section } from "@/components/section"
import { SectionHeading } from "@/components/section-heading"
import { ContactBand, HeroStats } from "@/features/home/components"
import { ProjectCard, ProjectRow } from "@/features/work/components"
import { PostRow } from "@/features/writing/components"
import { posts, profile, projects } from "@/lib/content"
import { routes } from "@/lib/routes"

function HomePage() {
  const featured = projects.filter((project) => project.featured)
  const rest = projects.filter((project) => !project.featured).slice(0, 4)

  return (
    <div>
      <Section>
        <Container>
          <RevealGroup>
            <RevealItem>
              <Kicker className="mb-5.5">
                {profile.role} · {profile.location}
              </Kicker>
            </RevealItem>
            <RevealItem>
              <h1 className="max-w-225 font-heading text-4xl leading-none font-medium tracking-tighter text-balance lg:text-5xl">
                {profile.headline}
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-6.5 max-w-135 text-md leading-normal text-muted-foreground">
                {profile.intro}
              </p>
            </RevealItem>
            <RevealItem className="mt-7.5 flex flex-wrap gap-3">
              <ButtonLink href={routes.work} size="lg">
                View work
                <ArrowRightIcon data-icon="inline-end" />
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

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              index="01"
              title="Selected work"
              action={{ label: "All projects", href: routes.work }}
            />
          </Reveal>
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
          <Reveal>
            <SectionHeading
              index="02"
              title="Recent writing"
              action={{
                label: "All posts",
                href: routes.writing,
                external: true,
              }}
            />
          </Reveal>
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
