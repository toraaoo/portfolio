import { cn } from "@workspace/ui/lib/utils"

function CodeBlock({
  code,
  caption,
  className,
}: {
  code: string
  caption?: string
  className?: string
}) {
  return (
    <figure className={cn("my-6", className)}>
      <pre className="dark overflow-x-auto rounded-xl border border-border bg-card px-5 py-4.5 text-sm leading-relaxed text-foreground">
        <code>{code}</code>
      </pre>
      {caption ? (
        <figcaption className="mt-2 font-mono text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

export { CodeBlock }
