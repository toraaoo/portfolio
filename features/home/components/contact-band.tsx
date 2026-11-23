import {
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react/ssr"
import { ButtonLink } from "@/components/button-link"
import { Card, CardContent } from "@/components/card"
import { Kicker } from "@/components/kicker"
import { Spotlight } from "@/components/motion/spotlight"

import type { Profile } from "@/lib/content"
import { routes } from "@/lib/routes"

function ContactBand({
  profile,
  heading,
}: {
  profile: Profile
  heading: string
}) {
  return (
    <Card className="relative isolate overflow-hidden [--card-spacing:--spacing(7)]">
      <Spotlight size={420} />
      <CardContent className="relative flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-125">
          <Kicker className="mb-3">{"// get in touch"}</Kicker>
          <p className="font-heading text-xl leading-snug font-medium tracking-tight">
            {heading}
          </p>
          <p className="mt-2 font-mono text-sm text-muted-foreground">
            {profile.email}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`mailto:${profile.email}`}>
            <EnvelopeSimpleIcon data-icon="inline-start" />
            Send a mail
          </ButtonLink>
          <ButtonLink href={profile.github} external variant="outline">
            <GithubLogoIcon data-icon="inline-start" />
            GitHub
          </ButtonLink>
          <ButtonLink href={routes.about} variant="ghost" className="group">
            About
            <ArrowRightIcon
              data-icon="inline-end"
              className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
            />
          </ButtonLink>
        </div>
      </CardContent>
    </Card>
  )
}

export { ContactBand }
