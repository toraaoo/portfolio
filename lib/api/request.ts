import { ApiError } from "@/lib/api/error"

export interface ApiClientOptions {
  baseUrl: string
  version?: string
  token?: string | (() => string | undefined | Promise<string | undefined>)
  revalidate?: number | false
}

export interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE"
  query?: Record<string, string | number | boolean | string[] | undefined>
  body?: unknown
  revalidate?: number | false
  tags?: string[]
  signal?: AbortSignal
}

interface Envelope<T> {
  success: boolean
  message: string
  code?: string
  data?: T
}

export type Requester = <T>(
  path: string,
  options?: RequestOptions
) => Promise<T>

export function createRequester(config: ApiClientOptions): Requester {
  const root = `${config.baseUrl.replace(/\/$/, "")}/v${config.version ?? "1"}`

  return async function request<T>(
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = new URL(`${root}${path}`)

    for (const [key, value] of Object.entries(options.query ?? {})) {
      if (value === undefined) {
        continue
      }

      if (Array.isArray(value)) {
        for (const entry of value) {
          url.searchParams.append(key, entry)
        }
        continue
      }

      url.searchParams.set(key, String(value))
    }

    const token =
      typeof config.token === "function" ? await config.token() : config.token

    const revalidate = options.revalidate ?? config.revalidate
    const method = options.method ?? "GET"

    const response = await fetch(url, {
      method,
      signal: options.signal,
      headers: {
        accept: "application/json",
        ...(options.body === undefined
          ? {}
          : { "content-type": "application/json" }),
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body:
        options.body === undefined ? undefined : JSON.stringify(options.body),
      ...(method === "GET" && revalidate !== undefined
        ? {
            next: {
              ...(revalidate === false ? {} : { revalidate }),
              ...(options.tags ? { tags: options.tags } : {}),
            },
            ...(revalidate === false ? { cache: "no-store" as const } : {}),
          }
        : {}),
      ...(method === "GET" ? {} : { cache: "no-store" as const }),
    })

    const envelope = (await response.json().catch(() => undefined)) as
      | Envelope<T>
      | undefined

    if (!response.ok || envelope?.success === false) {
      throw new ApiError(
        envelope?.code ?? "REQUEST_FAILED",
        envelope?.message ?? response.statusText,
        response.status,
        envelope?.data as Record<string, unknown> | undefined
      )
    }

    return envelope?.data as T
  }
}
