import Engine from '../Engine'
import { CUBE_VERTICES } from './const'
import Mesh from './Mesh'

export default class MeshFactory {
  readonly engine: Engine

  constructor(engine: Engine) {
    this.engine = engine
  }

  buildCube(): Mesh {
    return new Mesh(this.engine, 'Cube', {
      stride: 4 * 6,
      offsets: {
        position: 0,
        normal: 4 * 3,
      },
      vertexCount: 36,
      vertexArray: CUBE_VERTICES,
    })
  }
}
