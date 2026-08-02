"use client"

import { MoonIcon, SunIcon } from "@phosphor-icons/react"
import { Button } from "@workspace/ui/components/button"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useTheme } from "next-themes"
import * as React from "react"
import { flushSync } from "react-dom"

import { iconSwap } from "@/lib/motion"

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const reduced = useReducedMotion()
  const ref = React.useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const dark = resolvedTheme === "dark"

  async function toggle() {
    const next = dark ? "light" : "dark"
    const button = ref.current

    if (!button || reduced || !document.startViewTransition) {
      setTheme(next)
      return
    }

    const { top, left, width, height } = button.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })

    await transition.ready

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 420,
        easing: "cubic-bezier(0.2, 0, 0, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }

  return (
    <Button
      ref={ref}
      onClick={toggle}
      variant="ghost"
      size="icon-sm"
      aria-label={
        mounted
          ? dark
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Switch theme"
      }
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={mounted && dark ? "moon" : "sun"}
          variants={iconSwap}
          initial="hidden"
          animate="show"
          exit="exit"
          className="inline-flex"
        >
          {mounted && dark ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </AnimatePresence>
    </Button>
  )
}

export { ThemeToggle }
