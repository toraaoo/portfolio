export type ProjectStatus = "Shipped" | "WIP" | "Open source" | "Archived"

export interface Project {
  slug: string
  name: string
  blurb: string
  year: string
  status: ProjectStatus
  stack: string[]
  featured: boolean
  metric: string
  role: string
  summary: string
  sections: { heading: string; body: string[] }[]
  code: { source: string; caption: string }
  links: { source: string; live: string }
}

export interface Post {
  slug: string
  title: string
  date: string
  read: string
  tag: string
  excerpt: string
}

export interface Profile {
  name: string
  initials: string
  handle: string
  role: string
  headline: string
  tagline: string
  location: string
  timezone: string
  email: string
  github: string
  years: string
  intro: string
  bio: string[]
}

export interface ToolboxGroup {
  label: string
  items: string[]
}

export interface ExperienceEntry {
  when: string
  role: string
  org: string
  note: string
}
