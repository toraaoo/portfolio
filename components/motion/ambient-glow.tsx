import { cn } from "@/lib/utils"

function AmbientGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div className="absolute -top-[20%] right-[-12%] size-[min(70vw,56rem)] animate-drift rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl motion-reduce:animate-none" />
    </div>
  )
}

export { AmbientGlow }
