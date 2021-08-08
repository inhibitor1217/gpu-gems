import {
  ArcRotateCamera,
  AxesViewer,
  Color3,
  ComputeShader,
  HemisphericLight,
  Mesh,
  Scene,
  StandardMaterial,
  StorageBuffer,
  Vector3,
  VertexData,
  WebGPUEngine,
} from '@babylonjs/core'
import _ from 'lodash'
import marchingCubesWGSL from './res/shaders/marchingCubes.wgsl'

class App {
  private readonly canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  async run(): Promise<void> {
    const engine = new WebGPUEngine(this.canvas)
    await engine.initAsync()

    const scene = new Scene(engine)

    const camera: ArcRotateCamera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene)
    camera.position = Vector3.Up().scale(4)

    camera.attachControl(this.canvas, true)

    const light = new HemisphericLight('light', Vector3.Up(), scene)

    const axesViewer = new AxesViewer(scene)

    const meshBuffer = new StorageBuffer(engine, 3 * 64 * 4 * 8)

    const marchingCubesCompute = new ComputeShader(
      'marchingCubes',
      engine,
      { computeSource: marchingCubesWGSL },
      {
        bindingsMapping: {
          mesh: { group: 0, binding: 0 },
        },
      }
    )

    marchingCubesCompute.setStorageBuffer('mesh', meshBuffer)

    const terrainMesh = new Mesh('terrain', scene)

    marchingCubesCompute
      .dispatchWhenReady(1, 1, 1)
      .then(() => meshBuffer.read())
      .then((meshBufferData) => {
        const buffer = new Float32Array(meshBufferData.buffer)
        meshBuffer.dispose()

        const positions = new Float32Array(3 * 3 * 64)
        const normals = new Float32Array(3 * 3 * 64)

        for (let i = 0; i < 3 * 64; i += 1) {
          positions[3 * i + 0] = buffer[8 * i + 0]
          positions[3 * i + 1] = buffer[8 * i + 1]
          positions[3 * i + 2] = buffer[8 * i + 2]

          normals[3 * i + 0] = buffer[8 * i + 4]
          normals[3 * i + 1] = buffer[8 * i + 5]
          normals[3 * i + 2] = buffer[8 * i + 6]
        }

        const vertexData = new VertexData()
        vertexData.positions = positions
        vertexData.indices = _.range(3 * 64)
        vertexData.normals = normals

        vertexData.applyToMesh(terrainMesh)
      })

    const terrainMat = new StandardMaterial('terrainMat', scene)
    terrainMat.diffuseColor = new Color3(1.0, 1.0, 1.0)

    terrainMesh.material = terrainMat

    engine.runRenderLoop(() => {
      scene.render()
    })
  }
}

export default App
