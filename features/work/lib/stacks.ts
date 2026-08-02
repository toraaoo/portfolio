import type { Project } from "@/lib/content"

export function stacksOf(projects: Project[]) {
  return Array.from(new Set(projects.flatMap((project) => project.stack)))
}

export function filterByStack(projects: Project[], stack: string | null) {
  if (!stack) {
    return projects
  }

  return projects.filter((project) => project.stack.includes(stack))
}
