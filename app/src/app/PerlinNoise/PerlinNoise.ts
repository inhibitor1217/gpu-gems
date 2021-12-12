import {
  MeshBuilder,
  Scene,
  ShaderLanguage,
  ShaderMaterial,
  ShaderStore,
} from '@babylonjs/core'

import SceneApplication from 'Util/SceneApplication'

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

    const quad = MeshBuilder.CreatePlane('quad', {}, scene)
    quad.material = noiseMat

    return Promise.resolve(scene)
  },
}

export default PerlinNoise
