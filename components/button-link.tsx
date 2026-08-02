import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import * as React from "react"

function ButtonLink({
  href,
  external = false,
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
          <a href={href} target="_blank" rel="noreferrer" />
        ) : (
          <Link href={href} />
        )
      }
      {...props}
    />
  )
}

export { ButtonLink }
