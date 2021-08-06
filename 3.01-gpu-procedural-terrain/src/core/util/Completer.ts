import _ from 'lodash'

export enum CompleterState {
  Idle,
  Waiting,
  Resolved,
  Rejected,
}

export default class Completer<T> {
  readonly promise: Promise<T>

  private _state: CompleterState
  get state(): CompleterState {
    return this._state
  }

  private _resolve?: (value: T | PromiseLike<T>) => void
  private _reject?: (reason?: any) => void

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })

    this._state = CompleterState.Idle
  }

  get invoked(): boolean {
    return _.includes([CompleterState.Waiting, CompleterState.Resolved, CompleterState.Rejected], this.state)
  }

  get finished(): boolean {
    return _.includes([CompleterState.Resolved, CompleterState.Rejected], this.state)
  }

  resolve(value: T | PromiseLike<T>): void {
    if (this.invoked) {
      return
    }

    if (value instanceof Promise) {
      this._state = CompleterState.Waiting
      value.then((result: T) => this.resolveImmediate(result))
      return
    }

    this.resolveImmediate(value as T)
  }

  private resolveImmediate(value: T): void {
    if (this.finished) {
      return
    }

    this._state = CompleterState.Resolved
    this._resolve?.(value)
  }

  reject(reason?: any): void {
    if (this.finished) {
      return
    }

    this._state = CompleterState.Rejected
    this._reject?.(reason)
  }
}
