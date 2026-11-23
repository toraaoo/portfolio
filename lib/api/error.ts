/**
 * Mirrors the API's failure envelope: `code` is the stable identifier a caller
 * can branch on, and stays meaningful even when `message` is rewritten.
 */
export class ApiError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly status: number,
    readonly details?: Record<string, unknown>
  ) {
    super(message)
    this.name = "ApiError"
  }

  get isNotFound(): boolean {
    return this.code === "ENTITY_NOT_FOUND" || this.status === 404
  }

  get isUnauthorized(): boolean {
    return this.status === 401
  }

  get isForbidden(): boolean {
    return this.status === 403
  }

  get isValidationFailure(): boolean {
    return this.code === "VALIDATION_FAILED"
  }
}
