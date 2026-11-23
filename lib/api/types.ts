export interface Page<T> {
  items: T[]
  total: number
  limit: number
  offset: number
}

export type PostStatus = "draft" | "scheduled" | "published"

export interface PostTag {
  id: string
  slug: string
  label: string
}

export interface PostSeries {
  id: string
  slug: string
  title: string
}

export interface PostSummary {
  id: string
  slug: string
  title: string
  excerpt: string
  status: PostStatus
  publishedAt: string | null
  readingMinutes: number
  wordCount: number
  tags: PostTag[]
  series: PostSeries | null
  seriesPosition: number | null
}

export interface ToolboxGroup {
  label: string
  items: string[]
}

export interface ExperienceEntry {
  period: string
  role: string
  org: string
  note: string
}

export interface Profile {
  name: string
  initials: string
  handle: string
  role: string
  headline: string
  tagline: string
  intro: string
  bio: string[]
  location: string
  timezone: string
  timezoneCode: string
  email: string
  github: string
  years: string
  avatarAssetId: string | null
  toolbox: ToolboxGroup[]
  experience: ExperienceEntry[]
}

export type ProjectStatus = "shipped" | "wip" | "open_source" | "archived"

export interface ProjectSection {
  heading: string
  body: string[]
}

export interface Project {
  id: string
  slug: string
  name: string
  blurb: string
  summary: string
  year: string
  status: ProjectStatus
  stack: string[]
  sections: ProjectSection[]
  featured: boolean
  metric: string
  role: string
  codeSource: string
  codeCaption: string
  sourceUrl: string | null
  liveUrl: string | null
  coverAssetId: string | null
  position: number
}

export interface ListPostsQuery {
  limit?: number
  offset?: number
  q?: string
  tag?: string[]
  series?: string
}
