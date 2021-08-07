import { Resource } from '../resource'

export default interface Material extends Resource {
  get bindings(): Promise<GPUBindGroupEntry[]>
  get shader(): Promise<GPUShaderModule>
  get uniformBindGroup(): Promise<GPUBindGroup>

  enable(passEncoder: GPURenderPassEncoder): Promise<void>
}
