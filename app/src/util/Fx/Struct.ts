export const evolve = <T, F extends { [K in keyof T]: (a: T[K]) => unknown }>(transformations: F) =>
  (a: T): { [K in keyof T]: ReturnType<F[K]> } =>
    Object.fromEntries(
      Object.entries(a)
        .map(([k, v]) => [k, transformations[k as keyof T](v)]),
    ) as any
