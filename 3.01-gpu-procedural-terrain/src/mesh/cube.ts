import type Mesh from './types'

const stride = 4 * 4

const offsets = {
  position: 0,
}

const count = 36

// prettier-ignore
const vertexArray = new Float32Array([
  1, -1, 1, 1,
  -1, -1, 1, 1,
  -1, -1, -1, 1,
  1, -1, -1, 1,
  1, -1, 1, 1,
  -1, -1, -1, 1,

  1, 1, 1, 1,
  1, -1, 1, 1,
  1, -1, -1, 1,
  1, 1, -1, 1,
  1, 1, 1, 1,
  1, -1, -1, 1,

  -1, 1, 1, 1,
  1, 1, 1, 1,
  1, 1, -1, 1,
  -1, 1, -1, 1,
  -1, 1, 1, 1,
  1, 1, -1, 1,

  -1, -1, 1, 1,
  -1, 1, 1, 1,
  -1, 1, -1, 1,
  -1, -1, -1, 1,
  -1, -1, 1, 1,
  -1, 1, -1, 1,

  1, 1, 1, 1,
  -1, 1, 1, 1,
  -1, -1, 1, 1,
  -1, -1, 1, 1,
  1, -1, 1, 1,
  1, 1, 1, 1,

  1, -1, -1, 1,
  -1, -1, -1, 1,
  -1, 1, -1, 1,
  1, 1, -1, 1,
  1, -1, -1, 1,
  -1, 1, -1, 1,
])

const cube: Mesh = {
  stride,
  offsets,
  count,
  vertexArray,
}

export default cube
