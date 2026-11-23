import type { Requester } from "@/lib/api/request"
import type { ListPostsQuery, Page, PostSummary } from "@/lib/api/types"

export function postsResource(request: Requester) {
  return {
    list(query: ListPostsQuery = {}) {
      return request<Page<PostSummary>>("/posts", { query: { ...query } })
    },
  }
}
