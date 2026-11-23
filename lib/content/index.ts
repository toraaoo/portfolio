import pagesJson from "@/content/pages.json"
import profileJson from "@/content/profile.json"
import projectsJson from "@/content/projects.json"
import { parseContent } from "@/lib/content/file"
import { type Pages, PagesFileSchema } from "@/lib/content/pages"
import { type Profile, ProfileFileSchema } from "@/lib/content/profile"
import { type Project, ProjectsFileSchema } from "@/lib/content/project"

export type { Pages, SectionCopy } from "@/lib/content/pages"
export type {
  ExperienceEntry,
  Profile,
  ToolboxGroup,
} from "@/lib/content/profile"
export type { Project, ProjectStatus } from "@/lib/content/project"
export { PROJECT_STATUSES, STATUS_LABELS } from "@/lib/content/project"

export const profile: Profile = parseContent(
  ProfileFileSchema,
  profileJson,
  "content/profile.json"
)

export const projects: readonly Project[] = parseContent(
  ProjectsFileSchema,
  projectsJson,
  "content/projects.json"
).projects

export const pages: Pages = parseContent(
  PagesFileSchema,
  pagesJson,
  "content/pages.json"
)
