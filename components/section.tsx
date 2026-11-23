import type * as React from "react"
import { cn } from "@/lib/utils"

const tones = {
  plain: "",
  tint: "bg-tint",
} as const

function Section({
  className,
  tone = "plain",
  children,
  ...props
}: React.ComponentProps<"section"> & { tone?: keyof typeof tones }) {
  return (
    <section
      className={cn(
        "relative flex scroll-mt-15 flex-col justify-center py-24",
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export { Section }
