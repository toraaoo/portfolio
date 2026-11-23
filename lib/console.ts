export interface ConsoleTag {
  slug: string
  label: string
  postCount?: number
}

export interface ConsoleSeries {
  slug: string
  title: string
  postCount?: number
}

export interface ConsolePost {
  slug: string
  title: string
  excerpt: string
  status: "draft" | "scheduled" | "published"
  publishedAt: string | null
  readingMinutes: number
  tags: ConsoleTag[]
  series: ConsoleSeries | null
  seriesPosition: number | null
}

const MONTH_DAY = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
})

const FULL_DATE = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
})

export function ledgerDate(value: string | null): string {
  return value ? MONTH_DAY.format(new Date(value)) : "——"
}

export function fullDate(value: string | null): string {
  return value ? FULL_DATE.format(new Date(value)) : "Unpublished"
}

export function ledgerYear(value: string | null): string {
  return value ? String(new Date(value).getUTCFullYear()) : "Unpublished"
}

export function groupByYear(
  posts: ConsolePost[]
): { year: string; posts: ConsolePost[] }[] {
  const groups: { year: string; posts: ConsolePost[] }[] = []

  for (const post of posts) {
    const year = ledgerYear(post.publishedAt)
    const current = groups.at(-1)

    if (current?.year === year) {
      current.posts.push(post)
      continue
    }

    groups.push({ year, posts: [post] })
  }

  return groups
}

export function corpusSpan(from: string | null, to: string | null): string {
  if (!from || !to) {
    return "no published writing yet"
  }

  const first = new Date(from).getUTCFullYear()
  const last = new Date(to).getUTCFullYear()

  return first === last ? `${first}` : `${first}—${last}`
}
