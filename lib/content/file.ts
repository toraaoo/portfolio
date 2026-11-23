import { z } from "zod"

/**
 * Extends a strict content schema so a file may carry the editor-only
 * `$schema` key without failing validation.
 */
export const schemaKey = { $schema: z.string().optional() }

/**
 * Parses a content file, throwing a readable error that names the file.
 */
export function parseContent<Schema extends z.ZodType>(
  schema: Schema,
  data: unknown,
  file: string
): z.output<Schema> {
  const result = schema.safeParse(data)

  if (!result.success) {
    throw new Error(`Invalid ${file}:\n${z.prettifyError(result.error)}`)
  }

  return result.data
}
