import { type Project, profile } from "@/lib/content"
import { routes } from "@/lib/routes"
import { absoluteUrl } from "@/lib/site"

const personId = absoluteUrl("/#person")
const websiteId = absoluteUrl("/#website")

function person() {
  return {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    alternateName: profile.handle,
    url: absoluteUrl(routes.home),
    ...(profile.avatar && { image: absoluteUrl(profile.avatar) }),
    jobTitle: profile.role,
    description: profile.tagline,
    address: { "@type": "PostalAddress", addressLocality: profile.location },
    knowsAbout: profile.coreStack,
    sameAs: [profile.github],
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absoluteUrl(routes.home),
        name: profile.name,
        description: profile.tagline,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      person(),
    ],
  }
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl(routes.about),
    isPartOf: { "@id": websiteId },
    mainEntity: person(),
  }
}

export function projectJsonLd(project: Project) {
  const links = [project.sourceUrl, project.liveUrl].filter(
    (link): link is string => link !== undefined
  )

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.blurb,
    description: project.summary,
    url: absoluteUrl(routes.project(project.slug)),
    dateCreated: project.year,
    keywords: project.stack,
    author: { "@type": "Person", "@id": personId, name: profile.name },
    isPartOf: { "@id": websiteId },
    ...(links.length > 0 && { sameAs: links }),
  }
}
