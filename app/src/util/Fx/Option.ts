import _ from 'lodash'

import * as B from './Boolean'

export type None = null | undefined
export type Option<T> = T | None

export const none: () => None = () => null

export const isNone: <T>(fa: Option<T>) => fa is None = _.isNil

export const isNotNone: <T>(fa: Option<T>) => fa is T = _.flow(isNone, B.not) as any

type Map = {
  <T, R> (f: (a: T) => R): (fa: Option<T>) => Option<R>
  <T, R> (f: (a: T) => R, fallback: R): (fa: Option<T>) => R
  <T, R> (f: (a: T) => R, fallback: null): (fa: Option<T>) => Option<R>
}

export const map: Map = (
  (f, fallback = null) => (fa) => (isNone(fa) ? fallback : f(fa))
)

export const mapT: <T, R>(f: (a: T) => Promise<R>) => (fa: Option<T>) => Promise<Option<R>> = (f) =>
  (fa) => (isNone(fa) ? Promise.resolve(null) : f(fa))
