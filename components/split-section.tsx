import { ArrowRightIcon } from "@phosphor-icons/react/ssr"
import type * as React from "react"
import { ButtonLink } from "@/components/button-link"
import { Kicker } from "@/components/kicker"
import { DrawnRule } from "@/components/motion/drawn-rule"
import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

function SplitSection({
  index,
  title,
  description,
  action,
  className,
  children,
}: {
  index: string
  title: string
  description?: string
  action?: { label: string; href: string; external?: boolean }
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "grid gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-14",
        className
      )}
    >
      <Reveal className="relative isolate lg:sticky lg:top-24 lg:self-start">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-6 -left-1 -z-10 font-heading text-[5rem] sm:-top-10 sm:-left-1.5 sm:text-[7.5rem] leading-none font-semibold tracking-tighter text-foreground/[0.045] select-none"
        >
          {index}
        </span>
        <div className="flex items-center gap-3">
          <Kicker className="text-brand">{index}</Kicker>
          <DrawnRule className="flex-1" />
        </div>
        <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-balance">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
        {action ? (
          <ButtonLink
            href={action.href}
            external={action.external}
            variant="ghost"
            size="sm"
            className="group mt-4 -ml-3 text-muted-foreground"
          >
            {action.label}
            <ArrowRightIcon
              data-icon="inline-end"
              className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
            />
          </ButtonLink>
        ) : null}
      </Reveal>

      <div className="min-w-0">{children}</div>
    </div>
  )
}

export { SplitSection }
