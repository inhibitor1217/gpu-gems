import type Mesh from './types'

const stride = 4 * 4

const offsets = {
  position: 0,
}

const count = 3

// prettier-ignore
const vertexArray = new Float32Array([
  0, 0.5, 0, 1,
  -0.5, -0.5, 0, 1,
  0.5, -0.5, 0, 1,
])

const triangle: Mesh = {
  stride,
  offsets,
  count,
  vertexArray,
}

export default triangle
