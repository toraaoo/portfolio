import { writeFile } from "node:fs/promises"
import { z } from "zod"

import { PagesFileSchema } from "@/lib/content/pages"
import { ProfileFileSchema } from "@/lib/content/profile"
import { ProjectsFileSchema } from "@/lib/content/project"

const schemas = {
  pages: PagesFileSchema,
  profile: ProfileFileSchema,
  projects: ProjectsFileSchema,
}

for (const [name, schema] of Object.entries(schemas)) {
  const jsonSchema = z.toJSONSchema(schema, { io: "input" })
  const path = `content/schemas/${name}.schema.json`

  await writeFile(path, `${JSON.stringify(jsonSchema, null, 2)}\n`)
}
