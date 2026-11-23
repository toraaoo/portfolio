import { Logomark } from "@/components/app-shell/logomark"
import { contourLines } from "@/lib/contour"

export const socialCardSize = { width: 1200, height: 630 } as const

const colors = {
  background: "#0a0a0b",
  foreground: "#f8f8fa",
  muted: "#8e8e98",
  contour: "rgb(255 255 255 / 0.065)",
  contourIndex: "rgb(255 255 255 / 0.12)",
}

function SocialCard({
  seed,
  brand,
  eyebrow,
  title,
  description,
  footer,
}: {
  readonly seed: string
  readonly brand: string
  readonly eyebrow: string
  readonly title: string
  readonly description: string
  readonly footer: string
}) {
  const lines = contourLines(seed, {
    ...socialCardSize,
    columns: 72,
    levels: 14,
    emphasizeEvery: 5,
    scale: 0.07,
  })

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: colors.background,
        color: colors.foreground,
      }}
    >
      <svg
        aria-hidden
        width={socialCardSize.width}
        height={socialCardSize.height}
        viewBox={`0 0 ${socialCardSize.width} ${socialCardSize.height}`}
        fill="none"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {lines.map((line, index) => (
          <path
            key={index.toString()}
            d={line.d}
            stroke={line.emphasized ? colors.contourIndex : colors.contour}
            strokeWidth={line.emphasized ? 1.5 : 1}
          />
        ))}
      </svg>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Logomark width={48} height={48} />
        <span style={{ fontSize: 28 }}>{brand}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <span
          style={{
            fontSize: 24,
            color: colors.muted,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </span>
        <span style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -2 }}>
          {title}
        </span>
        <span style={{ fontSize: 32, lineHeight: 1.35, color: colors.muted }}>
          {description}
        </span>
      </div>
      <span style={{ fontSize: 24, color: colors.muted }}>{footer}</span>
    </div>
  )
}

export { SocialCard }
