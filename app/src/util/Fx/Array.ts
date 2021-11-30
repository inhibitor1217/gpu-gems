export const reverse = <A>(arr: A[]): A[] => [...arr].reverse()

export const flatten = <A>(arrs: A[][]): A[] =>
  arrs.reduce((acc, arr) => {
    acc.push(...arr)
    return acc
  }, [])
