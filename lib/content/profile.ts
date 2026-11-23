import { z } from "zod"

import { schemaKey } from "@/lib/content/file"

const text = z.string().trim().min(1)

export const ToolboxGroupSchema = z.strictObject({
  label: text,
  items: z.array(text).min(1),
})

export const ExperienceEntrySchema = z.strictObject({
  period: text,
  role: text,
  org: text,
  note: text,
})

export const ProfileSchema = z.strictObject({
  name: text,
  initials: text.max(3),
  handle: text,
  role: text,
  headline: text,
  tagline: text,
  intro: text,
  bio: z.array(text).min(1),
  location: text,
  timeZoneLabel: text,
  years: text,
  coreStack: z.array(text).min(1),
  openTo: text.optional(),
  email: z.email(),
  github: z.url(),
  toolbox: z.array(ToolboxGroupSchema),
  experience: z.array(ExperienceEntrySchema),
})

export const ProfileFileSchema = ProfileSchema.extend(schemaKey)

export type Profile = z.output<typeof ProfileSchema>
export type ToolboxGroup = z.output<typeof ToolboxGroupSchema>
export type ExperienceEntry = z.output<typeof ExperienceEntrySchema>
