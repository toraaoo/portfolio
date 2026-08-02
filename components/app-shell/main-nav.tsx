"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@workspace/ui/components/navigation-menu"
import { cn } from "@workspace/ui/lib/utils"
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

          return (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                data-active={active || undefined}
                render={
                  item.external ? (
                    <a href={item.href} />
                  ) : (
                    <Link href={item.href} />
                  )
                }
                className={cn(
                  "px-3 py-2 font-mono text-sm data-active:bg-transparent",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export { MainNav }
