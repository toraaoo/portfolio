import { cn } from "@workspace/ui/lib/utils"
import Link from "next/link"

import { profile } from "@/lib/content"
import { routes } from "@/lib/routes"

function Logomark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      role="presentation"
      aria-hidden="true"
      className={cn("size-7", className)}
    >
      <rect
        x="1.5"
        y="1.5"
        width="61"
        height="61"
        rx="7"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M19 22L29 32L19 42"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
      <path
        d="M34 43H46"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
    </svg>
  )
}

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href={routes.home}
      className={cn(
        "inline-flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-80",
        className
      )}
    >
      <Logomark />
      <span className="font-mono text-base font-bold tracking-tight">
        <span className="opacity-55">&gt;</span>
        {profile.handle}
      </span>
    </Link>
  )
}

export { Logo, Logomark }
