import { Empty, EmptyDescription } from "@workspace/ui/components/empty"
import { cn } from "@workspace/ui/lib/utils"

function VisualSlot({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <div className={cn("dark relative overflow-hidden rounded-xl", className)}>
      <div className="absolute inset-0 bg-background dot-grid text-muted" />
      <Empty className="relative h-full justify-center border-none">
        <EmptyDescription className="font-mono text-sm text-muted-foreground">
          {label}
        </EmptyDescription>
      </Empty>
    </div>
  )
}

export { VisualSlot }
