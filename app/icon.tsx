import { ImageResponse } from "next/og"

import { Logomark } from "@/components/app-shell/logomark"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

// ImageResponse cannot read CSS custom properties; these mirror --paper-raised and --ink-950 in globals.css.
const background = "#ffffff"
const foreground = "#0a0a0b"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        borderRadius: 4,
        background,
        color: foreground,
      }}
    >
      <Logomark width={size.width} height={size.height} />
    </div>,
    size
  )
}
