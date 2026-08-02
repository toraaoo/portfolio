import type {
  ExperienceEntry,
  Profile,
  ToolboxGroup,
} from "@/lib/content/types"

export const profile: Profile = {
  name: "Sam Rivera",
  initials: "SR",
  handle: "sam",
  role: "Software Engineer",
  headline: "I build systems with sharp edges.",
  tagline:
    "I build systems with sharp edges — schedulers, query engines, and the tooling around them.",
  location: "Berlin, DE",
  timezone: "CET",
  email: "sam@rivera.dev",
  github: "github.com/samrivera",
  years: "2016 — now",
  intro:
    "Schedulers, query engines, and the developer tooling around them. Currently making CI think like a query optimizer at Halyard.",
  bio: [
    "I'm a software engineer focused on backend systems — the kind of work where a 200ms regression is a bug and a flat latency graph is a feature. I care about tools that disappear into the workflow.",
    "Most of what I build starts as a small, annoying problem and grows into something I'd want to use every day. Off the clock I'm usually reading database papers or rewriting my dotfiles for the hundredth time.",
  ],
}

export const toolbox: ToolboxGroup[] = [
  { label: "Languages", items: ["Rust", "TypeScript", "Go", "Python", "SQL"] },
  {
    label: "Systems",
    items: ["Postgres", "ClickHouse", "Redis", "Kafka", "gRPC"],
  },
  { label: "Frontend", items: ["React", "WebGPU", "WASM", "Vite"] },
  { label: "Infra", items: ["Kubernetes", "Terraform", "AWS", "Grafana"] },
]

export const experience: ExperienceEntry[] = [
  {
    when: "2022 — now",
    role: "Staff Engineer",
    org: "Halyard",
    note: "Leading the scheduler and developer-platform teams.",
  },
  {
    when: "2019 — 2022",
    role: "Senior Engineer",
    org: "ClickHouse Inc.",
    note: "Query execution and storage internals.",
  },
  {
    when: "2016 — 2019",
    role: "Engineer",
    org: "Stripe",
    note: "Payments reliability and observability tooling.",
  },
]
