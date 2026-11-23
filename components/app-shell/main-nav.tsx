"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/navigation-menu"
import { layoutMorph } from "@/lib/motion"
import { isActive, type NavItem } from "@/lib/routes"
import { cn } from "@/lib/utils"

function MainNav({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-1">
        {items.map((item) => {
          const active = isActive(pathname, item)

          const label = (
            <>
              {item.label}
              {active ? (
                <motion.span
                  layoutId="nav-active"
                  transition={layoutMorph}
                  className="absolute inset-x-3 -bottom-px h-px bg-foreground"
                />
              ) : null}
            </>
          )

          return (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                data-active={active || undefined}
                render={<Link href={item.href}>{label}</Link>}
                className={cn(
                  "relative px-3 py-2 font-mono text-sm data-active:bg-transparent",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              />
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export { MainNav }
