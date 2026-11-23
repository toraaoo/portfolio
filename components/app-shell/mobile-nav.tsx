"use client"

import { ListIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/button"
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/drawer"
import { isActive, type NavItem } from "@/lib/routes"
import { cn } from "@/lib/utils"

function MobileNav({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen} swipeDirection="right">
      <DrawerTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Open navigation">
            <ListIcon />
          </Button>
        }
      />
      <DrawerContent className="ml-auto h-full w-72 max-w-[85vw]">
        <DrawerTitle className="sr-only">Navigation</DrawerTitle>
        <nav className="grid gap-1 px-5 pt-14">
          {items.map((item) => {
            const active = isActive(pathname, item)

            const className = cn(
              "border-b border-border py-3.5 font-mono text-sm transition-colors",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={className}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </DrawerContent>
    </Drawer>
  )
}

export { MobileNav }
