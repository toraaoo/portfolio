import type { Project } from "@/lib/content"

export function stacksOf(projects: readonly Project[]) {
  return Array.from(new Set(projects.flatMap((project) => project.stack)))
}

export function filterByStack(
  projects: readonly Project[],
  stack: string | null
) {
  if (!stack) {
    return projects
  }

  return projects.filter((project) => project.stack.includes(stack))
}
