import { Fragment } from "react"
import { Kicker } from "@/components/kicker"
import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Separator } from "@/components/separator"

import type { Profile } from "@/lib/content"

function HeroStats({ profile }: { profile: Profile }) {
  const stats = [
    { label: "Experience", value: profile.years },
    { label: "Core stack", value: profile.coreStack.join(" · ") },
    { label: "Based in", value: profile.location },
    profile.openTo
      ? { label: "Open to", value: profile.openTo }
      : { label: "Currently", value: profile.role },
  ]

  return (
    <RevealGroup className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-7 md:flex md:justify-between">
      {stats.map((stat, index) => (
        <Fragment key={stat.label}>
          {index > 0 ? (
            <Separator orientation="vertical" className="max-md:hidden" />
          ) : null}
          <RevealItem as="dl" className="group grid gap-1.5">
            <dt>
              <Kicker className="transition-colors group-hover:text-foreground">
                {stat.label}
              </Kicker>
            </dt>
            <dd className="font-heading text-md leading-snug font-medium">
              {stat.value}
            </dd>
          </RevealItem>
        </Fragment>
      ))}
    </RevealGroup>
  )
}

export { HeroStats }
