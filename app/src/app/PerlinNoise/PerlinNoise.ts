import {
  MeshBuilder,
  Scene,
  ShaderLanguage,
  ShaderMaterial,
  ShaderStore,
  StorageBuffer,
} from '@babylonjs/core'

import SceneApplication from 'Util/SceneApplication'

import gradients from './res/buffers/gradients'
import permutation from './res/buffers/permutation'
import noiseVertexWGSL from './res/shaders/noise.vertex.wgsl'
import noiseFragmentWGSL from './res/shaders/noise.fragment.wgsl'

const shaderPath = (name: string): string => name
const vertexShaderStoreKey = (name: string): string => `${name}VertexShader`
const fragmentShaderStoreKey = (name: string): string => `${name}FragmentShader`

const NOISE = 'noise'

const PerlinNoise: SceneApplication.SceneApplication = {
  createScene: (engine) => {
    const scene = new Scene(engine)
    scene.createDefaultCameraOrLight(false, true, false)

    ShaderStore.ShadersStoreWGSL[vertexShaderStoreKey(NOISE)] = noiseVertexWGSL
    ShaderStore.ShadersStoreWGSL[fragmentShaderStoreKey(NOISE)] = noiseFragmentWGSL

    const permutationBuffer = new StorageBuffer(engine, 4 * 256)
    permutationBuffer.update(permutation)

    const gradientsBuffer = new StorageBuffer(engine, 4 * 3 * 16)
    gradientsBuffer.update(gradients)

    const noiseMat = new ShaderMaterial(
      'noise',
      scene,
      {
        vertex: shaderPath(NOISE),
        fragment: shaderPath(NOISE),
      },
      {
        attributes: ['position'],
        uniformBuffers: ['Scene', 'Mesh'],
        shaderLanguage: ShaderLanguage.WGSL,
      },
    )

    noiseMat.setStorageBuffer('permutation', permutationBuffer)
    noiseMat.setStorageBuffer('gradients', gradientsBuffer)

    const quad = MeshBuilder.CreatePlane('quad', {}, scene)
    quad.material = noiseMat

    return Promise.resolve(scene)
  },
}

export default PerlinNoise
