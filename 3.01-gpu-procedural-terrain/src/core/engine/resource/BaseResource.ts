import { v4 as uuid } from 'uuid'
import { Resource } from './type'

export default class BaseResource implements Resource {
  readonly id: string
  readonly type: string
  readonly name: string

  constructor(type: string, name?: string) {
    this.id = uuid()
    this.type = type
    this.name = name ?? `Anonymous ${type}`
  }

  get displayName(): string {
    return `${this.type}:${this.name}`
  }

  destroy(): void {}
}
