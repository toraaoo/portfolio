import {
  Item,
  ItemContent,
  ItemDescription,
} from "@workspace/ui/components/item"
import { cn } from "@workspace/ui/lib/utils"

import { Kicker } from "@/components/kicker"

function SpecGrid({
  specs,
  className,
}: {
  specs: { label: string; value: string }[]
  className?: string
}) {
  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3",
        className
      )}
    >
      {specs.map((spec) => (
        <Item
          key={spec.label}
          className="items-start rounded-none bg-card px-5 py-4.5"
        >
          <ItemContent className="gap-2">
            <Kicker>{spec.label}</Kicker>
            <ItemDescription className="text-sm leading-snug text-foreground">
              {spec.value}
            </ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}

export { SpecGrid }
