import _ from 'lodash'

export const gradient2d = new Float32Array(
  _.flatten(
    _.range(64)
      .map(() => Math.random() * 2.0 * Math.PI)
      .map((a) => [Math.cos(a), Math.sin(a)]),
  ),
)

export const gradient3d = new Float32Array(
  _.flatten(
    _.range(64)
      .map(() => [Math.random() * 2 - 1, Math.random() * 2.0 * Math.PI])
      .map(([z, a]) => [Math.cos(a) * (1 - z ** 2) ** 0.5, Math.sin(a) * (1 - z ** 2) ** 0.5, z]),
  ),
)
