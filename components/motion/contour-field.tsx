"use client"

import { useReducedMotion } from "motion/react"
import * as React from "react"
import {
  contourLevels,
  createField,
  type Field,
  fillField,
  forEachSegment,
} from "@/lib/contour"
import { FRACTAL_NOISE_MAX, fractalNoise, hashSeed } from "@/lib/noise"
import { cn } from "@/lib/utils"

const CELL_PX = 24
const NOISE_PER_CELL = 0.075
const LEVELS = contourLevels(
  14,
  0.22 * FRACTAL_NOISE_MAX,
  0.78 * FRACTAL_NOISE_MAX
)
const EMPHASIZE_EVERY = 5
const FRAME_MS = 1000 / 30
const MORPH_PER_SECOND = 0.03
const CURSOR_RADIUS_PX = 150
const CURSOR_LIFT = 0.16
const CURSOR_EASE = 0.08

type Palette = { line: string; index: string }

type Pointer = {
  x: number
  y: number
  targetX: number
  targetY: number
  strength: number
  targetStrength: number
}

/**
 * Canvas of slowly morphing contour lines that rise around the mouse cursor,
 * sized to its parent. Line colours follow the `--contour` and
 * `--contour-index` CSS variables.
 *
 * Built to stay light: one reused field buffer, no per-frame allocations,
 * 30 fps cap, 1× backing store, and paused while off-screen or hidden.
 * Draws a single static frame when the user prefers reduced motion.
 */
function ContourField({
  seed,
  className,
}: {
  seed: string
  className?: string
}) {
  const ref = React.useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  React.useEffect(() => {
    const canvas = ref.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const hashed = hashSeed(seed)
    const pointer: Pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      strength: 0,
      targetStrength: 0,
    }
    let palette: Palette = { line: "", index: "" }
    let field: Field = createField(1, 1)
    let width = 0
    let height = 0
    let time = 0

    function readPalette() {
      if (!canvas) return
      const styles = getComputedStyle(canvas)
      palette = {
        line: styles.getPropertyValue("--contour"),
        index: styles.getPropertyValue("--contour-index"),
      }
    }

    function resize() {
      if (!canvas) return
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width
      canvas.height = height
      field = createField(
        Math.ceil(width / CELL_PX),
        Math.ceil(height / CELL_PX)
      )
    }

    function elevation(column: number, row: number) {
      const x = column * NOISE_PER_CELL
      const y = row * NOISE_PER_CELL
      const terrain =
        fractalNoise(hashed, x + time, y + time * 0.4) * 0.7 +
        fractalNoise(hashed + 101, x - time * 0.6, y + time * 0.2) * 0.3
      if (pointer.strength < 0.01) return terrain

      const dx = column * CELL_PX - pointer.x
      const dy = row * CELL_PX - pointer.y
      const falloff = Math.exp(
        -(dx * dx + dy * dy) / (2 * CURSOR_RADIUS_PX * CURSOR_RADIUS_PX)
      )
      return terrain + pointer.strength * CURSOR_LIFT * falloff
    }

    function addSegment(x1: number, y1: number, x2: number, y2: number) {
      context?.moveTo(x1 * CELL_PX, y1 * CELL_PX)
      context?.lineTo(x2 * CELL_PX, y2 * CELL_PX)
    }

    function draw() {
      if (!context) return
      fillField(field, elevation)
      context.clearRect(0, 0, width, height)
      LEVELS.forEach((level, index) => {
        const emphasized = (index + 1) % EMPHASIZE_EVERY === 0
        context.beginPath()
        forEachSegment(field, level, addSegment)
        context.strokeStyle = emphasized ? palette.index : palette.line
        context.lineWidth = emphasized ? 1.25 : 1
        context.stroke()
      })
    }

    function easePointer() {
      if (pointer.strength < 0.01) {
        pointer.x = pointer.targetX
        pointer.y = pointer.targetY
      }
      pointer.x += (pointer.targetX - pointer.x) * CURSOR_EASE
      pointer.y += (pointer.targetY - pointer.y) * CURSOR_EASE
      pointer.strength +=
        (pointer.targetStrength - pointer.strength) * CURSOR_EASE
    }

    const themeObserver = new MutationObserver(() => {
      readPalette()
      draw()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    const sizeObserver = new ResizeObserver(() => {
      resize()
      draw()
    })
    sizeObserver.observe(canvas)

    readPalette()
    resize()
    draw()

    if (reduced) {
      return () => {
        themeObserver.disconnect()
        sizeObserver.disconnect()
      }
    }

    let frame = 0
    let running = false
    let lastFrame = Number.NEGATIVE_INFINITY

    function loop(now: number) {
      frame = requestAnimationFrame(loop)
      if (now - lastFrame < FRAME_MS) return
      lastFrame = now
      time = (now / 1000) * MORPH_PER_SECOND
      easePointer()
      draw()
    }

    function setRunning(next: boolean) {
      if (next === running) return
      running = next
      if (running) frame = requestAnimationFrame(loop)
      else cancelAnimationFrame(frame)
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      setRunning(Boolean(entry?.isIntersecting))
    })
    visibilityObserver.observe(canvas)

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !canvas) return
      const bounds = canvas.getBoundingClientRect()
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top
      const inside = x >= 0 && y >= 0 && x <= bounds.width && y <= bounds.height
      pointer.targetStrength = inside ? 1 : 0
      if (!inside) return
      pointer.targetX = x
      pointer.targetY = y
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })

    return () => {
      setRunning(false)
      themeObserver.disconnect()
      sizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
    }
  }, [seed, reduced])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none block size-full", className)}
    />
  )
}

export { ContourField }
