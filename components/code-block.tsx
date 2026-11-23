"use client"

import { CheckIcon, CopyIcon } from "@phosphor-icons/react"
import { useCopyToClipboard } from "@uidotdev/usehooks"
import { AnimatePresence, motion } from "motion/react"
import * as React from "react"
import { Button } from "@/components/button"
import { iconSwap } from "@/lib/motion"
import { cn } from "@/lib/utils"

function CodeBlock({
  code,
  caption,
  language,
  className,
  children,
}: {
  code: string
  caption?: string
  language?: string
  className?: string
  children?: React.ReactNode
}) {
  const [, copyToClipboard] = useCopyToClipboard()
  const [copiedAt, setCopiedAt] = React.useState<number | null>(null)
  const copied = copiedAt !== null

  React.useEffect(() => {
    if (copiedAt === null) return

    const timer = window.setTimeout(() => setCopiedAt(null), 1600)

    return () => window.clearTimeout(timer)
  }, [copiedAt])

  async function copy() {
    await copyToClipboard(code)
    setCopiedAt(Date.now())
  }

  const control = (
    <Button
      type="button"
      onClick={copy}
      variant="ghost"
      size="icon-sm"
      aria-label={copied ? "Copied" : "Copy code"}
      className="text-muted-foreground opacity-0 transition-opacity focus-visible:opacity-100 group-hover/code:opacity-100"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={copied ? "copied" : "copy"}
          variants={iconSwap}
          initial="hidden"
          animate="show"
          exit="exit"
          className="inline-flex"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </motion.span>
      </AnimatePresence>
    </Button>
  )

  return (
    <figure className={cn("group/code my-6", className)}>
      <div className="dark relative overflow-hidden rounded-xl border border-border bg-card">
        {language ? (
          <div className="flex items-center justify-between border-b border-border/70 py-1.5 pr-1.5 pl-5">
            <span className="font-mono text-2xs tracking-widest text-muted-foreground uppercase">
              {language}
            </span>
            {control}
          </div>
        ) : (
          <div className="absolute top-2.5 right-2.5 z-10">{control}</div>
        )}

        {children ? (
          <div className="[&_pre]:overflow-x-auto [&_pre]:bg-transparent! [&_pre]:px-5 [&_pre]:py-4.5 [&_pre]:text-sm [&_pre]:leading-relaxed">
            {children}
          </div>
        ) : (
          <pre className="overflow-x-auto px-5 py-4.5 text-sm leading-relaxed text-foreground">
            <code>{code}</code>
          </pre>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-2 font-mono text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

export { CodeBlock }
