"use client"

import { ListIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/drawer"
import type { SiteNavItem } from "@/lib/site"
import { cn } from "@/lib/utils"

function MobileNav({ items }: { items: SiteNavItem[] }) {
  const pathname = usePathname()

  return (
    <Drawer swipeDirection="right">
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
            const active = (item.match ?? []).some((prefix) =>
              pathname.startsWith(prefix)
            )

            const className = cn(
              "border-b border-border py-3.5 font-mono text-sm transition-colors",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )

            return (
              <DrawerClose
                key={item.href}
                render={
                  item.external ? (
                    <a href={item.href} className={className}>
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className={className}>
                      {item.label}
                    </Link>
                  )
                }
              />
            )
          })}
        </nav>
      </DrawerContent>
    </Drawer>
  )
}

export { MobileNav }
