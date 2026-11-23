import type { MetadataRoute } from "next"

import { projects } from "@/lib/content"
import { routes } from "@/lib/routes"
import { absoluteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    routes.home,
    routes.work,
    routes.about,
    ...projects.map((project) => routes.project(project.slug)),
  ]

  return paths.map((path) => ({ url: absoluteUrl(path) }))
}
