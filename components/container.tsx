import type * as React from "react"
import { cn } from "@/lib/utils"

function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-content px-7", className)}
      {...props}
    />
  )
}

export { Container }
