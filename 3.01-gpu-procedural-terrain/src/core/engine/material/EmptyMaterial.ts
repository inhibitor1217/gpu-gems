import Engine from '../Engine'
import BaseMaterial from './BaseMaterial'
import Material from './type'

export default class EmptyMaterial extends BaseMaterial implements Material {
  constructor(engine: Engine, pipeline: GPURenderPipeline) {
    super(engine, pipeline, 'Basic')
  }
}
