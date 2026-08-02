import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowSquareOutIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react/ssr"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@workspace/ui/components/item"
import Link from "next/link"

import { ButtonLink } from "@/components/button-link"
import { CodeBlock } from "@/components/code-block"
import { Container } from "@/components/container"
import { Kicker } from "@/components/kicker"
import { Prose, ProseHeading, ProseParagraph } from "@/components/prose"
import { SpecGrid } from "@/components/spec-grid"
import { StatusBadge } from "@/components/status-badge"
import { VisualSlot } from "@/components/visual-slot"
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
          className="-ml-3 text-muted-foreground"
        >
          <ArrowLeftIcon data-icon="inline-start" />
          All work
        </ButtonLink>

        <div className="mt-9 flex items-center gap-3">
          <StatusBadge status={project.status} />
          <span className="font-mono text-sm text-muted-foreground">
            {project.year}
          </span>
        </div>
        <h1 className="mt-4.5 font-heading text-4xl font-medium tracking-tighter">
          {project.name}
        </h1>
        <p className="mt-4.5 text-lg leading-snug text-muted-foreground">
          {project.blurb}
        </p>

        <SpecGrid
          className="mt-10"
          specs={[
            { label: "Role", value: project.role },
            { label: "Impact", value: project.metric },
            { label: "Stack", value: project.stack.join(" · ") },
          ]}
        />
      </Container>

      <Container width="wide" className="mt-12">
        <VisualSlot
          className="h-95"
          label="// project visual — drop a screenshot or diagram here"
        />
      </Container>

      <Container width="prose" className="mt-14">
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
      </Container>

      <Container width="narrow" className="mt-16">
        <Item
          variant="muted"
          render={<Link href={routes.project(next.slug)} />}
          className="rounded-xl border border-border px-6 py-6"
        >
          <ItemContent className="gap-1.5">
            <Kicker>Next project</Kicker>
            <ItemTitle className="font-heading text-lg font-semibold">
              {next.name}
            </ItemTitle>
            <ItemDescription>{next.blurb}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ArrowRightIcon className="size-5.5" />
          </ItemActions>
        </Item>
      </Container>
    </div>
  )
}

export { ProjectPage }
