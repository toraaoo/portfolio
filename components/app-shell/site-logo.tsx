import Link from "next/link"
import { Logomark } from "@/components/app-shell/logomark"
import { cn } from "@/lib/utils"

function SiteLogo({
  handle,
  href,
  className,
}: {
  handle: string
  href: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-80",
        className
      )}
    >
      <Logomark />
      <span className="hidden font-mono text-base font-bold tracking-tight sm:inline">
        {handle}
      </span>
      <span className="sr-only">{handle}</span>
    </Link>
  )
}

export { SiteLogo }
