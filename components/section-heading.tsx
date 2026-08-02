import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import { ButtonLink } from "@/components/button-link"

function SectionHeading({
  index,
  title,
  action,
}: {
  index: string
  title: string
  action?: { label: string; href: string; external?: boolean }
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="flex items-baseline gap-3.5">
        <span className="font-mono text-sm font-semibold text-muted-foreground">
          {index}
        </span>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          {title}
        </h2>
      </div>
      {action ? (
        <ButtonLink
          href={action.href}
          external={action.external}
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
        >
          {action.label}
          <ArrowRightIcon data-icon="inline-end" />
        </ButtonLink>
      ) : null}
    </div>
  )
}

export { SectionHeading }
