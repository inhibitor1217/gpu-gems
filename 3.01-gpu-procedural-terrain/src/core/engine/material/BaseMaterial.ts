import Engine from '../Engine'
import { ShaderRepository } from '../shader'
import Completer from '../../util/Completer'
import { ShaderBindGroup } from '../rendering'
import Material from './type'

export default class BaseMaterial implements Material {
  readonly shaderName: string

  private readonly _device = new Completer<GPUDevice>()
  private readonly _shader = new Completer<GPUShaderModule>()
  private readonly _uniformBindGroup = new Completer<GPUBindGroup>()

  private readonly _paramBuffers = new Map<string, GPUBuffer>()

  constructor(engine: Engine, pipeline: GPURenderPipeline, shaderName: string) {
    this.shaderName = shaderName

    this._device.resolve(engine.device)
    this._shader.resolve(ShaderRepository.get(shaderName))

    this.createUniformBindGroup(pipeline)
  }

  destroy(): void {
    for (const buffer of this._paramBuffers.values()) {
      buffer.destroy()
    }
  }

  protected async createParamsBuffer(param: string, size: number): Promise<GPUBuffer> {
    if (this._paramBuffers.has(param)) {
      this._paramBuffers.get(param)?.destroy()
    }

    const device = await this._device.promise

    const buffer = device.createBuffer({
      size,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })

    this._paramBuffers.set(param, buffer)

    return buffer
  }

  protected async loadParamsBuffer(buffer: GPUBuffer, value: Float32Array): Promise<void> {
    const device = await this._device.promise

    device.queue.writeBuffer(buffer, 0, value.buffer, value.byteOffset, value.byteLength)
  }

  get bindings(): Promise<GPUBindGroupEntry[]> {
    return Promise.resolve([])
  }

  get shader(): Promise<GPUShaderModule> {
    return this._shader.promise
  }

  get uniformBindGroup(): Promise<GPUBindGroup> {
    return this._uniformBindGroup.promise
  }

  async enable(passEncoder: GPURenderPassEncoder): Promise<void> {
    passEncoder.setBindGroup(ShaderBindGroup.Material, await this.uniformBindGroup)
  }

  private async createUniformBindGroup(pipeline: GPURenderPipeline): Promise<void> {
    const device = await this._device.promise
    const bindings = await this.bindings

    const uniformBindGroup = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(ShaderBindGroup.Material),
      entries: bindings,
    })

    this._uniformBindGroup.resolve(uniformBindGroup)
  }
}
