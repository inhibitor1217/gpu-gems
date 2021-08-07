export interface Resource {
  id: string
  name: string

  get displayName(): string

  destroy(): void | PromiseLike<void>
}
