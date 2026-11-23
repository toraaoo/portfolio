# Portfolio

Personal portfolio site. Next.js 16, React 19, Tailwind 4, shadcn/ui (Base UI).
Content is read from the platform API (`/portfolio/profile`,
`/portfolio/projects`, `/posts`).

## Setup

```sh
bun install
cp .env.example .env.local
bun run dev
```

| Variable               | Purpose                         | Default                     |
| ---------------------- | ------------------------------- | --------------------------- |
| `API_URL`              | Platform API base URL           | `http://localhost:3002/api` |
| `NEXT_PUBLIC_BLOG_URL` | Blog origin for "Writing" links | `http://localhost:3001`     |

`bun run build` prerenders pages from the API, so the API must be reachable.

## Scripts

| Script                    | What it does         |
| ------------------------- | -------------------- |
| `dev` / `build` / `start` | Next.js on port 3000 |
| `lint` / `lint:fix`       | Biome linter         |
| `format` / `format:check` | Biome formatter      |
| `typecheck`               | `tsc --noEmit`       |

## Layout

| Path          | Contents                                                     |
| ------------- | ------------------------------------------------------------ |
| `app/`        | Routes, root layout and `globals.css` (design tokens)        |
| `features/`   | Page sections and feature components, one folder per page    |
| `components/` | shadcn base components, `app-shell/` site chrome, `motion/`  |
| `lib/`        | Site config, routes, content loaders, `api/` client, `utils` |

## Components

Add shadcn components with `bunx shadcn@latest add <component>`; they land in
`components/` and import as `@/components/<name>`.
