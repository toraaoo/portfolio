import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr"
import { Badge } from "@workspace/ui/components/badge"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@workspace/ui/components/item"

import type { Post } from "@/lib/content"
import { blogPostUrl } from "@/lib/site"

function PostRow({ post }: { post: Post }) {
  return (
    <Item
      render={<a href={blogPostUrl(post.slug)} />}
      className="group relative items-start gap-5 rounded-none border-b-border px-0 py-5.5"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
      <ItemContent className="gap-2">
        <ItemHeader className="justify-start gap-3">
          <Badge
            variant="secondary"
            className="transition-colors group-hover:bg-foreground group-hover:text-background"
          >
            {post.tag}
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">
            {post.read} read
          </span>
        </ItemHeader>
        <ItemTitle className="font-heading text-md font-medium tracking-tight transition-transform duration-200 ease-out group-hover:translate-x-0.5">
          {post.title}
        </ItemTitle>
        <ItemDescription>{post.excerpt}</ItemDescription>
      </ItemContent>
      <ItemActions className="gap-3 font-mono text-xs text-muted-foreground">
        {post.date}
        <ArrowUpRightIcon className="size-4 -translate-x-1 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:text-foreground group-hover:opacity-100" />
      </ItemActions>
    </Item>
  )
}

export { PostRow }
