import { cn } from "@workspace/ui/lib/utils"
import * as React from "react"

function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-md leading-relaxed text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function ProseHeading({ className, id, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      id={id}
      className={cn(
        "mt-10 mb-3.5 scroll-mt-24 font-heading text-xl font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  )
}

function ProseParagraph({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("mb-4.5", className)} {...props} />
}

export { Prose, ProseHeading, ProseParagraph }
