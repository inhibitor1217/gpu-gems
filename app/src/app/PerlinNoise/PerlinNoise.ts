import {
  MeshBuilder,
  Scene,
  ShaderLanguage,
  ShaderMaterial,
  ShaderStore,
  StorageBuffer,
} from '@babylonjs/core'

import SceneApplication from 'Util/SceneApplication'

import { gradient3d } from './res/buffers/gradient'
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

    const gradient3dBuffer = new StorageBuffer(engine, 4 * 4 * 64)
    gradient3dBuffer.update(gradient3d)

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
    noiseMat.setStorageBuffer('gradient', gradient3dBuffer)

    noiseMat.setFloat('octaves', 6.0)
    noiseMat.setFloat('scale', 0.5)
    noiseMat.setFloat('lacunarity', 2.0)
    noiseMat.setFloat('persistence', 0.5)

    const quad = MeshBuilder.CreatePlane('quad', {}, scene)
    quad.material = noiseMat

    let t = 0.0
    scene.registerBeforeRender(() => {
      noiseMat.setFloat('time', t)
      t += engine.getDeltaTime() * 1e-3
    })

    return Promise.resolve(scene)
  },
}

export default PerlinNoise
