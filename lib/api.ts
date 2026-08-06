import { createApiClient } from "@workspace/api-client"

export const api = createApiClient({
  baseUrl: process.env.API_URL ?? "http://localhost:3002/api",
  revalidate: 60,
})
