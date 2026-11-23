import { createRequester } from "@/lib/api/request"
import { portfolioResource } from "@/lib/api/resources/portfolio"
import { postsResource } from "@/lib/api/resources/posts"

const request = createRequester({
  baseUrl: process.env.API_URL ?? "http://localhost:3002/api",
  revalidate: 60,
})

export const api = {
  portfolio: portfolioResource(request),
  posts: postsResource(request),
}
