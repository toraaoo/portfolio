"use client"

import { motion } from "motion/react"
import { Kicker } from "@/components/kicker"
import { fadeUp, group, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

function SpecGrid({
  specs,
  className,
}: {
  specs: { label: string; value: string }[]
  className?: string
}) {
  return (
    <motion.dl
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn("grid gap-3 sm:grid-cols-3", className)}
    >
      {specs.map((spec) => (
        <motion.div
          key={spec.label}
          variants={fadeUp}
          className="group relative overflow-hidden rounded-xl border border-border bg-card px-5 py-4.5 transition-colors duration-200 hover:border-brand/40"
        >
          <span
            aria-hidden
            className="absolute top-0 left-5 h-0.5 w-5 bg-brand transition-[width] duration-300 ease-out group-hover:w-10"
          />
          <dt>
            <Kicker>{spec.label}</Kicker>
          </dt>
          <dd className="mt-2.5 font-heading text-md leading-snug font-medium">
            {spec.value}
          </dd>
        </motion.div>
      ))}
    </motion.dl>
  )
}

export { SpecGrid }
