"use client"

import { cn } from "@workspace/ui/lib/utils"
import { motion } from "motion/react"
import type * as React from "react"

import { fadeUp, group } from "@/lib/motion"

function Reveal({
  className,
  children,
  as = "div",
  ...props
}: React.ComponentProps<typeof motion.div> & { as?: "div" | "section" }) {
  const Component = as === "section" ? motion.section : motion.div

  return (
    <Component
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
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
  ...props
}: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function RevealItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div variants={fadeUp} className={cn(className)} {...props}>
      {children}
    </motion.div>
  )
}

export { Reveal, RevealGroup, RevealItem }
