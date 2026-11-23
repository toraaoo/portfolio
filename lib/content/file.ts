import { z } from "zod"

export const schemaKey = { $schema: z.string().optional() }

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
