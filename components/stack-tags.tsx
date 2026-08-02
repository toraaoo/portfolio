import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"

function StackTags({
  items,
  className,
  variant = "outline",
}: {
  items: string[]
  className?: string
  variant?: "outline" | "secondary"
}) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <Badge key={item} variant={variant} className="text-muted-foreground">
          {item}
        </Badge>
      ))}
    </div>
  )
}

export { StackTags }
