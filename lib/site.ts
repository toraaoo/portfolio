export const site = {
  blogUrl: process.env.NEXT_PUBLIC_BLOG_URL ?? "http://localhost:3001",
}

export function blogPostUrl(slug: string) {
  return `${site.blogUrl}/${slug}`
}
