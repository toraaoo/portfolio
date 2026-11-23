import Link from "next/link"
import type * as React from "react"
import { Button } from "@/components/button"

function ButtonLink({
  href,
  external = false,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "render" | "nativeButton"> & {
  href: string
  external?: boolean
}) {
  return (
    <Button
      nativeButton={false}
      render={
        external ? (
          <a href={href} target="_blank" rel="noreferrer">
            {children}
          </a>
        ) : (
          <Link href={href}>{children}</Link>
        )
      }
      {...props}
    />
  )
}

export { ButtonLink }
