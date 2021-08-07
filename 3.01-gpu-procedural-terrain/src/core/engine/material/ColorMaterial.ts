import { vec4 } from 'gl-matrix'
import Completer from '../../util/Completer'
import Engine from '../Engine'
import BaseMaterial from './BaseMaterial'
import Material from './type'

export default class ColorMaterial extends BaseMaterial implements Material {
  private readonly _color: vec4 = vec4.create()
  private readonly _colorBuffer = new Completer<GPUBuffer>()

  constructor(engine: Engine, pipeline: GPURenderPipeline) {
    super(engine, pipeline, 'Basic.Color')

    this._colorBuffer.resolve(this.createParamsBuffer('color', 4 * 4)) // vec4<f32>
  }

  get bindings(): Promise<GPUBindGroupEntry[]> {
    return Promise.all([this._colorBuffer.promise]).then(([colorBuffer]) => [
      {
        binding: 0,
        resource: { buffer: colorBuffer },
      },
    ])
  }

  get color(): vec4 {
    const ret = vec4.create()
    vec4.copy(ret, this._color)
    return ret
  }

  set color(value: vec4) {
    vec4.copy(this._color, value)

    this._colorBuffer.promise.then((colorBuffer) => this.loadParamsBuffer(colorBuffer, this._color as Float32Array))
  }
}
