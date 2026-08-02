import {
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react/ssr"
import { Card, CardContent } from "@workspace/ui/components/card"

import { ButtonLink } from "@/components/button-link"
import { Kicker } from "@/components/kicker"
import { profile } from "@/lib/content"
import { routes } from "@/lib/routes"

function ContactBand() {
  return (
    <Card className="[--card-spacing:--spacing(7)]">
      <CardContent className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-125">
          <Kicker className="mb-3">{"// get in touch"}</Kicker>
          <p className="font-heading text-xl leading-snug font-medium tracking-tight">
            Working on something with sharp edges? I read every mail.
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
          <ButtonLink
            href={`https://${profile.github}`}
            external
            variant="outline"
          >
            <GithubLogoIcon data-icon="inline-start" />
            GitHub
          </ButtonLink>
          <ButtonLink href={routes.about} variant="ghost">
            About
            <ArrowRightIcon data-icon="inline-end" />
          </ButtonLink>
        </div>
      </CardContent>
    </Card>
  )
}

export { ContactBand }
