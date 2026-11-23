import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/json-ld"
import { ProjectPage } from "@/features/work/project-page"
import { projects } from "@/lib/content"
import { pageMetadata } from "@/lib/metadata"
import { routes } from "@/lib/routes"
import { projectJsonLd } from "@/lib/structured-data"

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return {}
  }

  return pageMetadata({
    title: project.name,
    description: project.blurb,
    path: routes.project(project.slug),
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const index = projects.findIndex((item) => item.slug === slug)
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  if (!project || !next) {
    notFound()
  }

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <ProjectPage project={project} next={next} />
    </>
  )
}
