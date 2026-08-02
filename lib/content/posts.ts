import type { Post } from "@/lib/content/types"

export const posts: Post[] = [
  {
    slug: "query-planner",
    title: "Writing a query planner that fits in your head",
    date: "May 2024",
    read: "9 min",
    tag: "Databases",
    excerpt:
      "A planner doesn't need a thousand rules. It needs a small set of transformations and the discipline to stop.",
  },
  {
    slug: "crdts",
    title: "CRDTs are easier than you think — until they aren't",
    date: "Feb 2024",
    read: "12 min",
    tag: "Distributed",
    excerpt:
      "The data structures are simple. The hard part is everything around them: storage, GC, and presence.",
  },
  {
    slug: "no-orm",
    title: "Why I stopped reaching for an ORM",
    date: "Nov 2023",
    read: "7 min",
    tag: "Backend",
    excerpt:
      "ORMs optimize for the first 20 minutes of a project and tax you for the next two years.",
  },
]
