import { cn } from "@workspace/ui/lib/utils"
import * as React from "react"

const widths = {
  content: "max-w-content",
  prose: "max-w-prose",
  wide: "max-w-240",
  narrow: "max-w-190",
}

function Container({
  className,
  width = "content",
  ...props
}: React.ComponentProps<"div"> & { width?: keyof typeof widths }) {
  return (
    <div
      className={cn("mx-auto w-full px-7", widths[width], className)}
      {...props}
    />
  )
}

export { Container }
