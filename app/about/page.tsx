import { JsonLd } from "@/components/json-ld"
import { AboutPage } from "@/features/about/page"
import { profile } from "@/lib/content"
import { pageMetadata } from "@/lib/metadata"
import { routes } from "@/lib/routes"
import { profilePageJsonLd } from "@/lib/structured-data"

export const metadata = pageMetadata({
  title: "About",
  description: profile.intro,
  path: routes.about,
})

export default function Page() {
  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <AboutPage />
    </>
  )
}
