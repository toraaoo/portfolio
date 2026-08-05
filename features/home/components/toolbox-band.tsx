import { Badge } from "@workspace/ui/components/badge"
import { Marquee } from "@workspace/ui/components/motion/marquee"

import { toolbox } from "@/lib/content"

function ToolboxBand() {
  const items = toolbox.flatMap((group) => group.items)

  return (
    <div className="border-y border-border bg-muted/40 py-4">
      <Marquee trackClassName="gap-3 pr-3">
        {items.map((item) => (
          <Badge
            key={item}
            variant="outline"
            className="border-border/70 bg-background font-mono text-muted-foreground"
          >
            {item}
          </Badge>
        ))}
      </Marquee>
    </div>
  )
}

export { ToolboxBand }
