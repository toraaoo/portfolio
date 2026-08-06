import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectPage } from "@/features/work/project-page"
import { loadProjects } from "@/lib/content"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const projects = await loadProjects()
  const project = projects.find((item) => item.slug === slug)

  return {
    title: project?.name,
    description: project?.blurb,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const projects = await loadProjects()
  const index = projects.findIndex((item) => item.slug === slug)
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  if (!project || !next) {
    notFound()
  }

  return <ProjectPage project={project} next={next} />
}
