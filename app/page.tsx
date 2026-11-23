import { JsonLd } from "@/components/json-ld"
import { HomePage } from "@/features/home/page"
import { profile } from "@/lib/content"
import { pageMetadata } from "@/lib/metadata"
import { routes } from "@/lib/routes"
import { websiteJsonLd } from "@/lib/structured-data"

export const metadata = pageMetadata({
  description: profile.tagline,
  path: routes.home,
})

export default function Page() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <HomePage />
    </>
  )
}
