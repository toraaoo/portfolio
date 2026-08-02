import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@workspace/ui/components/item"

import type { Post } from "@/lib/content"
import { blogPostUrl } from "@/lib/site"

function PostRow({ post }: { post: Post }) {
  return (
    <Item
      render={<a href={blogPostUrl(post.slug)} />}
      className="items-baseline gap-5 rounded-none border-b-border px-0 py-4.5"
    >
      <ItemContent className="gap-1">
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
