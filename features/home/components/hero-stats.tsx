import { Kicker } from "@/components/kicker"
import { CountUp } from "@/components/motion/count-up"
import { RevealGroup, RevealItem } from "@/components/motion/reveal"

import { LocalTime } from "@/features/home/components/local-time"
import type { Profile, Project } from "@/lib/content"

function HeroStats({
  profile,
  projects,
}: {
  profile: Profile
  projects: readonly Project[]
}) {
  const shipped = projects.filter(
    (project) => project.status === "shipped"
  ).length

  const stats = [
    { label: "Experience", value: profile.years },
    {
      label: "Projects shipped",
      value: <CountUp value={shipped} pad={2} />,
    },
    {
      label: "Based in",
      value: (
        <span className="flex flex-wrap items-baseline gap-x-2">
          {profile.location}
          <LocalTime timeZone={profile.timeZone} />
        </span>
      ),
    },
    { label: "Currently", value: profile.role },
  ]

  return (
    <RevealGroup
      as="dl"
      className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-7 md:grid-cols-4"
    >
      {stats.map((stat) => (
        <RevealItem key={stat.label} className="group grid gap-1.5">
          <dt>
            <Kicker className="transition-colors group-hover:text-foreground">
              {stat.label}
            </Kicker>
          </dt>
          <dd className="font-heading text-md leading-snug font-medium">
            {stat.value}
          </dd>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}

export { HeroStats }
