import { ContourField } from "@/components/motion/contour-field"
import { cn } from "@/lib/utils"

const HERO_FADE =
  "radial-gradient(ellipse 75% 90% at 78% 35%, black 25%, rgb(0 0 0 / 0.25) 70%, transparent 100%)"

function HeroContours({
  seed,
  className,
}: {
  seed: string
  className?: string
}) {
  return (
    <div
      aria-hidden
      style={{ maskImage: HERO_FADE, WebkitMaskImage: HERO_FADE }}
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <ContourField seed={seed} />
    </div>
  )
}

export { HeroContours }
