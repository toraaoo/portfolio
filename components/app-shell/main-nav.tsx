"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@workspace/ui/components/navigation-menu"
import { layoutMorph } from "@workspace/ui/lib/motion"
import { cn } from "@workspace/ui/lib/utils"
import { motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { navItems } from "@/lib/routes"

function MainNav() {
  const pathname = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-1">
        {navItems.map((item) => {
          const active = item.match.some((prefix) =>
            pathname.startsWith(prefix)
          )

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
                render={
                  item.external ? (
                    <a href={item.href}>{label}</a>
                  ) : (
                    <Link href={item.href}>{label}</Link>
                  )
                }
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
