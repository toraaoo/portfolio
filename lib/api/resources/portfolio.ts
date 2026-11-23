import type { Requester } from "@/lib/api/request"
import type { Profile, Project } from "@/lib/api/types"

export function portfolioResource(request: Requester) {
  return {
    profile() {
      return request<Profile>("/portfolio/profile")
    },

    projects() {
      return request<Project[]>("/portfolio/projects")
    },
  }
}
