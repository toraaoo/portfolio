import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"

import { SocialCard, socialCardSize } from "@/components/social/social-card"
import { profile, projects, STATUS_LABELS } from "@/lib/content"

export const alt = `Project by ${profile.name}`
export const size = socialCardSize
export const contentType = "image/png"

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    notFound()
  }

  return new ImageResponse(
    <SocialCard
      seed={project.slug}
      brand={profile.name}
      eyebrow={`${STATUS_LABELS[project.status]} · ${project.year}`}
      title={project.name}
      description={project.blurb}
      footer={project.stack.join(" · ")}
    />,
    size
  )
}
