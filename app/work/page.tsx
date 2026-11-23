import { WorkPage } from "@/features/work/page"
import { pages } from "@/lib/content"
import { pageMetadata } from "@/lib/metadata"
import { routes } from "@/lib/routes"

export const metadata = pageMetadata({
  title: pages.work.title,
  description: pages.work.description,
  path: routes.work,
})

export default function Page() {
  return <WorkPage />
}
