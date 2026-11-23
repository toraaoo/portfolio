import { z } from "zod"

const EnvSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    SITE_URL: z.url({ protocol: /^https?$/ }).optional(),
  })
  .refine((env) => env.NODE_ENV !== "production" || env.SITE_URL, {
    message: "Required for production builds, e.g. https://example.com",
    path: ["SITE_URL"],
  })

function parseEnv() {
  const result = EnvSchema.safeParse(process.env)

  if (!result.success) {
    throw new Error(`Invalid environment:\n${z.prettifyError(result.error)}`)
  }

  return result.data
}

export const env = parseEnv()
