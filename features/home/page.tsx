import { ArrowRightIcon, FileTextIcon } from "@phosphor-icons/react/ssr"

import { ItemGroup } from "@workspace/ui/components/item"

import { ButtonLink } from "@/components/button-link"
import { Container } from "@/components/container"
import { Kicker } from "@/components/kicker"
import { SectionHeading } from "@/components/section-heading"
import { ProjectCard, ProjectRow } from "@/features/work/components"
import { PostRow } from "@/features/writing/components"
import { posts, profile, projects } from "@/lib/content"
import { routes } from "@/lib/routes"

function HomePage() {
  const featured = projects.filter((project) => project.featured)
  const rest = projects.filter((project) => !project.featured).slice(0, 4)

  return (
    <div>
      <Container className="pt-22 pb-16">
        <Kicker className="mb-5.5">
          {profile.role} · {profile.location}
        </Kicker>
        <h1 className="max-w-225 font-heading text-4xl leading-none font-medium tracking-tighter text-balance lg:text-5xl">
          {profile.headline}
        </h1>
        <p className="mt-6.5 max-w-135 text-md leading-normal text-muted-foreground">
          {profile.intro}
        </p>
        <div className="mt-7.5 flex flex-wrap gap-3">
          <ButtonLink href={routes.work} size="lg">
            View work
            <ArrowRightIcon data-icon="inline-end" />
          </ButtonLink>
          <ButtonLink href={routes.about} size="lg" variant="outline">
            <FileTextIcon data-icon="inline-start" />
            About me
          </ButtonLink>
        </div>
      </Container>

      <Container>
        <SectionHeading
          index="01"
          title="Selected work"
          action={{ label: "All projects", href: routes.work }}
        />
        <div className="grid gap-4.5 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} showMetric />
          ))}
        </div>

        <ItemGroup className="mt-4.5 gap-0 divide-y divide-border overflow-hidden rounded-xl border border-border">
          {rest.map((project, index) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={index + featured.length + 1}
            />
          ))}
        </ItemGroup>
      </Container>

      <Container className="mt-16">
        <SectionHeading
          index="02"
          title="Recent writing"
          action={{ label: "All posts", href: routes.writing, external: true }}
        />
        <ItemGroup className="gap-0">
          {posts.slice(0, 3).map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </ItemGroup>
      </Container>
    </div>
  )
}

export { HomePage }
