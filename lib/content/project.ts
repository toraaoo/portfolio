import { z } from "zod"

import { schemaKey } from "@/lib/content/file"

const text = z.string().trim().min(1)

export const PROJECT_STATUSES = [
  "shipped",
  "wip",
  "open_source",
  "archived",
] as const

export type ProjectStatus = (typeof PROJECT_STATUSES)[number]

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  shipped: "Shipped",
  wip: "WIP",
  open_source: "Open source",
  archived: "Archived",
}

export const ProjectSchema = z.strictObject({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase-kebab-case"),
  name: text,
  blurb: text,
  summary: text,
  year: text,
  status: z.enum(PROJECT_STATUSES),
  role: text,
  metric: text,
  stack: z.array(text).min(1),
  featured: z.boolean().default(false),
  sections: z
    .array(z.strictObject({ heading: text, body: z.array(text).min(1) }))
    .default([]),
  sourceUrl: z.url().optional(),
  liveUrl: z.url().optional(),
})

export const ProjectsFileSchema = z.strictObject({
  ...schemaKey,
  projects: z.array(ProjectSchema).superRefine((projects, context) => {
    const seen = new Set<string>()

    for (const [index, project] of projects.entries()) {
      if (seen.has(project.slug)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate slug "${project.slug}"`,
          path: [index, "slug"],
        })
      }
      seen.add(project.slug)
    }
  }),
})

export type Project = z.output<typeof ProjectSchema>
