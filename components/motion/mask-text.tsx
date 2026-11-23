"use client"

import { motion } from "motion/react"
import type * as React from "react"
import { maskGroup, maskUp, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

function MaskText({
  text,
  className,
  delay = 0,
  ...props
}: Omit<React.ComponentProps<typeof motion.span>, "children"> & {
  text: string
  delay?: number
}) {
  const words = text.split(" ")

  return (
    <motion.span
      variants={maskGroup}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delayChildren: delay }}
      className={cn("inline", className)}
      {...props}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <span
          key={`${word}-${index.toString()}`}
          aria-hidden
          className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] align-bottom"
        >
          <motion.span variants={maskUp} className="inline-block">
            {word}
            {index < words.length - 1 ? " " : null}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export { MaskText }
