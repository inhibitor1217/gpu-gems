import _ from 'lodash'

export type None = null | undefined
export type Option<T> = T | None

export const isNone: <T>(fa: Option<T>) => fa is None = _.isNil

export const map: <T, R>(f: (a: T) => R) => (fa: Option<T>) => Option<R> =
  (f) => (fa) => isNone(fa) ? null : f(fa)

export const mapT: <T, R>(f: (a: T) => Promise<R>) => (fa: Option<T>) => Promise<Option<R>> =
  (f) => (fa) => isNone(fa) ? Promise.resolve(null) : f(fa)
