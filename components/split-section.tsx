import { ArrowRightIcon } from "@phosphor-icons/react/ssr"
import type * as React from "react"
import { ButtonLink } from "@/components/button-link"
import { Kicker } from "@/components/kicker"
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
      <Reveal className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-center gap-3">
          <Kicker>{index}</Kicker>
          <span aria-hidden className="h-px flex-1 bg-border lg:hidden" />
        </div>
        <h2 className="mt-3 font-heading text-xl font-semibold tracking-tight text-balance">
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
