import { ImageResponse } from "next/og"

import { SocialCard, socialCardSize } from "@/components/social/social-card"
import { profile } from "@/lib/content"

export const alt = `${profile.name} — ${profile.role}`
export const size = socialCardSize
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <SocialCard
      seed={profile.handle}
      brand={profile.name}
      eyebrow={profile.role}
      title={profile.headline}
      description={profile.coreStack.join(" · ")}
      footer={`${profile.location} · ${profile.timeZoneLabel}`}
    />,
    size
  )
}
