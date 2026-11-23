import type * as React from "react"
import { cn } from "@/lib/utils"

function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative flex scroll-mt-15 flex-col justify-center py-24",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export { Section }
