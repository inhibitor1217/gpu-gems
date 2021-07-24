export default interface Mesh {
  stride: number
  offsets: Record<string, number>
  count: number
  vertexArray: Float32Array
}
