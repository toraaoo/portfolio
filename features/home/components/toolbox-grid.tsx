import { Kicker } from "@/components/kicker"
import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { StackTags } from "@/components/stack-tags"

import type { ToolboxGroup } from "@/lib/content"

function ToolboxGrid({ groups }: { groups: ToolboxGroup[] }) {
  return (
    <RevealGroup className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
      {groups.map((group) => (
        <RevealItem
          key={group.label}
          className="bg-card p-6 transition-colors hover:bg-accent"
        >
          <Kicker className="mb-4">{group.label}</Kicker>
          <StackTags items={group.items} animated />
        </RevealItem>
      ))}
    </RevealGroup>
  )
}

export { ToolboxGrid }
