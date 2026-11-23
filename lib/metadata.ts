import type { Metadata } from "next"

import { profile } from "@/lib/content"
import { siteUrl } from "@/lib/site"

const siteTitle = `${profile.name} — ${profile.role}`

function pageTitle(title: string) {
  return `${title} — ${profile.name}`
}

export const siteMetadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: siteTitle, template: pageTitle("%s") },
  description: profile.tagline,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  readonly title?: string
  readonly description: string
  readonly path: string
}): Metadata {
  const fullTitle = title ? pageTitle(title) : siteTitle

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: profile.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  }
}
