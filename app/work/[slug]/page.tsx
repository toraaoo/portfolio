import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectPage } from "@/features/work/project-page"
import { getProject, projects } from "@/lib/content"

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

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
  const project = getProject(slug)

  if (!project) {
    notFound()
  }

  const index = projects.findIndex((item) => item.slug === project.slug)
  const next = projects[(index + 1) % projects.length]!

  return <ProjectPage project={project} next={next} />
}
