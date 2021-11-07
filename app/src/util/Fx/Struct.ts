export const evolve =
  <T, F extends { [K in keyof T]: (a: T[K]) => unknown }>(transformations: F) =>
    (a: T): { [K in keyof T]: ReturnType<F[K]> } => {
      const out: Record<string, unknown> = {}
      
      for (const k in a) {
        out[k] = transformations[k](a[k])
      }

      return out as any
    }
