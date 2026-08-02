import type { Project } from "@/lib/content/types"

export const projects: Project[] = [
  {
    slug: "atlas",
    name: "Atlas",
    blurb:
      "Distributed tracing for edge workloads, built on a custom span-ingestion pipeline.",
    year: "2024",
    status: "Shipped",
    stack: ["Rust", "gRPC", "ClickHouse"],
    featured: true,
    metric: "12B spans/day",
    role: "Solo — design, backend, query layer",
    summary:
      "Atlas ingests OpenTelemetry spans at the edge, batches them through a back-pressured pipeline, and stores them columnar for sub-second trace queries. The hard part wasn't storage — it was keeping tail latency flat while the fleet scaled 40×.",
    sections: [
      {
        heading: "The problem",
        body: [
          "Edge nodes produce spans faster than any central collector wants to accept them, and dropping spans silently turns a trace into a lie. The constraint was to never lose a span while never letting ingestion block a request path.",
          "Back-pressure had to travel the whole way back to the emitter, which meant the transport, the batcher, and the sink all had to agree on one notion of capacity.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "Shipped and measured at 12B spans/day with sub-second trace lookups. The interesting follow-on work was making it boring enough to forget about.",
        ],
      },
    ],
    code: {
      source: `loop {
    let batch = ingest.next().await?;
    let plan  = planner.plan(&batch);
    sink.flush(plan).await?;
}`,
      caption: "The core loop, simplified.",
    },
    links: { source: "https://github.com/samrivera", live: "#" },
  },
  {
    slug: "quill",
    name: "Quill",
    blurb: "Local-first markdown editor with conflict-free realtime sync.",
    year: "2024",
    status: "Shipped",
    stack: ["TypeScript", "Rust/WASM", "Automerge"],
    featured: true,
    metric: "0ms perceived sync",
    role: "Solo — editor core, CRDT layer",
    summary:
      "Quill keeps the document authoritative on-device and reconciles with peers using a CRDT compiled to WASM. Edits apply instantly; sync is a background detail you never wait on.",
    sections: [
      {
        heading: "The problem",
        body: [
          "Collaborative editors usually make the network the source of truth, so every keystroke inherits the worst round-trip on the connection. Quill inverts that: the local document is authoritative and the network is a reconciliation detail.",
          "The CRDT compiles to WASM so the same merge semantics run in the browser, on the desktop, and on the sync server.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "Typing latency is bounded by the renderer, not the connection. Offline sessions merge cleanly on reconnect without a conflict UI.",
        ],
      },
    ],
    code: {
      source: `const doc = Automerge.change(local, (d) => {
    d.text.insertAt(cursor, ...input);
});
queue.enqueue(Automerge.saveIncremental(doc));`,
      caption: "Apply locally first, sync later.",
    },
    links: { source: "https://github.com/samrivera", live: "#" },
  },
  {
    slug: "halyard",
    name: "Halyard",
    blurb:
      "A deployment orchestrator that schedules CI like a query optimizer.",
    year: "2025",
    status: "WIP",
    stack: ["Go", "Postgres", "React"],
    featured: false,
    metric: "4.2× faster pipelines",
    role: "Lead — scheduler, web console",
    summary:
      "Halyard models a CI pipeline as a DAG and schedules stages against a cost model instead of a fixed topology. Slow jobs stop blocking fast ones.",
    sections: [
      {
        heading: "The problem",
        body: [
          "Most CI systems execute the pipeline you wrote, in the order you wrote it. That turns every pipeline author into a scheduler, and they optimise for the last failure they saw.",
          "Halyard takes the DAG, estimates stage cost from history, and picks an execution order that minimises time to first signal.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "Pipelines land 4.2× faster on the median repository, mostly by refusing to run cheap work behind expensive work.",
        ],
      },
    ],
    code: {
      source: `plan := scheduler.Plan(dag, costs)
for _, stage := range plan.Ready() {
    runner.Dispatch(ctx, stage)
}`,
      caption: "Cost model in, execution order out.",
    },
    links: { source: "https://github.com/samrivera", live: "#" },
  },
  {
    slug: "pixelsmith",
    name: "Pixelsmith",
    blurb: "A GPU image pipeline and shader playground in the browser.",
    year: "2023",
    status: "Shipped",
    stack: ["WebGPU", "TypeScript"],
    featured: false,
    metric: "60fps 4K",
    role: "Solo",
    summary:
      "Pixelsmith compiles a node graph of image operations to WebGPU compute passes, so you can author non-destructive pipelines that run at full framerate.",
    sections: [
      {
        heading: "The problem",
        body: [
          "Node-based image editors usually re-render the whole graph on every parameter change. At 4K that budget is gone before the first pass finishes.",
          "Pixelsmith compiles the graph once, caches intermediate textures, and only re-runs the passes downstream of the edit.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "Full-resolution 4K edits stay at 60fps on integrated graphics.",
        ],
      },
    ],
    code: {
      source: `const pass = encoder.beginComputePass();
pass.setPipeline(pipelines.get(node.kind));
pass.dispatchWorkgroups(w / 8, h / 8);
pass.end();`,
      caption: "One compute pass per graph node.",
    },
    links: { source: "https://github.com/samrivera", live: "#" },
  },
  {
    slug: "lattice",
    name: "Lattice",
    blurb:
      "A type-safe query builder that infers result shapes from your schema.",
    year: "2023",
    status: "Open source",
    stack: ["TypeScript"],
    featured: false,
    metric: "3.1k stars",
    role: "Maintainer",
    summary:
      "Lattice turns a schema definition into a fluent query API where every result row is fully typed — no codegen step, no manual generics.",
    sections: [
      {
        heading: "The problem",
        body: [
          "Typed query builders usually pay for their types with a codegen step, which means a stale build is a wrong type. Lattice derives everything from the schema value itself.",
          "The type-level work happens once, at the schema boundary; the query API stays ordinary TypeScript.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "3.1k stars and, more usefully, no generated files to keep in sync.",
        ],
      },
    ],
    code: {
      source: `const rows = await db
    .from(users)
    .where({ active: true })
    .select("id", "email");`,
      caption: "Result shape inferred from the selection.",
    },
    links: { source: "https://github.com/samrivera", live: "#" },
  },
  {
    slug: "sift",
    name: "Sift",
    blurb: "A log search engine with millisecond full-text over cold storage.",
    year: "2025",
    status: "WIP",
    stack: ["Rust", "Tantivy"],
    featured: false,
    metric: "8ms p50",
    role: "Solo",
    summary:
      "Sift keeps an inverted index hot while logs live on object storage, so search stays fast and storage stays cheap.",
    sections: [
      {
        heading: "The problem",
        body: [
          "Logs are written once and read almost never, which makes hot storage the wrong default. But moving them cold usually means search goes from milliseconds to minutes.",
          "Sift splits the difference: the index stays local and small, the documents live on object storage and are fetched only for the rows you actually open.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "8ms p50 search over a corpus that costs object-storage rates to keep.",
        ],
      },
    ],
    code: {
      source: `let hits = index.search(&query, &TopDocs::with_limit(50))?;
let docs = store.fetch(hits.iter().map(|h| h.addr)).await?;`,
      caption: "Index locally, fetch remotely.",
    },
    links: { source: "https://github.com/samrivera", live: "#" },
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
