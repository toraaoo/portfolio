"use client"

import { motion } from "motion/react"
import * as React from "react"
import { Kicker } from "@/components/kicker"
import { layoutMorph } from "@/lib/motion"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  label: string
}

function ProseToc({
  items,
  label = "On this page",
  className,
}: {
  items: TocItem[]
  label?: string
  className?: string
}) {
  const [active, setActive] = React.useState(items[0]?.id ?? "")

  React.useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null)

    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: "-80px 0px -65% 0px" }
    )

    for (const heading of headings) {
      observer.observe(heading)
    }

    return () => observer.disconnect()
  }, [items])

  return (
    <nav aria-label={label} className={cn("min-w-0", className)}>
      <Kicker className="mb-4">{label}</Kicker>
      <ul className="grid gap-0.5">
        {items.map((item) => {
          const current = item.id === active

          return (
            <li key={item.id} className="relative">
              {current ? (
                <motion.span
                  layoutId="toc-active"
                  transition={layoutMorph}
                  className="absolute inset-y-0 left-0 w-px bg-foreground"
                />
              ) : null}
              <a
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "block border-l border-border py-1.5 pl-4 text-sm transition-colors",
                  current
                    ? "border-transparent text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export type { TocItem }
export { ProseToc }
