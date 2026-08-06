import type {
  PostSummary,
  Profile,
  Project,
  ProjectStatus,
} from "@workspace/api-client"

import { api } from "@/lib/api"

export type {
  ExperienceEntry,
  PostSummary,
  Profile,
  Project,
  ProjectStatus,
  ToolboxGroup,
} from "@workspace/api-client"

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  shipped: "Shipped",
  wip: "WIP",
  open_source: "Open source",
  archived: "Archived",
}

export function loadProfile(): Promise<Profile> {
  return api.portfolio.profile()
}

export function loadProjects(): Promise<Project[]> {
  return api.portfolio.projects()
}

export async function loadPosts(limit = 3): Promise<PostSummary[]> {
  const page = await api.posts.list({ limit })
  return page.items
}
