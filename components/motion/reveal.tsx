"use client"

import { motion } from "motion/react"
import type * as React from "react"
import { fadeUp, group, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

type RevealTag = "div" | "section" | "li" | "dl" | "ul"

const tags = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  dl: motion.dl,
  ul: motion.ul,
} as unknown as Record<RevealTag, typeof motion.div>

function Reveal({
  className,
  children,
  as = "div",
  delay = 0,
  ...props
}: React.ComponentProps<typeof motion.div> & {
  as?: RevealTag
  delay?: number
}) {
  const Component = tags[as]

  return (
    <Component
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  )
}

function RevealGroup({
  className,
  children,
  as = "div",
  ...props
}: React.ComponentProps<typeof motion.div> & { as?: RevealTag }) {
  const Component = tags[as]

  return (
    <Component
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  )
}

function RevealItem({
  className,
  children,
  as = "div",
  ...props
}: React.ComponentProps<typeof motion.div> & { as?: RevealTag }) {
  const Component = tags[as]

  return (
    <Component variants={fadeUp} className={cn(className)} {...props}>
      {children}
    </Component>
  )
}

export { Reveal, RevealGroup, RevealItem }
