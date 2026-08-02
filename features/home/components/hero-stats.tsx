import { Kicker } from "@/components/kicker"
import { profile, projects } from "@/lib/content"

function HeroStats() {
  const shipped = projects.filter(
    (project) => project.status === "Shipped"
  ).length

  const stats = [
    { label: "Experience", value: profile.years },
    { label: "Projects shipped", value: String(shipped).padStart(2, "0") },
    { label: "Based in", value: `${profile.location} · ${profile.timezone}` },
    { label: "Currently", value: "Scheduling CI at Halyard" },
  ]

  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-7 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="grid gap-1.5">
          <dt>
            <Kicker>{stat.label}</Kicker>
          </dt>
          <dd className="font-heading text-md leading-snug font-medium">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export { HeroStats }
