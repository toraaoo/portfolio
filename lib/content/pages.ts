import { z } from "zod"

import { schemaKey } from "@/lib/content/file"

const text = z.string().trim().min(1)

export const SectionCopySchema = z.strictObject({
  title: text,
  description: text,
})

export const PagesSchema = z.strictObject({
  home: z.strictObject({
    work: SectionCopySchema,
    toolbox: SectionCopySchema,
    contact: z.strictObject({ heading: text }),
  }),
  work: SectionCopySchema,
  about: z.strictObject({
    toolbox: SectionCopySchema,
    experience: SectionCopySchema,
  }),
})

export const PagesFileSchema = PagesSchema.extend(schemaKey)

export type Pages = z.output<typeof PagesSchema>
export type SectionCopy = z.output<typeof SectionCopySchema>
