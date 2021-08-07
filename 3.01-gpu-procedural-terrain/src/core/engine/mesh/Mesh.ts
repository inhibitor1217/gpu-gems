import LoggerService from '../../service/LoggerService'
import Completer from '../../util/Completer'
import Engine from '../Engine'
import { BaseResource, Resource } from '../resource'

export default class Mesh extends BaseResource implements Resource {
  readonly stride: number
  readonly offsets: Record<string, number>
  readonly vertexCount: number
  readonly vertexArray: Float32Array

  private _vertexBufferCompleter = new Completer<GPUBuffer>()

  constructor(
    engine: Engine,
    name: string,
    args: {
      stride: number
      offsets: Record<string, number>
      vertexCount: number
      vertexArray: Float32Array
    }
  ) {
    super('Mesh', name)

    const { stride, offsets, vertexCount, vertexArray } = args

    this.stride = stride
    this.offsets = offsets
    this.vertexCount = vertexCount
    this.vertexArray = vertexArray

    this.createVertexBuffer(engine)
  }

  async destroy(): Promise<void> {
    super.destroy()

    const buffer = await this.buffer
    buffer.destroy()
  }

  get buffer(): Promise<GPUBuffer> {
    return this._vertexBufferCompleter.promise
  }

  private async createVertexBuffer(engine: Engine): Promise<void> {
    LoggerService.verbose(`Creating vertex buffer of ${this.displayName} ...`)

    const device = await engine.device

    const buffer = device.createBuffer({
      size: this.vertexArray.byteLength,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true,
    })

    new Float32Array(buffer.getMappedRange()).set(this.vertexArray)
    buffer.unmap()

    this._vertexBufferCompleter.resolve(buffer)
  }
}
