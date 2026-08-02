import { cn } from "@workspace/ui/lib/utils"
import * as React from "react"

function Kicker({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

export { Kicker }
