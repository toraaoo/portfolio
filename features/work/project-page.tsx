import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowSquareOutIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react/ssr"
import { ButtonLink } from "@workspace/ui/components/button-link"
import { CodeBlock } from "@workspace/ui/components/code-block"
import { Container } from "@workspace/ui/components/container"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@workspace/ui/components/item"
import { Kicker } from "@workspace/ui/components/kicker"
import { MaskText } from "@workspace/ui/components/motion/mask-text"
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from "@workspace/ui/components/motion/reveal"
import { Spotlight } from "@workspace/ui/components/motion/spotlight"
import {
  Prose,
  ProseHeading,
  ProseParagraph,
} from "@workspace/ui/components/prose"
import { SpecGrid } from "@workspace/ui/components/spec-grid"
import { VisualSlot } from "@workspace/ui/components/visual-slot"
import Link from "next/link"

import { ProjectStatusBadge } from "@/features/work/components"
import type { Project } from "@/lib/content"
import { routes } from "@/lib/routes"

function ProjectPage({ project, next }: { project: Project; next: Project }) {
  return (
    <div>
      <Container width="narrow" className="pt-12">
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
            <p className="mt-4.5 text-lg leading-snug text-muted-foreground">
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

      <Container width="wide" className="mt-12">
        <Reveal>
          <VisualSlot
            className="h-95"
            label="// project visual — drop a screenshot or diagram here"
          />
        </Reveal>
      </Container>

      <Container width="prose" className="mt-14">
        <Reveal>
          <Prose>
            <ProseHeading className="mt-0">Overview</ProseHeading>
            <ProseParagraph>{project.summary}</ProseParagraph>

            {project.sections.map((section) => (
              <div key={section.heading}>
                <ProseHeading>{section.heading}</ProseHeading>
                {section.body.map((paragraph) => (
                  <ProseParagraph key={paragraph}>{paragraph}</ProseParagraph>
                ))}
              </div>
            ))}

            <CodeBlock
              code={project.code.source}
              caption={project.code.caption}
            />
          </Prose>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={project.links.source} external>
              <GithubLogoIcon data-icon="inline-start" />
              Source
            </ButtonLink>
            <ButtonLink href={project.links.live} external variant="outline">
              Live
              <ArrowSquareOutIcon data-icon="inline-end" />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>

      <Container width="narrow" className="mt-16">
        <Reveal>
          <Item
            variant="muted"
            render={<Link href={routes.project(next.slug)} />}
            className="group relative isolate overflow-hidden rounded-xl border border-border px-6 py-6 transition-colors hover:border-foreground/40"
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
