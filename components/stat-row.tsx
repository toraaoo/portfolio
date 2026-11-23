import { Fragment } from "react"
import { Kicker } from "@/components/kicker"
import { CountUp } from "@/components/motion/count-up"
import { Separator } from "@/components/separator"

export type Stat = {
  readonly label: string
  readonly value: number
  readonly suffix?: string
}

function StatRow({ stats }: { stats: readonly Stat[] }) {
  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-6 border-t border-border pt-7">
      {stats.map((stat, index) => (
        <Fragment key={stat.label}>
          {index > 0 ? (
            <Separator orientation="vertical" className="max-sm:hidden" />
          ) : null}
          <div className="grid gap-1">
            <dt>
              <Kicker>{stat.label}</Kicker>
            </dt>
            <dd className="font-heading text-3xl font-medium tracking-tight">
              <CountUp value={stat.value} pad={2} suffix={stat.suffix} />
            </dd>
          </div>
        </Fragment>
      ))}
    </dl>
  )
}

export { StatRow }
