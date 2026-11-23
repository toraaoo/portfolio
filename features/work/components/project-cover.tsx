import Image from "next/image"
import { ContourLines } from "@/components/contour-lines"
import { cn } from "@/lib/utils"

const CONTOUR_OPTIONS = {
  width: 800,
  height: 300,
  columns: 64,
  levels: 9,
  scale: 0.055,
} as const

/**
 * Project artwork: the project's own `image` when set, otherwise contour
 * lines generated from `seed`. Hover motion follows the nearest `group`.
 */
function ProjectCover({
  seed,
  image,
  sizes,
  priority = false,
  className,
}: {
  seed: string
  image?: string
  sizes: string
  priority?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted [--contour-index:color-mix(in_srgb,var(--brand)_38%,transparent)] [--contour:color-mix(in_srgb,var(--foreground)_11%,transparent)]",
        className
      )}
    >
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
        />
      ) : (
        <ContourLines
          seed={seed}
          options={CONTOUR_OPTIONS}
          className="size-full transition-transform duration-700 ease-out group-hover:scale-[1.06] group-hover:-rotate-1 motion-reduce:transition-none"
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(90%_120%_at_85%_0%,var(--spotlight),transparent_70%)]" />
    </div>
  )
}

export { ProjectCover }
