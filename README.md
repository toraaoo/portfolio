# Portfolio

Personal portfolio site. Next.js 16, React 19, Tailwind 4, shadcn/ui (Base UI).
All content lives in JSON under `content/`; every page is prerendered at build
time and there is no backend.

## Setup

```sh
bun install
bun run dev
```

## Content

| File                    | What it holds                                                           |
| ----------------------- | ----------------------------------------------------------------------- |
| `content/profile.json`  | Name, headline, bio, contact, location, core stack, toolbox, experience |
| `content/projects.json` | Projects, in display order                                              |
| `content/pages.json`    | Section titles and descriptions for the home, work and about pages      |

- **Add a project**: append an object to `projects`. `slug` (lowercase-kebab-case,
  unique) becomes the URL `/work/<slug>`.
- **Remove a project**: delete its object.
- **Reorder**: move objects; the home page shows `featured` projects as cards
  and the first four non-featured projects as rows.
- `status` is one of `shipped`, `wip`, `open_source`, `archived`.
- Optional project fields: `featured` (default `false`), `sections`
  (default `[]`), `sourceUrl`, `liveUrl`, `cover`.
- `cover` is a path to an image in `public/` (e.g. `/covers/hestia.jpg`),
  shown in the strip at the top of the project card; without it the card
  shows contour lines generated from the slug. A wide image (about 8:3)
  crops best.
- `timeZoneLabel` (e.g. `UTC+8`) is shown beside `location` in the footer.
- `openTo` (optional, e.g. `Full-time roles`) fills the last hero stat; without
  it the stat shows `role` under "Currently".
- `avatar` (optional) is a path to an image in `public/` (e.g. `/avatar.jpg`),
  shown on the about page; without it the page shows `initials`.

Each file points at a JSON Schema in `content/schemas/` through `$schema`, so
editors autocomplete and flag mistakes as you type. The same rules are enforced
by Zod in `lib/content/`: an invalid file fails `dev` and `build` with the file
name and the path of each problem. Unknown keys are rejected, so typos surface.

After changing a schema in `lib/content/`, regenerate the JSON Schemas with
`bun run schema`.

## Scripts

| Script                    | What it does                                       |
| ------------------------- | -------------------------------------------------- |
| `dev` / `build` / `start` | Next.js on port 3000                               |
| `schema`                  | Regenerate `content/schemas/` from the Zod schemas |
| `lint` / `lint:fix`       | Biome linter                                       |
| `format` / `format:check` | Biome formatter                                    |
| `typecheck`               | `tsc --noEmit`                                     |

## Layout

| Path          | Contents                                                    |
| ------------- | ----------------------------------------------------------- |
| `content/`    | Portfolio content (JSON) and generated JSON Schemas         |
| `app/`        | Routes, root layout and `globals.css` (design tokens)       |
| `features/`   | Page sections and feature components, one folder per page   |
| `components/` | shadcn base components, `app-shell/` site chrome, `motion/` |
| `lib/`        | `content/` schemas and loader, routes, motion, `utils`      |
| `scripts/`    | `schema.ts` JSON Schema generator                           |

## Components

Add shadcn components with `bunx shadcn@latest add <component>`; they land in
`components/` and import as `@/components/<name>`.
