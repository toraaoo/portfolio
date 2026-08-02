import type { Transition, Variants } from "motion/react"

export const EASE_OUT: [number, number, number, number] = [0.2, 0, 0, 1]

export const duration = {
  fast: 0.12,
  base: 0.18,
  slow: 0.24,
} as const

export const STAGGER_STEP = 0.05

export const layoutMorph: Transition = {
  duration: duration.slow,
  ease: EASE_OUT,
}

export const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_STEP } },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: EASE_OUT },
  },
  exit: { opacity: 0, transition: { duration: duration.fast } },
}

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.slow, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: duration.fast } },
}

export const iconSwap: Variants = {
  hidden: { opacity: 0, rotate: -90, scale: 0.6 },
  show: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: duration.slow, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    rotate: 90,
    scale: 0.6,
    transition: { duration: duration.fast, ease: EASE_OUT },
  },
}
