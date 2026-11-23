import { env } from "@/lib/env"

export const siteUrl = new URL(env.SITE_URL ?? "http://localhost:3000")

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).href
}
