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
      className="items-start gap-5 rounded-none border-b-border px-0 py-5.5"
    >
      <ItemContent className="gap-2">
        <ItemHeader className="justify-start gap-3">
          <Badge variant="secondary">{post.tag}</Badge>
          <span className="font-mono text-xs text-muted-foreground">
            {post.read} read
          </span>
        </ItemHeader>
        <ItemTitle className="font-heading text-md font-medium tracking-tight">
          {post.title}
        </ItemTitle>
        <ItemDescription>{post.excerpt}</ItemDescription>
      </ItemContent>
      <ItemActions className="font-mono text-xs text-muted-foreground">
        {post.date}
      </ItemActions>
    </Item>
  )
}

export { PostRow }
