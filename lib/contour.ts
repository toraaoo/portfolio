import { fractalNoise, hashSeed } from "@/lib/noise"

type Point = readonly [number, number]
type Segment = readonly [Point, Point]

export type Field = {
  readonly columns: number
  readonly rows: number
  readonly values: Float64Array
}

export type ContourLine = {
  readonly d: string
  readonly emphasized: boolean
}

export type ContourOptions = {
  readonly width: number
  readonly height: number
  readonly columns: number
  readonly levels: number
  readonly emphasizeEvery: number
  readonly scale: number
}

const CELL_EDGES: readonly (readonly (readonly [number, number])[])[] = [
  [],
  [[3, 2]],
  [[2, 1]],
  [[3, 1]],
  [[0, 1]],
  [
    [3, 0],
    [2, 1],
  ],
  [[0, 2]],
  [[3, 0]],
  [[3, 0]],
  [[0, 2]],
  [
    [0, 1],
    [3, 2],
  ],
  [[0, 1]],
  [[3, 1]],
  [[2, 1]],
  [[3, 2]],
  [],
]

export function createField(columns: number, rows: number): Field {
  return { columns, rows, values: new Float64Array((columns + 1) * (rows + 1)) }
}

export function fillField(
  field: Field,
  sample: (column: number, row: number) => number
): Field {
  for (let row = 0; row <= field.rows; row++) {
    for (let column = 0; column <= field.columns; column++) {
      field.values[row * (field.columns + 1) + column] = sample(column, row)
    }
  }
  return field
}

function valueAt(field: Field, column: number, row: number): number {
  return field.values[row * (field.columns + 1) + column] ?? 0
}

function crossing(from: number, to: number, level: number): number {
  return (level - from) / (to - from)
}

export function forEachSegment(
  field: Field,
  level: number,
  visit: (x1: number, y1: number, x2: number, y2: number) => void
): void {
  const xs = [0, 0, 0, 0]
  const ys = [0, 0, 0, 0]

  for (let row = 0; row < field.rows; row++) {
    for (let column = 0; column < field.columns; column++) {
      const topLeft = valueAt(field, column, row)
      const topRight = valueAt(field, column + 1, row)
      const bottomRight = valueAt(field, column + 1, row + 1)
      const bottomLeft = valueAt(field, column, row + 1)
      const cell =
        (topLeft > level ? 8 : 0) |
        (topRight > level ? 4 : 0) |
        (bottomRight > level ? 2 : 0) |
        (bottomLeft > level ? 1 : 0)
      const edges = CELL_EDGES[cell]
      if (!edges || edges.length === 0) continue

      xs[0] = column + crossing(topLeft, topRight, level)
      ys[0] = row
      xs[1] = column + 1
      ys[1] = row + crossing(topRight, bottomRight, level)
      xs[2] = column + crossing(bottomLeft, bottomRight, level)
      ys[2] = row + 1
      xs[3] = column
      ys[3] = row + crossing(topLeft, bottomLeft, level)

      for (const [from, to] of edges) {
        visit(xs[from] ?? 0, ys[from] ?? 0, xs[to] ?? 0, ys[to] ?? 0)
      }
    }
  }
}

export function contourLevels(
  count: number,
  low: number,
  high: number
): readonly number[] {
  return Array.from(
    { length: count },
    (_, index) => low + ((high - low) * (index + 1)) / (count + 1)
  )
}

function chainSegments(segments: readonly Segment[]): string {
  const key = ([x, y]: Point) => `${x},${y}`
  const endpoints = new Map<string, number[]>()
  segments.forEach(([start, end], index) => {
    for (const point of [start, end]) {
      const bucket = endpoints.get(key(point))
      if (bucket) bucket.push(index)
      else endpoints.set(key(point), [index])
    }
  })

  const used = new Uint8Array(segments.length)
  const step = (from: Point): Point | undefined => {
    for (const index of endpoints.get(key(from)) ?? []) {
      const segment = segments[index]
      if (used[index] || !segment) continue
      used[index] = 1
      return key(segment[0]) === key(from) ? segment[1] : segment[0]
    }
    return undefined
  }
  const walk = (from: Point): Point[] => {
    const points: Point[] = []
    for (let next = step(from); next; next = step(next)) points.push(next)
    return points
  }

  return segments
    .map((segment, index) => {
      if (used[index]) return ""
      used[index] = 1
      const chain = [
        ...walk(segment[0]).reverse(),
        segment[0],
        segment[1],
        ...walk(segment[1]),
      ]
      return `M${chain.map(([x, y]) => `${x} ${y}`).join(" ")}`
    })
    .join("")
}

export function contourLines(
  seed: string,
  options: ContourOptions
): readonly ContourLine[] {
  const rows = Math.max(
    1,
    Math.round((options.columns * options.height) / options.width)
  )
  const hashed = hashSeed(seed)
  const field = fillField(createField(options.columns, rows), (column, row) =>
    fractalNoise(hashed, column * options.scale, row * options.scale)
  )
  const unitX = options.width / options.columns
  const unitY = options.height / rows
  const toBox = ([x, y]: Point): Point => [
    Math.round(x * unitX),
    Math.round(y * unitY),
  ]

  return contourLevels(
    options.levels,
    Math.min(...field.values),
    Math.max(...field.values)
  ).map((level, index) => {
    const segments: Segment[] = []
    forEachSegment(field, level, (x1, y1, x2, y2) => {
      segments.push([toBox([x1, y1]), toBox([x2, y2])])
    })
    return {
      d: chainSegments(segments),
      emphasized: (index + 1) % options.emphasizeEvery === 0,
    }
  })
}
