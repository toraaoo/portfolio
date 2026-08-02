import { cn } from "@workspace/ui/lib/utils"
import type * as React from "react"

function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "flex min-h-svh scroll-mt-15 snap-start flex-col justify-center py-20",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export { Section }
