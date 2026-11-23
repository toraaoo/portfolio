import { type ContourOptions, contourLines } from "@/lib/contour"
import { cn } from "@/lib/utils"

const DEFAULTS: ContourOptions = {
  width: 1600,
  height: 1000,
  columns: 72,
  levels: 14,
  emphasizeEvery: 5,
  scale: 0.07,
}

/**
 * Decorative topographic lines. Colours come from the `--contour` and
 * `--contour-index` CSS variables so callers can retint them per surface.
 */
function ContourLines({
  seed,
  options,
  className,
}: {
  seed: string
  options?: Partial<ContourOptions>
  className?: string
}) {
  const settings = { ...DEFAULTS, ...options }
  const lines = contourLines(seed, settings)

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${settings.width} ${settings.height}`}
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      strokeLinecap="round"
      className={cn("pointer-events-none", className)}
    >
      {lines.map((line, index) => (
        <path
          key={index.toString()}
          d={line.d}
          stroke={line.emphasized ? "var(--contour-index)" : "var(--contour)"}
          strokeWidth={line.emphasized ? 1.25 : 1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}

export { ContourLines }
