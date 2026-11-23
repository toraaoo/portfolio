import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowSquareOutIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react/ssr"
import Link from "next/link"
import { ButtonLink } from "@/components/button-link"
import { Container } from "@/components/container"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/item"
import { Kicker } from "@/components/kicker"
import { MaskText } from "@/components/motion/mask-text"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Spotlight } from "@/components/motion/spotlight"
import { Prose, ProseHeading, ProseParagraph } from "@/components/prose"
import { ProseToc } from "@/components/prose-toc"
import { SpecGrid } from "@/components/spec-grid"

import { ProjectStatusBadge } from "@/features/work/components"
import type { Project } from "@/lib/content"
import { routes } from "@/lib/routes"
import { slugify } from "@/lib/slug"

const overview = "overview"

function ProjectPage({ project, next }: { project: Project; next: Project }) {
  const toc = [
    { id: overview, label: "Overview" },
    ...project.sections.map((section) => ({
      id: slugify(section.heading),
      label: section.heading,
    })),
  ]

  return (
    <div>
      <Container className="pt-16">
        <ButtonLink
          href={routes.work}
          variant="ghost"
          size="sm"
          className="group -ml-3 text-muted-foreground"
        >
          <ArrowLeftIcon
            data-icon="inline-start"
            className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
          />
          All work
        </ButtonLink>

        <RevealGroup>
          <RevealItem className="mt-9 flex items-center gap-3">
            <ProjectStatusBadge status={project.status} />
            <span className="font-mono text-sm text-muted-foreground">
              {project.year}
            </span>
          </RevealItem>
          <h1 className="mt-4.5 font-heading text-4xl font-medium tracking-tighter">
            <MaskText text={project.name} delay={0.1} />
          </h1>
          <RevealItem>
            <p className="mt-4.5 max-w-prose text-lg leading-snug text-muted-foreground">
              {project.blurb}
            </p>
          </RevealItem>
          <RevealItem>
            <SpecGrid
              className="mt-10"
              specs={[
                { label: "Role", value: project.role },
                { label: "Impact", value: project.metric },
                { label: "Stack", value: project.stack.join(" · ") },
              ]}
            />
          </RevealItem>
        </RevealGroup>
      </Container>

      <Container className="mt-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,11rem)] lg:gap-14">
          <Reveal className="min-w-0 max-w-prose">
            <Prose>
              <ProseHeading id={overview} className="mt-0">
                Overview
              </ProseHeading>
              <ProseParagraph>{project.summary}</ProseParagraph>

              {project.sections.map((section) => (
                <div key={section.heading}>
                  <ProseHeading id={slugify(section.heading)}>
                    {section.heading}
                  </ProseHeading>
                  {section.body.map((paragraph) => (
                    <ProseParagraph key={paragraph}>{paragraph}</ProseParagraph>
                  ))}
                </div>
              ))}
            </Prose>

            {project.sourceUrl || project.liveUrl ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.sourceUrl ? (
                  <ButtonLink href={project.sourceUrl} external>
                    <GithubLogoIcon data-icon="inline-start" />
                    Source
                  </ButtonLink>
                ) : null}
                {project.liveUrl ? (
                  <ButtonLink href={project.liveUrl} external variant="outline">
                    Live
                    <ArrowSquareOutIcon data-icon="inline-end" />
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}
          </Reveal>

          <Reveal className="max-lg:hidden">
            <ProseToc items={toc} className="sticky top-24" />
          </Reveal>
        </div>
      </Container>

      <Container className="mt-16 pb-24">
        <Reveal>
          <Item
            variant="muted"
            render={<Link href={routes.project(next.slug)} />}
            className="group relative isolate overflow-hidden rounded-xl border border-border px-6 py-6 transition-colors hover:border-brand/40"
          >
            <Spotlight size={420} />
            <ItemContent className="relative gap-1.5">
              <Kicker>Next project</Kicker>
              <ItemTitle className="font-heading text-lg font-semibold transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                {next.name}
              </ItemTitle>
              <ItemDescription>{next.blurb}</ItemDescription>
            </ItemContent>
            <ItemActions className="relative">
              <ArrowRightIcon className="size-5.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </ItemActions>
          </Item>
        </Reveal>
      </Container>
    </div>
  )
}

export { ProjectPage }
