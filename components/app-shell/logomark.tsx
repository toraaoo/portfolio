import { cn } from "@/lib/utils"

function Logomark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      role="presentation"
      aria-hidden="true"
      className={cn("size-7", className)}
    >
      <rect
        x="1.5"
        y="1.5"
        width="61"
        height="61"
        rx="7"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M19 22L29 32L19 42"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
      <path
        d="M34 43H46"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
    </svg>
  )
}

export { Logomark }
