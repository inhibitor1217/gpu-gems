type Go = {
  <A, R1>(a: A, f1: (a: A) => R1): R1,
  <A, R1, R2>(a: A, f1: (a: A) => R1, f2: (r1: R1) => R2): R2,
  <A, R1, R2, R3>(a: A, f1: (a: A) => R1, f2: (r1: R1) => R2, f3: (r2: R2) => R3): R3,
  <A>(a: A, ...fs: unknown[]): unknown
}

const goOne = <A, R>(a: A, f: (a: A) => R): R => f(a)

export const go: Go = <A>(a: A, ...fs: any[]) => fs.reduce(goOne, a)

type Pipe = {
  <A, R1, R2>(f1: (a: A) => R1, f2: (r1: R1) => R2): (a: A) => R2,
  <A, R1, R2, R3>(f1: (a: A) => R1, f2: (r1: R1) => R2, f3: (r2: R2) => R3): (a: A) => R3,
  <A>(...fs: unknown[]): (a: A) => unknown
}

export const pipe: Pipe = (...fs: any[]) => <A>(a: A) => go(a, ...fs)

export const range = function* range(n: number) {
  let i = 0
  while (i < n) {
    yield i
    i += 1
  }
}

export const debug = <A>(a: A) => {
  // eslint-disable-next-line no-console
  console.log(a)
  return a
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const noop = (...args: any[]) => {}

export const id = <A>(a: A): A => a
