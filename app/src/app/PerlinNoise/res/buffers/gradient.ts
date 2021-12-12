import _ from 'lodash'

export const gradient2d = new Float32Array(
  _.flatten(
    _.range(64)
      .map(() => Math.random() * 2.0 * Math.PI)
      .map((a) => [Math.cos(a), Math.sin(a)]),
  ),
)
